import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { GitHubPR } from '../models'; // Assuming models are one level up then into models

type PRDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PRDetail'>;

const PRDetailScreen: React.FC<PRDetailScreenProps> = ({ route }) => {
  const { pr } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pull Request Details</Text>
      <Text style={styles.info}>Title: {pr.title}</Text>
      <Text style={styles.info}>Number: #{pr.number}</Text>
      <Text style={styles.info}>User: {pr.user.login}</Text>
      <Text style={styles.info}>State: {pr.state}</Text>
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

export default PRDetailScreen;
