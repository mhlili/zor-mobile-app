import { formatDate } from "@/utils/formatDate";
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MoreVertical } from "react-native-feather";
import OptionsMenu from "./optionsMenu";

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  notes: string;
}

export interface MedicationData {
  medications: Medication[];
}

interface MedicationEditScreenProps {
  visible: boolean;
  onClose: () => void;
  date: string;
  medicationData?: MedicationData;
  onSave: (data: MedicationData) => void;
}

const MedicationEditScreen = ({
  visible,
  onClose,
  date,
  medicationData,
  onSave,
}: MedicationEditScreenProps) => {
  const [medications, setMedications] = useState<Medication[]>(
    medicationData?.medications || [],
  );
  const [currentMedication, setCurrentMedication] = useState<Medication>({
    id: Math.random().toString(),
    name: "",
    dosage: "",
    frequency: "",
    notes: "",
  });
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSave = () => {
    if (currentMedication.name) {
      setMedications([...medications, currentMedication]);
    }
    onSave({
      medications: [...medications, currentMedication].filter(
        (med) => med.name,
      ),
    });
    onClose();
  };

  const handleAddMedication = () => {
    if (currentMedication.name) {
      setMedications([...medications, currentMedication]);
      setCurrentMedication({
        id: Math.random().toString(),
        name: "",
        dosage: "",
        frequency: "",
        notes: "",
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteMedication = () => {
    // Implement delete logic
  };

  const handleEditMedication = (
    id: string,
    updatedMedication: Partial<Medication>,
  ) => {
    setMedications((prevMedications) =>
      prevMedications.map((med) =>
        med.id === id ? { ...med, ...updatedMedication } : med,
      ),
    );
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent={false}
        animationType="slide"
        onRequestClose={onClose}
      >
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
          >
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Medication</Text>
              <TouchableOpacity onPress={handleSave}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>

            {/* Date */}
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </View>

            <ScrollView style={styles.scrollView}>
              {/* Existing Medications */}
              {medications.map((med) => (
                <View key={med.id} style={styles.formContainer}>
                  <View style={styles.formRow}>
                    <View style={styles.formHeader}>
                      <Text style={styles.formTitle}>Medication</Text>
                      <TouchableOpacity
                        style={styles.optionsButton}
                        onPress={() => setOptionsVisible(true)}
                      >
                        <MoreVertical width={24} height={24} color="#000" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.medicationHeader}>
                      <TextInput
                        style={[styles.input, styles.medicationName]}
                        value={med.name}
                        onChangeText={(text) =>
                          handleEditMedication(med.id, { name: text })
                        }
                        placeholder="Enter medication name"
                      />
                    </View>
                    <TextInput
                      style={[styles.input, styles.medicationDosage]}
                      value={med.dosage}
                      onChangeText={(text) =>
                        handleEditMedication(med.id, { dosage: text })
                      }
                      placeholder="Enter dosage"
                    />
                    <TextInput
                      style={[styles.input, styles.medicationFrequency]}
                      value={med.frequency}
                      onChangeText={(text) =>
                        handleEditMedication(med.id, { frequency: text })
                      }
                      placeholder="Enter frequency"
                    />
                    <TextInput
                      style={[styles.input, styles.notesInput]}
                      value={med.notes}
                      onChangeText={(text) =>
                        handleEditMedication(med.id, { notes: text })
                      }
                      placeholder="Enter notes"
                      multiline
                      textAlignVertical="top"
                    />
                  </View>
                </View>
              ))}

              {/* Form to add a medication */}
              {showAddForm ? (
                <View style={styles.formContainer}>
                  <Text style={styles.inputLabel}>Name</Text>
                  <TextInput
                    style={styles.input}
                    value={currentMedication.name}
                    onChangeText={(text) =>
                      setCurrentMedication({ ...currentMedication, name: text })
                    }
                    placeholder="Enter medication name"
                  />

                  <Text style={styles.inputLabel}>Dosage</Text>
                  <TextInput
                    style={styles.input}
                    value={currentMedication.dosage}
                    onChangeText={(text) =>
                      setCurrentMedication({
                        ...currentMedication,
                        dosage: text,
                      })
                    }
                    placeholder="Enter dosage"
                  />

                  <Text style={styles.inputLabel}>Frequency</Text>
                  <TextInput
                    style={styles.input}
                    value={currentMedication.frequency}
                    onChangeText={(text) =>
                      setCurrentMedication({
                        ...currentMedication,
                        frequency: text,
                      })
                    }
                    placeholder="Enter frequency"
                  />

                  <Text style={styles.inputLabel}>Notes</Text>
                  <TextInput
                    style={[styles.input, styles.notesInput]}
                    value={currentMedication.notes}
                    onChangeText={(text) =>
                      setCurrentMedication({
                        ...currentMedication,
                        notes: text,
                      })
                    }
                    placeholder="Enter notes"
                    multiline
                    textAlignVertical="top"
                  />
                  <TouchableOpacity
                    style={[styles.addButton, styles.confirmButton]}
                    onPress={handleAddMedication}
                  >
                    <Text
                      style={[styles.addButtonText, styles.confirmButtonText]}
                    >
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setShowAddForm(true)}
                >
                  <Text style={styles.addButtonText}>Add medication</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </KeyboardAvoidingView>

          {/* Options Menu */}
          <OptionsMenu
            visible={optionsVisible}
            onClose={() => setOptionsVisible(false)}
            onDelete={handleDeleteMedication}
            itemType="medication"
          />
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
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
  cancelButton: {
    fontSize: 18,
    color: "#ff2f2f",
  },
  saveButton: {
    fontSize: 18,
    fontWeight: "500",
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
  yearText: {
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
    fontSize: 48,
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 18,
    color: "#ccc",
    marginTop: 4,
  },
  medicationCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 20,
  },
  medicationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: "600",
  },
  medicationDosage: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  medicationFrequency: {
    fontSize: 14,
    color: "#999",
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  formRow: {
    marginBottom: 20,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  optionsButton: {
    padding: 8,
  },
  inputLabel: {
    fontSize: 16,
    color: "#999",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  notesInput: {
    height: 150,
    paddingTop: 16,
  },
  addButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 30,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
  },
});

export default MedicationEditScreen;
