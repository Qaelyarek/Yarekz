import { createVapi } from '@vapi-ai/web';

const vapi = createVapi(import.meta.env.VITE_VAPI_PUBLIC_KEY); // ✅ pass key directly as string

type AgentType = 'max' | 'grace' | 'kyle' | 'squad';

const agentMap: Record<AgentType, string> = {
  max: import.meta.env.VITE_AGENT_MAX,
  grace: import.meta.env.VITE_AGENT_GRACE,
  kyle: import.meta.env.VITE_AGENT_KYLE,
  squad: import.meta.env.VITE_AGENT_SQUAD,
};

function setAssistant(agent: AgentType): void {
  const agentId = agentMap[agent];
  if (!agentId) throw new Error(`Invalid agent name: ${agent}`);
  vapi.set({ agentId }); // ✅ this is valid for v2 only
}

export { vapi, setAssistant };
