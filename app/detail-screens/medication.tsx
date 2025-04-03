import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type Medication = {
  medication: string;
  dosage: string;
  frequency: string;
  id?: string;
};

export default function MedicationScreen() {
  const router = useRouter();
  const [medications, setMedications] = useState<Medication[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const stored = await AsyncStorage.getItem('medications');
        if (stored) {
          setMedications(JSON.parse(stored));
        }
      };
      loadData();
    }, [])
  );

  const handleSave = async () => {
    await AsyncStorage.setItem('medications', JSON.stringify(medications));
    Alert.alert('Saved', 'Medications updated!');
    router.back();
  };

  const handleDelete = (index: number) => {
    Alert.alert(
      'Remove Medication',
      'Are you sure you want to delete this medication?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updated = [...medications];
            updated.splice(index, 1);
            setMedications(updated);
            await AsyncStorage.setItem('medications', JSON.stringify(updated));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.pageTitle}>My Medication</Text>

      <View style={styles.section}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Medication</Text>
          <TouchableOpacity onPress={() => router.push('/modals/edit-medication')}>
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {medications.length > 0 ? (
          medications.map((med, index) => (
            <View key={med.id || index} style={styles.caregiverCard}>
              <View style={styles.avatar} />
              <View style={styles.caregiverInfo}>
                <Text style={styles.nameText}>{med.medication}</Text>
                <Text style={styles.roleText}>{med.dosage}-{med.frequency}</Text>
              </View>
              <View style={styles.iconRow}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/modals/edit-medication',
                      params: { index: index.toString() },
                    })
                  }
                  style={{ marginRight: 12 }}
                >
                  <Ionicons name="pencil" size={18} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <Ionicons name="trash" size={18} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.input}>No medications added</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 20 },
  backButton: { marginBottom: 10 },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  caregiverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 12,
  },
  caregiverInfo: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  roleText: {
    fontSize: 14,
    color: 'gray',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 15,
    color: '#666',
    padding: 12,
  },
  saveButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
