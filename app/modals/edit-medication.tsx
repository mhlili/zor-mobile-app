import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditMedicationScreen() {
  const router = useRouter();
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');

  useEffect(() => {
    const load = async () => {
      const savedMedication = await AsyncStorage.getItem('medication');
      const savedDosage = await AsyncStorage.getItem('dosage');
      const savedFrequency = await AsyncStorage.getItem('frequency');
      if (savedMedication) setMedication(savedMedication);
      if (savedDosage) setDosage(savedDosage);
      if (savedFrequency) setFrequency(savedFrequency);
    };
    load();
  }, []);

  const handleSave = async () => {
    await AsyncStorage.setItem('medication', medication);
    await AsyncStorage.setItem('dosage', dosage);
    await AsyncStorage.setItem('frequency', frequency);
    Alert.alert('Saved', 'Medication updated!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Medication</Text>
      <TextInput
        style={styles.input}
        value={medication}
        onChangeText={setMedication}
        placeholder="Medication"
      />
      <TextInput
        style={styles.input}
        value={dosage}
        onChangeText={setDosage}
        placeholder="Dosage"
      />
      <TextInput
        style={styles.input}
        value={frequency}
        onChangeText={setFrequency}
        placeholder="Frequency"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, backgroundColor: 'white' },
  title: { fontWeight: 'bold', fontSize: 22, marginBottom: 24 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 12,
    padding: 12, fontSize: 16, backgroundColor: '#f2f2f2',
  },
  button: {
    marginTop: 30, backgroundColor: '#ccc',
    paddingVertical: 14, borderRadius: 10, alignItems: 'center',
  },
  buttonText: { fontWeight: 'bold', fontSize: 16 },
});
