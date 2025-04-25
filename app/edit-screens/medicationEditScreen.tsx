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
import { MoreHorizontal } from "react-native-feather";
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
            <ScrollView style={styles.scrollView}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{formatDate(date)}</Text>
              </View>

              {/* Existing Medications */}
              {medications.map((med, index) => (
                <View key={med.id} style={styles.formContainer}>
                  <View style={styles.formRow}>
                    <View style={styles.formHeader}>
                      <Text style={styles.formTitle}>{med.name}</Text>
                      <TouchableOpacity
                        style={styles.optionsButton}
                        onPress={() => setOptionsVisible(true)}
                      >
                        <MoreHorizontal width={24} height={24} color="#fff" />
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.inputLabel}>Total dosage</Text>
                    <TextInput
                      style={styles.input}
                      value={med.dosage}
                      onChangeText={(text) =>
                        handleEditMedication(med.id, { dosage: text })
                      }
                      placeholder="Enter dosage"
                      placeholderTextColor="#666"
                    />

                    <Text style={styles.inputLabel}>Frequency</Text>
                    <View style={styles.frequencyContainer}>
                      <Text style={styles.frequencyValue}>
                        {med.frequency || "Value"}
                      </Text>
                      <Text style={styles.changeFrequency}>
                        Change frequency
                      </Text>
                    </View>

                    <Text style={styles.inputLabel}>Notes</Text>
                    <TextInput
                      style={[styles.input, styles.notesInput]}
                      value={med.notes}
                      onChangeText={(text) =>
                        handleEditMedication(med.id, { notes: text })
                      }
                      placeholder="Enter notes"
                      placeholderTextColor="#666"
                      multiline
                      textAlignVertical="top"
                    />

                    {index < medications.length - 1 && (
                      <View style={styles.divider} />
                    )}
                  </View>
                </View>
              ))}

              {/* Form to add a medication */}
              {showAddForm && (
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
              )}
              <View style={styles.scrollPadding} />
            </ScrollView>
            {!showAddForm && (
              <View style={styles.fixedButtonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setShowAddForm(true)}
                >
                  <Text style={styles.addButtonText}>Add medication</Text>
                </TouchableOpacity>
              </View>
            )}
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
    backgroundColor: "#222",
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
    color: "#fff",
  },
  cancelButton: {
    fontSize: 18,
    color: "#ff2f2f",
  },
  saveButton: {
    fontSize: 18,
    fontWeight: "500",
    color: "#890fc1",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#161616",
  },
  dateText: {
    fontSize: 16,
    color: "#676767",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#161616",
  },
  scrollPadding: {
    height: 100,
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
  frequencyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#222222",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  frequencyValue: {
    fontSize: 16,
    color: "#999",
  },
  changeFrequency: {
    fontSize: 16,
    color: "#999",
  },
  formContainer: {
    paddingHorizontal: 10,
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
    color: "#fff",
  },
  optionsButton: {
    padding: 8,
  },
  inputLabel: {
    fontSize: 16,
    color: "#676767",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#222",
    borderWidth: 1,
    borderColor: "#303030",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    color: "#fff",
  },
  notesInput: {
    height: 100,
    textAlignVertical: "top",
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginVertical: 16,
  },
  fixedButtonContainer: {
    position: "absolute",
    bottom: -35,
    left: 0,
    right: 0,
    backgroundColor: "#161616",
    paddingBottom: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  addButton: {
    backgroundColor: "#890fc1",
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: "#890fc1",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
  },
});

export default MedicationEditScreen;
