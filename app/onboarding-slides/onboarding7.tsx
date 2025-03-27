import { View, Text, StyleSheet, ViewStyle, TextStyle, FlatList } from 'react-native';
import Button from '@/components/onboarding/nextbutton';
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // For back arrow
import ProgressBar from '@/components/onboarding/progress-bar'; 


export default function Onboarding7({ onNext}: { onNext: () => void }) { 
  const router = useRouter();
  const navigation = useNavigation();

  

    useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);



    const handleContinue = () => {
    router.push("/onboarding-slides/onboarding8");
  };

  const handleSkip = () => {
    router.push("/onboarding-slides/onboarding8");
  };
    

  return (
    <View style={styles.container}>
      <ProgressBar activeIndex={4} totalDots={7} />

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
      <Text style={styles.title}>Your Metrics</Text>
      
      <Text style={styles.subtitle}>
              Create a personalized metric to track alongside your seizure data. 
              (ex. sleep quality, bowel movements, something unique to your experience). 
              This custom data will appear on your charts, helping you identify patterns 
              and correlations that matter to you.
            </Text>

      

      <View style={styles.footerContainer}>
      <Button
      theme="primary" label="Begin"
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
  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginBottom: 20,
  },
  italicText: {
    fontStyle: "italic",
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
