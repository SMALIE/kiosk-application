import Constants from 'expo-constants';

interface ApiConfig {
  baseURL: string;
  apiKey?: string;
}

const getApiConfig = (): ApiConfig => {
  const strapiUrl = Constants.expoConfig?.extra?.STRAPI_API_URL;
  const apiKey = Constants.expoConfig?.extra?.STRAPI_API_KEY;

  const fallbackUrl = __DEV__ ? 'http://localhost:1337' : 'https://api.example.com';

  return {
    baseURL: strapiUrl || fallbackUrl,
    apiKey,
  };
};

export const API_CONFIG = getApiConfig();
