import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import { GitHubAPIManager } from '@managers/GitHubAPIManager';
import { GitHubRepo } from '@models/GitHubRepo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const PER_PAGE = 20;

  useEffect(() => {
    if (query.length >= 3) {
      handleSearch();
    } else {
      setRepos([]);
      setPage(1);
      setHasMore(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleSearch = async () => {
    if (query.length < 3) return;
    setLoading(true);
    setPage(1);
    setHasMore(true);
    try {
      const results = await GitHubAPIManager.searchRepos(query, 1, PER_PAGE);
      setRepos(results);
      setHasMore(results.length === PER_PAGE);
    } catch (error) {
      console.error('Error fetching repos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!query.trim() || loadingMore || loading || !hasMore) return;
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const results = await GitHubAPIManager.searchRepos(query, nextPage, PER_PAGE);
      setRepos(prev => [...prev, ...results]);
      setPage(nextPage);
      setHasMore(results.length === PER_PAGE);
    } catch (error) {
      console.error('Error fetching more repos:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const renderItem = ({ item }: { item: GitHubRepo }) => (
    <TouchableOpacity
      style={styles.repoItem}
      onPress={() => navigation.navigate('RepoDetail', { repo: item })}
    >
      <Text style={styles.repoName}>{item.full_name}</Text>
      <Text numberOfLines={2}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search GitHub Repositories"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={repos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#000" /> : null}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonContainer: {
    marginBottom: 12,
  },
  list: {
    paddingBottom: 20,
  },
  repoItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  repoName: {
    fontWeight: 'bold',
  },
});
