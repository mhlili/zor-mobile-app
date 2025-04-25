import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditNameScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [preferredName, setPreferredName] = useState('');

  useEffect(() => {
    const load = async () => {
      const name = await AsyncStorage.getItem('name');
      const split = (name ?? '').split(' ');
      setFirstName(split[0] || '');
      setLastName(split[1] || '');
      const pref = await AsyncStorage.getItem('preferredName');
      if (pref) setPreferredName(pref);
    };
    load();
  }, []);

  const handleSave = async () => {
    await AsyncStorage.setItem('name', `${firstName} ${lastName}`);
    await AsyncStorage.setItem('preferredName', preferredName);
    Alert.alert('Saved', 'Name updated!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Name</Text>
      <Text style={styles.label}>First name</Text>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
      <Text style={styles.label}>Last name</Text>
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />
      <Text style={styles.label}>Preferred name</Text>
      <TextInput style={styles.input} value={preferredName} onChangeText={setPreferredName} />
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
