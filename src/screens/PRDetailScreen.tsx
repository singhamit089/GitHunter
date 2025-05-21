import React from 'react';
import { Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { GitHubPR } from '../models';
import {
  YStack,
  XStack,
  Text,
  H2,
  Card,
  Paragraph,
  Separator,
  Button,
} from 'tamagui';

type PRDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PRDetail'>;

const PRDetailScreen: React.FC<PRDetailScreenProps> = ({ route }) => {
  const { pr } = route.params;

  const getStateColor = (state: string) => {
    switch (state) {
      case 'open':
        return 'green';
      case 'closed':
        return 'red';
      case 'merged':
        return 'purple';
      default:
        return undefined;
    }
  };

  return (
    <YStack padding="$4" space="$4" flex={1}>
      <Card elevate bordered padding="$4">
        <YStack space="$4">
          <H2>{pr.title}</H2>
          
          <XStack space="$2" alignItems="center">
            <Text theme="blue">#{pr.number}</Text>
            <Text>•</Text>
            <Text>Opened by {pr.user.login}</Text>
          </XStack>

          <Separator />

          <YStack space="$2">
            <XStack space="$2">
              <Text fontWeight="bold">State:</Text>
              <Text theme={getStateColor(pr.state)}>
                {pr.state}
              </Text>
            </XStack>

            {pr.body && (
              <YStack space="$2">
                <Text fontWeight="bold">Description:</Text>
                <Paragraph>{pr.body}</Paragraph>
              </YStack>
            )}

            {pr.labels && pr.labels.length > 0 && (
              <YStack space="$2">
                <Text fontWeight="bold">Labels:</Text>
                <XStack flexWrap="wrap" space="$2">
                  {pr.labels.map((label) => (
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

            {pr.html_url && (
              <Button
                size="$4"
                theme="blue"
                onPress={() => Linking.openURL(pr.html_url)}
              >
                View on GitHub
              </Button>
            )}
          </YStack>
        </YStack>
      </Card>
    </YStack>
  );
};

export default PRDetailScreen;
