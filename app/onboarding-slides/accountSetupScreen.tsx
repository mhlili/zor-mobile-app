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

export default function Onboarding1({ onNext}: { onNext: () => void }) {
  return (
    <SafeAreaView style={styles.baseContainer}>
    <View style={styles.slide}>
      <View style={styles.titleContainer}>
      <Text style={styles.title}>Account created!</Text>
      <Text style={styles.text}>Now, let's get you{"\n"}set up.</Text>
      </View>
      </View>
      <Button theme="primary" label="Get Started"
        onPress={onNext}
      />
      
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginTop: -450
    
  },
  title: {
    fontSize: 30,
    marginVertical: 20,
    color: '#FFF',
    textAlign: 'left',
    fontWeight: "bold"
    
  },
  text: {
    fontSize: 30,
    textAlign: 'left',
    color: '#BCBCBC',
  },
  footerContainer: {
    flex: 1 / 3,
    position:"absolute",
    bottom: 40,
    alignItems: 'center',
  }
});
