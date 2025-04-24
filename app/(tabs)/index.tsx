import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Calendar } from "react-native-calendars";
import DayDetailModal from '@/app/dayDetailModal';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Take medication', completed: false },
    { id: 2, text: 'Pack meds in backpack', completed: false },
  ]);

  // Get current date
  const today = new Date().toISOString().split("T")[0];

  // Toggle task completion
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handle day press
  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }} />
        </View>

        {/* Seizure Counter */}
        <View style={styles.counterContainer}>
          <Text style={styles.counterNumber}>1</Text>
          <Text style={styles.counterText}>day since your last seizure</Text>
        </View>

        {/* Seizure Frequency */}
        <View style={styles.frequencyContainer}>
          <Text style={styles.frequencyText}>
            You tend to have a seizure every <Text style={styles.highlightText}>15 days</Text>
          </Text>
        </View>

        {/* Calendar Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Calendar</Text>

          <View style={styles.calendarContainer}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: { selected: true, marked: true, selectedColor: "#890fc1" },
                [today]: { selected: true, selectedColor: "#D1D1D1" },
              }}
              theme={{
                backgroundColor: '#161616',
                calendarBackground: '#1B1B1B',
                textSectionTitleColor: '#999',
                textSectionTitleDisabledColor: '#666',
                selectedDayBackgroundColor: '#890fc1',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#ffffff',
                todayBackgroundColor: '#3A3A3A',
                dayTextColor: '#ffffff',
                textDisabledColor: '#666',
                dotColor: '#999',
                selectedDotColor: '#494949',
                arrowColor: '#999',
                disabledArrowColor: '#666',
                monthTextColor: '#ffffff',
                indicatorColor: '#890fc1',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 14
              }}
              renderHeader={(date: any) => {
                return (
                  <View style={styles.monthHeader}>
                    <View style={styles.monthTextContainer}>
                      <Text style={styles.monthText}>{date.toString("MMMM")}</Text>
                    </View>
                    <TouchableOpacity style={styles.expandButton} onPress={() => router.push("/fullCalendar")}>
                      <Feather name="maximize-2" size={20} color="#999" />
                    </TouchableOpacity>
                  </View>
                );
              }}
              hideArrows
              hideExtraDays
              disableArrowLeft
              disableArrowRight
              firstDay={0}
            />
          </View>
        </View>

        {/* Tasks Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tasks</Text>

          <View style={styles.tasksContainer}>
            {tasks.map(task => (
              <View key={task.id} style={styles.taskRow}>
                <Text style={styles.taskText}>{task.text}</Text>
                <TouchableOpacity
                  onPress={() => toggleTask(task.id)}
                  style={styles.checkbox}
                >
                  {task.completed && <View style={styles.checkboxInner} />}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Day Detail Modal */}
      <DayDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        date={selectedDate}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  medicationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  counterNumber: {
    fontSize: 72,
    fontWeight: 'semibold',
    color: '#ffffff',
  },
  counterText: {
    fontSize: 18,
    color: '#BCBCBC',
    marginTop: -5,
  },
  frequencyContainer: {
    backgroundColor: '#1B1B1B',
    marginTop: 20,
    marginBottom: 15,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 20,
    borderWidth: 0.4,
    borderColor: '#676767',
    alignItems: 'center',
  },
  frequencyText: {
    fontSize: 15,
    color: '#676767',
  },
  highlightText: {
    color: '#676767',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  sectionContainer: {
    marginTop: 20,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: '#161616',
  },
  sectionTitle: {
    fontSize: 14,
    color: '#676767',
    marginBottom: 10,
  },
  calendarContainer: {
    backgroundColor: '#1B1B1B',
    borderRadius: 20,
    padding: 5,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  monthTextContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#fff',
  },
  expandButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasksContainer: {
    marginTop: 5,
    backgroundColor: '#161616',
  },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  taskText: {
    fontSize: 16,
    color: '#ffffff',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#666666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#666',
  },
});