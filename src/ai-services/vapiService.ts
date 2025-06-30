import Vapi from '@vapi-ai/web'; // ⬅️ Default import, not destructured

// ✅ Instantiate using `new Vapi()` with config object
const vapi = new Vapi({ apiKey: import.meta.env.VITE_VAPI_PUBLIC_KEY });

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
    throw new Error(
      `Invalid agent name: ${agent}. Available agents: ${Object.keys(agentMap).join(', ')}`
    );
  }

  // ✅ Correct method is `start`, not `set`
  vapi.start({
    assistantId: agentId,
  });
}

export { vapi, setAssistant };
export type { AgentType };
