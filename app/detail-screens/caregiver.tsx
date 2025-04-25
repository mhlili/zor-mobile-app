import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Caregiver = {
  name: string;
  role: string;
  emailAddress?: string;
  phoneNumber?: string;
  imageUri?: string;
  id?: string;
};

export default function CaregiverScreen() {
  const router = useRouter();
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const stored = await AsyncStorage.getItem('caregivers');
      if (stored) {
        setCaregivers(JSON.parse(stored));
      }
    };
    loadData();
  }, []);

  const handleDelete = (index: number) => {
    Alert.alert('Remove Caregiver', 'Are you sure you want to delete this caregiver?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const updated = [...caregivers];
          updated.splice(index, 1);
          setCaregivers(updated);
          await AsyncStorage.setItem('caregivers', JSON.stringify(updated));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.pageTitle}>My Caregivers</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Caregivers</Text>

        {caregivers.length > 0 ? (
          caregivers.map((cg, index) => (
            <View key={cg.id || index} style={styles.caregiverCard}>
              <Image
                source={{ uri: cg.imageUri || 'https://via.placeholder.com/50' }}
                style={styles.avatar}
              />
              <View style={styles.caregiverInfo}>
                <Text style={styles.nameText}>{cg.name}</Text>
                <Text style={styles.roleText}>{cg.role}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/edit-screens/edit-caregiver',
                    params: { index: index.toString() },
                  })
                }
                style={{ marginLeft: 'auto' }}
              >
                <Ionicons name="chevron-forward" size={18} color="gray" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.input}>No caregivers added</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/edit-screens/edit-caregiver')}
      >
        <Text style={styles.addButtonText}>Add new caregiver</Text>
      </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
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
  addButton: {
    backgroundColor: '#a855f7',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 'auto',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
