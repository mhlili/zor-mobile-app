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
import { Minus, Plus } from "react-native-feather";
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
    setOptionsVisible(false);
    onClose();
  };

  const incrementHours = () => {
    const currentHours = parseInt(hours);
    if (!isNaN(currentHours) && currentHours < 24) {
      setHours((currentHours + 1).toString());
    }
  };

  const decrementHours = () => {
    const currentHours = parseInt(hours);
    if (!isNaN(currentHours) && currentHours > 0) {
      setHours((currentHours - 1).toString());
    }
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
              {/* Hours of sleep */}
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Hours of sleep</Text>
                <View style={styles.hoursInputContainer}>
                  <Text style={styles.hoursInput}>{hours}</Text>
                  <View style={styles.hoursControls}>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={decrementHours}
                    >
                      <Minus width={20} height={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.controlButton, styles.plusButton]}
                      onPress={incrementHours}
                    >
                      <Plus width={20} height={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Notes */}
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Notes</Text>
                <TextInput
                  style={styles.notesInput}
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Enter notes"
                  placeholderTextColor="#666"
                  multiline
                  textAlignVertical="top"
                />
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
    fontWeight: "600",
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
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: "#161616",
  },
  dateText: {
    fontSize: 16,
    color: "#676767",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#161616",
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    color: "#676767",
    marginBottom: 8,
  },
  hoursInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#222222",
    borderRadius: 12,
    paddingLeft: 20,
    paddingRight: 8,
    paddingVertical: 12,
  },
  hoursInput: {
    fontSize: 20,
    color: "#fff",
  },
  hoursControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  plusButton: {
    backgroundColor: "#444444",
  },
  notesInput: {
    backgroundColor: "#222222",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#fff",
    minHeight: 100,
    textAlignVertical: "top",
  },
});

export default SleepEditScreen;
