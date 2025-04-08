import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function EditCaregiverScreen() {
  const router = useRouter();
  const { index } = useLocalSearchParams();
  const isEditing = typeof index !== 'undefined';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [notes, setNotes] = useState('');
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem('caregivers');
      const caregivers = stored ? JSON.parse(stored) : [];

      if (isEditing) {
        const i = parseInt(index as string, 10);
        const cg = caregivers[i];
        if (cg) {
          const split = (cg.name ?? '').split(' ');
          setFirstName(split[0] || '');
          setLastName(split[1] || '');
          setEmailAddress(cg.emailAddress || '');
          setPhoneNumber(cg.phoneNumber || '');
          setRole(cg.role || '');
          setImageUri(cg.imageUri || '');
          setNotes(cg.notes || '');
        }
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim() || !role.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const stored = await AsyncStorage.getItem('caregivers');
    const caregivers = stored ? JSON.parse(stored) : [];

    const newCaregiver = {
      id: isEditing
        ? caregivers[parseInt(index as string, 10)]?.id || Date.now().toString()
        : Date.now().toString(),
      name: `${firstName.trim()} ${lastName.trim()}`,
      emailAddress: emailAddress.trim(),
      phoneNumber: phoneNumber.trim(),
      role: role.trim(),
      notes: notes.trim(),
      imageUri: imageUri,
    };

    if (isEditing) {
      caregivers[parseInt(index as string, 10)] = newCaregiver;
    } else {
      caregivers.push(newCaregiver);
    }

    await AsyncStorage.setItem('caregivers', JSON.stringify(caregivers));
    Alert.alert('Saved', 'Caregiver saved!');
    router.back();
  };

  const handleDelete = async () => {
    const stored = await AsyncStorage.getItem('caregivers');
    const caregivers = stored ? JSON.parse(stored) : [];
    const updated = [...caregivers];
    updated.splice(parseInt(index as string, 10), 1);
    await AsyncStorage.setItem('caregivers', JSON.stringify(updated));
    Alert.alert('Deleted', 'Caregiver removed.');
    router.back();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{`${firstName} ${lastName}`.trim() || 'Caregiver'}</Text>
      </View>

      <Text style={styles.label}>Profile picture</Text>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri || 'https://via.placeholder.com/100' }} style={styles.image} />
        <TouchableOpacity onPress={pickImage} style={styles.editIcon}>
          <Ionicons name="pencil" size={16} color="#aaa" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>First Name</Text>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

      <Text style={styles.label}>Last Name</Text>
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

      <Text style={styles.label}>Phone number</Text>
      <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />

      <Text style={styles.label}>Email address</Text>
      <TextInput style={styles.input} value={emailAddress} onChangeText={setEmailAddress} keyboardType="email-address" />

      <Text style={styles.label}>Caregiver type</Text>
      <TextInput style={styles.input} value={role} onChangeText={setRole} />

      <Text style={styles.label}>Notes</Text>
      <TextInput style={styles.input} value={notes} onChangeText={setNotes} />

      {isEditing && (
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Remove Caregiver</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  headerRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 20,
  },
  title: {
    color: 'white', fontSize: 18, fontWeight: '600', marginLeft: 12,
  },
  label: { color: '#aaa', fontSize: 14, marginTop: 20, marginBottom: 4 },
  input: {
    backgroundColor: '#222', borderRadius: 10, padding: 12, color: 'white', fontSize: 16,
  },
  imageContainer: {
    position: 'relative', width: 60, height: 60, marginTop: 8, marginBottom: 8,
  },
  image: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#333',
  },
  editIcon: {
    position: 'absolute', right: -6, bottom: -6, backgroundColor: '#1c1c1c', borderRadius: 10, padding: 4,
  },
  deleteButton: {
    marginTop: 40, alignItems: 'center',
  },
  deleteText: {
    color: 'red', fontWeight: 'bold', fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#a855f7', padding: 14, borderRadius: 12, marginTop: 24, alignItems: 'center',
  },
  saveText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
