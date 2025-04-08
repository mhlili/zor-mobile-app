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
import MedicationEditScreen, {
  MedicationData,
} from "../edit-screens/medicationEditScreen";

interface MedicationDetailsProps {
  visible: boolean;
  onClose: () => void;
  date: string;
}

const MedicationDetails = ({
  visible,
  onClose,
  date,
}: MedicationDetailsProps) => {
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [medications, setMedications] = useState({
    medications: [
      {
        id: "1",
        name: "Tegretol",
        dosage: "1000mg",
        frequency: "Once a day",
        notes: "As usual. Jack took his Tegretol with breakfast.",
      },
      {
        id: "2",
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "As needed",
        notes:
          "Jack had a headache after lunch, so the nurse gave him some advil. His headache came back later in the day so I gave him another.",
      },
    ],
  });

  const handleSaveEdit = (updatedData: MedicationData) => {
    setMedications(updatedData);
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
          <Text style={styles.headerTitle}>Medication</Text>
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
          {/* Details section */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Details</Text>

            {/* First medication entry */}
            <View style={styles.detailCard}>
              {/* Medication Name */}
              <TouchableOpacity
                style={styles.dropdownRow}
                onPress={() => setExpanded1(!expanded1)}
              >
                <Text style={styles.dropdownText}>
                  {medications.medications[0].name}
                </Text>
                <ChevronDown
                  width={24}
                  height={24}
                  color="#fff"
                  style={[styles.chevron, expanded1 && styles.chevronExpanded]}
                />
              </TouchableOpacity>

              {expanded1 && (
                <>
                  {/* Dosage */}
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Total dosage</Text>
                    <Text style={styles.detailValue}>
                      {medications.medications[0].dosage}
                    </Text>
                  </View>

                  {/* Frequency */}
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Frequency</Text>
                    <Text style={styles.detailValue}>
                      {medications.medications[0].frequency}
                    </Text>
                  </View>

                  {/* Notes */}
                  <View style={styles.notesContainer}>
                    <Text style={styles.detailLabel}>Notes</Text>
                    <Text style={styles.notesText}>
                      {medications.medications[0].notes}
                    </Text>
                  </View>
                </>
              )}
            </View>

            {/* Second medication entry */}
            <View style={[styles.detailCard, { marginTop: 16 }]}>
              {/* Medication Name */}
              <TouchableOpacity
                style={styles.dropdownRow}
                onPress={() => setExpanded2(!expanded2)}
              >
                <Text style={styles.dropdownText}>
                  {medications.medications[1].name}
                </Text>
                <ChevronDown
                  width={24}
                  height={24}
                  color="#fff"
                  style={[styles.chevron, expanded2 && styles.chevronExpanded]}
                />
              </TouchableOpacity>

              {expanded2 && (
                <>
                  {/* Dosage */}
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Total dosage</Text>
                    <Text style={styles.detailValue}>
                      {medications.medications[1].dosage}
                    </Text>
                  </View>

                  {/* Frequency */}
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Frequency</Text>
                    <Text style={styles.detailValue}>
                      {medications.medications[1].frequency}
                    </Text>
                  </View>

                  {/* Notes */}
                  <View style={styles.notesContainer}>
                    <Text style={styles.detailLabel}>Notes</Text>
                    <Text style={styles.notesText}>
                      {medications.medications[1].notes}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Edit Screen */}
        <MedicationEditScreen
          visible={editMode}
          onClose={() => setEditMode(false)}
          date={date}
          medicationData={medications}
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
    paddingBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#676767",
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
  },
  detailsSection: {
    flex: 1,
    minHeight: "100%",
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
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

export default MedicationDetails;
