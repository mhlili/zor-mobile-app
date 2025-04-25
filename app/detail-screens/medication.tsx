import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Medication = {
  medication: string;
  dosage: string;
  frequency: string;
  unit?: 'mg' | 'ml';
  id?: string;
};

export default function MedicationScreen() {
  const router = useRouter();
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const stored = await AsyncStorage.getItem('medications');
      if (stored) {
        setMedications(JSON.parse(stored));
      }
    };
    loadData();
  }, []);

  const updateDosage = async (text: string, index: number) => {
    const updated = [...medications];
    updated[index].dosage = text;
    setMedications(updated);
    await AsyncStorage.setItem('medications', JSON.stringify(updated));
  };

  const handleDelete = (index: number) => {
    Alert.alert('Remove Medication', 'Are you sure you want to delete this medication?', [
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
    ]);
  };

  const goToUnitScreen = (index: number) => {
    router.push({
      pathname: '/detail-screens/medication-units',
      params: { index: index.toString() },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>Medication</Text>

      <ScrollView style={{ flex: 1 }}>
        {medications.map((med, index) => (
          <View key={med.id || index} style={styles.medCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.medName}>{med.medication}</Text>
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <Ionicons name="ellipsis-vertical" size={18} color="white" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Total dosage</Text>
            <View style={styles.dosageRow}>
              <TextInput
                style={styles.dosageInput}
                value={med.dosage}
                onChangeText={(text) => updateDosage(text, index)}
                keyboardType="numeric"
              />
              <TouchableOpacity onPress={() => goToUnitScreen(index)}>
                <Text style={styles.mg}>{med.unit || 'mg'}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Frequency</Text>
            <View style={styles.row}>
              <Text style={styles.freqText}>{med.frequency}</Text>
              <TouchableOpacity>
                <Text style={styles.changeBtn}>Change frequency</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Reminders</Text>
            <View style={styles.row}>
              <Text style={styles.freqText}>{med.frequency}</Text>
              <TouchableOpacity>
                <Text style={styles.changeBtn}>Change frequency</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/edit-screens/edit-medication')}
      >
        <Text style={styles.addButtonText}>Add medication</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  backButton: { marginBottom: 10 },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
  medCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  medName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    color: '#888',
    fontSize: 14,
    marginBottom: 4,
    marginTop: 8,
  },
  dosageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dosageInput: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 12,
    color: 'white',
    fontSize: 16,
  },
  mg: {
    marginLeft: 8,
    color: '#a855f7',
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  freqText: {
    color: '#ccc',
    fontSize: 16,
  },
  changeBtn: {
    color: '#a855f7',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#a855f7',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
