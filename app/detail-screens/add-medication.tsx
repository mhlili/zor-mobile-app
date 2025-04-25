import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddMedicationScreen() {
  const [medication, setMedication] = useState({ name: '', dosage: '', frequency: '' });
  const router = useRouter();

  const handleSave = async () => {
    const storedMedications = await AsyncStorage.getItem('medications');
    const medications = storedMedications ? JSON.parse(storedMedications) : [];
    const newMedication = { ...medication, id: String(medications.length + 1) };
    medications.push(newMedication);
    await AsyncStorage.setItem('medications', JSON.stringify(medications));
    Alert.alert('Success', 'Medication added!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Medication</Text>
      <TextInput
        style={styles.input}
        value={medication.name}
        onChangeText={(text) => setMedication({ ...medication, name: text })}
        placeholder="Medication Name"
      />
      <TextInput
        style={styles.input}
        value={medication.dosage}
        onChangeText={(text) => setMedication({ ...medication, dosage: text })}
        placeholder="Dosage"
      />
      <TextInput
        style={styles.input}
        value={medication.frequency}
        onChangeText={(text) => setMedication({ ...medication, frequency: text })}
        placeholder="Frequency"
      />
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: 'white' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#f2f2f2',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
});
