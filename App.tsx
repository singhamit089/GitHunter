import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@screens/HomeScreen';
import RepoDetailScreen from '@screens/RepoDetailScreen';
import IssueDetailScreen from './src/screens/IssueDetailScreen';
import PRDetailScreen from './src/screens/PRDetailScreen';
import CodeDetailScreen from './src/screens/CodeDetailScreen';
import { GitHubRepo, GitHubIssue, GitHubPR, GitHubCode } from './src/models';

export type RootStackParamList = {
  Home: undefined;
  RepoDetail: { repo: GitHubRepo }; 
  IssueDetail: { issue: GitHubIssue }; 
  PRDetail: { pr: GitHubPR }; 
  CodeDetail: { code: GitHubCode }; 
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
        <Stack.Screen
          name="IssueDetail"
          component={IssueDetailScreen}
          options={{ title: 'Issue Details' }}
        />
        <Stack.Screen
          name="PRDetail"
          component={PRDetailScreen}
          options={{ title: 'Pull Request Details' }}
        />
        <Stack.Screen
          name="CodeDetail"
          component={CodeDetailScreen}
          options={{ title: 'Code Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
