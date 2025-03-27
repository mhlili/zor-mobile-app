import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Button from '@/components/onboarding/nextbutton';
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // For back arrow
import ProgressBar from '@/components/onboarding/progress-bar'; 
import { ScreenStackHeaderConfig } from 'react-native-screens';


export default function Onboarding4({ onNext}: { onNext: () => void }) { 
  const [selectedGender, setSelectedGender] = useState<string>(''); 
  const router = useRouter();
  const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const isFormValid = selectedGender !== ''; 

    const handleContinue = () => {
      if (isFormValid) {
        console.log("Selected Gender:", selectedGender);
        router.push("/onboarding-slides/onboarding5"); // Navigate to the next registration step
      }
    };

    const handleSkip = () => {
    console.log("Skipped selection");
    router.push("/onboarding-slides/onboarding5"); // Navigate without selection
  };
    

  return (
    <View style={styles.container}>
      <ProgressBar activeIndex={2} totalDots={7} />

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
      <Text style={styles.title}>Sex assigned at birth</Text>
      
      {/* Gender Buttons */}
      <View style={styles.buttonContainer}>
        {['Male', 'Female', 'Other'].map((gender) => (
          <TouchableOpacity
            key={gender}
            style={[
              styles.genderButton,
              selectedGender === gender && styles.selectedGenderButton
            ]}
            onPress={() => setSelectedGender(gender)}
          >
            <Text style={styles.genderButtonText}>{gender}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10
  },
  genderButton: {
    width: 340,
    height: 50,
    padding: 2,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGenderButton: {
    backgroundColor: '#CBCBCB', // You can change this to any color for selected state
  },
  genderButtonText: {
    fontSize: 16,
    color: '#585858',
  },
  backButton: {
    padding: 0
  },
  skipButton: {
    padding: 0
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
