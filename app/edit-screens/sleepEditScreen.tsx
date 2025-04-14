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

export interface SleepData {
  hours: string;
  notes: string;
}

interface SleepEditScreenProps {
  visible: boolean;
  onClose: () => void;
  date: string;
  sleepData?: SleepData;
  onSave: (data: SleepData) => void;
}

const SleepEditScreen = ({
  visible,
  onClose,
  date,
  sleepData,
  onSave,
}: SleepEditScreenProps) => {
  const [hours, setHours] = useState(sleepData?.hours || "8");
  const [notes, setNotes] = useState(
    sleepData?.notes ||
      "Jack slept pretty well last night. He didn't wake me up",
  );

  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleSave = () => {
    onSave({
      hours,
      notes,
    });
    onClose();
  };

  const handleDeleteSleep = () => {
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
              <Text style={styles.headerTitle}>Sleep</Text>
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
                <Text style={styles.largeNumber}>{hours}</Text>
                <Text style={styles.subtitleText}>Hours</Text>
              </View>

              {/* Form */}
              <View style={styles.formContainer}>
                <View style={styles.formRow}>
                  <View style={styles.formHeader}>
                    <Text style={styles.formTitle}>Sleep</Text>
                    <TouchableOpacity
                      style={styles.optionsButton}
                      onPress={() => setOptionsVisible(true)}
                    >
                      <MoreVertical width={24} height={24} color="#000" />
                    </TouchableOpacity>
                  </View>

                  {/* Hours */}
                  <Text style={styles.inputLabel}>Hours</Text>
                  <TextInput
                    style={styles.input}
                    value={hours}
                    onChangeText={setHours}
                    placeholder="Enter hours"
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
            onDelete={handleDeleteSleep}
            itemType="sleep record"
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

export default SleepEditScreen;
