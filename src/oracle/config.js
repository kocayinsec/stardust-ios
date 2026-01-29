export const oracleConfig = {
  mode: process.env.EXPO_PUBLIC_ORACLE_MODE || (__DEV__ ? 'mock' : 'real'),
  baseUrl: process.env.EXPO_PUBLIC_ORACLE_API_BASE_URL || '',
  apiKey: process.env.EXPO_PUBLIC_ORACLE_API_KEY || '',
  timeoutMs: Number(process.env.EXPO_PUBLIC_ORACLE_API_TIMEOUT_MS || 15000),
  appId: process.env.EXPO_PUBLIC_ORACLE_APP_ID || 'stardust-app',
};
