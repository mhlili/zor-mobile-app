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
import { X, ChevronDown } from "react-native-feather";
import { formatDate } from "../../utils/formatDate";
import SeizureEditScreen, {
  SeizureData,
} from "../edit-screens/seizureEditScreen";

interface SeizureDetailsProps {
  visible: boolean;
  onClose: () => void;
  date: string;
}

const SeizuresDetails = ({ visible, onClose, date }: SeizureDetailsProps) => {
  const [expanded, setExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [seizureData, setSeizureData] = useState({
    time: "3:00 P.M.",
    duration: "12m 18s",
    location: "John F. Kennedy Middle School",
    notes:
      "Jack began seizing shortly before lunch period. It lasted for around 12 minutes and when it ended, he was too disoriented to go to the cafeteria so we kept him with us in the nurses office and waited for his energy to come back.",
  });

  const handleSaveEdit = (updatedData: SeizureData) => {
    setSeizureData(updatedData);
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
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditMode(true)}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Seizures</Text>
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
            <Text style={styles.largeNumber}>1</Text>
            <Text style={styles.subtitleText}>Seizure</Text>
          </View>

          {/* Details section */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Details</Text>

            <View style={styles.detailCard}>
              {/* Seizure */}
              <TouchableOpacity
                style={styles.dropdownRow}
                onPress={() => setExpanded(!expanded)}
              >
                <Text style={styles.dropdownText}>Seizure</Text>
                <ChevronDown
                  width={24}
                  height={24}
                  color="#000"
                  style={[styles.chevron, expanded && styles.chevronExpanded]}
                />
              </TouchableOpacity>

              {expanded && (
                <>
                  {/* Time */}
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Time</Text>
                    <Text style={styles.detailValue}>{seizureData.time}</Text>
                  </View>

                  {/* Duration */}
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Duration</Text>
                    <Text style={styles.detailValue}>
                      {seizureData.duration}
                    </Text>
                  </View>

                  {/* Location */}
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Location</Text>
                    <Text style={styles.detailValue}>
                      {seizureData.location}
                    </Text>
                  </View>

                  {/* Notes */}
                  <View style={styles.notesContainer}>
                    <Text style={styles.detailLabel}>Notes</Text>
                    <Text style={styles.notesText}>{seizureData.notes}</Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Edit Screen */}
        <SeizureEditScreen
          visible={editMode}
          onClose={() => setEditMode(false)}
          date={date}
          seizureData={seizureData}
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
    borderBottomColor: "#eee",
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "500",
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

export default SeizuresDetails;
