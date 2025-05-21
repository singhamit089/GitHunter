import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App'; // Assuming App.tsx is two levels up
import { GitHubCode } from '../models'; // Assuming models are one level up then into models

type CodeDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'CodeDetail'>;

const CodeDetailScreen: React.FC<CodeDetailScreenProps> = ({ route }) => {
  const { code } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Code Search Result</Text>
      <Text style={styles.info}>Name: {code.name}</Text>
      <Text style={styles.info}>Path: {code.path}</Text>
      <Text style={styles.info}>Repository: {code.repository.full_name}</Text>
      <Text style={styles.info}>SHA: {code.sha}</Text>
      {/* Potentially display code content or link to it */}
    </ScrollView>
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

export default CodeDetailScreen;
