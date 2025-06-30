import Vapi from '@vapi-ai/web';

const apiKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;

const vapi = Vapi(apiKey); // v2 expects a string, not an object

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
  vapi.set({ agentId }); // v2 uses `.set()` instead of `.setAgent()`
}

export { vapi, setAssistant };
