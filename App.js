import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import WatchlistScreen from './screens/WatchlistScreen';
import PortfolioScreen from './screens/PortfolioScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#0a0f1e', borderTopColor: '#1a2540' },
          tabBarActiveTintColor: '#00d4ff',
          tabBarInactiveTintColor: '#555',
          headerStyle: { backgroundColor: '#0a0f1e' },
          headerTintColor: '#fff',
        }}
      >
        <Tab.Screen
          name="Market"
          component={HomeScreen}
          options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>📈</Text> }}
        />
        <Tab.Screen
          name="Watchlist"
          component={WatchlistScreen}
          options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>⭐</Text> }}
        />
        <Tab.Screen
          name="Portfolio"
          component={PortfolioScreen}
          options={{ tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>💼</Text> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}