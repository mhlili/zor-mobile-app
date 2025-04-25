import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

const UNITS = ['mg', 'ml'];

export default function MedicationUnitsScreen() {
  const router = useRouter();
  const { index } = useLocalSearchParams();
  const medIndex = parseInt(index as string, 10);

  const [selectedUnit, setSelectedUnit] = useState('mg');

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem('medications');
      const medications = stored ? JSON.parse(stored) : [];
      if (medications[medIndex]?.unit) {
        setSelectedUnit(medications[medIndex].unit);
      }
    };
    load();
  }, []);

  const selectUnit = async (unit: string) => {
    const stored = await AsyncStorage.getItem('medications');
    const medications = stored ? JSON.parse(stored) : [];

    if (medications[medIndex]) {
      medications[medIndex].unit = unit;
      await AsyncStorage.setItem('medications', JSON.stringify(medications));
    }

    setSelectedUnit(unit);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Medication Units</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {UNITS.map((unit) => (
        <TouchableOpacity
          key={unit}
          style={[
            styles.unitOption,
            selectedUnit === unit && styles.unitSelected,
          ]}
          onPress={() => selectUnit(unit)}
        >
          <Text style={styles.unitText}>
            {unit === 'mg' ? 'Milligrams (mg)' : 'Milliliters (ml)'}
          </Text>
          <Ionicons
            name={selectedUnit === unit ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 18, color: 'white', fontWeight: 'bold' },
  unitOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  unitSelected: {
    backgroundColor: '#333',
  },
  unitText: {
    color: 'white',
    fontSize: 16,
  },
});
