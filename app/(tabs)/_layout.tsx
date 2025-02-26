import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, View as RNView, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function AddButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.addButton}>
      <FontAwesome name="plus" size={32} color="#fff" />
    </Pressable>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarStyle: styles.tabBar,
          headerShown: useClientOnlyValue(false, true),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="trends"
          options={{
            title: 'Trends',
            tabBarIcon: ({ color }) => <TabBarIcon name="line-chart" color={color} />,
          }}
        />
        <Tabs.Screen
          name="add"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setModalVisible(true);
            },
          }}
          options={{
            title: '',
            tabBarIcon: () => (
              <AddButton onPress={() => setModalVisible(true)} />
            ),
          }}
        />
        <Tabs.Screen
          name="qa"
          options={{
            title: 'Q&A',
            tabBarIcon: ({ color }) => <TabBarIcon name="question" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    backgroundColor: '#fff',
    borderTopColor: '#e0e0e0',
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: 'gray',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});