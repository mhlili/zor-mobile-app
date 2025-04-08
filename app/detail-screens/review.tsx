import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ReviewScreen() {
  const router = useRouter();
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async () => {
    if (!reviewText.trim()) {
      Alert.alert('Empty Review', 'Please write something before submitting.');
      return;
    }

    await AsyncStorage.setItem('userReview', reviewText);
    Alert.alert('Thank you!', 'Your review has been submitted.');
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Write a review</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="We’d love to hear your thoughts!"
        placeholderTextColor="#888"
        multiline
        value={reviewText}
        onChangeText={setReviewText}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit review</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 18, color: 'white', fontWeight: '600' },
  textInput: {
    backgroundColor: '#1a1a1a',
    color: 'white',
    padding: 16,
    borderRadius: 12,
    minHeight: 160,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#a855f7',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
