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
import Button from '@/components/onboarding/continueButton';
import ProgressBar from '@/components/onboarding/progress-bar'; 
import { SafeAreaView } from "react-native-safe-area-context";


export default function Onboarding10({ onNext}: { onNext: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setemailAddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [caregiverType, setcaregiverType] = useState("");
  const router = useRouter();
  const navigation = useNavigation();
  const [caregivers, setCaregivers] = useState<any[]>([]);


   useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
      }, [navigation]);
  


  const handleContinue = () => {
    console.log("Caregiver First Name:", firstName);
    console.log("Caregiver Last Name:", lastName);
    console.log("Caregiver Email:", emailAddress);
    console.log("Caregiver Phone Number:", phoneNumber);
    console.log("Caregiver Type:", caregiverType);
    router.push("/onboarding-slides/doneScreen"); // Navigate to the next registration step
    
  };

  const handleSkip = () => {
    router.push("/onboarding-slides/doneScreen");
  };

  const handleAddAnother = () => {
    const caregiverInfo = {
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      caregiverType,
    };
  
    // Store the caregiver info
    setCaregivers(prev => [...prev, caregiverInfo]);
  
    // Reset input fields
    setFirstName("");
    setLastName("");
    setemailAddress("");
    setphoneNumber("");
    setcaregiverType("");
  };
  

  return (
    <SafeAreaView style={styles.baseContainer}>
      <View style={styles.progressBarContainer}>
      <ProgressBar activeIndex={8} totalDots={10} />
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
      

      {/* Title */}
      <Text style={styles.title}>Caregiver Information</Text>

      {/* Input Fields */}
      <Text style={styles.inputHeadertext}>
              First Name
            </Text>
      <TextInput
        style={styles.input}
        placeholder="Caregiver first name"
        placeholderTextColor="#BCBCBC"
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.inputHeadertext}>
            Last Name
          </Text>
      <TextInput
        style={styles.input}
        placeholder="Caregiver last name"
        placeholderTextColor="#BCBCBC"
        value={lastName}
        onChangeText={setLastName}
      />
      
      <Text style={styles.inputHeadertext}>
            Email Address
          </Text>
      <TextInput
        style={styles.input}
        placeholder="Caregiver email address"
        placeholderTextColor="#BCBCBC"
        value={emailAddress}
        onChangeText={setemailAddress}
      />
      
      <Text style={styles.inputHeadertext}>
            Phone Number
          </Text>
      <TextInput
        style={styles.input}
        placeholder="Caregiver phone number"
        placeholderTextColor="#BCBCBC"
        value={phoneNumber}
        onChangeText={setphoneNumber}
      />

      <Text style={styles.inputHeadertext}>
          Caregiver Type
          </Text>
      <TextInput
        style={styles.input}
        placeholder="Caregiver type"
        placeholderTextColor="#BCBCBC"
        value={caregiverType}
        onChangeText={setcaregiverType}
      />

</View>

      {/* Continue Button */}
      <Button theme="secondary" label="Continue" onPress={handleContinue} />
      <TouchableOpacity onPress={handleAddAnother} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add another caregiver</Text>
      </TouchableOpacity>

    
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
  subtitle: {
    fontSize: 14,
    color: "#DDD",
    marginBottom: 25,
    fontWeight: "bold"
  },
  italicText: {
    fontStyle: "italic",
  },
  inputHeadertext: {
    fontSize: 12,
    color: "#676767",
    marginBottom: 8,
    fontWeight: "bold"
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
  
  addButton: {
    borderRadius: 15,
    width: "100%", // Fill the padded container
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  
});
