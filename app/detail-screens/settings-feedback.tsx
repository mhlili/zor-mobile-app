import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SettingsFeedbackScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'feedback' | 'bug'>('feedback');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!message.trim()) return;
    // Placeholder logic to submit feedback
    console.log(`Submitted ${tab === 'feedback' ? 'feedback' : 'bug'}:`, message);
    setMessage('');
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>How can we help?</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.close}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, tab === 'feedback' && styles.activeTab]}
          onPress={() => setTab('feedback')}
        >
          <Text style={styles.tabText}>Give feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'bug' && styles.activeTab]}
          onPress={() => setTab('bug')}
        >
          <Text style={styles.tabText}>Report bug</Text>
        </TouchableOpacity>
      </View>

      {/* Input */}
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="I think you should know..."
        placeholderTextColor="#888"
        multiline
      />

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  close: {
    color: 'white',
    fontSize: 22,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#333',
    alignItems: 'center',
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#555',
  },
  tabText: {
    color: 'white',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    color: 'white',
    fontSize: 16,
    height: 180,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#a855f7',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
