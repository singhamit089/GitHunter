import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { GitHubIssue } from '../models';
import {
  YStack,
  XStack,
  Text,
  H2,
  Card,
  Paragraph,
  Separator,
} from 'tamagui';
import { ScrollView } from 'react-native';

type IssueDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'IssueDetail'>;

const IssueDetailScreen: React.FC<IssueDetailScreenProps> = ({ route }) => {
  const { issue } = route.params;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <YStack padding="$4" space="$4">
        <Card elevate bordered padding="$4">
          <YStack space="$4">
            <H2>{issue.title}</H2>
            
            <XStack space="$2" alignItems="center">
              <Text theme="blue">#{issue.number}</Text>
              <Text>•</Text>
              <Text>Opened by {issue.user.login}</Text>
            </XStack>

            <Separator />

            <YStack space="$2">
              <XStack space="$2">
                <Text fontWeight="bold">State:</Text>
                <Text theme={issue.state === 'open' ? 'green' : 'red'}>
                  {issue.state}
                </Text>
              </XStack>

              {issue.body && (
                <YStack space="$2">
                  <Text fontWeight="bold">Description:</Text>
                  <Paragraph>{issue.body}</Paragraph>
                </YStack>
              )}

              {issue.labels && issue.labels.length > 0 && (
                <YStack space="$2">
                  <Text fontWeight="bold">Labels:</Text>
                  <XStack flexWrap="wrap" space="$2">
                    {issue.labels.map((label) => (
                      <Card
                        key={label.id}
                        bordered
                        padding="$2"
                        backgroundColor={label.color ? `#${label.color}` : undefined}
                      >
                        <Text color={label.color ? 'white' : undefined}>
                          {label.name}
                        </Text>
                      </Card>
                    ))}
                  </XStack>
                </YStack>
              )}
            </YStack>
          </YStack>
        </Card>
      </YStack>
    </ScrollView>
  );
};

export default IssueDetailScreen;
