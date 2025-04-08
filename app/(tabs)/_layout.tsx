import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, Platform } from 'react-native';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={32} style={{ marginBottom: -2 }} {...props} />;
}

function AddButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.addButton}>
      <FontAwesome name="plus" size={32} color="#fff" />
    </Pressable>
  );
}

export default function TabLayout() {
  const [isModalVisible, setModalVisible] = useState(false);

  const activeColor = "#890fc1";
  const inactiveColor = "#6F6F6F";

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          tabBarStyle: styles.tabBar,
          headerShown: useClientOnlyValue(false, false),
          tabBarItemStyle: styles.tabBarItem,
          tabBarLabelStyle: styles.tabBarLabel,
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
            tabBarIcon: ({ color }) => <TabBarIcon name="bar-chart" color={color} />,
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
          name="forum"
          options={{
            title: 'Forum',
            tabBarIcon: ({ color }) => <TabBarIcon name="comments" color={color} />,
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
    height: 85,
    backgroundColor: '#101010',
    borderTopColor: '#333333',
    borderTopWidth: 0.5,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 6,
  },
  tabBarItem: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabel: {
    marginTop: 4,
    fontSize: 11,
  },
  addButton: {
    width: 80,
    height: 80,
    backgroundColor: '#890fc1',
    borderRadius: 50,
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