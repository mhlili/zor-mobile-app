import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function EditMedicationScreen() {
  const router = useRouter();
  const { index } = useLocalSearchParams();
  const isEditing = typeof index !== 'undefined';

  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem('medications');
      const medications = stored ? JSON.parse(stored) : [];

      if (isEditing) {
        const i = parseInt(index as string, 10);
        const med = medications[i];
        if (med) {
          const split = (med.name ?? '').split(' ');
          setMedication(med.medication || '')
          setDosage(med.dosage || '');
          setFrequency(med.frequency || '');
        }
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    if (!medication.trim() || !dosage.trim() || !frequency.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const stored = await AsyncStorage.getItem('medications');
    const medications = stored ? JSON.parse(stored) : [];

    const newMedication = {
      id: isEditing
        ? medications[parseInt(index as string, 10)]?.id || Date.now().toString()
        : Date.now().toString(),
      medication: medication.trim(),
      dosage: dosage.trim(),
      frequency: frequency.trim(),
    };

    if (isEditing) {
      medications[parseInt(index as string, 10)] = newMedication;
    } else {
      medications.push(newMedication);
    }

    await AsyncStorage.setItem('medications', JSON.stringify(medications));
    Alert.alert('Saved', 'Medications saved!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Edit' : 'Add'} Caregiver</Text>

      <Text style={styles.label}>Medication *</Text>
      <TextInput style={styles.input} value={medication} onChangeText={setMedication} />

      <Text style={styles.label}>Dosage *</Text>
      <TextInput style={styles.input} value={dosage} onChangeText={setDosage} />

      <Text style={styles.label}>Frequency *</Text>
      <TextInput style={styles.input} value={frequency} onChangeText={setFrequency} />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 24,
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f2f2f2',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#ccc',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});
