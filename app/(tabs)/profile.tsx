import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Medication = {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
};

type Caregiver = {
  id: string;
  name: string;
  role: string;
  imageUri?: string;
};

type Metric = {
  name: string;
};

export default function ProfileScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState('https://via.placeholder.com/100');
  const [joinDate] = useState(
    new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  );

  const [medications, setMedications] = useState<Medication[]>([]);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const storedName = await AsyncStorage.getItem('name');
      const storedMedications = await AsyncStorage.getItem('medications');
      const storedCaregivers = await AsyncStorage.getItem('caregivers');
      const storedMetrics = await AsyncStorage.getItem('myMetrics');
      const storedImage = await AsyncStorage.getItem('profileImage');

      setName(storedName || 'Abby Smith');
      if (storedImage) setImageUri(storedImage);

      setMedications(storedMedications ? JSON.parse(storedMedications) : []);
      setCaregivers(storedCaregivers ? JSON.parse(storedCaregivers) : []);
      setMetrics(storedMetrics ? JSON.parse(storedMetrics) : []);
    };

    loadData();

    const unsubscribe = navigation.addListener('focus', loadData);

    return unsubscribe;
  }, [navigation]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await AsyncStorage.setItem('profileImage', uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => router.push('/detail-screens/card')}>
          <Ionicons name="card-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() => router.push('/detail-screens/settings')}>
          <Ionicons name="settings-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Image and Name */}
      <View style={styles.profileWrapper}>
        <TouchableOpacity onPress={pickImage}>
          <Image style={styles.profileImage} source={{ uri: imageUri }} />
          <Ionicons name="pencil" size={18} color="white" style={styles.editIcon} />
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>Active Since {joinDate}</Text>
      </View>

      {/* My Medication */}
      <Text style={styles.sectionHeader}>My medication</Text>
      <View style={styles.card}>
        {medications.length > 0 ? (
          medications.map((med, index) => (
            <View key={med.id ? med.id : `med-${index}`} style={styles.cardItem}>
              <Text style={styles.cardItemTitle}>{med.medication}</Text>
              <Text style={styles.cardItemSubtitle}>{med.dosage} • {med.frequency}</Text>
            </View>
          ))
        ) : (
          <Text style={{ color: '#888', paddingVertical: 8 }}>No medications added</Text>
        )}
      </View>

      {/* My Caregivers */}
      <Text style={styles.sectionHeader}>My caregivers</Text>
      <View style={styles.card}>
        {caregivers.length > 0 ? (
          caregivers.map((cg, index) => (
            <TouchableOpacity
              key={cg.id || index}
              style={styles.cardItem}
              onPress={() =>
                router.push({
                  pathname: '/detail-screens/caregiver-profile',
                  params: { index: index.toString() },
                })
              }
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{ uri: cg.imageUri || 'https://via.placeholder.com/50' }}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.cardItemTitle}>{cg.name}</Text>
                  <Text style={styles.cardItemSubtitle}>{cg.role}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#aaa" />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: '#888', paddingVertical: 8 }}>No caregivers added</Text>
        )}
      </View>

      {/* My Metrics */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.sectionHeader}>My metrics</Text>
        <View style={styles.metricPillContainer}>
            {metrics.slice(0, 5).map((m, i) => (
                <View key={i} style={styles.metricPill}>
                    <Text style={styles.metricPillText}>
                        {typeof m === 'string' ? m : m.name}
                    </Text>
                </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20, paddingTop: 70},
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { color: 'white', fontSize: 18, fontWeight: '600' },
  profileWrapper: { alignItems: 'center', marginBottom: 16 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  editIcon: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: '#333',
    padding: 4,
    borderRadius: 12,
  },
  name: { color: 'white', fontSize: 20, fontWeight: '600', marginTop: 8 },
  status: { color: '#aaa', fontSize: 14 },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
  },
  cardItem: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardItemTitle: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  cardItemSubtitle: { color: '#ccc', fontSize: 14 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    backgroundColor: '#ccc',
  },
  sectionHeader: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  metricItem: {
    color: 'white',
    paddingVertical: 6,
    fontSize: 16,
  },
  metricPillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  metricPill: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  metricPillText: {
    color: 'white',
    fontSize: 14,
  },  
  viewAllButton: {
    marginTop: 8,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  viewAllText: { color: 'white', fontWeight: 'bold' },
});
