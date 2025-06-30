import { createVapi } from '@vapi-ai/web';

const vapi = createVapi({
  apiKey: import.meta.env.VITE_VAPI_PUBLIC_KEY,
});

type AgentType = 'max' | 'grace' | 'kyle' | 'squad';

const agentMap: Record<AgentType, string> = {
  max: import.meta.env.VITE_AGENT_MAX,
  grace: import.meta.env.VITE_AGENT_GRACE,
  kyle: import.meta.env.VITE_AGENT_KYLE,
  squad: import.meta.env.VITE_AGENT_SQUAD,
};

function setAssistant(agent: AgentType) {
  const agentId = agentMap[agent];
  if (!agentId) throw new Error(`Invalid agent name: ${agent}`);
  vapi.setAgent({ agentId });
}

export { vapi, setAssistant };
