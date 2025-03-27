import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // For back arrow
import Button from '@/components/onboarding/nextbutton';
import ProgressBar from '@/components/onboarding/progress-bar'; 


export default function Onboarding9({ onNext}: { onNext: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [caregiverType, setcaregiverType] = useState("");
  const router = useRouter();
  const navigation = useNavigation();

   useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
      }, [navigation]);
  


  const handleContinue = () => {
    console.log("Caregiver First Name:", firstName);
    console.log("Caregiver Last Name:", lastName);
    console.log("Caregiver Email:", emailAddress);
    console.log("Caregiver Phone Number:", phoneNumber);
    console.log("Caregiver Type:", caregiverType);
    router.push("/onboarding-slides/onboarding-fin"); // Navigate to the next registration step
    
  };

  const handleSkip = () => {
    router.push("/onboarding-slides/onboarding-fin");
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <ProgressBar activeIndex={7} totalDots={7} />

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
      <Text style={styles.title}>Caregiver Information</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Caregiver first name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Caregiver last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Caregiver email address"
        value={emailAddress}
        onChangeText={setemailAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Caregiver phone number"
        value={phoneNumber}
        onChangeText={setphoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Caregiver type"
        value={caregiverType}
        onChangeText={setcaregiverType}
      />

      
      {/* Continue Button */}
      <View style={styles.footerContainer}>
      <Button
      theme="primary" label="Add Another Caregiver"
        onPress={handleSkip}
        />
      <Button
      theme="primary" label="Continue"
        onPress={handleSkip}
        />
      </View>
      
    </View>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 0
  },
  skipButton: {
    padding: 0
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
  italicText: {
    fontStyle: "italic",
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
  buttonDisabled: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  footerContainer: {
    flex: 1 / 3,
    position:"absolute",
    bottom: 30,
    alignItems: 'center',
    paddingHorizontal: 25,
  }
});
