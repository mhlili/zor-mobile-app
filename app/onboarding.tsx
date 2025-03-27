import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/onboarding/nextbutton';
import { useRouter } from 'expo-router';

import Slide1 from '@/app/onboarding-slides/welcome-slide';
import Onboarding1 from '@/app/onboarding-slides/onboarding1';
import Onboarding2 from '@/app/onboarding-slides/onboarding2';
import Onboarding3 from '@/app/onboarding-slides/onboarding3';
import Onboarding4 from '@/app/onboarding-slides/onboarding4';
import Onboarding5 from '@/app/onboarding-slides/onboarding5';
import Onboarding6 from '@/app/onboarding-slides/onboarding6';
import Onboarding7 from '@/app/onboarding-slides/onboarding7';
import Onboarding8 from '@/app/onboarding-slides/onboarding8';
import Onboarding9 from '@/app/onboarding-slides/onboarding9';
import Onboarding_fin from '@/app/onboarding-slides/onboarding-fin';



const renderSlide = (index: number, onNext: () => void) => {
    switch (index) {
      case 0:
        return <Slide1 onNext={onNext} />;
      case 1:
        return <Onboarding1 onNext={onNext} />;
      case 2:
        return <Onboarding2 onNext={onNext}/>;
      case 3:
        return <Onboarding3 onNext={onNext}/>;
      case 4:
        return <Onboarding4 onNext={onNext} />;
      case 5:
        return <Onboarding5 onNext={onNext} />;
      case 6:
        return <Onboarding6 onNext={onNext} />;
      case 7:
        return <Onboarding7 onNext={onNext} />;
      case 8:
        return <Onboarding8 onNext={onNext} />;
      case 9:
        return <Onboarding9 onNext={onNext} />;
      case 10:
        return <Onboarding_fin onNext={onNext} />;
      default:
        return null;
    }
  };

export default function Onboarding() {
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();

    const completeOnboarding = async () => {
      try {
        await AsyncStorage.setItem('@completedOnboarding', 'true');
        router.replace('/'); // Navigate to home screen
      } catch (error) {
        console.error('Error saving onboarding state:', error);
      }
    };

    const handleNextSlide = () => {
        if (activeIndex < 11) {
          setActiveIndex(activeIndex + 1); // Move to next slide
        } else {
          completeOnboarding(); // Finish onboarding if on last slide
        }
      };
    
    // This function will be called when a slide changes
    const onSlideChange = (index: number) => {
        setActiveIndex(index); // Update the active index
    };

    return (
        <View style={{ flex: 1 }}>
        {renderSlide(activeIndex, handleNextSlide)}
      </View>
    );
  }

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

