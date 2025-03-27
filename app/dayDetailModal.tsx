import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { X } from "react-native-feather";
import SeizuresDetails from "./detail-screens/seizureDetails";
import MedicationDetails from "./detail-screens/medicationDetails";
import AppetiteDetails from "./detail-screens/appetiteDetails";
import SleepDetails from "./detail-screens/sleepDetails";
import StressDetails from "./detail-screens/stressDetails";
import { formatDate } from "@/utils/formatDate";
import { Feather } from "@expo/vector-icons";

interface DayDetailProps {
  visible: boolean;
  onClose: () => void;
  date: string;
}

// Progress bar component
interface ProgressBarProps {
  value: number;
  max: number;
  labels: {
    left: string;
    right: string;
  };
}

const DayDetailModal = ({ visible, onClose, date }: DayDetailProps) => {
  const [seizuresDetailVisible, setSeizuresDetailVisible] = useState(false);
  const [medicationDetailVisible, setMedicationDetailVisible] = useState(false);
  const [sleepDetailVisible, setSleepDetailVisible] = useState(false);
  const [stressDetailVisible, setStressDetailVisible] = useState(false);
  const [appetiteDetailVisible, setAppetiteDetailVisible] = useState(false);

  // Sample medication data
  const medications = [
    { name: "Ibuprofen", dosage: "1500mg", total: "500 mg", taken: true },
    { name: "Tegretol", dosage: "1000mg", ratio: "0/1", taken: false },
  ];

  const ProgressBar = ({ value, max, labels }: ProgressBarProps) => {
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

  // Handle card taps
  const handleSeizuresTap = () => {
    setSeizuresDetailVisible(true);
  };

  const handleMedicationTap = () => {
    setMedicationDetailVisible(true);
  };

  const handleSleepTap = () => {
    setSleepDetailVisible(true);
  };

  const handleStressTap = () => {
    setStressDetailVisible(true);
  };

  const handleAppetiteTap = () => {
    setAppetiteDetailVisible(true);
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerText}>{formatDate(date)}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X width={24} height={24} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView>
              <View style={styles.content}>
                {/* Seizures Card */}
                <Text style={styles.sectionTitle}>Seizures</Text>
                <TouchableOpacity
                  style={styles.seizureCard}
                  activeOpacity={0.7}
                  onPress={handleSeizuresTap}
                >
                  <Text style={styles.seizureCount}>1</Text>
                  <TouchableOpacity
                    style={styles.expandButton}
                    onPress={handleSeizuresTap}
                  >
                    <Feather name="maximize-2" size={20} color="#999" />
                  </TouchableOpacity>
                </TouchableOpacity>

                {/* Medication Section */}
                <Text style={styles.sectionTitle}>Medication</Text>
                <View style={styles.medicationCard}>
                  {medications.map((med, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.medicationItem,
                        index < medications.length - 1 &&
                          styles.medicationItemBorder,
                      ]}
                      onPress={handleMedicationTap}
                    >
                      <View style={styles.medicationLeft}>
                        <Text style={styles.medicationName}>{med.name}</Text>
                        <Text style={styles.medicationDosage}>
                          {med.dosage}
                        </Text>
                      </View>
                      <Text style={styles.medicationStatus}>
                        {med.total || med.ratio}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Metrics Section */}
                <Text style={styles.sectionTitle}>Your metrics</Text>

                {/* Sleep Card */}
                <TouchableOpacity
                  style={styles.metricCard}
                  activeOpacity={0.7}
                  onPress={handleSleepTap}
                >
                  <Text style={styles.metricTitle}>Sleep</Text>
                  <Text style={styles.metricValue}>8</Text>
                  <ProgressBar
                    value={8}
                    max={12}
                    labels={{ left: "1 hour", right: "12+ hours" }}
                  />
                </TouchableOpacity>

                {/* Stress Card */}
                <TouchableOpacity
                  style={styles.metricCard}
                  activeOpacity={0.7}
                  onPress={handleStressTap}
                >
                  <Text style={styles.metricTitle}>Stress</Text>
                  <Text style={styles.metricValue}>3</Text>
                  <ProgressBar
                    value={3}
                    max={10}
                    labels={{ left: "Not stressed", right: "Very stressed" }}
                  />
                </TouchableOpacity>

                {/* Appetite Card */}
                <TouchableOpacity
                  style={styles.metricCard}
                  activeOpacity={0.7}
                  onPress={handleAppetiteTap}
                >
                  <Text style={styles.metricTitle}>Appetite</Text>
                  <Text style={styles.metricValue}>5</Text>
                  <ProgressBar
                    value={5}
                    max={10}
                    labels={{ left: "Not hungry", right: "Very hungry" }}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Detail Screens */}
        <SeizuresDetails
          visible={seizuresDetailVisible}
          onClose={() => setSeizuresDetailVisible(false)}
          date={date}
        />

        <MedicationDetails
          visible={medicationDetailVisible}
          onClose={() => setMedicationDetailVisible(false)}
          date={date}
        />

        <SleepDetails
          visible={sleepDetailVisible}
          onClose={() => setSleepDetailVisible(false)}
          date={date}
        />

        <StressDetails
          visible={stressDetailVisible}
          onClose={() => setStressDetailVisible(false)}
          date={date}
        />

        <AppetiteDetails
          visible={appetiteDetailVisible}
          onClose={() => setAppetiteDetailVisible(false)}
          date={date}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    overflow: "hidden",
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    position: "relative",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
    marginBottom: 8,
  },
  seizureCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 120,
  },
  seizureCount: {
    fontSize: 72,
    fontWeight: "bold",
  },
  expandButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 8,
  },
  medicationCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  medicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  medicationItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  medicationLeft: {
    flex: 1,
  },
  medicationContent: {
    marginTop: 16,
  },
  medicationName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  medicationDosage: {
    fontSize: 20,
    color: "#ccc",
    marginTop: 4,
  },
  medicationStatus: {
    fontSize: 16,
    color: "#999",
  },
  metricCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  metricTitle: {
    fontSize: 16,
    color: "#999",
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
  },
  progressWrapper: {
    flex: 1,
    marginLeft: 16,
  },
  progressContainer: {
    width: "100%",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#b0b0b0",
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

export default DayDetailModal;
