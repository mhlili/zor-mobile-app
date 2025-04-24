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
import Button from '@/components/onboarding/continueButton';
import ProgressBar from '@/components/onboarding/progress-bar'; 
import { SafeAreaView } from "react-native-safe-area-context";



export default function Onboarding2({ onNext, onBack}: { onNext: () => void, onBack: () => void }) {
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
      router.push("/onboarding-slides/bdayScreen"); // Navigate to the next registration step
    }
  };

  return (
    <SafeAreaView style={styles.baseContainer}>
    <View style={styles.progressBarContainer}>
      {/* Progress Bar */}
      <ProgressBar activeIndex={0} totalDots={10} />
    </View>

    <View style={styles.bodyContainer}>
      {/* Back Button */}
      <TouchableOpacity onPress={(onBack)} style={styles.backButton}>
        <AntDesign name="arrowleft" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Title & Instructions */}
      <Text style={styles.title}>What’s your name?</Text>
      <Text style={styles.subtitle}>
        We recommend putting the name listed on your government I.D.{" "}
        <Text style={styles.italicText}>Only clinicians will see this.</Text>
      </Text>

      <Text style={styles.inputHeadertext}>
        First Name
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="First name"
        placeholderTextColor="#BCBCBC"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.inputHeadertext}>
        Last Name
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Last name"
        placeholderTextColor="#BCBCBC"
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.smallText}>
        What name should we address you by? We’ll use this name if we email you.
      </Text>

      <Text style={styles.inputHeadertext}>
        Preferred Name
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Optional"
        placeholderTextColor="#BCBCBC"
        value={preferredName}
        onChangeText={setPreferredName}
      />

      {/* Continue Button */}
      </View>
      <Button
      theme="primary" label="Continue"
        //style={[styles.button, !isFormValid && styles.buttonDisabled]}
        
        //disabled={!isFormValid}
        onPress={handleContinue}
        />
      
    
    </SafeAreaView>
  );
}

// 🎨 Styles
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
    marginTop: 30,
    color: "#FFF"
  },
  subtitle: {
    fontSize: 14,
    color: "#DDD",
    marginBottom: 25,
    fontWeight: "bold"
  },
  inputHeadertext: {
    fontSize: 12,
    color: "#676767",
    marginBottom: 8,
    fontWeight: "bold"
  },
  italicText: {
    fontStyle: "italic",
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
    color: "#DDD",
    marginBottom: 15,
    marginTop: 15,
    fontWeight: "bold"
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
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: 25,
  }
});
