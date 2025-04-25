import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditPhoneScreen() {
  const router = useRouter();
  const [value, setValue] = useState('');

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem('phone');
      if (saved) setValue(saved);
    };
    load();
  }, []);

  const handleSave = async () => {
    await AsyncStorage.setItem('phone', value);
    Alert.alert('Saved', 'Phone number updated!');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Phone Number</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, backgroundColor: 'white' },
  title: { fontWeight: 'bold', fontSize: 22, marginBottom: 24 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 12,
    padding: 12, fontSize: 16, backgroundColor: '#f2f2f2',
  },
  button: {
    marginTop: 30, backgroundColor: '#ccc',
    paddingVertical: 14, borderRadius: 10, alignItems: 'center',
  },
  buttonText: { fontWeight: 'bold', fontSize: 16 },
});
