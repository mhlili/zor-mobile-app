import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Button from '@/components/onboarding/continueButton';
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressBar from '@/components/onboarding/progress-bar'; 
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from 'react-native-dropdown-picker';

export default function Onboarding9({ onNext }: { onNext: () => void }) { 
  const router = useRouter();
  const navigation = useNavigation();

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [metricsDetails, setMetricsDetails] = useState<{ [key: string]: { dosage: string, frequency: string, interval: string } }>({});
  const [dropdownStates, setDropdownStates] = useState<{ [key: string]: boolean }>({});

  // Dropdown values
  const [intervalOpen, setIntervalOpen] = useState(false);
  const [frequency, setFrequency] = useState('1');
  const [interval, setInterval] = useState('Days');

  // Dropdown items
  const [intervalItems, setIntervalItems] = useState([
      {label: 'Days', value: 'Days'},
      {label: 'Weeks', value: 'Weeks'},
      {label: 'Months', value: 'Months'},
      {label: 'Years', value: 'Years'}
    ]);


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

  useEffect(() => {
    setMetricsDetails(
      selectedMetrics.reduce((acc, med) => ({
        ...acc, [med]: { dosage: '', frequency: '1', interval: 'Days' }
      }), {})
    );
    setDropdownStates(
      selectedMetrics.reduce((acc, med) => ({
        ...acc, [med]: false
      }), {})
    );
  }, [selectedMetrics]);

  const handleDropdownOpen = (med: string) => {
    const updatedStates = Object.fromEntries(
      Object.keys(dropdownStates).map(key => [key, false])
    );
    setDropdownStates({ ...updatedStates, [med]: true });
  };

  const handleInputChange = (med: string, field: string, value: string) => {
    setMetricsDetails(prev => ({
      ...prev, [med]: { ...prev[med], [field]: value }
    }));
  };
  const handleSetValue = (med: string, callback: (currVal: string) => string) => {
    const newVal = callback(metricsDetails[med]?.interval);
    handleInputChange(med, 'interval', newVal);
    setDropdownStates(prev => ({ ...prev, [med]: false }));
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleContinue = () => {
    console.log("Metrics Details:", metricsDetails);
    console.log("Frequency:", frequency, 'every', interval)
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
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Add later</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Metrics Details</Text>

        <FlatList
          data={selectedMetrics}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.medicationContainer}>
              <Text style={styles.medicationName}>{item}</Text>
              <TextInput
                style={styles.input}
                placeholder="Metric name"
                placeholderTextColor="#BCBCBC"
                value={metricsDetails[item]?.dosage}
                onChangeText={(text) => handleInputChange(item, 'metrics', text)}
              />

              {/* Frequency (count & times) in One Row */}
  <View style={styles.frequencyReminderRow}>

<Text style={styles.everyLabel}>Every</Text>


 {/* Numeric Input */}
 <TextInput
   style={styles.frequencyInput}
   value={frequency}
   onChangeText={setFrequency}
   keyboardType="numeric"
   placeholder="1"
   placeholderTextColor="#EAEAEA"
 />

       {/* Interval Dropdown */}
       <View style={{flex: 1, zIndex: 2000}}>
           <DropDownPicker
             open={intervalOpen}
             value={interval}
             items={intervalItems}
             setOpen={setIntervalOpen}
             setValue={setInterval}
             setItems={setIntervalItems}
             style={styles.dropdownStyle}
             textStyle={styles.dropdownTextStyle}
             dropDownContainerStyle={styles.dropDownContainerStyle}
             selectedItemContainerStyle={{
               backgroundColor: '#818181'
             }}
             ArrowDownIconComponent={({style}) => (
               <AntDesign name="down" size={16} color="#BCBCBC" />
             )}
             ArrowUpIconComponent={({style}) => (
               <AntDesign name="up" size={16} color="#BCBCBC" />
             )}
           />
         </View>
     </View>
              <TouchableOpacity style={styles.reminderContainer}>
                <Feather name="clock" size={16} color="#BCBCBC" />
                <Text style={styles.reminderText}>Set reminder</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
            </View>
          )}
        />
      </View>
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
  everyLabel: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold"
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    gap: 10,
    width: 220
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
    minWidth: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#303030',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#FFF',
    backgroundColor: '#222222',
    fontSize: 16,
    textAlign: 'center',
  alignSelf: 'flex-start'
  },
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
  dropdownStyle: {
    backgroundColor: '#222222',
    borderColor: '#303030',
    borderRadius: 10,
    height: 45,
    borderWidth: 1,
  },
  dropdownTextStyle: {
    color: '#EAEAEA',
    fontSize: 16,
  },
  dropDownContainerStyle: {
    backgroundColor: '#222222',
    borderColor: '#303030',
    borderRadius: 10,
    borderWidth: 1}
  });