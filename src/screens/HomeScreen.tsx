import React, { useState, useEffect, useCallback } from 'react';
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
import { GitHubRepo, GitHubIssue, GitHubPR, GitHubCode } from '@models/index';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

enum SearchType {
  REPOSITORIES = 'Repositories',
  ISSUES = 'Issues',
  PRS = 'Pull Requests',
  CODE = 'Code',
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>(SearchType.REPOSITORIES);
  const [results, setResults] = useState<Array<GitHubRepo | GitHubIssue | GitHubPR | GitHubCode>>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const PER_PAGE = 20;

  const executeSearch = useCallback(async (currentPage: number) => {
    const isQueryValidForSearch = searchType === SearchType.CODE ? query.length > 0 : query.length >= 3;
    if (!isQueryValidForSearch) {
        return null;
    }
    let apiResults;
    try {
      switch (searchType) {
        case SearchType.ISSUES:
          apiResults = await GitHubAPIManager.searchIssues(query, currentPage, PER_PAGE);
          break;
        case SearchType.PRS:
          apiResults = await GitHubAPIManager.searchPRs(query, currentPage, PER_PAGE);
          break;
        case SearchType.CODE:
          apiResults = await GitHubAPIManager.searchCode(query, currentPage, PER_PAGE);
          break;
        case SearchType.REPOSITORIES:
        default:
          apiResults = await GitHubAPIManager.searchRepos(query, currentPage, PER_PAGE);
          break;
      }
      return apiResults;
    } catch (error) {
      console.error(`Error fetching ${searchType}:`, error);
      return null;
    }
  }, [query, searchType, PER_PAGE]);

  const handleSearch = useCallback(async () => {
    const isQueryValidForSearch = searchType === SearchType.CODE ? query.length > 0 : query.length >= 3;
    if (!isQueryValidForSearch) {
        setResults([]);
        setPage(1);
        setHasMore(true);
        setLoading(false);
        return;
    }

    setLoading(true);
    setResults([]); 
    setPage(1);
    const apiResults = await executeSearch(1);
    if (apiResults) {
      setResults(apiResults);
      setHasMore(apiResults.length === PER_PAGE);
    } else {
      setResults([]);
      setHasMore(false);
    }
    setLoading(false);
  }, [executeSearch, PER_PAGE, searchType, query]);

  const loadMore = useCallback(async () => {
    const isQueryValidForSearch = searchType === SearchType.CODE ? query.length > 0 : query.length >= 3;
    if (!isQueryValidForSearch || loadingMore || !hasMore || loading) return;
    
    setLoadingMore(true);
    const nextPage = page + 1;
    const apiResults = await executeSearch(nextPage);
    if (apiResults && apiResults.length > 0) {
      setResults(prev => [...prev, ...apiResults]);
      setPage(nextPage);
      setHasMore(apiResults.length === PER_PAGE);
    } else if (apiResults && apiResults.length === 0) {
      setHasMore(false);
    }
    setLoadingMore(false);
  }, [query, searchType, loadingMore, hasMore, loading, page, executeSearch, PER_PAGE]);


  useEffect(() => {
    handleSearch();
  }, [query, searchType, handleSearch]);

  const renderItem = ({ item }: { item: GitHubRepo | GitHubIssue | GitHubPR | GitHubCode }) => {
    let title = '';
    let detail = '';
    let tappable = false;

    if ('full_name' in item) { // GitHubRepo
      title = item.full_name;
      detail = item.description;
      tappable = true;
    } else if ('title' in item) { // GitHubIssue or GitHubPR
      title = item.title;
      detail = `#${item.number} opened by ${item.user.login} | State: ${item.state}`;
    } else if ('path' in item) { // GitHubCode
      title = item.name;
      detail = `${item.path} in ${item.repository.full_name}`;
    }

    return (
      <TouchableOpacity
        style={styles.repoItem}
        onPress={() => {
          if (tappable && 'full_name' in item) {
            navigation.navigate('RepoDetail', { repo: item as GitHubRepo });
          }
        }}
        disabled={!tappable}
      >
        <Text style={styles.repoName}>{title}</Text>
        {detail ? <Text numberOfLines={2}>{detail}</Text> : null}
      </TouchableOpacity>
    );
  };

  const getPlaceholderText = () => {
    switch (searchType) {
      case SearchType.ISSUES:
        return 'Search GitHub Issues (e.g., react type:issue)';
      case SearchType.PRS:
        return 'Search GitHub Pull Requests (e.g., auth type:pr)';
      case SearchType.CODE:
        return 'Search GitHub Code (e.g., useState filename:tsx)';
      case SearchType.REPOSITORIES:
      default:
        return 'Search GitHub Repositories (e.g., awesome-react)';
    }
  };
  
  const getItemKey = (item: GitHubRepo | GitHubIssue | GitHubPR | GitHubCode) => {
    if ('sha' in item && !('id' in item)) { // GitHubCode
        return item.sha;
    }
    return (item as {id: number}).id.toString(); // GitHubRepo, GitHubIssue, GitHubPR
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchTypeContainer}>
        {Object.values(SearchType).map(type => (
          <Button
            key={type}
            title={type}
            onPress={() => setSearchType(type)}
            color={searchType === type ? '#007AFF' : '#AAA'}
          />
        ))}
      </View>
      <TextInput
        placeholder={getPlaceholderText()}
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      {loading && page === 1 && results.length === 0 ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => getItemKey(item)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#000" /> : null}
          ListEmptyComponent={!loading && (searchType === SearchType.CODE ? query.length > 0 : query.length >=3) ? <View style={styles.emptyComponent}><Text>No results found.</Text></View> : null}
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
  searchTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
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
    marginBottom: 4,
  },
  emptyComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  }
});
