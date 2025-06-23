// Global type definitions for the AI-integrated business website

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'lead';
  createdAt: Date;
  lastActive: Date;
}

export interface Lead {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  source: 'website' | 'ai-chat' | 'voice' | 'form';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  interactions: Interaction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Interaction {
  id: string;
  type: 'chat' | 'voice' | 'email' | 'form';
  content: string;
  timestamp: Date;
  aiGenerated: boolean;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface AIService {
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'elevenlabs' | 'azure';
  status: 'active' | 'inactive' | 'error';
  lastUsed: Date;
  usageCount: number;
}

export interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: 'blog' | 'page' | 'email' | 'social';
  aiGenerated: boolean;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  conversions: number;
  conversionRate: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ path: string; views: number }>;
  leadSources: Array<{ source: string; count: number }>;
}

export interface VoiceSettings {
  voiceId: string;
  speed: number;
  pitch: number;
  volume: number;
  language: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  aiProvider?: string;
}