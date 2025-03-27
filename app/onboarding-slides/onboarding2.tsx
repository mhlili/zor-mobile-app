import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // For back arrow
import Button from '@/components/onboarding/nextbutton';
import ProgressBar from '@/components/onboarding/progress-bar'; 


export default function Onboarding2({ onNext}: { onNext: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const router = useRouter();

  const isFormValid = firstName && lastName; // Enable button when required fields are filled

  const handleContinue = () => {
    if (isFormValid) {
      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);
      console.log("Preferred Name:", preferredName);
      router.push("/onboarding-slides/onboarding3"); // Navigate to the next registration step
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <ProgressBar activeIndex={0} totalDots={7} />

      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      {/* Title & Instructions */}
      <Text style={styles.title}>What’s your name?</Text>
      <Text style={styles.subtitle}>
        We recommend putting the name listed on your government I.D.{" "}
        <Text style={styles.italicText}>Only clinicians will see this.</Text>
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.smallText}>
        What name should we address you by? We’ll use this name if we email you.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Preferred name"
        value={preferredName}
        onChangeText={setPreferredName}
      />

      {/* Continue Button */}
      <View style={styles.footerContainer}>
      <Button
      theme="primary" label="Continue"
        //style={[styles.button, !isFormValid && styles.buttonDisabled]}
        
        //disabled={!isFormValid}
        onPress={handleContinue}
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
    bottom: 40,
    alignItems: 'center',
    paddingHorizontal: 25,
  }
});
