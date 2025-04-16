import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OPTIONS = [
  '0–15 seconds',
  '15–30 seconds',
  '30–60 seconds',
  '1–5 minutes',
  'More than 5 minutes',
  "I'm not sure",
];

export default function EditDurationScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem('seizureDuration');
      setSelected(stored || '0–15 seconds');
    };
    load();
  }, []);

  const handleSelect = async (option: string) => {
    setSelected(option);
    await AsyncStorage.setItem('seizureDuration', option);
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Seizure Duration</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {OPTIONS.map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[
            styles.option,
            selected === opt && styles.optionSelected,
          ]}
          onPress={() => handleSelect(opt)}
        >
          <Text style={styles.optionText}>{opt}</Text>
          {selected === opt && <Ionicons name="radio-button-on" size={20} color="white" />}
          {selected !== opt && <Ionicons name="radio-button-off" size={20} color="#555" />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: { color: 'white', fontSize: 18, fontWeight: '600' },
  option: {
    backgroundColor: '#1a1a1a',
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  optionSelected: {
    borderColor: '#890FC1',
    borderWidth: 1,
  },
});
