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
import { ProgressBar } from "@/components/ProgressBar";

interface DayDetailProps {
  visible: boolean;
  onClose: () => void;
  date: string;
}

type DetailScreen = "seizures" | "medication" | "sleep" | "stress" | "appetite";

const DayDetailModal = ({ visible, onClose, date }: DayDetailProps) => {
  const [activeDetail, setActiveDetail] = useState<DetailScreen | null>(null);

  // Sample medication data
  const medications = [
    {
      name: "Tegretol",
      dosage: "1000mg",
      frequency: "Once a day",
      status: "1/1",
    },
    {
      name: "Ibuprofen",
      dosage: "200mg",
      frequency: "As needed",
      status: "2",
    },
  ];

  // Handle card taps
  const handleDetailTap = (screen: DetailScreen) => {
    setActiveDetail(screen);
  };

  const handleCloseDetail = () => {
    setActiveDetail(null);
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
                <X width={24} height={24} color="#fff" />
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
                  onPress={() => handleDetailTap("seizures")}
                >
                  <Text style={styles.seizureCount}>1</Text>
                  <TouchableOpacity
                    style={styles.expandButton}
                    onPress={() => handleDetailTap("seizures")}
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
                      onPress={() => handleDetailTap("medication")}
                    >
                      <View style={styles.medicationLeft}>
                        <Text style={styles.medicationName}>{med.name}</Text>
                        <Text style={styles.medicationDosage}>
                          {med.dosage} • {med.frequency}
                        </Text>
                      </View>
                      <Text style={styles.medicationStatus}>{med.status}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Metrics Section */}
                <Text style={styles.sectionTitle}>Your metrics</Text>

                {/* Sleep Card */}
                <TouchableOpacity
                  style={styles.metricCard}
                  activeOpacity={0.7}
                  onPress={() => handleDetailTap("sleep")}
                >
                  <Text style={styles.metricTitle}>Sleep</Text>
                  <View style={styles.metricRow}>
                    <Text style={styles.metricValue}>8</Text>
                    <View style={styles.progressWrapper}>
                      <ProgressBar
                        value={8}
                        max={12}
                        labels={{ left: "1 hour", right: "12+ hours" }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Stress Card */}
                <TouchableOpacity
                  style={styles.metricCard}
                  activeOpacity={0.7}
                  onPress={() => handleDetailTap("stress")}
                >
                  <Text style={styles.metricTitle}>Stress</Text>
                  <View style={styles.metricRow}>
                    <Text style={styles.metricValue}>3</Text>
                    <View style={styles.progressWrapper}>
                      <ProgressBar
                        value={3}
                        max={5}
                        labels={{
                          left: "Not stressed",
                          right: "Very stressed",
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Appetite Card */}
                <TouchableOpacity
                  style={styles.metricCard}
                  activeOpacity={0.7}
                  onPress={() => handleDetailTap("appetite")}
                >
                  <Text style={styles.metricTitle}>Appetite</Text>
                  <View style={styles.metricRow}>
                    <Text style={styles.metricValue}>5</Text>
                    <View style={styles.progressWrapper}>
                      <ProgressBar
                        value={5}
                        max={5}
                        labels={{ left: "Not hungry", right: "Very hungry" }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Detail Screens */}
        <SeizuresDetails
          visible={activeDetail === "seizures"}
          onClose={handleCloseDetail}
          date={date}
        />

        <MedicationDetails
          visible={activeDetail === "medication"}
          onClose={handleCloseDetail}
          date={date}
        />

        <SleepDetails
          visible={activeDetail === "sleep"}
          onClose={handleCloseDetail}
          date={date}
        />

        <StressDetails
          visible={activeDetail === "stress"}
          onClose={handleCloseDetail}
          date={date}
        />

        <AppetiteDetails
          visible={activeDetail === "appetite"}
          onClose={handleCloseDetail}
          date={date}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#161616",
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
    position: "relative",
    backgroundColor: "#222",
  },
  headerText: {
    fontSize: 18,
    color: "#fff",
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
    color: "#676767",
    marginTop: 16,
    marginBottom: 16,
  },
  seizureCard: {
    backgroundColor: "#222",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 140,
  },
  seizureCount: {
    fontSize: 54,
    fontWeight: "bold",
    color: "#fff",
  },
  expandButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#333",
    borderRadius: 20,
    padding: 8,
  },
  medicationCard: {
    backgroundColor: "#222",
    borderRadius: 16,
    marginBottom: 16,
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
    borderBottomColor: "#333",
  },
  medicationLeft: {
    flex: 1,
  },
  medicationName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  medicationDosage: {
    fontSize: 15,
    color: "#CBCBCB",
    marginTop: 4,
  },
  medicationStatus: {
    fontSize: 16,
    color: "#fff",
  },
  metricCard: {
    backgroundColor: "#222",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  metricTitle: {
    fontSize: 14,
    color: "#676767",
    marginBottom: 8,
  },
  metricRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  metricValue: {
    fontSize: 28,
    color: "#fff",
    width: 50,
    textAlign: "center",
  },
  progressWrapper: {
    flex: 1,
  },
});

export default DayDetailModal;
