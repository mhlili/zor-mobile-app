import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Linking
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function CaregiverProfileScreen() {
  const router = useRouter();
  const { index } = useLocalSearchParams();
  const isEditing = typeof index !== 'undefined';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
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
        }
      }
    };
    load();
  }, []);

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

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim() || !role.trim()) {
      Alert.alert('Missing Info', 'First name, last name, and caregiver type are required.');
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/edit-screens/edit-caregiver',
              params: { index: index?.toString() },
            })
          }
        >
          <Text style={styles.editLabel}>Edit details</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
        <Image
          source={{ uri: imageUri || 'https://via.placeholder.com/100' }}
          style={styles.image}
        />
      </TouchableOpacity>

      <Text style={styles.nameText}>{`${firstName} ${lastName}`.trim() || 'Full Name'}</Text>

      {/* Call & Email Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
        >
          <Ionicons name="call" size={20} color="white" />
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => Linking.openURL(`mailto:${emailAddress}`)}
        >
          <Ionicons name="mail" size={20} color="white" />
          <Text style={styles.buttonText}>Email</Text>
        </TouchableOpacity>
      </View>

      {/* Details Section */}
      <View style={styles.detailsCard}>
        <Text style={styles.label}>First name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

        <Text style={styles.label}>Last name</Text>
        <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

        <Text style={styles.label}>Phone number</Text>
        <TextInput style={[styles.input, { color: '#a855f7' }]} value={phoneNumber} onChangeText={setPhoneNumber} />

        <Text style={styles.label}>Email address</Text>
        <TextInput style={[styles.input, { color: '#a855f7' }]} value={emailAddress} onChangeText={setEmailAddress} />

        <Text style={styles.label}>Caregiver type</Text>
        <TextInput style={styles.input} value={role} onChangeText={setRole} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
  },
  editLabel: { color: '#aaa', fontSize: 14 },
  imageWrapper: { alignSelf: 'center', marginBottom: 12 },
  image: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#333' },
  nameText: { color: 'white', fontSize: 20, fontWeight: '600', textAlign: 'center', marginBottom: 16 },
  actionRow: {
    flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 20,
  },
  callButton: {
    backgroundColor: '#a855f7', padding: 12, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  emailButton: {
    backgroundColor: '#333', padding: 12, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 8,
  },
  buttonText: { color: 'white', fontWeight: '600' },
  detailsCard: {
    backgroundColor: '#1a1a1a', borderRadius: 16, padding: 16,
  },
  label: { color: '#888', marginTop: 16, fontSize: 14 },
  input: {
    borderBottomWidth: 1, borderBottomColor: '#333', paddingVertical: 6,
    fontSize: 16, color: 'white', marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#a855f7', padding: 14, borderRadius: 12, marginTop: 24,
    alignItems: 'center',
  },
  saveText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});
