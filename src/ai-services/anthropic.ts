// Anthropic integration service
import { env } from '@config/environment';
import type { ChatMessage } from '@types';

class AnthropicService {
  private apiKey: string;
  private baseUrl: string = 'https://api.anthropic.com/v1';

  constructor() {
    this.apiKey = env.anthropicApiKey;
  }

  async generateChatResponse(messages: ChatMessage[]): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Anthropic API key not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1000,
          messages: messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.content[0]?.text || 'No response generated';
    } catch (error) {
      console.error('Anthropic service error:', error);
      throw error;
    }
  }

  async generateContent(prompt: string, type: 'blog' | 'email' | 'social'): Promise<string> {
    const systemPrompts = {
      blog: 'You are a professional blog writer. Create engaging, SEO-optimized content.',
      email: 'You are an email marketing expert. Create compelling email content that drives action.',
      social: 'You are a social media expert. Create engaging posts that drive engagement.',
    };

    const messages: ChatMessage[] = [
      {
        id: '1',
        role: 'user',
        content: `${systemPrompts[type]}\n\nPrompt: ${prompt}`,
        timestamp: new Date(),
      },
    ];

    return this.generateChatResponse(messages);
  }
}

export default new AnthropicService();