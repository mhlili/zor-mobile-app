import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Button from '@/components/onboarding/nextbutton';
import React, { useState, useLayoutEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // For back arrow
import ProgressBar from '@/components/onboarding/progress-bar'; 
import DateTimePickerModal from 'react-native-modal-datetime-picker';


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
        router.push("/onboarding-slides/onboarding4"); // Navigate to the next registration step
      }
    };
    

  return (
    <View style={styles.container}>
      <ProgressBar activeIndex={1} totalDots={7} />

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>

      {/* Title & Instructions */}
      <Text style={styles.title}>Date of birth</Text>
      
      {/* Date Display */}
      <TextInput
        style={styles.input}
        placeholder="Select Date of Birth"
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
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F5F5F5",
    marginBottom: 15,
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
