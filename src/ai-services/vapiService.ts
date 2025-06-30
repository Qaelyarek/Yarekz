import Vapi from '@vapi-ai/web';

// Initialize VAPI client with public key
const vapi = new Vapi({
  apiKey: import.meta.env.VITE_VAPI_PUBLIC_KEY,
});

// Type definition for supported agents
type AgentType = 'max' | 'grace' | 'kyle' | 'squad';

// Configure agent selection functionality
function setAssistant(agent: AgentType): void {
  const agentMap: Record<AgentType, string> = {
    max: import.meta.env.VITE_AGENT_MAX,
    grace: import.meta.env.VITE_AGENT_GRACE,
    kyle: import.meta.env.VITE_AGENT_KYLE,
    squad: import.meta.env.VITE_AGENT_SQUAD,
  };

  const agentId = agentMap[agent];
  if (!agentId) throw new Error(`Invalid agent name: ${agent}`);
  vapi.setAgent({ agentId });
}

// Usage in components:
// 1. Import the service:
//    import { vapi, setAssistant } from '@/ai-services/vapiService';
//
// 2. Initialize agent in useEffect:
//    useEffect(() => {
//      setAssistant('grace');
//      vapi.start();
//    }, []);
//
// 3. Optional: Implement agent switching:
//    const handleChangeAgent = (agent: AgentType) => {
//      setAssistant(agent);
//      vapi.start();
//    };

export { vapi, setAssistant };
export type { AgentType };