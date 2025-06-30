// Environment configuration and validation

interface EnvironmentConfig {
  // VAPI Configuration
  vapiApiKey: string;
  vapiAssistantId: string;
  vapiPublicKey: string;
  vapiEndpoint: string;
  callWebhookUrl: string;
  
  // VAPI Agents
  vapiAgentMax: string;
  vapiAgentGrace: string;
  vapiAgentKyle: string;
  vapiAgentSquad: string;
  
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
  // VAPI Configuration
  vapiApiKey: getEnvVar('VITE_VAPI_API_KEY'),
  vapiAssistantId: getEnvVar('VITE_VAPI_ASSISTANT_ID'),
  vapiPublicKey: getEnvVar('VITE_VAPI_PUBLIC_KEY'),
  vapiEndpoint: getEnvVar('VITE_VAPI_ENDPOINT', 'https://api.vapi.ai'),
  callWebhookUrl: getEnvVar('VITE_CALL_WEBHOOK_URL'),
  
  // VAPI Agents
  vapiAgentMax: getEnvVar('VITE_AGENT_MAX'),
  vapiAgentGrace: getEnvVar('VITE_AGENT_GRACE'),
  vapiAgentKyle: getEnvVar('VITE_AGENT_KYLE'),
  vapiAgentSquad: getEnvVar('VITE_AGENT_SQUAD'),
  
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

// VAPI specific validation
export const validateVAPIConfig = (): boolean => {
  const assistantId = env.vapiAssistantId;
  const publicKey = env.vapiPublicKey;
  
  if (!assistantId || assistantId === 'your_vapi_assistant_id_here') {
    console.error('❌ VAPI Assistant ID not configured properly');
    return false;
  }
  
  if (!publicKey || publicKey === 'your_vapi_public_key_here') {
    console.error('❌ VAPI Public Key not configured properly');
    return false;
  }
  
  // Basic format validation for UUID-like strings
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  if (!uuidRegex.test(assistantId)) {
    console.warn('⚠️ VAPI Assistant ID format appears invalid (expected UUID format)');
  }
  
  if (!uuidRegex.test(publicKey)) {
    console.warn('⚠️ VAPI Public Key format appears invalid (expected UUID format)');
  }
  
  console.log('✅ VAPI configuration validated successfully');
  return true;
};

// Validate Squad agent configuration specifically
export const validateSquadAgentConfig = (): boolean => {
  const squadAgentId = env.vapiAgentSquad;
  
  if (!squadAgentId || squadAgentId === 'your_squad_agent_id_here') {
    console.error('❌ Squad Agent ID not configured properly');
    return false;
  }
  
  // Basic format validation for UUID-like strings
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
  if (!uuidRegex.test(squadAgentId)) {
    console.warn('⚠️ Squad Agent ID format appears invalid (expected UUID format)');
  }
  
  console.log('✅ Squad Agent configuration validated successfully');
  return true;
};

// Environment validation helper
export const validateRequiredEnvVars = () => {
  const requiredForProduction = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
  ];

  const requiredForVAPI = [
    'VITE_VAPI_ASSISTANT_ID',
    'VITE_VAPI_PUBLIC_KEY',
  ];

  if (isProduction) {
    const missing = requiredForProduction.filter(key => !getEnvVar(key));
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
  }

  // Validate VAPI configuration
  const missingVAPI = requiredForVAPI.filter(key => !getEnvVar(key));
  if (missingVAPI.length > 0) {
    console.warn(`VAPI functionality will be limited. Missing: ${missingVAPI.join(', ')}`);
  }
};

// Export validation status
export const envValidation = {
  isVAPIConfigured: validateVAPIConfig(),
  isSquadAgentConfigured: validateSquadAgentConfig(),
  isDevelopment,
  isProduction,
  isStaging,
};