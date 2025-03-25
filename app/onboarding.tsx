import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default function Onboarding({ onDone }: { onDone: () => void }) {
  return (
    <AppIntroSlider
      data={slides}
      renderItem={({ item }) => (
        <View style={styles.slide}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      )}
      onDone={onDone}
      showSkipButton
      onSkip={onDone}
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
