import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import OnboardingScreen from './src/screens/OnboardingScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import OracleChatScreen from './src/screens/OracleChatScreen';
import { fontAssets, TypographyProvider } from './src/constants/typography';
import { SubscriptionProvider } from './src/iap/SubscriptionProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts(fontAssets);

  return (
    <TypographyProvider fontsLoaded={fontsLoaded}>
      <SubscriptionProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{ animation: 'fade', animationDuration: 520 }}
            />
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ animation: 'fade', animationDuration: 520 }}
            />
            <Stack.Screen
              name="OracleChat"
              component={OracleChatScreen}
              options={{ animation: 'slide_from_right' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SubscriptionProvider>
    </TypographyProvider>
  );
}
