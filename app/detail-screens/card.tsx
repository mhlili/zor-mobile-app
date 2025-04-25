import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CardScreen() {
  const router = useRouter();
  const [flipped, setFlipped] = useState(false);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [unit, setUnit] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const load = async () => {
      const storedName = await AsyncStorage.getItem('name');
      const storedType = await AsyncStorage.getItem('seizureType');
      const storedFrequency = await AsyncStorage.getItem('seizureFrequency');
      const storedUnit = await AsyncStorage.getItem('seizureUnit');
      const storedDuration = await AsyncStorage.getItem('seizureDuration');

      setName(storedName || 'Name');
      setType(storedType || 'Tonic-Clonic');
      setFrequency(storedFrequency || '1');
      setUnit(storedUnit || 'Days');
      setDuration(storedDuration || '0–15 seconds');
    };

    load();
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const front = (
    <View style={[styles.card, { backgroundColor: '#2b0033' }]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.condition}>
        Suffers from <Text style={{ fontWeight: 'bold' }}>{type} Seizures</Text>
      </Text>
      <View style={styles.bottomRow}>
        <Text style={styles.info}>Call (555) 103-4503</Text>
        <Text style={styles.info}>DOB 09/15/2004</Text>
      </View>
    </View>
  );

  const back = (
    <View style={[styles.card, { backgroundColor: '#1a1a1a' }]}>
      <Text style={styles.cardTitle}>{type} Seizures</Text>
      <Text style={styles.cardDescription}>
        <Text style={{ fontStyle: 'italic' }}>
          {type === 'Tonic-Clonic'
            ? 'Results in a loss of consciousness, stiffening of the body (tonic phase), and subsequent jerking movements (clonic phase).'
            : 'Seizure type details not available.'}
        </Text>
        {"\n\n"}
        <Text style={{ fontWeight: 'bold' }}>
          Frequency:
        </Text> Every {frequency} {unit.toLowerCase()} {"\n"}
        <Text style={{ fontWeight: 'bold' }}>
          Duration:
        </Text> {duration}
        {"\n\n"}
        <Text style={{ fontWeight: 'bold' }}>Take the individual to a hospital </Text>
        <Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>immediately</Text>
        <Text> and call the number below to alert their primary caregiver.</Text>
      </Text>
      <View style={styles.bottomRow}>
        <Text style={styles.info}>Call (555) 103-4503</Text>
        <Text style={styles.info}>DOB 09/15/2004</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit card</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleFlip} style={styles.cardWrapper}>
        {flipped ? back : front}
      </TouchableOpacity>

      <Text style={styles.flipHint}>Tap to flip</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  cardWrapper: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    padding: 24,
    justifyContent: 'space-between',
    height: 260,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  condition: {
    color: '#ddd',
    fontSize: 16,
    marginTop: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  info: {
    color: 'white',
    fontSize: 14,
  },
  cardTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  cardDescription: {
    color: '#ddd',
    fontSize: 14,
    lineHeight: 20,
  },
  flipHint: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 10,
  },
});
