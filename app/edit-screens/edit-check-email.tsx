import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function EditCheckEmailScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    const loadEmail = async () => {
      const stored = await AsyncStorage.getItem('email');
      if (stored) setEmail(stored);
    };
    loadEmail();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // only allow numbers
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit !== '')) {
      // All digits filled
      router.push('/edit-screens/edit-create-password');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Check your email</Text>
      <Text style={styles.subtitle}>We’ve sent a code to {email}</Text>

      <View style={styles.codeRow}>
        {code.map((digit, idx) => (
          <TextInput
            key={idx}
            ref={(ref) => (inputs.current[idx] = ref!)}
            value={digit}
            onChangeText={(val) => handleChange(val, idx)}
            maxLength={1}
            keyboardType="number-pad"
            style={styles.codeInput}
            autoFocus={idx === 0}
          />
        ))}
      </View>

      <Text style={styles.resendText}>
        Resend code  {timer < 10 ? `00:0${timer}` : `00:${timer}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  backButton: { marginBottom: 20 },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 32,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 20,
  },
  codeInput: {
    flex: 1,
    height: 58,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
  },
  resendText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 10,
    fontSize: 14,
  },
});
