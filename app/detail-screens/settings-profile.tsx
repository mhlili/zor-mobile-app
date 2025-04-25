import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const storedName = await AsyncStorage.getItem('name');
      const storedEmail = await AsyncStorage.getItem('email');

      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
    };
    loadData();
  }, []);

  // Save to AsyncStorage on every change
  const updateName = async (value: string) => {
    setName(value);
    await AsyncStorage.setItem('name', value);
  };

  const updateEmail = async (value: string) => {
    setEmail(value);
    await AsyncStorage.setItem('email', value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Profile</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Enter your name"
          placeholderTextColor="#888"
          onChangeText={updateName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          onChangeText={updateEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => router.push('/edit-screens/edit-reset-password')}
        >
          <Text style={styles.resetText}>Reset password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  backButton: { marginBottom: 16 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#888',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    fontSize: 16,
    padding: 14,
    borderRadius: 10,
  },
  resetButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resetText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
