import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditCaregiverScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [type, setType] = useState('');



  useEffect(() => {
    const load = async () => {
      const caregiver = await AsyncStorage.getItem('caregiver');
      const split = (caregiver ?? '').split(' ');
      setFirstName(split[0] || '');
      setLastName(split[1] || '');
      const email = await AsyncStorage.getItem('emailAddress');
      if (email) setEmailAddress(email);
      const phone = await AsyncStorage.getItem('phoneNumber');
      if (phone) setPhoneNumber(phone);
      const type = await AsyncStorage.getItem('type');
      if (type) setType(type);
    };
    load();
  }, []);

  const handleSave = async () => {
    await AsyncStorage.setItem('caregiver', `${firstName} ${lastName}`);
    await AsyncStorage.setItem('emailAddress', emailAddress);
    await AsyncStorage.setItem('phoneNumber', phoneNumber);
    await AsyncStorage.setItem('type', type);
    Alert.alert('Saved', 'Caregiver updated!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Caregiver</Text>
      <Text style={styles.label}>First name</Text>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
      <Text style={styles.label}>Last name</Text>
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
      <Text style={styles.label}>Email Address</Text>
      <TextInput style={styles.input} value={emailAddress} onChangeText={setEmailAddress} />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} />
      <Text style={styles.label}>Caregiver Type</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} />
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
