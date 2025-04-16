import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsMetrics() {
  const router = useRouter();

  const defaultAvailable = ['A', 'A', 'B', 'C', 'Z', 'D'];

  const [myMetrics, setMyMetrics] = useState<any[]>([
    { name: 'Seizures', disabled: true },
    { name: 'Sleep', disabled: true },
    { name: 'Stress' },
    { name: 'Appetite' },
    { name: 'Bowel movements' },
  ]);
  const [availableMetrics, setAvailableMetrics] = useState<string[]>(defaultAvailable);

  const saveMetrics = async (metrics: any[]) => {
    setMyMetrics(metrics);
    await AsyncStorage.setItem('myMetrics', JSON.stringify(metrics));
  };

  const addMetric = (metric: string | { name: string }) => {
    const metricName = typeof metric === 'string' ? metric : metric.name;
    if (!myMetrics.find((m) => m.name === metricName)) {
      const updated = [...myMetrics, { name: metricName }];
      saveMetrics(updated);
    }
  };

  const removeMetric = (metric: any) => {
    if (metric.disabled) return;
    const updated = myMetrics.filter((m) => m.name !== metric.name);
    saveMetrics(updated);
  };

  const renderMetricRow = (item: any) => (
    <View style={styles.metricRow}>
      <Ionicons name="reorder-three" size={20} color="#666" style={{ marginRight: 10 }} />
      <Text style={[styles.metricText, item.disabled && styles.disabledText]}>
        {item.name}
      </Text>
      {!item.disabled && (
        <TouchableOpacity onPress={() => removeMetric(item)}>
          <Ionicons name="close" size={20} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderAddRow = (label: string) => (
    <View style={styles.metricRow}>
      <Text style={styles.metricText}>{label}</Text>
      <TouchableOpacity onPress={() => addMetric(label)}>
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Metrics</Text>

      <Text style={styles.sectionTitle}>My metrics</Text>
      {myMetrics.map((metric, idx) => (
        <View key={idx}>{renderMetricRow(metric)}</View>
      ))}

      <Text style={styles.sectionTitle}>Suggested metrics</Text>
      {['C', 'Z', 'D'].map((m, i) => (
        <View key={`suggested-${i}`}>{renderAddRow(m)}</View>
      ))}

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>All metrics</Text>
        <TouchableOpacity onPress={() => router.push('/edit-screens/edit-metrics')}>
          <Text style={styles.customText}>Create custom</Text>
        </TouchableOpacity>
      </View>
      {['A', 'A', 'B'].map((m, i) => (
        <View key={`all-${i}`}>{renderAddRow(m)}</View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customText: { color: '#890FC1', fontWeight: '600' },
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
  disabledText: { color: '#888' },
});
