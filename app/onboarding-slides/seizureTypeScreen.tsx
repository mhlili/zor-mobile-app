import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Button from '@/components/onboarding/continueButton';
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign, Feather } from "@expo/vector-icons"; // Icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressBar from '@/components/onboarding/progress-bar'; 
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from 'react-native-dropdown-picker';


export default function Onboarding5({ onNext}: { onNext: () => void }) { 
  const router = useRouter();
  const navigation = useNavigation();

  // Dropdown open states
  const [seizureTypeOpen, setSeizureTypeOpen] = useState(false);
  const [intervalOpen, setIntervalOpen] = useState(false);
  
  // Dropdown values
  const [seizureType, setSeizureType] = useState('');
  const [frequency, setFrequency] = useState('1');
  const [interval, setInterval] = useState('Days');
  
  // Dropdown items
  const [seizureTypeItems, setSeizureTypeItems] = useState([
    {label: 'Tonic-Clonic', value: 'tonic-clonic'},
    {label: 'Absence', value: 'absence'},
    {label: 'Myoclonic', value: 'myoclonic'},
    {label: 'Focal', value: 'focal'},
  ]);
  
  const [intervalItems, setIntervalItems] = useState([
    {label: 'Days', value: 'Days'},
    {label: 'Weeks', value: 'Weeks'},
    {label: 'Months', value: 'Months'},
    {label: 'Years', value: 'Years'}
  ]);

  const durationOptions = [
    '0–15 seconds',
    '15–30 seconds',
    '30–60 seconds',
    '1–5 minutes',
    'More than 5 minutes',
    "I'm not sure"
  ];
  
  const [selectedDuration, setSelectedDuration] = useState('');



  const handleContinue = () => {
    console.log("Seizure Type:", seizureType);
    console.log("Frequency:", frequency, 'every', interval)
    console.log("Duration of seizure:", selectedDuration);
    router.push("/onboarding-slides/medicationLogScreen");
  };

  useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
      }, [navigation]);

  

  return (
    <SafeAreaView style={styles.baseContainer}>
      <View style={styles.progressBarContainer}>
      <ProgressBar activeIndex={3} totalDots={10} />

      </View>
    <View style={styles.bodyContainer}>
      
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        
      

      {/* Title */}
      <Text style={styles.title}>Typical Seizure Type</Text>
      <Text style={styles.subtitle}>
              To personalize your experience, please provide details about your seizures.
            </Text>
      
      

      {/* List of Seizure Types */}
      <Text style={styles.inputHeadertext}>
        Seizure Type
      </Text>

      {/*d\ Seizure dropdown*/}
      <View style={{zIndex: 3000, marginBottom: 15}}>
          <DropDownPicker
            open={seizureTypeOpen}
            value={seizureType}
            items={seizureTypeItems}
            setOpen={setSeizureTypeOpen}
            setValue={setSeizureType}
            setItems={setSeizureTypeItems}
            placeholder="Select"
            placeholderStyle={{color: '#FFF'}}
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

      <Text style={styles.inputHeadertext}>
        How often do your seizures usually last?
      </Text>

      {/* Seizure Interval Radio Buttons */}
      <FlatList
  data={durationOptions}
  keyExtractor={(item) => item}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={[
        styles.radioOption,
        selectedDuration === item && styles.radioOptionSelected,
      ]}
      onPress={() => setSelectedDuration(item)}
    >
      <Text style={styles.radioLabel}>{item}</Text>
      <View style={styles.radioCircle}>
        {selectedDuration === item && <View style={styles.radioDot} />}
      </View>
    </TouchableOpacity>
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
  skipButtonText: {
    fontSize: 16,
    color: '#585858',
    textDecorationLine: 'underline',
  },
  inputHeadertext: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 8,
    fontWeight: "bold"
  },
  everyLabel: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold"
  },
  skipButton: {
    padding: 0
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    color: '#FFF',
    marginTop: 20
  },
  subtitle: {
    fontSize: 14,
    color: "#DDD",
    marginBottom: 40,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#303030',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#222222',
    height: 45,
  },
  picker: {
    color: '#FFF',
    height: 50,
  },
  radioOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#303030',
    backgroundColor: '#222222',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  radioOptionSelected: {
    borderColor: '#EAEAEA',
    backgroundColor: '#303030',
  },
  radioLabel: {
    color: '#EAEAEA',
    fontSize: 16,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#818181',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#EAEAEA'
  },
  
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
  },
  
  intervalDropdownContainer: {
    flex: 1,
    borderWidth: 1,
    height: 45,
    borderColor: '#303030',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#222222',
    justifyContent: 'center'
  },
  
  intervalPicker: {
    color: '#EAEAEA',
    height: 45,
    width: '100%',
  },
  

  frequencyReminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    gap: 10,
    width: 220
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
    borderWidth: 1,
  },
  
});
