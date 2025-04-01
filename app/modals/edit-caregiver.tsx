import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useSearchParams } from 'expo-router'; // Correct import for useSearchParams
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditCaregiverScreen() {
  const router = useRouter();
  const { caregiverId } = useSearchParams(); // Use this to access the caregiverId from the URL query params
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const loadCaregiver = async () => {
      const storedCaregivers = await AsyncStorage.getItem('caregivers');
      if (storedCaregivers) {
        const caregivers = JSON.parse(storedCaregivers);
        const caregiverToEdit = caregivers.find((cg: any) => cg.id === caregiverId); // Find caregiver by id

        if (caregiverToEdit) {
          setName(caregiverToEdit.name);
          setRole(caregiverToEdit.role);
        }
      }
    };

    if (caregiverId) {
      loadCaregiver();
    }
  }, [caregiverId]);

  const handleSave = async () => {
    const storedCaregivers = await AsyncStorage.getItem('caregivers');
    let caregivers = storedCaregivers ? JSON.parse(storedCaregivers) : [];

    if (caregiverId) {
      // Edit existing caregiver
      caregivers = caregivers.map((cg: any) =>
        cg.id === caregiverId ? { ...cg, name, role } : cg
      );
    } else {
      // Add new caregiver
      caregivers.push({ id: Date.now().toString(), name, role });
    }

    // Save updated caregivers list to AsyncStorage
    await AsyncStorage.setItem('caregivers', JSON.stringify(caregivers));
    Alert.alert('Saved', caregiverId ? 'Caregiver updated!' : 'New caregiver added!');
    router.back(); // Go back to profile screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{caregiverId ? 'Edit Caregiver' : 'Add Caregiver'}</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Caregiver Name"
      />
      <TextInput
        style={styles.input}
        value={role}
        onChangeText={setRole}
        placeholder="Caregiver Role"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{caregiverId ? 'Save Changes' : 'Add Caregiver'}</Text>
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
