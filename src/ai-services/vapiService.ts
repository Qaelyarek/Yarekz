import Vapi from '@vapi-ai/web';

const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY); // ✅ no object

type AgentType = 'max' | 'grace' | 'kyle' | 'squad';

const agentMap: Record<AgentType, string> = {
  max: import.meta.env.VITE_AGENT_MAX,
  grace: import.meta.env.VITE_AGENT_GRACE,
  kyle: import.meta.env.VITE_AGENT_KYLE,
  squad: import.meta.env.VITE_AGENT_SQUAD,
};

function setAssistant(agent: AgentType): void {
  const agentId = agentMap[agent];
  if (!agentId) {
    throw new Error(`Invalid agent name: ${agent}. Available agents: ${Object.keys(agentMap).join(', ')}`);
  }

  // ✅ Use this exact syntax for v2.3.8
  vapi.start(agentId);
}

export { vapi, setAssistant };
export type { AgentType };
