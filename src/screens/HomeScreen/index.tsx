import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'native-base';
import {useInfiniteQuery} from 'react-query';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import styles from './styles';
import {GifListItemProps, GiphyResponse} from 'utils/types';
import {GifItem, InputComponent} from 'components';
import {GIFS_PER_PAGE_RESPONSE_SIZE} from 'utils/constants';
import useAPICalls from 'api/apiCalls/gifsAPICalls';

const ListEmptyComponent = (props: {isLoading: boolean}) => {
  const {isLoading} = props;
  if (isLoading) {
    return <ActivityIndicator animating={true} size={'large'} />;
  } else {
    return (
      <View style={styles.emptyComponent}>
        <Text style={styles.noDataText}>{'No Data Found'}</Text>
      </View>
    );
  }
};

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {getSearchedGifsCall, getTrendingGifsCall} = useAPICalls();
  const [queryString, setQueryString] = useState('');

  const {data, fetchNextPage, isLoading, isRefetching, refetch} =
    useInfiniteQuery(
      [{q: queryString}],
      queryString.length > 0 ? getSearchedGifsCall : getTrendingGifsCall,
      {
        getNextPageParam: (lastPage: GiphyResponse) => {
          const {data: gifsList, nextPage}: GiphyResponse = lastPage;
          if (gifsList.length < GIFS_PER_PAGE_RESPONSE_SIZE) {
            return undefined;
          }
          return nextPage;
        },
      },
    );

  const flattenData = data?.pages?.flatMap(page => page.data) ?? [];

  const renderItem = ({item, index}: GifListItemProps) => {
    return <GifItem item={item} index={index} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <InputComponent
          placeholder={'Sreach'}
          onChangeText={setQueryString}
          top={0}
        />
        <FlatList
          style={styles.flatListStyle}
          data={flattenData}
          extraData={flattenData.length}
          onEndReached={() => fetchNextPage()}
          renderItem={renderItem}
          onRefresh={refetch}
          refreshing={isRefetching}
          keyExtractor={(item, index) => `flattenData_${item.id}_${index}`}
          ListEmptyComponent={<ListEmptyComponent isLoading={isLoading} />}
        />
        <Button
          w={'100%'}
          onPress={() => navigation.navigate('FeedbackScreen')}>
          Give us feedback
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
