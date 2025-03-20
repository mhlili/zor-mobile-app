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
import { formatDate } from "@/utils/formatDate";

export interface StressData {
  level: string;
  notes: string;
}

interface StressEditScreenProps {
  visible: boolean;
  onClose: () => void;
  date: string;
  stressData?: StressData;
  onSave: (data: StressData) => void;
}

const StressEditScreen = ({
  visible,
  onClose,
  date,
  stressData,
  onSave,
}: StressEditScreenProps) => {
  const [level, setLevel] = useState(stressData?.level || "3");
  const [notes, setNotes] = useState(
    stressData?.notes ||
      "Jack seemed a little stressed in the morning but not after school.",
  );

  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleSave = () => {
    onSave({
      level,
      notes,
    });
    onClose();
  };

  const handleDeleteStress = () => {
    // Handle delete logic here
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
              <Text style={styles.headerTitle}>Stress</Text>
              <TouchableOpacity onPress={handleSave}>
                <Text style={styles.saveButton}>Save</Text>
              </TouchableOpacity>
            </View>

            {/* Date */}
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{formatDate(date)}</Text>
            </View>

            <ScrollView style={styles.scrollView}>
              {/* Main content */}
              <View style={styles.mainContent}>
                <Text style={styles.largeNumber}>{level}</Text>
                <Text style={styles.subtitleText}>Stressed</Text>
              </View>

              {/* Form */}
              <View style={styles.formContainer}>
                <View style={styles.formRow}>
                  <View style={styles.formHeader}>
                    <Text style={styles.formTitle}>Stress</Text>
                    <TouchableOpacity
                      style={styles.optionsButton}
                      onPress={() => setOptionsVisible(true)}
                    >
                      <MoreVertical width={24} height={24} color="#000" />
                    </TouchableOpacity>
                  </View>

                  {/* Level */}
                  <Text style={styles.inputLabel}>Level</Text>
                  <TextInput
                    style={styles.input}
                    value={level}
                    onChangeText={setLevel}
                    placeholder="Enter stress level (1-10)"
                    keyboardType="numeric"
                  />

                  {/* Notes */}
                  <Text style={styles.inputLabel}>Notes</Text>
                  <TextInput
                    style={[styles.input, styles.notesInput]}
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Enter notes"
                    multiline
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          {/* Options Menu */}
          <OptionsMenu
            visible={optionsVisible}
            onClose={() => setOptionsVisible(false)}
            onDelete={handleDeleteStress}
            itemType="stress record"
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
    fontSize: 72,
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 18,
    color: "#ccc",
    marginTop: 4,
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
});

export default StressEditScreen;
