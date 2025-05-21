import React from 'react';
import { ScrollView, Linking } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { GitHubCode } from '../models'; // Assuming models are one level up then into models
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

type CodeDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'CodeDetail'>;

const CodeDetailScreen: React.FC<CodeDetailScreenProps> = ({ route }) => {
  const { code } = route.params;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <YStack padding="$4" space="$4">
        <Card elevate bordered padding="$4">
          <YStack space="$4">
            <H2>Code Search Result</H2>

            <YStack space="$2">
              <XStack space="$2">
                <Text fontWeight="bold">Name:</Text>
                <Text>{code.name}</Text>
              </XStack>

              <XStack space="$2">
                <Text fontWeight="bold">Path:</Text>
                <Text>{code.path}</Text>
              </XStack>

              <XStack space="$2">
                <Text fontWeight="bold">Repository:</Text>
                <Text>{code.repository.full_name}</Text>
              </XStack>

              <XStack space="$2">
                <Text fontWeight="bold">SHA:</Text>
                <Text>{code.sha}</Text>
              </XStack>
            </YStack>

            <Separator />

            {code.html_url && (
              <Button
                size="$4"
                theme="blue"
                onPress={() => Linking.openURL(code.html_url)}
              >
                View on GitHub
              </Button>
            )}
          </YStack>
        </Card>
      </YStack>
    </ScrollView>
  );
};

export default CodeDetailScreen;
