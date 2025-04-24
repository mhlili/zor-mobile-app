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


export default function Onboarding8({ onNext}: { onNext: () => void }) { 
  const [searchText, setSearchText] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    "Metrics": false
  });
  const router = useRouter();
  const navigation = useNavigation();

  // **Metric Categories**
  const metricCategories = {
    "Metrics": ["Appetite", "Sleep", "Stress", "Blood pressure", "Stool", "Hydration", "Exercise", "Menstrual Cycle"],
   };

  // **Toggle View All**
  const toggleExpand = (category: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // **Handle Metrics Selection**
  const handleSelectMetrics = (metric: string) => {
    setSelectedMetrics(prev =>
      prev.includes(metric) ? prev.filter(med => med !== metric) : [metric, ...prev]
    );
  };

  // **Filtered List for Search**
  const filterMetrics = (metrics: string[]) => {
    return metrics
    .filter(med => med.toLowerCase().includes(searchText.toLowerCase()))
    .filter(med => !selectedMetrics.includes(med)); // This line excludes selected metrics
  };

    useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);



    const handleContinue = async () => {
      await AsyncStorage.setItem("metrics", JSON.stringify(selectedMetrics));
      console.log("Selected Metrics:", selectedMetrics);
      router.push("/onboarding-slides/metricsDetailsScreen");
  };

  const handleSkip = () => {
    console.log("Skipped selection");
    router.push("/onboarding-slides/metricsDetailsScreen");
  };
    

  return (
    <SafeAreaView style={styles.baseContainer}>
      <View style={styles.progressBarContainer}>
      <ProgressBar activeIndex={6} totalDots={10} />
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
      <Text style={styles.title}>What metrics would you like to track?</Text>
      
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
      

      {/* Selected Metrics at the Top */}
      <View style={styles.selectedContainer}>
        {selectedMetrics.map((metric) => (
          <TouchableOpacity
            key={metric}
            style={styles.selectedMetricsButton}
            onPress={() => handleSelectMetrics(metric)}
          >
            <AntDesign name="close" size={16} color="#fff" style={styles.closeIcon} />
            <Text style={styles.selectedMetricsButtonText}>{metric}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Horizontal line separator */}
  <View style={styles.separator} />

      {/* Metrics Sections */}
      {Object.entries(metricCategories).map(([category, metrics]) => {
        const filteredMeds = filterMetrics(metrics);
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

            {/* Metrics List */}
            <FlatList
              data={isExpanded ? filteredMeds : filteredMeds.slice(0, 6)}
              keyExtractor={(item) => item}
              numColumns={4}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.metricsButton,
                    selectedMetrics.includes(item) && styles.selectedMetricsButton
                  ]}
                  onPress={() => handleSelectMetrics(item)}
                >
                  <Text style={[
                    styles.metricsButtonText,
                    selectedMetrics.includes(item) && styles.selectedMetricsButtonText]}
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
  selectedMetricsButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#C080DE', 
    borderRadius: 10, 
    paddingHorizontal: 8,
    paddingVertical: 8, 
    margin: 5
   },
  selectedMetricsButtonText: { 
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
  metricsButton: { 
    backgroundColor: '#3A3A3A', 
    borderRadius: 10, 
    paddingHorizontal: 10, 
    paddingVertical: 8, 
    margin: 4,
  marginLeft: 1 },
  metricsButtonText: { 
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
    color: '#FFF',
    paddingRight: 50
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