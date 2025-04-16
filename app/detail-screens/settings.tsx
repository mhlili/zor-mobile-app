import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Settings</Text>

      <ScrollView style={{ flex: 1 }}>
        <Text style={styles.sectionHeader}>Account</Text>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/detail-screens/settings-profile')}>
          <Text style={styles.itemTitle}>Profile</Text>
          <Text style={styles.itemSubtitle}>Name, email, password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/detail-screens/settings-seizure-details')}>
          <Text style={styles.itemTitle}>Seizure Details</Text>
          <Text style={styles.itemSubtitle}>Edit seizure type and seizure card details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/detail-screens/medication')}>
          <Text style={styles.itemTitle}>Medication</Text>
          <Text style={styles.itemSubtitle}>Medication details and reminder settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/detail-screens/settings-metrics')}>
          <Text style={styles.itemTitle}>Metrics</Text>
          <Text style={styles.itemSubtitle}>Seizures, Sleep, Stress, and 4 others</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/detail-screens/caregiver')}>
          <Text style={styles.itemTitle}>Caregivers</Text>
          <Text style={styles.itemSubtitle}>Kimberly Chung, Anne Rayez</Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>Preferences</Text>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/detail-screens/settings-notifications')}>
          <Text style={styles.itemTitle}>Notifications</Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>Support</Text>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/detail-screens/settings-feedback')}>
          <Text style={styles.itemTitle}>Give feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => router.push('/detail-screens/review')}>
          <Text style={styles.itemTitle}>Write a review</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemTitle}>About</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Sign out button */}
      <TouchableOpacity style={styles.signOutButton} onPress={() => {}}>
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  backButton: { marginBottom: 10 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  sectionHeader: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 8,
    fontWeight: '600',
  },
  item: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  itemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  itemSubtitle: {
    color: '#888',
    fontSize: 13,
    marginTop: 4,
  },
  signOutButton: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
