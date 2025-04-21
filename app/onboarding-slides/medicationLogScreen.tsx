import { View, Text, StyleSheet, ViewStyle, TextStyle, FlatList } from 'react-native';
import Button from '@/components/onboarding/continueButton';
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // For back arrow
import ProgressBar from '@/components/onboarding/progress-bar'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Onboarding6({ onNext}: { onNext: () => void }) { 
  const [searchText, setSearchText] = useState('');
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    "Seizure": false,
    "Pain relief": false,  // Changed from PainRelief to "Pain relief"
    "Antibiotics": false
  });
  const router = useRouter();
  const navigation = useNavigation();

  // **Medication Categories**
  const medicationCategories = {
    "Seizure medication": ["Diazepam", "Valproic acid", "Carbamazepine", "Lamotrigine", "Lorazepam", "Midazolam", "Levetiracetam", "Lacoamide"],
    "Pain relief medication": ["Acetaminophen", "Aspirin", "Naproxen"],
    "Antibiotics": ["Amoxicillin", "Azithromycin", "Cephalexin", "Ciprofloxacin", "Metronidazole"]
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
    return medications
    .filter(med => med.toLowerCase().includes(searchText.toLowerCase()))
    .filter(med => !selectedMedications.includes(med)); // This line excludes selected medications
  };

    useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);



    const handleContinue = async () => {
      await AsyncStorage.setItem("medications", JSON.stringify(selectedMedications));
      console.log("Selected Medications:", selectedMedications);
      router.push("/onboarding-slides/medicationDetailsScreen");
  };

  const handleSkip = () => {
    console.log("Skipped selection");
    router.push("/onboarding-slides/medicationDetailsScreen");
  };
    

  return (
    <SafeAreaView style={styles.baseContainer}>
      <View style={styles.progressBarContainer}>
      <ProgressBar activeIndex={4} totalDots={10} />
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
    
    
      {/* Title & Instructions */}
      <Text style={styles.title}>What medication do you take?</Text>
      
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
      <AntDesign name="search1" size={20} color="#BCBCBC" style={styles.searchIcon} />
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#BCBCBC"
        value={searchText}
        onChangeText={setSearchText}
        
      />

      </View>
      

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

      {/* Horizontal line separator */}
  <View style={styles.separator} />

      {/* Medication Sections */}
      {Object.entries(medicationCategories).map(([category, medications]) => {
        const filteredMeds = filterMedications(medications);
        const isExpanded = expandedSections[category];

        return (
          <View key={category} style={styles.categoryContainer}>
            {/* Category Header */}
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <TouchableOpacity onPress={() => toggleExpand(category)}>
                <Text style={styles.viewAllText}>{isExpanded ? "Hide " : "View all "} 
                  <AntDesign name="down" size={12}/>
                </Text>
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
      </View>
      
      <Button
      theme="primary" label="Continue"
        onPress={handleContinue}
        />
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
  searchBar: {
    flex: 1,
    color: "#EAEAEA",
    fontWeight: "bold",
    fontSize: 16,
    height: '100%'
  },
  selectedContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap' },
  selectedMedicationButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#C080DE', 
    borderRadius: 10, 
    paddingHorizontal: 8,
    paddingVertical: 8, 
    margin: 5
   },
  selectedMedicationButtonText: { 
    fontSize: 14, 
    color: '#fff', 
    marginLeft: 6 },
  categoryContainer: { marginBottom: 15 },
  categoryHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 5 },
  categoryTitle: {
    fontSize: 13,
    color: "#BCBCBC",
  },
  viewAllText: { 
    fontSize: 13, 
    color: '#BCBCBC' },
  medicationButton: { 
    backgroundColor: '#3A3A3A', 
    borderRadius: 10, 
    paddingHorizontal: 10, 
    paddingVertical: 8, 
    margin: 4,
  marginLeft: 1 },
  medicationButtonText: { 
    fontSize: 14, 
    color: '#fff' },
  closeIcon: {
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 1, // Add space between text and 'X'
  },
  skipButton: {
    padding: 0
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#FFF'
  },
  separator: {
    height: 1,
    backgroundColor: '#3A3A3A', // Dark gray color to match the UI
    width: '100%',
    marginVertical: 10, // Add some vertical spacing
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#303030',
    borderRadius: 10,
    backgroundColor: '#222222',
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
});