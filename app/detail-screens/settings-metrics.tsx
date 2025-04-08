import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsMetrics() {
  const router = useRouter();

  const defaultAvailable = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'
  ];

  const [myMetrics, setMyMetrics] = useState<any[]>([]);
  const [availableMetrics, setAvailableMetrics] = useState<string[]>(defaultAvailable);

  useEffect(() => {
    const loadMetrics = async () => {
      const stored = await AsyncStorage.getItem('myMetrics');
      if (stored) setMyMetrics(JSON.parse(stored));
    };
    loadMetrics();
  }, []);

  const saveMetrics = async (metrics: any[]) => {
    setMyMetrics(metrics);
    await AsyncStorage.setItem('myMetrics', JSON.stringify(metrics));
  };

  const addMetric = (metric: string | { name: string }) => {
    const metricName = typeof metric === 'string' ? metric : metric.name;
    if (!myMetrics.find((m) => (typeof m === 'string' ? m : m.name) === metricName)) {
      const updated = [...myMetrics, typeof metric === 'string' ? metric : { ...metric }];
      saveMetrics(updated);
    }
  };

  const removeMetric = (metric: any) => {
    const metricName = typeof metric === 'string' ? metric : metric.name;
    const updated = myMetrics.filter((m) => (typeof m === 'string' ? m : m.name) !== metricName);
    saveMetrics(updated);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Metrics</Text>

      <Text style={styles.sectionTitle}>My metrics</Text>
      {myMetrics.map((metric, idx) => (
        <View key={idx} style={styles.metricRow}>
          <Ionicons name="reorder-three" size={20} color="#666" style={{ marginRight: 10 }} />
          <Text style={styles.metricText}>{typeof metric === 'string' ? metric : metric.name}</Text>
          <TouchableOpacity onPress={() => removeMetric(metric)}>
            <Ionicons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Add metrics</Text>
        <TouchableOpacity onPress={() => router.push('/edit-screens/edit-metrics')}>
          <Text style={styles.customText}>Create custom</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={availableMetrics}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.metricRow}>
            <Text style={styles.metricText}>{item}</Text>
            <TouchableOpacity onPress={() => addMetric(item)}>
              <Ionicons name="add" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  title: { fontSize: 18, color: 'white', fontWeight: '600', marginBottom: 16, textAlign: 'center' },
  sectionTitle: { color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  customText: { color: '#a855f7', fontWeight: '600' },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  metricText: { color: 'white', fontSize: 16, flex: 1 },
});