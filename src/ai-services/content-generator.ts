// AI-powered content generation service
import OpenAIService from './openai';
import type { ContentItem } from '@types/index';

class ContentGenerator {
  async generateBlogPost(topic: string, keywords: string[]): Promise<Partial<ContentItem>> {
    const prompt = `Write a comprehensive blog post about "${topic}". 
    Include these keywords naturally: ${keywords.join(', ')}.
    Structure: Introduction, 3-4 main sections, conclusion.
    Make it engaging, informative, and SEO-optimized.
    Target length: 800-1200 words.`;

    const content = await OpenAIService.generateContent(prompt, 'blog');
    
    return {
      title: `${topic} - Complete Guide`,
      content,
      type: 'blog',
      aiGenerated: true,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async generateEmailSequence(purpose: string, audience: string): Promise<Partial<ContentItem>[]> {
    const emails = [];
    const emailTypes = ['welcome', 'value', 'social-proof', 'offer', 'urgency'];

    for (const type of emailTypes) {
      const prompt = `Create a ${type} email for ${purpose} targeting ${audience}.
      Make it compelling, personal, and action-oriented.
      Include subject line and email body.
      Keep it concise but effective.`;

      const content = await OpenAIService.generateContent(prompt, 'email');
      
      emails.push({
        title: `${purpose} - ${type.charAt(0).toUpperCase() + type.slice(1)} Email`,
        content,
        type: 'email' as const,
        aiGenerated: true,
        status: 'draft' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return emails;
  }

  async generateSocialMediaPosts(topic: string, platforms: string[]): Promise<Partial<ContentItem>[]> {
    const posts = [];

    for (const platform of platforms) {
      const prompt = `Create a ${platform} post about "${topic}".
      Follow ${platform} best practices for engagement.
      Include relevant hashtags and call-to-action.
      Make it platform-specific and engaging.`;

      const content = await OpenAIService.generateContent(prompt, 'social');
      
      posts.push({
        title: `${topic} - ${platform} Post`,
        content,
        type: 'social' as const,
        aiGenerated: true,
        status: 'draft' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return posts;
  }

  async optimizeContent(content: string, purpose: 'seo' | 'conversion' | 'engagement'): Promise<string> {
    const prompts = {
      seo: 'Optimize this content for SEO. Improve keyword density, readability, and structure.',
      conversion: 'Optimize this content for conversions. Add compelling CTAs and persuasive elements.',
      engagement: 'Optimize this content for engagement. Make it more interactive and shareable.',
    };

    const prompt = `${prompts[purpose]}\n\nOriginal content:\n${content}`;
    
    return await OpenAIService.generateContent(prompt, 'blog');
  }

  async generatePersonalizedContent(template: string, userData: Record<string, any>): Promise<string> {
    const prompt = `Personalize this content template with the provided user data.
    Make it feel natural and relevant to the specific user.
    
    Template: ${template}
    User Data: ${JSON.stringify(userData, null, 2)}`;

    return await OpenAIService.generateContent(prompt, 'email');
  }
}

export default new ContentGenerator();