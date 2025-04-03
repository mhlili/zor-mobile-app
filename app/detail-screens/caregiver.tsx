import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function CaregiverScreen() {
  const router = useRouter();
  const [caregiver, setCaregiver] = useState('');
  const [type, setType] = useState('');


  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const storedName = await AsyncStorage.getItem('caregiver');
        const storedType = await AsyncStorage.getItem('type');

        if (storedName) setCaregiver(storedName);
        if (storedType) setType(storedType);
      };
      loadData();
    }, []) // Ensures the data is reloaded when settings screen is focused
  );

  const handleSave = async () => {
    await AsyncStorage.setItem('caregiver', caregiver);
    await AsyncStorage.setItem('type', type);
    alert('Caregiver Saved!');
    router.back(); // Navigate back after saving
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Caregiver</Text>

        {/* Caregiver Name Field */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>{caregiver}</Text>
          <TouchableOpacity onPress={() => router.push('/modals/edit-caregiver')}>
            <View style={styles.editableRow}>
              <Text style={styles.input}>{type || 'Not set'}</Text>
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
  label: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  input: { fontSize: 15, color: 'gray' },
  editableRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  saveButton: { backgroundColor: '#ccc', padding: 12, borderRadius: 10, marginTop: 20, alignItems: 'center' },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
});
