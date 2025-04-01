import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [medications, setMedications] = useState<any[]>([]);
  const [caregivers, setCaregivers] = useState<any[]>([]);
  const [imageUri] = useState('https://via.placeholder.com/100');
  const [joinDate] = useState(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
  const router = useRouter();

  // Reload name, medications, and caregivers from AsyncStorage when the Profile screen is focused
  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const storedName = await AsyncStorage.getItem('name');
        const storedMedications = await AsyncStorage.getItem('medications');
        const storedCaregivers = await AsyncStorage.getItem('caregivers');

        if (storedName) setName(storedName);
        else setName('Abby Smith'); // fallback

        if (storedMedications) {
          const parsedMedications = JSON.parse(storedMedications);
          setMedications(parsedMedications || []);
        } else {
          setMedications([
            { id: '1', name: 'Keppra', dosage: '10mg - 4x/Day' },
            { id: '2', name: 'Vimpat', dosage: '20mg - 2x/Day' }
          ]);  // Fallback
        }

        if (storedCaregivers) {
          const parsedCaregivers = JSON.parse(storedCaregivers);
          setCaregivers(parsedCaregivers || []);
        } else {
          setCaregivers([
            { id: '1', name: 'Kimberly Chung', role: 'Family' },
            { id: '2', name: 'Anne Rayez', role: 'Primary Care Physician' }
          ]); // Fallback
        }
      };

      loadData();
    }, [])
  );

  // Handle medication updates (Add/Edit)
  const handleMedicationUpdate = async (updatedMedications: any[]) => {
    setMedications(updatedMedications);
    await AsyncStorage.setItem('medications', JSON.stringify(updatedMedications));
  };

  // Handle caregiver updates (Add/Edit)
  const handleCaregiverUpdate = async (updatedCaregivers: any[]) => {
    setCaregivers(updatedCaregivers);
    await AsyncStorage.setItem('caregivers', JSON.stringify(updatedCaregivers));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() => router.push('/detail-screens/settings')}>
          <Ionicons name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <Image style={styles.profileImage} source={{ uri: imageUri }} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.status}>Active Since {joinDate}</Text>

      {/* Medication Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Medication</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color="black"
            onPress={() => router.push('/modals/edit-medication')}
          />
        </View>
        {medications.length > 0 ? medications.map((med) => (
          <View key={med.id} style={styles.listItem}>
            <Text style={styles.listItemText}>{med.name}</Text>
            <Text style={styles.listItemSubText}>{med.dosage}</Text>
          </View>
        )) : <Text style={styles.listItemText}>No medications found</Text>}
      </View>

      {/* Caregivers Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Caregivers</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color="black"
            onPress={() => router.push('/modals/edit-caregiver')}
          />
        </View>
        {caregivers.length > 0 ? caregivers.map((cg) => (
          <View key={cg.id} style={styles.caregiverItem}>
            <Ionicons name="person-circle" size={36} color="#bbb" />
            <View style={styles.listItemDetails}>
              <Text style={styles.listItemText}>{cg.name}</Text>
              <Text style={styles.listItemSubText}>{cg.role}</Text>
            </View>
          </View>
        )) : <Text style={styles.listItemText}>No caregivers found</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    paddingTop: 50,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    backgroundColor: '#d3d6db',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
  },
  caregiverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  listItemDetails: {
    marginLeft: 10,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  listItemSubText: {
    fontSize: 14,
    color: 'gray',
  },
});
