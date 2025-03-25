import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/onboarding/nextbutton';
import { useRouter } from 'expo-router';

const slides = [
  {
    key: '1',
    title: 'Welcome to ZOR!',
    text: 'Your personalized experience starts here.',
    //image: require('@/assets/onboarding1.png'), // Replace with your image path
  },
  {
    key: '2',
    title: 'Create an Account',
    text: 'Sign up or log in to continue.',
    //image: require('@/assets/onboarding2.png'),
  },
  {
    key: '3',
    title: 'Get Started',
    text: 'Swipe to start using the app!',
    //image: require('@/assets/onboarding3.png'),
  },
];

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
        if (activeIndex < slides.length - 1) {
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
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
            <Button
            label={activeIndex === slides.length - 1 ? "Get Started" : "Next"}
            theme={activeIndex === slides.length - 1 ? "primary" : undefined}
            onPress={handleNextSlide}
          />
          </View>
        )}
        
        onDone={completeOnboarding}
        showSkipButton
        onSkip={completeOnboarding}
      />
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

