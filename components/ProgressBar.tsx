import { View, Text, StyleSheet } from "react-native";

interface ProgressBarProps {
  value: number;
  max: number;
  labels: {
    left: string;
    right: string;
  };
}

export const ProgressBar = ({ value, max, labels }: ProgressBarProps) => {
  const percentage = (value / max) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>
      <View style={styles.progressLabels}>
        <Text style={styles.progressLabelLeft}>{labels.left}</Text>
        <Text style={styles.progressLabelRight}>{labels.right}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    width: "100%",
  },
  progressBar: {
    height: 16,
    backgroundColor: "#444",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#890fc1",
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  progressLabelLeft: {
    fontSize: 12,
    color: "#999",
  },
  progressLabelRight: {
    fontSize: 12,
    color: "#999",
  },
});
