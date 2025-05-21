import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // Assuming App.tsx is two levels up
import { GitHubIssue } from '../models'; // Assuming models are one level up then into models

type IssueDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'IssueDetail'>;

const IssueDetailScreen: React.FC<IssueDetailScreenProps> = ({ route }) => {
  const { issue } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Issue Details</Text>
      <Text style={styles.info}>Title: {issue.title}</Text>
      <Text style={styles.info}>Number: #{issue.number}</Text>
      <Text style={styles.info}>User: {issue.user.login}</Text>
      <Text style={styles.info}>State: {issue.state}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default IssueDetailScreen;
