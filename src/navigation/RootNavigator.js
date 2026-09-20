import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import KYCPermissionScreen from '../screens/auth/KYCPermissionScreen';
import MainTabs from './MainTabs';
import SendNavigator from './SendNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="KYC" component={KYCPermissionScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen
        name="SendFlow"
        component={SendNavigator}
        options={{ animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
}
