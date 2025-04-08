import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditMetricScreen() {
  const router = useRouter();

  const [metricName, setMetricName] = useState('');
  const [type, setType] = useState<'Routine' | 'Scale' | 'TrueFalse'>('Routine');

  const [routineTime, setRoutineTime] = useState({ hour: '09', minute: '00', ampm: 'AM' });
  const [routineDays, setRoutineDays] = useState<string[]>([]);
  const [scaleRange, setScaleRange] = useState({ from: '1', to: '5' });

  const toggleDay = (day: string) => {
    setRoutineDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async () => {
    const stored = await AsyncStorage.getItem('myMetrics');
    const current = stored ? JSON.parse(stored) : [];
    const updated = [...current, metricName];
    await AsyncStorage.setItem('myMetrics', JSON.stringify(updated));
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Create metric</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Metric name</Text>
      <TextInput
        style={styles.input}
        value={metricName}
        onChangeText={setMetricName}
        placeholder="Enter a name"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>How would you like to measure this metric?</Text>
      <View style={styles.dropdownRow}>
        {['Routine', 'Scale', 'TrueFalse'].map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, type === option && styles.optionSelected]}
            onPress={() => setType(option as any)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {type === 'Routine' && (
        <>
          <View style={styles.timeRow}>
            <TextInput
              style={styles.timeInput}
              value={routineTime.hour}
              onChangeText={(t) => setRoutineTime({ ...routineTime, hour: t })}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              style={styles.timeInput}
              value={routineTime.minute}
              onChangeText={(t) => setRoutineTime({ ...routineTime, minute: t })}
              keyboardType="numeric"
              maxLength={2}
            />
            <TouchableOpacity onPress={() => setRoutineTime({ ...routineTime, ampm: 'AM' })}>
              <Text style={[styles.ampm, routineTime.ampm === 'AM' && styles.ampmSelected]}>AM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setRoutineTime({ ...routineTime, ampm: 'PM' })}>
              <Text style={[styles.ampm, routineTime.ampm === 'PM' && styles.ampmSelected]}>PM</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.daysRow}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <TouchableOpacity
                key={day}
                style={[styles.day, routineDays.includes(day) && styles.daySelected]}
                onPress={() => toggleDay(day)}
              >
                <Text style={styles.dayText}>{day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {type === 'Scale' && (
        <View style={styles.scaleRow}>
          <TextInput
            style={styles.scaleInput}
            value={scaleRange.from}
            onChangeText={(t) => setScaleRange({ ...scaleRange, from: t })}
            keyboardType="numeric"
          />
          <Text style={{ color: 'white', fontSize: 16 }}>to</Text>
          <TextInput
            style={styles.scaleInput}
            value={scaleRange.to}
            onChangeText={(t) => setScaleRange({ ...scaleRange, to: t })}
            keyboardType="numeric"
          />
        </View>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Add new metric</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: 'white', fontSize: 18, fontWeight: '600' },
  label: { color: '#aaa', marginTop: 20, marginBottom: 6 },
  input: {
    backgroundColor: '#222', color: 'white', padding: 12, borderRadius: 10, fontSize: 16,
  },
  dropdownRow: {
    flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#222', borderRadius: 10,
    marginBottom: 8,
  },
  option: { flex: 1, padding: 12, alignItems: 'center' },
  optionSelected: { backgroundColor: '#333' },
  optionText: { color: 'white' },
  timeRow: { flexDirection: 'row', gap: 8, marginTop: 10 },
  timeInput: {
    backgroundColor: '#222', color: 'white', borderRadius: 10, padding: 10, width: 60, textAlign: 'center',
  },
  ampm: { color: '#aaa', padding: 10 },
  ampmSelected: { color: '#a855f7' },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  day: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center',
  },
  daySelected: { backgroundColor: '#a855f7' },
  dayText: { color: 'white', fontSize: 13 },
  scaleRow: { flexDirection: 'row', gap: 12, alignItems: 'center', marginTop: 12 },
  scaleInput: {
    backgroundColor: '#222', color: 'white', padding: 12, borderRadius: 10, width: 60, textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#a855f7', paddingVertical: 14, borderRadius: 16, alignItems: 'center', marginTop: 30,
  },
  submitText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});