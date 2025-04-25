import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SeizureDetailsScreen() {
  const router = useRouter();
  const [type, setType] = useState('');
  const [frequency, setFrequency] = useState('1');
  const [unit, setUnit] = useState('Days');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const load = async () => {
      const t = await AsyncStorage.getItem('seizureType');
      const f = await AsyncStorage.getItem('seizureFrequency');
      const u = await AsyncStorage.getItem('seizureUnit');
      const d = await AsyncStorage.getItem('seizureDuration');
      setType(t || 'Tonic-Clonic');
      setFrequency(f || '1');
      setUnit(u || 'Days');
      setDuration(d || '0–15 seconds');
    };
    load();
  }, []);

  const saveType = async (val: string) => {
    setType(val);
    await AsyncStorage.setItem('seizureType', val);
  };

  const saveFrequency = async (val: string) => {
    setFrequency(val);
    await AsyncStorage.setItem('seizureFrequency', val);
  };

  const saveUnit = async (val: string) => {
    setUnit(val);
    await AsyncStorage.setItem('seizureUnit', val);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Seizure details</Text>

      <Text style={styles.label}>Seizure type</Text>
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={saveType}
        placeholder="e.g. Tonic-Clonic"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Seizure frequency</Text>
      <View style={styles.row}>
        <Text style={styles.everyLabel}>Every</Text>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          value={frequency}
          keyboardType="numeric"
          onChangeText={saveFrequency}
        />
        <TouchableOpacity onPress={() => saveUnit(unit === 'Days' ? 'Weeks' : 'Days')}>
          <View style={styles.dropdown}>
            <Text style={{ color: 'white' }}>{unit}</Text>
            <Ionicons name="chevron-down" size={16} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Seizure duration</Text>
      <TouchableOpacity
        style={styles.durationRow}
        onPress={() => router.push('/edit-screens/edit-durration')}
      >
        <Text style={{ color: 'white' }}>{duration}</Text>
        <Text style={{ color: '#aaa' }}>Change duration</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  title: { color: 'white', fontSize: 18, fontWeight: '600', marginBottom: 24 },
  label: { color: '#888', fontSize: 14, marginBottom: 6 },
  input: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  everyLabel: { color: 'white', marginRight: 10 },
  dropdown: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    padding: 14,
    borderRadius: 10,
  },
});
