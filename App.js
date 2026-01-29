import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import OnboardingScreen from './src/screens/OnboardingScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import OracleChatScreen from './src/screens/OracleChatScreen';
import { fontAssets, TypographyProvider } from './src/constants/typography';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts(fontAssets);

  return (
    <TypographyProvider fontsLoaded={fontsLoaded}>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="OracleChat" component={OracleChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TypographyProvider>
  );
}
