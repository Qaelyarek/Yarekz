// Environment configuration and validation

interface EnvironmentConfig {
  // AI Services
  openaiApiKey: string;
  anthropicApiKey: string;
  googleAiApiKey: string;
  
  // Voice Services
  elevenlabsApiKey: string;
  azureSpeechKey: string;
  azureSpeechRegion: string;
  
  // Analytics
  googleAnalyticsId: string;
  facebookPixelId: string;
  
  // Lead Management
  hubspotApiKey: string;
  mailchimpApiKey: string;
  
  // Database
  supabaseUrl: string;
  supabaseAnonKey: string;
  
  // App Settings
  appEnv: 'development' | 'staging' | 'production';
  apiBaseUrl: string;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue;
  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} is not set`);
  }
  return value || '';
};

export const env: EnvironmentConfig = {
  // AI Services
  openaiApiKey: getEnvVar('VITE_OPENAI_API_KEY'),
  anthropicApiKey: getEnvVar('VITE_ANTHROPIC_API_KEY'),
  googleAiApiKey: getEnvVar('VITE_GOOGLE_AI_API_KEY'),
  
  // Voice Services
  elevenlabsApiKey: getEnvVar('VITE_ELEVENLABS_API_KEY'),
  azureSpeechKey: getEnvVar('VITE_AZURE_SPEECH_KEY'),
  azureSpeechRegion: getEnvVar('VITE_AZURE_SPEECH_REGION'),
  
  // Analytics
  googleAnalyticsId: getEnvVar('VITE_GOOGLE_ANALYTICS_ID'),
  facebookPixelId: getEnvVar('VITE_FACEBOOK_PIXEL_ID'),
  
  // Lead Management
  hubspotApiKey: getEnvVar('VITE_HUBSPOT_API_KEY'),
  mailchimpApiKey: getEnvVar('VITE_MAILCHIMP_API_KEY'),
  
  // Database
  supabaseUrl: getEnvVar('VITE_SUPABASE_URL'),
  supabaseAnonKey: getEnvVar('VITE_SUPABASE_ANON_KEY'),
  
  // App Settings
  appEnv: (getEnvVar('VITE_APP_ENV', 'development') as any),
  apiBaseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3000'),
};

export const isDevelopment = env.appEnv === 'development';
export const isProduction = env.appEnv === 'production';
export const isStaging = env.appEnv === 'staging';