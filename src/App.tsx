import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { Button } from 'tamagui';
import { ChevronLeft } from '@tamagui/lucide-icons';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import RepoDetailScreen from './screens/RepoDetailScreen';
import IssueDetailScreen from './screens/IssueDetailScreen';
import PRDetailScreen from './screens/PRDetailScreen';
import CodeDetailScreen from './screens/CodeDetailScreen';
import { GitHubRepo, GitHubIssue, GitHubPR, GitHubCode } from './models';

export type RootStackParamList = {
  Home: undefined;
  RepoDetail: { repo: GitHubRepo };
  IssueDetail: { issue: GitHubIssue };
  PRDetail: { pr: GitHubPR };
  CodeDetail: { code: GitHubCode };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const CustomBackButton = () => {
  const navigation = useNavigation();
  return (
    <Button
      size="$2"
      onPress={() => navigation.navigate('Home')}
      backgroundColor="#fff"
      color="#222"
      marginRight={8}
      circular
      style={{ marginLeft: 12 }}
    >
      <ChevronLeft size={20} color="#222" />
    </Button>
  );
};

const App = () => {
  return (
    <TamaguiProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { 
              backgroundColor: Platform.OS === 'web' ? '#24292e' : '#24292e',
            },
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
            options={{
              title: 'Repository Details',
              headerLeft: () => <CustomBackButton />,
            }}
          />
          <Stack.Screen
            name="IssueDetail"
            component={IssueDetailScreen}
            options={{
              title: 'Issue Details',
              headerLeft: () => <CustomBackButton />,
            }}
          />
          <Stack.Screen
            name="PRDetail"
            component={PRDetailScreen}
            options={{
              title: 'Pull Request Details',
              headerLeft: () => <CustomBackButton />,
            }}
          />
          <Stack.Screen
            name="CodeDetail"
            component={CodeDetailScreen}
            options={{
              title: 'Code Details',
              headerLeft: () => <CustomBackButton />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
};

export default App;
