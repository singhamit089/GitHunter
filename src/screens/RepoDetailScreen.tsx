import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Linking,
  Button,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'RepoDetail'>;

const RepoDetailScreen: React.FC<Props> = ({ route }) => {
  const { repo } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{repo.full_name}</Text>
      <Image source={{ uri: repo.owner.avatar_url }} style={styles.avatar} />
      <Text style={styles.description}>{repo.description}</Text>

      <Text style={styles.meta}>⭐ Stars: {repo.stargazers_count}</Text>
      <Text style={styles.meta}>🍴 Forks: {repo.forks_count}</Text>
      <Text style={styles.meta}>🐛 Issues: {repo.open_issues_count}</Text>

      <Button title="Open on GitHub" onPress={() => Linking.openURL(repo.html_url)} />
    </ScrollView>
  );
};

export default RepoDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    marginBottom: 16,
  },
  meta: {
    marginVertical: 4,
  },
});
