import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Button from '@/components/onboarding/continueButton';
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // For back arrow
import ProgressBar from '@/components/onboarding/progress-bar'; 
import { ScreenStackHeaderConfig } from 'react-native-screens';
import { SafeAreaView } from "react-native-safe-area-context";


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
        router.push("/onboarding-slides/seizureTypeScreen"); // Navigate to the next registration step
      }
    };

    const handleSkip = () => {
    console.log("Skipped selection");
    router.push("/onboarding-slides/seizureTypeScreen"); // Navigate without selection
  };
    

  return (
    <SafeAreaView style={styles.baseContainer}>
      <View style={styles.progressBarContainer}>
      <ProgressBar activeIndex={2} totalDots={10} />
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
      <Text style={styles.title}>Sex assigned at birth?</Text>
      
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
  genderButton: {
    width: '100%',
    height: 50,
    padding: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedGenderButton: {
    backgroundColor: '#393939',
    borderColor: "#B9B9B9",
    borderWidth: 1,
  },
  genderButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10
  },
  skipButton: {
    padding: 0
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#FFF'
  }
});
