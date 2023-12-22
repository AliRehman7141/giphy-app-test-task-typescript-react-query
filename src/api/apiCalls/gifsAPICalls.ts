import {getSearchedGifs, getTrendingGifs} from 'api/methods/gifsAPIs';
import {QueryFunctionContext} from 'react-query';
import {GifData} from 'utils/types';

const useAPICalls = () => {
  const getTrendingGifsCall = async ({pageParam = 1}: QueryFunctionContext) => {
    const res = await getTrendingGifs({offset: pageParam});
    const data: GifData[] = res?.data?.data ?? [];
    return {
      data,
      pagination: res?.data?.pagination ?? {count: 0, offset: 0},
      nextPage: data.length > 0 ? pageParam + 1 : pageParam,
    };
  };

  const getSearchedGifsCall = async ({
    pageParam = 1,
    queryKey,
  }: QueryFunctionContext) => {
    const res = await getSearchedGifs({queryKey, offset: pageParam});
    const data: GifData[] = res?.data?.data ?? [];
    return {
      data,
      pagination: res?.data?.pagination ?? {count: 0, offset: 0},
      nextPage: data.length > 0 ? pageParam + 1 : pageParam,
    };
  };

  return {
    getTrendingGifsCall,
    getSearchedGifsCall,
  };
};
export default useAPICalls;
