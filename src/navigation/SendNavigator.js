import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SendRecipientScreen from '../screens/send/SendRecipientScreen';
import SendAmountScreen from '../screens/send/SendAmountScreen';
import SendConfirmScreen from '../screens/send/SendConfirmScreen';
import SendSuccessScreen from '../screens/send/SendSuccessScreen';

const Stack = createNativeStackNavigator();

export default function SendNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SendRecipient" component={SendRecipientScreen} />
      <Stack.Screen name="SendAmount" component={SendAmountScreen} />
      <Stack.Screen name="SendConfirm" component={SendConfirmScreen} />
      <Stack.Screen
        name="SendSuccess"
        component={SendSuccessScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
