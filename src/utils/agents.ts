// Utility functions for agent management and validation

import { env } from '../config/environment';
import type { AgentType, VAPIAgent } from '../types';

/**
 * Available VAPI agent configurations
 */
export const AGENT_CONFIGS: Record<AgentType, VAPIAgent> = {
  max: {
    id: env.vapiAgentMax || '',
    name: 'Max',
    type: 'max',
    description: 'General purpose AI assistant for customer interactions',
    capabilities: ['customer_support', 'lead_qualification', 'appointment_scheduling'],
    isActive: Boolean(env.vapiAgentMax),
  },
  grace: {
    id: env.vapiAgentGrace || '',
    name: 'Grace',
    type: 'grace',
    description: 'Specialized assistant for business coaching and consultation',
    capabilities: ['business_coaching', 'consultation', 'strategic_planning'],
    isActive: Boolean(env.vapiAgentGrace),
  },
  kyle: {
    id: env.vapiAgentKyle || '',
    name: 'Kyle',
    type: 'kyle',
    description: 'Technical support and product specialist',
    capabilities: ['technical_support', 'product_information', 'troubleshooting'],
    isActive: Boolean(env.vapiAgentKyle),
  },
  squad: {
    id: env.vapiAgentSquad || '',
    name: 'Squad',
    type: 'squad',
    description: 'Team-based AI agent for complex multi-step processes',
    capabilities: ['team_collaboration', 'complex_workflows', 'multi_agent_coordination'],
    isActive: Boolean(env.vapiAgentSquad),
  },
};

/**
 * Validate if an agent type has proper configuration
 */
export const validateAgentConfig = (agentType: AgentType): boolean => {
  const agent = AGENT_CONFIGS[agentType];
  return Boolean(agent?.id && agent.id !== `your_${agentType}_agent_id_here`);
};

/**
 * Get agent configuration by type
 */
export const getAgentConfig = (agentType: AgentType): VAPIAgent | null => {
  const agent = AGENT_CONFIGS[agentType];
  return agent?.isActive ? agent : null;
};

/**
 * Get all available (configured) agents
 */
export const getAvailableAgents = (): VAPIAgent[] => {
  return Object.values(AGENT_CONFIGS).filter(agent => agent.isActive);
};

/**
 * Check if any agents are configured
 */
export const hasAnyAgentsConfigured = (): boolean => {
  return getAvailableAgents().length > 0;
};

/**
 * Get agent name for display purposes
 */
export const getAgentDisplayName = (agentType: AgentType): string => {
  const agent = AGENT_CONFIGS[agentType];
  return agent?.name || agentType.charAt(0).toUpperCase() + agentType.slice(1);
};

/**
 * Get agent description
 */
export const getAgentDescription = (agentType: AgentType): string => {
  const agent = AGENT_CONFIGS[agentType];
  return agent?.description || 'AI assistant for customer interactions';
};

/**
 * Check if specific agent is available for use
 */
export const isAgentAvailable = (agentType: AgentType): boolean => {
  return validateAgentConfig(agentType) && Boolean(AGENT_CONFIGS[agentType]?.isActive);
};

/**
 * Generate agent error message for debugging
 */
export const getAgentErrorMessage = (agentType: AgentType): string => {
  const agent = AGENT_CONFIGS[agentType];
  
  if (!agent?.id) {
    return `${agentType.toUpperCase()} agent ID not found in environment variables. Please set VITE_AGENT_${agentType.toUpperCase()}.`;
  }
  
  if (agent.id === `your_${agentType}_agent_id_here`) {
    return `${agentType.toUpperCase()} agent ID is set to placeholder value. Please update VITE_AGENT_${agentType.toUpperCase()} with actual agent ID.`;
  }
  
  if (!agent.isActive) {
    return `${agentType.toUpperCase()} agent is not active. Please check configuration.`;
  }
  
  return `${agentType.toUpperCase()} agent configuration is valid.`;
};