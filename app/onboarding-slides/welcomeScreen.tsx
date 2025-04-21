import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Button from '@/components/onboarding/continueButton';
import { SafeAreaView } from "react-native-safe-area-context";

interface SlideProps {
  //title: string;
  //text: string;
  //isLastSlide: boolean;
  onNext: () => void;
  }

export default function Slide1({ onNext}: { onNext: () => void }) {
  return (
    <SafeAreaView style={styles.baseContainer}>
    <View style={styles.slide}>
      <View style={styles.titleContainer}>
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.text}>ZOR!</Text>
      </View>
      </View>
      <View style={styles.footerContainer}>

      <Button theme="primary" label="Get Started"
        onPress={onNext}
      />
      </View>
      
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    flex:1,
    backgroundColor: '#161616'
    },
    slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#161616',
  },
  titleContainer: {
    marginTop: -400,
    marginRight: 180,
    
  },
  title: {
    fontSize: 30,
    marginVertical: 10,
    color: '#BCBCBC',
    textAlign: 'left',
    fontWeight: 'bold'
    
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#FFF'
  },
  footerContainer: {
    bottom: 30,
  }
});
