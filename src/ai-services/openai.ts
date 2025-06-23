// OpenAI integration service
import { env } from '@config/environment';
import type { ChatMessage } from '@types';

class OpenAIService {
  private apiKey: string;
  private baseUrl: string = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = env.openaiApiKey;
  }

  async generateChatResponse(messages: ChatMessage[]): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'No response generated';
    } catch (error) {
      console.error('OpenAI service error:', error);
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

  async analyzeSentiment(text: string): Promise<'positive' | 'neutral' | 'negative'> {
    try {
      const response = await this.generateChatResponse([
        {
          id: '1',
          role: 'user',
          content: `Analyze the sentiment of this text and respond with only one word: "positive", "neutral", or "negative".\n\nText: ${text}`,
          timestamp: new Date(),
        },
      ]);

      const sentiment = response.toLowerCase().trim();
      if (['positive', 'neutral', 'negative'].includes(sentiment)) {
        return sentiment as 'positive' | 'neutral' | 'negative';
      }
      return 'neutral';
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      return 'neutral';
    }
  }
}

export default new OpenAIService();