import Vapi from '@vapi-ai/web';

// Initialize VAPI client with public key
const vapi = createVapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

// Type definition for supported agents
type AgentType = 'max' | 'grace' | 'kyle' | 'squad';

// Agent configuration mapping
const agentMap: Record<AgentType, string> = {
  max: import.meta.env.VITE_AGENT_MAX,
  grace: import.meta.env.VITE_AGENT_GRACE,
  kyle: import.meta.env.VITE_AGENT_KYLE,
  squad: import.meta.env.VITE_AGENT_SQUAD,
};

// Configure agent selection functionality
function setAssistant(agent: AgentType): void {
  const agentId = agentMap[agent];
  if (!agentId) {
    throw new Error(`Invalid agent name: ${agent}. Available agents: ${Object.keys(agentMap).join(', ')}`);
  }
  
  // Use the correct method to set the agent
  vapi.start({
    assistantId: agentId
  });
}

// Export the vapi instance and helper functions
export { vapi, setAssistant };
export type { AgentType };