import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@screens/HomeScreen';
import RepoDetailScreen from '@screens/RepoDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  RepoDetail: { repo: any }; // Replace 'any' with a proper model later
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#24292e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'GitHub Repository Search' }}
        />
        <Stack.Screen
          name="RepoDetail"
          component={RepoDetailScreen}
          options={{ title: 'Repository Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
