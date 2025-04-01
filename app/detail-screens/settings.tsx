import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function SettingsScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const storedName = await AsyncStorage.getItem('name');
        const storedSex = await AsyncStorage.getItem('sex');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPhone = await AsyncStorage.getItem('phone');
        const storedPassword = await AsyncStorage.getItem('password');

        if (storedName) setName(storedName);
        if (storedSex) setSex(storedSex);
        if (storedEmail) setEmail(storedEmail);
        if (storedPhone) setPhone(storedPhone);
        if (storedPassword) setPassword(storedPassword);
      };
      loadData();
    }, []) // Ensures the data is reloaded when settings screen is focused
  );

  const handleSave = async () => {
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('sex', sex);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('phone', phone);
    await AsyncStorage.setItem('password', password);
    alert('Settings Saved!');
    router.back(); // Navigate back after saving
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal</Text>

        {/* Name Field */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>Name</Text>
          <TouchableOpacity onPress={() => router.push('/modals/edit-name')}>
            <View style={styles.editableRow}>
              <Text style={styles.input}>{name || 'Not set'}</Text>
              <Ionicons name="pencil" size={16} color="gray" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Sex Field */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>Sex</Text>
          <TouchableOpacity onPress={() => router.push('/modals/edit-sex')}>
            <View style={styles.editableRow}>
              <Text style={styles.input}>{sex || 'Not set'}</Text>
              <Ionicons name="pencil" size={16} color="gray" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Email</Text>
          <TouchableOpacity onPress={() => router.push('/modals/edit-email')}>
            <View style={styles.editableRow}>
              <Text style={styles.input}>{email || 'Not set'}</Text>
              <Ionicons name="pencil" size={16} color="gray" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Phone Number</Text>
          <TouchableOpacity onPress={() => router.push('/modals/edit-phone')}>
            <View style={styles.editableRow}>
              <Text style={styles.input}>{phone || 'Not set'}</Text>
              <Ionicons name="pencil" size={16} color="gray" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Password</Text>
          <TouchableOpacity onPress={() => router.push('/modals/edit-password')}>
            <View style={styles.editableRow}>
              <Text style={styles.input}>{'*'.repeat(password.length) || 'Not set'}</Text>
              <Ionicons name="pencil" size={16} color="gray" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 20 },
  backButton: { marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  section: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  inputRow: { borderBottomWidth: 1, borderBottomColor: '#ddd', paddingVertical: 10 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  input: { fontSize: 16, color: 'gray' },
  editableRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  saveButton: { backgroundColor: '#ccc', padding: 12, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
});
