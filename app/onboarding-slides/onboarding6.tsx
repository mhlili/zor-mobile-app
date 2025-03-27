import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Button from '@/components/onboarding/nextbutton';
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons"; // Icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressBar from '@/components/onboarding/progress-bar'; 

export default function Onboarding6({ onNext}: { onNext: () => void }) { 
  const router = useRouter();
  const navigation = useNavigation();

  // **State for selected medications**
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  
  // **State for medication details**
  const [medicationDetails, setMedicationDetails] = useState<{ [key: string]: { dosage: string, frequency: string, interval: string } }>({});

  // **Fetch selected medications from AsyncStorage**
  useEffect(() => {
    const fetchMedications = async () => {
      const data = await AsyncStorage.getItem("medications");
      if (data) {
        const medications = JSON.parse(data);
        setSelectedMedications(medications);
      }
    };
    fetchMedications();
  }, []);

  // **Update medicationDetails when selectedMedications is set**
  useEffect(() => {
    setMedicationDetails(
      selectedMedications.reduce((acc, med) => ({
        ...acc, [med]: { dosage: '', frequency: '1', interval: 'Days' }
      }), {})
    );
  }, [selectedMedications]);

  // **Update input fields**
  const handleInputChange = (med: string, field: string, value: string) => {
    setMedicationDetails(prev => ({
      ...prev, [med]: { ...prev[med], [field]: value }
    }));
  };

  // **Check if all fields are filled**
  const isFormValid = Object.values(medicationDetails).every(
    ({ dosage, frequency }) => dosage.trim() !== '' && frequency.trim() !== ''
  );

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleContinue = () => {
    console.log("Medication Details:", medicationDetails);
    router.push("/onboarding-slides/onboarding7");
  };

  const handleSkip = () => {
    console.log("Skipped selection");
    router.push("/onboarding-slides/onboarding7");
  };

  return (
    <View style={styles.container}>
      <ProgressBar activeIndex={4} totalDots={7} />

      <View style={styles.headerContainer}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        
        {/* Skip Button */}
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipButtonText}>Add later</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Medication Details</Text>
      
      {/* List of Selected Medications */}
      <FlatList
        data={selectedMedications}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.medicationContainer}>
            <Text style={styles.medicationName}>{item}</Text>

            {/* Dosage Input */}
            <TextInput
              style={styles.input}
              placeholder="Dosage"
              value={medicationDetails[item]?.dosage}
              onChangeText={(text) => handleInputChange(item, 'dosage', text)}
            />

            {/* Frequency + Reminder in One Row */}
      <View style={styles.frequencyReminderRow}>
        {/* Frequency Selection */}
        <View style={styles.frequencyContainer}>
          <Text style={styles.everyText}>Every</Text>
          <TextInput
            style={styles.frequencyInput}
            value={medicationDetails[item]?.frequency}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange(item, 'frequency', text)}
          />
          {/* Dropdown for Interval Selection */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => handleInputChange(item, 'interval', medicationDetails[item]?.interval === 'Days' ? 'Weeks' : 'Days')}
          >
            <Text>{medicationDetails[item]?.interval}</Text>
            <AntDesign name="down" size={14} />
          </TouchableOpacity>
        </View>

        {/* Reminder Toggle - Now in Line */}
        <TouchableOpacity style={styles.reminderContainer}>
          <Feather name="clock" size={18} color="#999" />
          <Text style={styles.reminderText}>Set reminder</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
/>

      {/* Continue Button */}
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20,
    paddingTop: 40, backgroundColor: "#fff" },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Places buttons at opposite ends
      alignItems: 'center', // Ensures vertical alignment
      marginBottom: 20,
    },
  skipButtonText: {
    fontSize: 16,
    color: '#585858',
    textDecorationLine: 'underline',
  },
  backButton: {
    padding: 0
  },
  skipButton: {
    padding: 0
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },

  medicationContainer: { marginBottom: 20 },
  medicationName: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: { height: 40, borderWidth: 1, borderColor: "#F0F0F0", borderRadius: 10, paddingHorizontal: 10, marginBottom: 10 },
  frequencyReminderRow: {
    flexDirection: "row", // Aligns items horizontally
    justifyContent: "space-between", // Ensures even spacing
    alignItems: "center", // Keeps everything vertically centered
  },
  frequencyContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  everyText: { fontSize: 16, marginRight: 8 },
  frequencyInput: { width: 40, height: 40, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, textAlign: "center" },
  dropdown: { flexDirection: "row", alignItems: "center", padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, marginLeft: 10 },

  reminderContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  reminderText: { marginLeft: 8, fontSize: 16, color: "#999" },

  footerContainer: { position: "absolute", bottom: 40, left: 0, right: 0, alignItems: 'center', paddingHorizontal: 25 }
});
