// components/ProgressBar.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  activeIndex: number; // This will determine how many dots to highlight
  totalDots: number;   // Total number of progress dots
}

const ProgressBar: React.FC<ProgressBarProps> = ({ activeIndex, totalDots }) => {
  return (
    <View style={styles.progressBarContainer}>
      {Array.from({ length: totalDots }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressDot,
            index <= activeIndex && styles.activeDot,  // Highlight up to the activeIndex
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    progressBarContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        },
        progressDot: {
        width: 32,
        height: 15,
        borderRadius: 15,
        backgroundColor: "#2A2A2A",
        },
        activeDot: {
        backgroundColor: "#890FC1",
        },
});

export default ProgressBar;
