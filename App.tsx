/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';
import {QueryClient, QueryClientProvider} from 'react-query';
import FlashMessage from 'react-native-flash-message';

import HomeStack from 'navigations';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

// Native base library is still using SSRProvider
LogBox.ignoreLogs([
  'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
]);

function App() {
  return (
    <NativeBaseProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeStack" component={HomeStack} />
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage position="bottom" floating={true} />
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}

export default App;
