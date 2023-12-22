import {client} from './config';

export const getRequest = (url, extras = {}) => client.get(url, extras);

export const postRequest = (url, payload = {}) => client.post(url, payload);

export const patchRequest = (url, payload = {}, extras = {}) =>
  client.patch(url, payload, extras);

export const putRequest = (url, payload = {}) => client.put(url, payload);

export const deleteRequest = (url, payload = {}) =>
  client.delete(url, {payload});
