import React from 'react';
import { ScrollView, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { GitHubRepo } from '../models';
import {
  YStack,
  XStack,
  Text,
  Image,
  Button,
  H2,
  H4,
  Paragraph,
  Card,
} from 'tamagui';

type RepoDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'RepoDetail'>;

const RepoDetailScreen: React.FC<RepoDetailScreenProps> = ({ route }) => {
  const { repo } = route.params;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <YStack padding="$4" space="$4" alignItems="center">
        <H2 textAlign="center">{repo.full_name}</H2>
        
        <Image
          source={{ uri: repo.owner.avatar_url }}
          width={80}
          height={80}
          borderRadius={40}
        />

        <Paragraph textAlign="center" size="$4">
          {repo.description}
        </Paragraph>

        <Card elevate bordered padding="$4" width="100%">
          <YStack space="$2">
            <XStack space="$2" alignItems="center">
              <Text>⭐</Text>
              <Text>Stars: {repo.stargazers_count}</Text>
            </XStack>
            <XStack space="$2" alignItems="center">
              <Text>🍴</Text>
              <Text>Forks: {repo.forks_count}</Text>
            </XStack>
            <XStack space="$2" alignItems="center">
              <Text>🐛</Text>
              <Text>Issues: {repo.open_issues_count}</Text>
            </XStack>
          </YStack>
        </Card>

        <Button
          size="$4"
          theme="blue"
          onPress={() => Linking.openURL(repo.html_url)}
        >
          Open on GitHub
        </Button>
      </YStack>
    </ScrollView>
  );
};

export default RepoDetailScreen;
