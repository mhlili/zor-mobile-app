import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Button from '@/components/onboarding/continueButton';
import React, { useState, useLayoutEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // For back arrow
import ProgressBar from '@/components/onboarding/progress-bar'; 
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from "react-native-safe-area-context";


export default function Onboarding3({ onNext}: { onNext: () => void }) { 
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(''); 
  const router = useRouter();
  const navigation = useNavigation();

  // Show date picker
    const showDatePicker = () => {
      setDatePickerVisible(true);
    };
    
    // Hide date picker
    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };

    // Handle date selection
    const handleConfirm = (date: Date) => {
      setDateOfBirth(date.toLocaleDateString()); // Format the date to the local string (e.g., MM/DD/YYYY)
      hideDatePicker();
    };
    useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const isFormValid = dateOfBirth; 

    const handleContinue = () => {
      if (isFormValid) {
        console.log("Date of birth:", dateOfBirth);
        router.push("/onboarding-slides/genderScreen"); // Navigate to the next registration step
      }
    };
    

  return (
    <SafeAreaView style={styles.baseContainer}>
      <View style={styles.progressBarContainer}>
      <ProgressBar activeIndex={1} totalDots={10} />
      </View>

      <View style={styles.bodyContainer}>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>

      {/* Title & Instructions */}
      <Text style={styles.title}>Date of birth</Text>
      
      <Text style={styles.inputHeadertext}>
        Date
      </Text>

      {/* Date Display */}
      <TextInput
        style={styles.input}
        placeholder="MM/DD/YYYY"
        placeholderTextColor="#BCBCBC"
        value={dateOfBirth}
        editable={true}  // Make the TextInput non-editable so the user picks a date using the calendar
        onFocus={showDatePicker}  // Trigger date picker on focus
      />

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()} // Prevent selecting a future date
      />
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#FFF',
    marginTop: 20
  },
  inputHeadertext: {
    fontSize: 12,
    color: "#676767",
    marginBottom: 8,
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 20,
  },
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
  smallText: {
    fontSize: 14,
    color: "#666",
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
