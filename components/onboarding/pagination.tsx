import React from 'react';
import { View, StyleSheet } from 'react-native';

interface PaginationProps {
  slides: { id: string }[];
  currentIndex: number;
}

export default function Pagination({ slides, currentIndex }: PaginationProps) {
  return (
    <View style={styles.container}>
      {slides.map((_, index) => (
        <View key={index} style={[styles.dot, currentIndex === index ? styles.activeDot : null]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
});
