import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

type Medication = {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
};

type Caregiver = {
  id: string;
  name: string;
  role: string;
};

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [imageUri] = useState('https://via.placeholder.com/100');
  const [joinDate] = useState(
    new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  );

  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        const storedName = await AsyncStorage.getItem('name');
        const storedMedications = await AsyncStorage.getItem('medications');
        const storedCaregivers = await AsyncStorage.getItem('caregivers');

        setName(storedName || 'Abby Smith');

        if (storedMedications) {
          const parsed = JSON.parse(storedMedications);
          setMedications(parsed || []);
        } else {
          setMedications([]);
        }

        if (storedCaregivers) {
          const parsed = JSON.parse(storedCaregivers);
          setCaregivers(parsed || []);
        } else {
          setCaregivers([]);
        }
      };

      loadData();
    }, [])
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Profile</Text>
        </View>
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
            onPress={() => router.push('/detail-screens/medication')}
          />
        </View>
        {medications.length > 0 ? (
          medications.map((med) => (
            <View key={med.id} style={styles.caregiverItem}>
              <View style={styles.listItemDetails}>
                <Text style={styles.listItemText}>{med.medication}</Text>
                <Text style={styles.listItemSubText}>
                  {med.dosage} - {med.frequency}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.listItemText}>No medications found</Text>
        )}
      </View>

      {/* Caregivers Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Caregivers</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color="black"
            onPress={() => router.push('/detail-screens/caregiver')}
          />
        </View>
        {caregivers.length > 0 ? (
          caregivers.map((cg) => (
            <View key={cg.id} style={styles.caregiverItem}>
              <Ionicons name="person-circle" size={36} color="#bbb" />
              <View style={styles.listItemDetails}>
                <Text style={styles.listItemText}>{cg.name}</Text>
                <Text style={styles.listItemSubText}>{cg.role}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.listItemText}>No caregivers found</Text>
        )}
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
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
