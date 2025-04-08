import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Modal } from "react-native";
import { CalendarList } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export default function FullCalendarScreen() {
  const [selectedDate, setSelectedDate] = useState("");
  const [keyModalVisible, setKeyModalVisible] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  // Calculate dates for disabling future dates
  const disabledDates: {
    [key: string]: {
      disabled: boolean;
      disableTouchEvent: boolean;
      textColor: string;
    };
  } = {};
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 365); // Get dates for next year

  for (
    let d = new Date(currentDate);
    d <= futureDate;
    d.setDate(d.getDate() + 1)
  ) {
    const dateString = d.toISOString().split("T")[0];
    if (d > currentDate) {
      disabledDates[dateString] = {
        disabled: true,
        disableTouchEvent: true,
        textColor: "#CCCCCC",
      };
    }
  }

  // Calendar Key Modal component
  const CalendarKeyModal = () => (
    <Modal
      visible={keyModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setKeyModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Key</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setKeyModalVisible(false)}
            >
              <Feather name="x" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.keyItemContainer}>
            <View style={styles.purpleCircle}>
              <Text style={styles.circleText}>1</Text>
            </View>
            <Text style={styles.keyText}>Seizure logged</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.keyItemContainer}>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>1</Text>
              <View style={styles.surveyDot} />
            </View>
            <Text style={styles.keyText}>Daily survey completed</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.keyItemContainer}>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>1</Text>
              <View style={styles.medicationDot} />
            </View>
            <Text style={styles.keyText}>New medication logged</Text>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Calendar</Text>
        </View>
        <TouchableOpacity
          style={styles.infoButton}
          onPress={() => setKeyModalVisible(true)}
        >
          <Feather name="info" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <CalendarList
        onDayPress={(day: any) => setSelectedDate(day.dateString)}
        markedDates={{
          ...disabledDates,
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: "#D1D1D1",
          },
          [today]: { selected: true, selectedColor: "#D1D1D1" },
        }}
        theme={{
          backgroundColor: "#161616",
          calendarBackground: "#161616",
          textSectionTitleColor: "#999",
          textSectionTitleDisabledColor: "#666",
          selectedDayBackgroundColor: "#890fc1",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#ffffff",
          todayBackgroundColor: "#3A3A3A",
          dayTextColor: "#ffffff",
          textDisabledColor: "#666",
          dotColor: "#999",
          selectedDotColor: "#494949",
          monthTextColor: "#ffffff",
          indicatorColor: "#890fc1",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        pastScrollRange={12}
        futureScrollRange={2}
        scrollEnabled={true}
        showScrollIndicator={true}
        calendarHeight={336}
        horizontal={false}
      />
      <CalendarKeyModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1B1B",
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    position: "relative",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 15,
    zIndex: 1,
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 15,
    zIndex: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "#fff",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#161616",
    borderRadius: 16,
    overflow: "hidden",
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    position: "relative",
    backgroundColor: "#1B1B1B",
  },
  modalTitle: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  keyItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  purpleCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#890fc1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  circleText: {
    color: "#fff",
    fontSize: 18,
  },
  numberContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  numberText: {
    color: "#fff",
    fontSize: 18,
  },
  surveyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#494949",
    marginTop: 4,
  },
  medicationDot: {
    width: 4,
    height: 4,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginTop: 4,
  },
  keyText: {
    color: "#fff",
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
    marginHorizontal: 20,
  },
});
