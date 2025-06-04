import 'dotenv/config';

export default {
  name: 'Kiosk Application',
  slug: 'kiosk-client',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'kiosk-client',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  updates: {
    url: 'https://u.expo.dev/[your-project-id]',
  },
  runtimeVersion: '1.0.0',

  android: {
    orientation: 'portrait',

    runtimeVersion: '1.0.0',
    adaptiveIcon: {
      foregroundImage: './assets/images/icon.png',
      backgroundColor: '#0D0F14',
    },
    statusBar: {
      hidden: true,
      translucent: true,
      backgroundColor: 'transparent',
    },
    navigationBar: {
      visible: false,
      backgroundColor: 'transparent',
    },
    edgeToEdgeEnabled: true,
    package: 'com.example.kiosk',
    softwareKeyboardLayoutMode: 'pan',
    statusBarStyle: 'dark',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
    viewport: {
      width: 'device-width',
      initialScale: 1,
      minimumScale: 1,
      maximumScale: 1,
      userScalable: false,
    },
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#0D0F14',
      },
    ],
    'expo-video',
    'expo-localization',
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/Geist-Thin.ttf',
          './assets/fonts/Geist-ExtraLight.ttf',
          './assets/fonts/Geist-Light.ttf',
          './assets/fonts/Geist-Regular.ttf',
          './assets/fonts/Geist-Medium.ttf',
          './assets/fonts/Geist-SemiBold.ttf',
          './assets/fonts/Geist-Bold.ttf',
          './assets/fonts/Geist-ExtraBold.ttf',
          './assets/fonts/Geist-Black.ttf',
        ],
        android: {
          fonts: [
            {
              fontFamily: 'Geist',
              fontDefinitions: [
                { path: './assets/fonts/Geist-Thin.ttf', weight: 100 },
                { path: './assets/fonts/Geist-ExtraLight.ttf', weight: 200 },
                { path: './assets/fonts/Geist-Light.ttf', weight: 300 },
                { path: './assets/fonts/Geist-Regular.ttf', weight: 400 },
                { path: './assets/fonts/Geist-Medium.ttf', weight: 500 },
                { path: './assets/fonts/Geist-SemiBold.ttf', weight: 600 },
                { path: './assets/fonts/Geist-Bold.ttf', weight: 700 },
                { path: './assets/fonts/Geist-ExtraBold.ttf', weight: 800 },
                { path: './assets/fonts/Geist-Black.ttf', weight: 900 },
              ],
            },
          ],
        },
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          usesCleartextTraffic: true,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: 'your-eas-project-id',
    },
    STRAPI_API_URL: process.env.STRAPI_URL,
    STRAPI_API_KEY: process.env.API_TOKEN,
  },
};
