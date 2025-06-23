// AI-powered lead analysis and scoring
import OpenAIService from './openai';
import type { Lead, Interaction } from '@types';

class LeadAnalyzer {
  async analyzeLead(lead: Lead): Promise<{
    score: number;
    insights: string[];
    recommendations: string[];
    nextActions: string[];
  }> {
    const interactionSummary = lead.interactions
      .map(i => `${i.type}: ${i.content.substring(0, 100)}...`)
      .join('\n');

    const prompt = `Analyze this lead and provide insights:
    
    Lead Info:
    - Email: ${lead.email}
    - Name: ${lead.name || 'Unknown'}
    - Source: ${lead.source}
    - Status: ${lead.status}
    - Current Score: ${lead.score}
    
    Interactions:
    ${interactionSummary}
    
    Provide:
    1. Updated lead score (0-100)
    2. Key insights about the lead
    3. Recommendations for engagement
    4. Next actions to take
    
    Format as JSON with keys: score, insights, recommendations, nextActions`;

    try {
      const response = await OpenAIService.generateContent(prompt, 'blog');
      const analysis = JSON.parse(response);
      
      return {
        score: Math.min(100, Math.max(0, analysis.score || lead.score)),
        insights: Array.isArray(analysis.insights) ? analysis.insights : [],
        recommendations: Array.isArray(analysis.recommendations) ? analysis.recommendations : [],
        nextActions: Array.isArray(analysis.nextActions) ? analysis.nextActions : [],
      };
    } catch (error) {
      console.error('Lead analysis error:', error);
      return {
        score: lead.score,
        insights: ['Analysis temporarily unavailable'],
        recommendations: ['Manual review recommended'],
        nextActions: ['Contact lead directly'],
      };
    }
  }

  async categorizeInteraction(interaction: Interaction): Promise<{
    category: string;
    intent: string;
    urgency: 'low' | 'medium' | 'high';
    sentiment: 'positive' | 'neutral' | 'negative';
  }> {
    const prompt = `Analyze this customer interaction:
    
    Type: ${interaction.type}
    Content: ${interaction.content}
    
    Categorize and analyze:
    1. Category (inquiry, complaint, interest, support, etc.)
    2. Intent (what does the customer want?)
    3. Urgency level (low/medium/high)
    4. Sentiment (positive/neutral/negative)
    
    Format as JSON with keys: category, intent, urgency, sentiment`;

    try {
      const response = await OpenAIService.generateContent(prompt, 'blog');
      const analysis = JSON.parse(response);
      
      return {
        category: analysis.category || 'general',
        intent: analysis.intent || 'unknown',
        urgency: ['low', 'medium', 'high'].includes(analysis.urgency) ? analysis.urgency : 'medium',
        sentiment: await OpenAIService.analyzeSentiment(interaction.content),
      };
    } catch (error) {
      console.error('Interaction analysis error:', error);
      return {
        category: 'general',
        intent: 'unknown',
        urgency: 'medium',
        sentiment: 'neutral',
      };
    }
  }

  async generateFollowUpMessage(lead: Lead, context: string): Promise<string> {
    const prompt = `Generate a personalized follow-up message for this lead:
    
    Lead: ${lead.name || lead.email}
    Status: ${lead.status}
    Score: ${lead.score}
    Source: ${lead.source}
    Context: ${context}
    
    Recent interactions:
    ${lead.interactions.slice(-3).map(i => `- ${i.content.substring(0, 100)}...`).join('\n')}
    
    Create a professional, personalized follow-up message that:
    - References their previous interactions
    - Provides value
    - Has a clear call-to-action
    - Matches their engagement level`;

    return await OpenAIService.generateContent(prompt, 'email');
  }

  async identifyUpsellOpportunities(lead: Lead): Promise<string[]> {
    const prompt = `Based on this lead's profile and interactions, identify potential upsell opportunities:
    
    Lead Profile:
    - Status: ${lead.status}
    - Score: ${lead.score}
    - Source: ${lead.source}
    
    Interactions:
    ${lead.interactions.map(i => `- ${i.content.substring(0, 150)}...`).join('\n')}
    
    Suggest specific upsell opportunities based on their interests and engagement.
    Return as a JSON array of opportunity descriptions.`;

    try {
      const response = await OpenAIService.generateContent(prompt, 'blog');
      const opportunities = JSON.parse(response);
      return Array.isArray(opportunities) ? opportunities : [];
    } catch (error) {
      console.error('Upsell analysis error:', error);
      return [];
    }
  }
}

export default new LeadAnalyzer();