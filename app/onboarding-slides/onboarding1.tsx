import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Button from '@/components/onboarding/nextbutton';


interface SlideProps {
  //title: string;
  //text: string;
  //isLastSlide: boolean;
  onNext: () => void;
  }

export default function Onboarding1({ onNext}: { onNext: () => void }) {
  return (
    <View style={styles.slide}>
      <View style={styles.titleContainer}>
      <Text style={styles.title}>Account created!</Text>
      <Text style={styles.text}>Now, let's get you{"\n"}set up.</Text>
      </View>
      <View style={styles.footerContainer}>
      <Button theme="primary" label="Continue"
        onPress={onNext}
      />
      </View>
      
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
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginTop: -400
    
  },
  title: {
    fontSize: 27,
    marginVertical: 15,
    color: '#000000',
    textAlign: 'left',
    
  },
  text: {
    fontSize: 27,
    textAlign: 'left',
    color: '#A8A8A8',
  },
  footerContainer: {
    flex: 1 / 3,
    position:"absolute",
    bottom: 40,
    alignItems: 'center',
  }
});
