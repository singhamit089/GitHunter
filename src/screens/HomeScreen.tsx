// import React, { useState, useEffect, useCallback } from 'react';
// import { FlatList, StyleSheet } from 'react-native';
// import { GitHubAPIManager } from '@managers/GitHubAPIManager';
// import { GitHubRepo, GitHubIssue, GitHubPR, GitHubCode } from '@models/index';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../App';
import { useState } from 'react';
import { YStack, XStack, Input, Button, Text, Spinner, Card } from 'tamagui';
import { FlatList } from 'react-native';
import { GitHubAPIManager } from '../managers/GitHubAPIManager';
import { GitHubRepo, GitHubIssue, GitHubPR, GitHubCode } from '../models';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../App';

// type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// enum SearchType {
//   REPOSITORIES = 'Repositories',
//   ISSUES = 'Issues',
//   PRS = 'Pull Requests',
//   CODE = 'Code',
// }

// const HomeScreen: React.FC<Props> = ({ navigation }) => {
//   ...
// };

const SEARCH_TYPES = [
  { label: 'Repositories', value: 'repositories' },
  { label: 'Issues', value: 'issues' },
  { label: 'PRs', value: 'prs' },
  { label: 'Code', value: 'code' },
];

const PER_PAGE = 20;
type ResultItem = GitHubRepo | GitHubIssue | GitHubPR | GitHubCode;

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState(SEARCH_TYPES[0].value);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const fetchResults = async (searchQuery: string, searchTypeValue: string, pageNum: number) => {
    let apiResults: ResultItem[] = [];
    if (searchTypeValue === 'repositories') {
      apiResults = await GitHubAPIManager.searchRepos(searchQuery, pageNum, PER_PAGE);
    } else if (searchTypeValue === 'issues') {
      apiResults = await GitHubAPIManager.searchIssues(searchQuery, pageNum, PER_PAGE);
    } else if (searchTypeValue === 'prs') {
      apiResults = await GitHubAPIManager.searchPRs(searchQuery, pageNum, PER_PAGE);
    } else if (searchTypeValue === 'code') {
      apiResults = await GitHubAPIManager.searchCode(searchQuery, pageNum, PER_PAGE);
    }
    return apiResults;
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    setPage(1);
    setHasMore(true);
    try {
      const apiResults = await fetchResults(query, searchType, 1);
      setResults(apiResults);
      setHasMore(apiResults.length === PER_PAGE);
    } catch (err: any) {
      setError(err?.message || 'Unknown error');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loadingMore || loading || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const apiResults = await fetchResults(query, searchType, nextPage);
      setResults(prev => [...prev, ...apiResults]);
      setPage(nextPage);
      setHasMore(apiResults.length === PER_PAGE);
    } catch (err: any) {
      setError(err?.message || 'Unknown error');
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  // Reset results when searchType changes
  const handleTypeChange = (typeValue: string) => {
    setSearchType(typeValue);
    setResults([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  };

  const handleCardPress = (item: ResultItem) => {
    if ('full_name' in item) {
      navigation.navigate('RepoDetail', { repo: item as GitHubRepo });
    } else if ('path' in item) {
      navigation.navigate('CodeDetail', { code: item as GitHubCode });
    } else if ('title' in item) {
      if ('pull_request' in item) {
        navigation.navigate('PRDetail', { pr: item as GitHubPR });
      } else {
        navigation.navigate('IssueDetail', { issue: item as GitHubIssue });
      }
    }
  };

  return (
    <YStack flex={1} paddingVertical="$4" paddingHorizontal={0}>
      {/* Search controls at the top */}
      <YStack space="$2" marginBottom="$2" marginTop="$2" alignItems="center">
        <XStack space="$2" marginBottom="$2" justifyContent="center">
          {SEARCH_TYPES.map(type => (
            <Button
              key={type.value}
              onPress={() => handleTypeChange(type.value)}
              theme={searchType === type.value ? 'blue' : undefined}
              size="$3"
            >
              {type.label}
            </Button>
          ))}
        </XStack>
        <Input
          placeholder="Search GitHub..."
          value={query}
          onChangeText={text => {
            setQuery(text);
            setError(null);
          }}
          width={300}
        />
        <Button onPress={handleSearch}>Search</Button>
        <Text>Selected: {SEARCH_TYPES.find(t => t.value === searchType)?.label}</Text>
        {error && <Text color="$red10">{error}</Text>}
      </YStack>
      {/* Results list fills remaining space */}
      <YStack flex={1}>
        {loading ? (
          <Spinner size="large" color="$blue10" marginTop="$4" />
        ) : (
          <FlatList
            style={{ width: 350, alignSelf: 'center' }}
            contentContainerStyle={{ paddingBottom: 40 }}
            data={results}
            keyExtractor={item => (item as any).id.toString()}
            renderItem={({ item }) => (
              <Card bordered padding="$3" marginBottom="$2" onPress={() => handleCardPress(item)}>
                <Text fontWeight="bold">{'name' in item ? (item as any).name : (item as any).title}</Text>
                <Text color="$gray10">{(item as any).description || (item as any).path}</Text>
              </Card>
            )}
            ListEmptyComponent={<Text color="$gray10">No results</Text>}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loadingMore ? (
              <YStack alignItems="center" paddingVertical="$2">
                <Spinner size="small" color="$blue10" />
              </YStack>
            ) : null}
          />
        )}
      </YStack>
    </YStack>
  );
}
