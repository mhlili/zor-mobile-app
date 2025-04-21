import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Button from '@/components/onboarding/continueButton';
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons"; // Icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressBar from '@/components/onboarding/progress-bar'; 
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding99({ onNext}: { onNext: () => void }) { 
  const router = useRouter();
  const navigation = useNavigation();

  // **State for selected metrics**
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  
  // **State for metrics details**
  const [metricsDetails, setMetricsDetails] = useState<{ [key: string]: { dosage: string, frequency: string, interval: string } }>({});
  
  // **Fetch selected metrics from AsyncStorage**
  useEffect(() => {
    const fetchMetrics = async () => {
      const data = await AsyncStorage.getItem("metrics");
      if (data) {
        const metrics = JSON.parse(data);
        setSelectedMetrics(metrics);
      }
    };
    fetchMetrics();
  }, []);

  // **Update metricsDetails when selectedMetrics is set**
  useEffect(() => {
    setMetricsDetails(
      selectedMetrics.reduce((acc, med) => ({
        ...acc, [med]: { dosage: '', frequency: '1', interval: 'Days' }
      }), {})
    );
  }, [selectedMetrics]);

  // **Update input fields**
  const handleInputChange = (med: string, field: string, value: string) => {
    setMetricsDetails(prev => ({
      ...prev, [med]: { ...prev[med], [field]: value }
    }));
  };

  // **Check if all fields are filled**
  const isFormValid = Object.values(metricsDetails).every(
    ({ dosage, frequency }) => dosage.trim() !== '' && frequency.trim() !== ''
  );

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleContinue = () => {
    console.log("Metrics Details:", metricsDetails);
    router.push("/onboarding-slides/onboarding9");
  };

  const handleSkip = () => {
    console.log("Skipped selection");
    router.push("/onboarding-slides/onboarding9");
  };

  return (
    <SafeAreaView style={styles.baseContainer}>
      <View style={styles.progressBarContainer}>
      <ProgressBar activeIndex={7} totalDots={10} />
      </View>
    <View style={styles.bodyContainer}>

    <View style={styles.navContainer}>
      {/* Back arrow button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
      
      {/* Skip button */}
      <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipButtonText}>Add later</Text>
            </TouchableOpacity>
            </View>
      

      {/* Title */}
      <Text style={styles.title}>Metrics Details</Text>
      
      {/* List of Selected Metrics */}
      <FlatList
        data={selectedMetrics}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.medicationContainer}>
            <Text style={styles.medicationName}>{item}</Text>

            {/* Dosage Input */}
            <TextInput
              style={styles.input}
              placeholder="Metric name"
              placeholderTextColor="#BCBCBC"
              value={metricsDetails[item]?.dosage}
              onChangeText={(text) => handleInputChange(item, 'metrics', text)}
            />

            {/* Frequency + Reminder in One Row */}
      <View style={styles.frequencyReminderRow}>
        {/* Frequency Selection */}
        <View style={styles.frequencyContainer}>
          <Text style={styles.everyText}>Every</Text>
          <TextInput
            style={styles.frequencyInput}
            value={metricsDetails[item]?.frequency}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange(item, 'frequency', text)}
          />
          {/* Dropdown for Interval Selection */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => handleInputChange(item, 'interval', metricsDetails[item]?.interval === 'Days' ? 'Weeks' : 'Days')}
          >
            <Text>{metricsDetails[item]?.interval}</Text>
            <AntDesign name="down" size={14} />
          </TouchableOpacity>
        </View>

        {/* Reminder Toggle - Now in Line */}
        <TouchableOpacity style={styles.reminderContainer}>
          <Feather name="clock" size={16} color="#BCBCBC" />
          <Text style={styles.reminderText}>Set reminder</Text>
        </TouchableOpacity>

      </View>
      {/* Horizontal line separator */}
        <View style={styles.separator} />
    </View>
  )}
/>
</View>
      {/* Continue Button */}
        <Button theme="primary" label="Continue" onPress={handleContinue} />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flex:1,
  backgroundColor: '#161616'
  },
  progressBarContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#161616",
    },
  bodyContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 5,
      backgroundColor: "#161616",
    },
  backButton: {
    marginBottom: 0,
  },
    navContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Places buttons at opposite ends
      alignItems: 'center', // Ensures vertical alignment
      marginBottom: 20,
    },
  skipButtonText: {
    fontSize: 16,
    color: '#BCBCBC',
  },
  skipButton: {
    padding: 0
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: '#FFF',
    paddingRight: 50
  },
  medicationContainer: { 
    marginBottom: 20 },
  medicationName: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 5,
    color: "#FFF"},
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#303030",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#222222",
    marginBottom: 10,
    color: "#EAEAEA",
    fontWeight: "bold",
    fontSize: 16
  },
  frequencyReminderRow: {
    flexDirection: "row", // Aligns items horizontally
    justifyContent: "space-between", // Ensures even spacing
    alignItems: "center", // Keeps everything vertically centered
  },
  frequencyContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 10 },
  everyText: { 
    fontSize: 16, 
    marginRight: 8,
    color: "#fff" },
  frequencyInput: { 
    width: 40, 
    height: 40, 
    borderWidth: 1, 
    borderColor: "#303030", 
    backgroundColor: "#222222",
    borderRadius: 10, 
    textAlign: "center",
    color: "#fff" },
  dropdown: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 10, 
    borderWidth: 1, 
    borderColor: "#303030", 
    backgroundColor: "#222222",
    color: "#fff",
    borderRadius: 10, 
    marginLeft: 8 },

  reminderContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 10 },
  reminderText: { 
    marginLeft: 8, 
    fontSize: 14, 
    color: "#BCBCBC" },
  separator: {
    height: 1,
    backgroundColor: '#3A3A3A', // Dark gray color to match the UI
    width: '100%',
    marginVertical: 10,
    marginTop: 15 // Add some vertical spacing
  },
  });