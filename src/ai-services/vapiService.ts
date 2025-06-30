import { createVapi } from '@vapi-ai/web';

// Initialize VAPI client with public key using new SDK pattern
const vapi = createVapi({
  apiKey: import.meta.env.VITE_VAPI_PUBLIC_KEY,
});

// Type definition for supported agents
type AgentType = 'max' | 'grace' | 'kyle' | 'squad';

// Agent configuration interface
interface AgentConfig {
  agentId?: string;
  // Add other agent configuration properties as needed
}

// Configure agent selection functionality
function setAssistant(agent: AgentType): void {
  const agentMap: Record<AgentType, string> = {
    max: import.meta.env.VITE_AGENT_MAX,
    grace: import.meta.env.VITE_AGENT_GRACE,
    kyle: import.meta.env.VITE_AGENT_KYLE,
    squad: import.meta.env.VITE_AGENT_SQUAD,
  };

  const agentId = agentMap[agent];
  if (!agentId) {
    throw new Error(`Invalid agent name: ${agent}. Available agents: ${Object.keys(agentMap).join(', ')}`);
  }

  // Use new SDK pattern for agent configuration
  try {
    vapi.agent.set({
      agentId,
    } as AgentConfig);
  } catch (error) {
    console.error(`Failed to set agent ${agent}:`, error);
    throw new Error(`Failed to configure agent ${agent}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Enhanced error handling for VAPI operations
async function startCall(agent?: AgentType): Promise<void> {
  try {
    if (agent) {
      setAssistant(agent);
    }
    await vapi.start();
  } catch (error) {
    console.error('Failed to start VAPI call:', error);
    throw error;
  }
}

async function endCall(): Promise<void> {
  try {
    await vapi.stop();
  } catch (error) {
    console.error('Failed to end VAPI call:', error);
    throw error;
  }
}

// Validation function for environment variables
function validateVapiConfig(): boolean {
  const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
  
  if (!publicKey) {
    console.error('VITE_VAPI_PUBLIC_KEY is not set in environment variables');
    return false;
  }

  const agentIds = [
    import.meta.env.VITE_AGENT_MAX,
    import.meta.env.VITE_AGENT_GRACE,
    import.meta.env.VITE_AGENT_KYLE,
    import.meta.env.VITE_AGENT_SQUAD,
  ];

  const missingAgents = agentIds.filter(id => !id);
  if (missingAgents.length > 0) {
    console.warn('Some agent IDs are missing from environment variables');
  }

  return true;
}

// Usage in components:
// 1. Import the service:
//    import { vapi, setAssistant, startCall, endCall } from '@/ai-services/vapiService';
//
// 2. Initialize agent in useEffect:
//    useEffect(() => {
//      if (validateVapiConfig()) {
//        startCall('grace');
//      }
//    }, []);
//
// 3. Optional: Implement agent switching:
//    const handleChangeAgent = (agent: AgentType) => {
//      startCall(agent);
//    };
//
// 4. End call:
//    const handleEndCall = () => {
//      endCall();
//    };

export { 
  vapi, 
  setAssistant, 
  startCall, 
  endCall, 
  validateVapiConfig 
};
export type { AgentType, AgentConfig };