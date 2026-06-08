import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import AdminGarageGridScreen from './src/screens/AdminGarageGridScreen';
import FleetScreen from './src/screens/FleetScreen';
import VehicleDetailScreen from './src/screens/VehicleDetailScreen';
import LiveMapScreen from './src/screens/LiveMapScreen';
import AddVehicleScreen from './src/screens/AddVehicleScreen';
import PeopleScreen from './src/screens/PeopleScreen';
import DriverDetailScreen from './src/screens/DriverDetailScreen';
import AddDriverScreen from './src/screens/AddDriverScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import RevenueScreen from './src/screens/RevenueScreen';
import NotificationScreen from './src/screens/NotificationScreen';

import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#080808',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme}>
        <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#080808' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminGarageGrid" component={AdminGarageGridScreen} />
        <Stack.Screen name="Fleet" component={FleetScreen} />
        <Stack.Screen name="LiveMap" component={LiveMapScreen} />
        <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
        <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
        <Stack.Screen name="People" component={PeopleScreen} />
        <Stack.Screen name="DriverDetail" component={DriverDetailScreen} />
        <Stack.Screen name="AddDriver" component={AddDriverScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Revenue" component={RevenueScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
  },
});
