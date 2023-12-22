import {getRequest} from 'api';
import {API_KEY} from 'api/config';
import {GIFS_PER_PAGE_RESPONSE_SIZE} from 'utils/constants';
import {APIParams} from 'utils/types';

const manageParams = (payload: APIParams) => {
  let endpoint = `&limit=${GIFS_PER_PAGE_RESPONSE_SIZE}&offset=${payload.offset}`;
  if (Array.isArray(payload.queryKey)) {
    payload.queryKey.forEach(iterator => {
      if (iterator && typeof iterator === 'object') {
        Object.keys(iterator).forEach(key => {
          if (iterator[key]) {
            endpoint += `&${encodeURIComponent(key)}=${encodeURIComponent(
              iterator[key],
            )}`;
          }
        });
      }
    });
  }
  return endpoint;
};

export const getTrendingGifs = (payload: APIParams) => {
  return getRequest(`/trending?api_key=${API_KEY}&${manageParams(payload)}`);
};

export const getSearchedGifs = (payload: APIParams) =>
  getRequest(`/search?api_key=${API_KEY}&${manageParams(payload)}`);
