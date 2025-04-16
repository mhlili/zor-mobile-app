import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EditNewPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleReset = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    // Simulate password reset success
    Alert.alert('Password reset', 'Your password has been updated.');
    router.push('/'); // Or navigate to login/home
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Create new password</Text>

      <Text style={styles.subtitle}>Password Requirements:</Text>
      <View style={styles.requirements}>
        <Text style={styles.bullet}>• Minimum of 12–16 characters.</Text>
        <Text style={styles.bullet}>• One uppercase letter (A–Z).</Text>
        <Text style={styles.bullet}>• One lowercase letter (a–z).</Text>
        <Text style={styles.bullet}>• One number (0–9).</Text>
        <Text style={styles.bullet}>• One special character (@#$%^&* etc.).</Text>
      </View>

      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  backButton: { marginBottom: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 6,
  },
  requirements: {
    marginBottom: 24,
  },
  bullet: {
    fontSize: 13,
    color: '#ccc',
    marginBottom: 4,
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#890FC1',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
