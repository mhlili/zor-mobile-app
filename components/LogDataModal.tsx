import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

interface LogDataModalProps {
  visible: boolean;
  onClose: () => void;
}

const LogDataModal = ({ visible, onClose }: LogDataModalProps) => {
  const handleLogSeizure = () => {
    onClose();
    router.push("/log-data-screens/logSeizure");
  };

  const handleCompleteSurvey = () => {
    onClose();
    router.push("/log-data-screens/dailySurvey");
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Log data</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.seizureButton}
              onPress={handleLogSeizure}
              activeOpacity={0.8}
            >
              <Feather
                name="zap"
                size={24}
                color="#FFD700"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Log seizure</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.surveyButton}
              onPress={handleCompleteSurvey}
              activeOpacity={0.8}
            >
              <Feather
                name="sun"
                size={24}
                color="#FFD700"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Complete Daily Survey</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Pressable style={styles.backdrop} onPress={onClose} />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "60%",
    backgroundColor: "#161616",
    borderRadius: 20,
    padding: 20,
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    position: "relative",
  },
  headerTitle: {
    fontSize: 18,
    color: "#fff",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    padding: 4,
  },
  optionsContainer: {
    gap: 16,
  },
  seizureButton: {
    backgroundColor: "#890fc1",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  surveyButton: {
    borderWidth: 1,
    borderColor: "#3a3a3a",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonIcon: {
    marginRight: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default LogDataModal;
