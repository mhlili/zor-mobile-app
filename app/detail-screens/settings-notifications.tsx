import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function SettingsNotificationsScreen() {
  const router = useRouter();
  const [medicationReminders, setMedicationReminders] = useState(false);
  const [surveyReminders, setSurveyReminders] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const med = await AsyncStorage.getItem('medicationReminders');
      const survey = await AsyncStorage.getItem('surveyReminders');
      setMedicationReminders(med === 'true');
      setSurveyReminders(survey === 'true');
    };
    loadSettings();
  }, []);

  const toggleMedication = async () => {
    const newValue = !medicationReminders;
    setMedicationReminders(newValue);
    await AsyncStorage.setItem('medicationReminders', newValue.toString());
  };

  const toggleSurvey = async () => {
    const newValue = !surveyReminders;
    setSurveyReminders(newValue);
    await AsyncStorage.setItem('surveyReminders', newValue.toString());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.sectionTitle}>Push notifications</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Medication reminders</Text>
        <Switch
          value={medicationReminders}
          onValueChange={toggleMedication}
          thumbColor={medicationReminders ? '#a855f7' : '#888'}
          trackColor={{ false: '#444', true: '#a855f7' }}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Reminders to complete daily survey</Text>
        <Switch
          value={surveyReminders}
          onValueChange={toggleSurvey}
          thumbColor={surveyReminders ? '#a855f7' : '#888'}
          trackColor={{ false: '#444', true: '#a855f7' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
});