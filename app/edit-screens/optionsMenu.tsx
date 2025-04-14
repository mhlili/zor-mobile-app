import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Trash2, X } from "react-native-feather";

interface OptionsMenuProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  itemType: string;
}

const OptionsMenu = ({
  visible,
  onClose,
  onDelete,
  itemType,
}: OptionsMenuProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Options</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X width={24} height={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Options */}
          <TouchableOpacity style={styles.optionRow} onPress={onDelete}>
            <Trash2 width={24} height={24} color="#ff2f2f" />
            <Text style={styles.deleteText}>Delete {itemType}</Text>
          </TouchableOpacity>

          <View style={styles.divider} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    position: "relative",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  deleteText: {
    fontSize: 16,
    color: "#ff2f2f",
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginTop: 8,
  },
});

export default OptionsMenu;
