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
import SleepEditScreen, { SleepData } from "../edit-screens/sleepEditScreen";

interface SleepDetailProps {
  visible: boolean;
  onClose: () => void;
  date: string;
}

const SleepDetails = ({ visible, onClose, date }: SleepDetailProps) => {
  const [editMode, setEditMode] = useState(false);
  const [sleepData, setSleepData] = useState({
    hours: "8",
    notes: "Jack slept pretty well last night. He didn't wake me up",
  });

  const handleSaveEdit = (updatedData: SleepData) => {
    setSleepData(updatedData);
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
          <Text style={styles.headerTitle}>Sleep</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X width={24} height={24} color="#000" />
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
            <Text style={styles.largeNumber}>{sleepData.hours}</Text>
            <Text style={styles.subtitleText}>Hours</Text>
          </View>

          {/* Details section */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Details</Text>

            <View style={styles.detailCard}>
              {/* Hours */}
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Hours</Text>
                <Text style={styles.detailValue}>{sleepData.hours}</Text>
              </View>

              {/* Notes */}
              <View style={styles.notesContainer}>
                <Text style={styles.detailLabel}>Notes</Text>
                <Text style={styles.notesText}>{sleepData.notes}</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Edit Screen */}
        <SleepEditScreen
          visible={editMode}
          onClose={() => setEditMode(false)}
          date={date}
          sleepData={sleepData}
          onSave={handleSaveEdit}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  editText: {
    fontSize: 16,
    color: "#666",
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
    color: "#999",
  },
  scrollView: {
    flex: 1,
  },
  mainContent: {
    alignItems: "center",
    paddingVertical: 40,
  },
  largeNumber: {
    fontSize: 72,
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 18,
    color: "#ccc",
    marginTop: 4,
  },
  detailsSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 16,
  },
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    overflow: "hidden",
  },
  detailRow: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  detailLabel: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
  },
  notesContainer: {
    padding: 16,
  },
  notesText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default SleepDetails;
