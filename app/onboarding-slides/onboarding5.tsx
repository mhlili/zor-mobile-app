import { View, Text, StyleSheet, ViewStyle, TextStyle, FlatList } from 'react-native';
import Button from '@/components/onboarding/nextbutton';
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // For back arrow
import ProgressBar from '@/components/onboarding/progress-bar'; 
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding5({ onNext}: { onNext: () => void }) { 
  const [searchText, setSearchText] = useState('');
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    Seizure: false,
    PainRelief: false,
    Antibiotics: false
  });
  const router = useRouter();
  const navigation = useNavigation();

  // **Medication Categories**
  const medicationCategories = {
    Seizure: ["Diazepam", "Valproic acid", "Carbamazepine", "Lamotrigine", "Lorazepam", "Midazolam"],
    PainRelief: ["Acetaminophen", "Aspirin", "Naproxen"],
    Antibiotics: ["Amoxicillin", "Azithromycin", "Cephalexin", "Ciprofloxacin", "Metronidazole"]
  };

  // **Toggle View All**
  const toggleExpand = (category: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // **Handle Medication Selection**
  const handleSelectMedication = (medication: string) => {
    setSelectedMedications(prev =>
      prev.includes(medication) ? prev.filter(med => med !== medication) : [medication, ...prev]
    );
  };

  // **Filtered List for Search**
  const filterMedications = (medications: string[]) => {
    return medications.filter(med => med.toLowerCase().includes(searchText.toLowerCase()));
  };

    useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);



    const handleContinue = async () => {
      await AsyncStorage.setItem("medications", JSON.stringify(selectedMedications));
      console.log("Selected Medications:", selectedMedications);
      router.push("/onboarding-slides/onboarding6");
  };

  const handleSkip = () => {
    console.log("Skipped selection");
    router.push("/onboarding-slides/onboarding6");
  };
    

  return (
    <View style={styles.container}>
      <ProgressBar activeIndex={3} totalDots={7} />

      <View style={styles.headerContainer}>
      {/* Back arrow button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
      
      {/* Skip button */}
      <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipButtonText}>Add later</Text>
            </TouchableOpacity>

      </View>
    
    
      {/* Title & Instructions */}
      <Text style={styles.title}>What medication do you take?</Text>
      
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Selected Medications at the Top */}
      <View style={styles.selectedContainer}>
        {selectedMedications.map((medication) => (
          <TouchableOpacity
            key={medication}
            style={styles.selectedMedicationButton}
            onPress={() => handleSelectMedication(medication)}
          >
            <AntDesign name="close" size={16} color="#fff" style={styles.closeIcon} />
            <Text style={styles.selectedMedicationButtonText}>{medication}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Medication Sections */}
      {Object.entries(medicationCategories).map(([category, medications]) => {
        const filteredMeds = filterMedications(medications);
        const isExpanded = expandedSections[category];

        return (
          <View key={category} style={styles.categoryContainer}>
            {/* Category Header */}
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{category} medication</Text>
              <TouchableOpacity onPress={() => toggleExpand(category)}>
                <Text style={styles.viewAllText}>{isExpanded ? "Hide" : "View all"} ▼</Text>
              </TouchableOpacity>
            </View>

            {/* Medication List */}
            <FlatList
              data={isExpanded ? filteredMeds : filteredMeds.slice(0, 3)}
              keyExtractor={(item) => item}
              numColumns={3}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.medicationButton,
                    selectedMedications.includes(item) && styles.selectedMedicationButton
                  ]}
                  onPress={() => handleSelectMedication(item)}
                >
                  <Text style={[
                    styles.medicationButtonText,
                    selectedMedications.includes(item) && styles.selectedMedicationButtonText]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        );
      })}

      <View style={styles.footerContainer}>
      <Button
      theme="primary" label="Continue"
        onPress={handleContinue}
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  selectedContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  selectedMedicationButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#BABABA', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, margin: 5 },
  selectedMedicationButtonText: { fontSize: 16, color: '#fff', marginLeft: 6 },
  categoryContainer: { marginBottom: 15 },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  categoryTitle: { fontSize: 16, fontWeight: '600', color: '#666' },
  viewAllText: { fontSize: 14, color: '#888' },
  medicationButton: { backgroundColor: '#F3F3F3', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 8, margin: 5 },
  medicationButtonText: { fontSize: 16, color: '#000' },
  closeIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 5, // Add space between text and 'X'
  },
  backButton: {
    padding: 0
  },
  skipButton: {
    padding: 0
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  footerContainer: {
    flex: 1 / 3,
    position:"absolute",
    bottom: 40,
    alignItems: 'center',
    paddingHorizontal: 25,
  }
});
