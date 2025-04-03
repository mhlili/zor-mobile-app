import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function EditCaregiverScreen() {
  const router = useRouter();
  const { index } = useLocalSearchParams();
  const isEditing = typeof index !== 'undefined';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem('caregivers');
      const caregivers = stored ? JSON.parse(stored) : [];

      if (isEditing) {
        const i = parseInt(index as string, 10);
        const cg = caregivers[i];
        if (cg) {
          const split = (cg.name ?? '').split(' ');
          setFirstName(split[0] || '');
          setLastName(split[1] || '');
          setEmailAddress(cg.emailAddress || '');
          setPhoneNumber(cg.phoneNumber || '');
          setRole(cg.role || '');
        }
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    const stored = await AsyncStorage.getItem('caregivers');
    const caregivers = stored ? JSON.parse(stored) : [];

    const newCaregiver = {
      name: `${firstName} ${lastName}`,
      emailAddress,
      phoneNumber,
      role,
    };

    if (isEditing) {
      caregivers[parseInt(index as string, 10)] = newCaregiver;
    } else {
      caregivers.push(newCaregiver);
    }

    await AsyncStorage.setItem('caregivers', JSON.stringify(caregivers));
    Alert.alert('Saved', 'Caregiver saved!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Edit' : 'Add'} Caregiver</Text>
      <Text style={styles.label}>First name</Text>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
      <Text style={styles.label}>Last name</Text>
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
      <Text style={styles.label}>Email Address</Text>
      <TextInput style={styles.input} value={emailAddress} onChangeText={setEmailAddress} />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} />
      <Text style={styles.label}>Caregiver Type</Text>
      <TextInput style={styles.input} value={role} onChangeText={setRole} />
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
  },
});
