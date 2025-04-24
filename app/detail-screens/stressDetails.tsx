import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { X } from "react-native-feather";
import { formatDate } from "../../utils/formatDate";
import StressEditScreen, { StressData } from "../edit-screens/stressEditScreen";
import { ProgressBar } from "@/components/ProgressBar";

interface StressDetailProps {
  visible: boolean;
  onClose: () => void;
  date: string;
}

const StressDetails = ({ visible, onClose, date }: StressDetailProps) => {
  const [editMode, setEditMode] = useState(false);
  const [stressData, setStressData] = useState({
    level: "3",
    notes: "Jack seemed a little stressed in the morning but not after school.",
  });

  const handleSaveEdit = (updatedData: StressData) => {
    setStressData(updatedData);
    setEditMode(false);
  };

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText} onPress={() => setEditMode(true)}>
              Edit
            </Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Stress</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X width={24} height={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Date */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollView}>
          {/* Main content */}
          <View style={styles.mainContent}>
            <Text style={styles.largeNumber}>{stressData.level}</Text>
            <Text style={styles.subtitleText}>Stressed</Text>
            <View style={styles.progressContainer}>
              <ProgressBar
                value={parseInt(stressData.level)}
                max={5}
                labels={{
                  left: "Not stressed",
                  right: "Very stressed",
                }}
              />
            </View>
          </View>

          {/* Details section */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Details</Text>

            <View style={styles.detailCard}>
              {/* Level */}
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Level</Text>
                <Text style={styles.detailValue}>{stressData.level}</Text>
              </View>

              {/* Notes */}
              <View style={styles.notesContainer}>
                <Text style={styles.detailLabel}>Notes</Text>
                <Text style={styles.notesText}>{stressData.notes}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Edit Screen */}
        <StressEditScreen
          visible={editMode}
          onClose={() => setEditMode(false)}
          date={date}
          stressData={stressData}
          onSave={handleSaveEdit}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#222",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: {
    fontSize: 18,
    color: "#fff",
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  editText: {
    fontSize: 16,
    color: "#B1B1B1",
  },
  closeButton: {
    padding: 4,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: "#676767",
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
  },
  mainContent: {
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
    backgroundColor: "#222",
  },
  largeNumber: {
    fontSize: 54,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitleText: {
    fontSize: 18,
    color: "#ccc",
  },
  progressContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  detailsSection: {
    flex: 1,
    minHeight: "100%",
    paddingHorizontal: 20,
    paddingTop: 25,
    backgroundColor: "#161616",
  },
  sectionTitle: {
    fontSize: 16,
    color: "#676767",
    marginBottom: 16,
  },
  detailCard: {
    backgroundColor: "#222",
    borderRadius: 16,
    overflow: "hidden",
  },
  chevron: {
    transform: [{ rotate: "0deg" }],
  },
  chevronExpanded: {
    transform: [{ rotate: "180deg" }],
  },
  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  detailRow: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  detailLabel: {
    fontSize: 14,
    color: "#676767",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: "#EAEAEA",
  },
  notesContainer: {
    padding: 16,
  },
  notesText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#EAEAEA",
  },
});

export default StressDetails;
