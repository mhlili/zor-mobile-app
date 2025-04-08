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
    setOptionsVisible(false);
    onClose();
  };

  const incrementLevel = () => {
    const currentLevel = parseInt(level);
    if (!isNaN(currentLevel) && currentLevel < 24) {
      setLevel((currentLevel + 1).toString());
    }
  };

  const decrementLevel = () => {
    const currentLevel = parseInt(level);
    if (!isNaN(currentLevel) && currentLevel > 0) {
      setLevel((currentLevel - 1).toString());
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
              {/* Stress level */}
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Stress level</Text>
                <View style={styles.levelInputContainer}>
                  <Text style={styles.levelInput}>{level}</Text>
                  <View style={styles.levelControls}>
                    <TouchableOpacity
                      style={styles.controlButton}
                      onPress={decrementLevel}
                    >
                      <Minus width={20} height={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.controlButton, styles.plusButton]}
                      onPress={incrementLevel}
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
            onDelete={handleDeleteStress}
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
  levelInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#222222",
    borderRadius: 12,
    paddingLeft: 20,
    paddingRight: 8,
    paddingVertical: 12,
  },
  levelInput: {
    fontSize: 20,
    color: "#fff",
  },
  levelControls: {
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

export default StressEditScreen;
