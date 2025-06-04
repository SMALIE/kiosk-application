import axios from 'axios';

import { API_CONFIG } from '@config/api';

const { apiKey: STRAPI_API_KEY, baseURL: STRAPI_API_URL } = API_CONFIG;

export const api = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    Authorization: `Bearer ${STRAPI_API_KEY}`,
  },
});
