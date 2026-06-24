import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: styles.tabBar,
        headerStyle: styles.header,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="artists"
        options={{
          title: 'Artists',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🎨</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="studios"
        options={{
          title: 'Studios',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏢</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>❤️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    backgroundColor: '#fff',
    paddingBottom: 8,
    paddingTop: 8,
  },
  header: {
    backgroundColor: '#fff',
  },
});