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
import { formatDate } from "@/utils/formatDate";
import OptionsMenu from "./optionsMenu";

export interface SeizureData {
  time: string;
  duration: string;
  location: string;
  notes: string;
}

interface SeizureEditScreenProps {
  visible: boolean;
  onClose: () => void;
  date: string;
  seizureData?: SeizureData;
  onSave: (data: SeizureData) => void;
}

const SeizureEditScreen = ({
  visible,
  onClose,
  date,
  seizureData,
  onSave,
}: SeizureEditScreenProps) => {
  const [time, setTime] = useState(seizureData?.time || "");
  const [duration, setDuration] = useState(seizureData?.duration || "");
  const [location, setLocation] = useState(seizureData?.location || "");
  const [notes, setNotes] = useState(seizureData?.notes || "");
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleSave = () => {
    onSave({
      time,
      duration,
      location,
      notes,
    });
    onClose();
  };

  const handleDeleteSeizure = () => {
    // Implement delete logic
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
              <Text style={styles.headerTitle}>Seizures</Text>
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
                <Text style={styles.largeNumber}>1</Text>
                <Text style={styles.subtitleText}>Seizure</Text>
              </View>

              {/* Form */}
              <View style={styles.formContainer}>
                <View style={styles.formRow}>
                  <View style={styles.formHeader}>
                    <Text style={styles.formTitle}>Seizure</Text>
                    <TouchableOpacity
                      style={styles.optionsButton}
                      onPress={() => setOptionsVisible(true)}
                    >
                      <MoreHorizontal width={24} height={24} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  {/* Time */}
                  <Text style={styles.inputLabel}>Time</Text>
                  <TextInput
                    style={styles.input}
                    value={time}
                    onChangeText={setTime}
                    placeholder="Enter time"
                  />

                  {/* Duration */}
                  <Text style={styles.inputLabel}>Duration</Text>
                  <TextInput
                    style={styles.input}
                    value={duration}
                    onChangeText={setDuration}
                    placeholder="Enter duration"
                  />

                  {/* Location */}
                  <Text style={styles.inputLabel}>Location</Text>
                  <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Enter location"
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

                  {/* Add seizure button */}
                  <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add seizure</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          {/* Options Menu */}
          <OptionsMenu
            visible={optionsVisible}
            onClose={() => setOptionsVisible(false)}
            onDelete={handleDeleteSeizure}
            itemType="seizure"
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
    color: "#F36AFF",
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
  },
  scrollView: {
    flex: 1,
  },
  mainContent: {
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
  largeNumber: {
    fontSize: 54,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitleText: {
    fontSize: 18,
    color: "#cbcbcb",
    marginTop: 4,
  },
  formContainer: {
    paddingHorizontal: 20,
    backgroundColor: "#161616",
  },
  formRow: {
    marginBottom: 20,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
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
    fontSize: 13,
    color: "#676767",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#303030",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#222",
    color: "#fff",
  },
  notesInput: {
    height: 150,
    paddingTop: 16,
  },
  addButton: {
    backgroundColor: "#890fc1",
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 30,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
});

export default SeizureEditScreen;
