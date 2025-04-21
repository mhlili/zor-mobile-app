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


export default function Onboarding11({ onNext}: { onNext: () => void }) { 
  const router = useRouter();
  const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);


    const handleContinue = () => {
      router.push("/(tabs)"); // Navigate to the next registration step
      
    };
    

  return (
    <SafeAreaView style={styles.baseContainer}>
      <View style={styles.progressBarContainer}>
      <ProgressBar activeIndex={9} totalDots={10} />
      </View>
    <View style={styles.bodyContainer}>

    <View style={styles.navContainer}>

      
      {/* Title & Instructions */}
      <Text style={styles.title}>All done!</Text>
      </View>
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
      paddingTop: 30,
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: '#FFF',
    paddingRight: 50
  }
  
});
