import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Button from '@/components/onboarding/nextbutton';
import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons"; // For back arrow


export default function Onboarding_fin({ onNext}: { onNext: () => void }) { 
  const router = useRouter();
  const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);


    const handleContinue = () => {
      router.push("/(tabs)"); // Navigate to the next registration step
      
    };
    

  return (
    <View style={styles.container}>

      
      {/* Back arrow button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>

      
      {/* Title & Instructions */}
      <Text style={styles.title}>All done!</Text>
      

      <View style={styles.footerContainer}>
      <Button
      theme="primary" label="Finish"
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
    marginTop: 20,
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
