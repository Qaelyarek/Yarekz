// Official VAPI Web SDK Integration
import Vapi from '@vapi-ai/web';
import { env, validateVAPIConfig } from '../config/environment';

export interface VAPICallResult {
  success: boolean;
  message: string;
  error?: any;
}

export interface VAPIMessage {
  type: string;
  role?: 'assistant' | 'user' | 'system';
  message?: string;
  transcript?: string;
  timestamp?: string;
}

export interface VAPIMetrics {
  audioLevel?: number;
  isUserSpeaking?: boolean;
  duration?: number;
}

class VAPIService {
  private vapi: Vapi | null = null;
  private assistantId: string;
  private publicKey: string;
  private isInitialized: boolean = false;
  private isConnected: boolean = false;
  private eventListeners: Map<string, Function[]> = new Map();
  private metrics: VAPIMetrics = {};

  constructor() {
    this.assistantId = env.vapiAssistantId;
    this.publicKey = env.vapiPublicKey;
    this.initialize();
  }

  private async initialize(): Promise<void> {
    if (!validateVAPIConfig()) {
      console.error('❌ VAPI configuration invalid');
      return;
    }

    try {
      console.log('🚀 Initializing Official VAPI SDK...');
      
      // Initialize VAPI with public key
      this.vapi = new Vapi(this.publicKey);
      
      // Set up event listeners
      this.setupEventListeners();
      
      this.isInitialized = true;
      console.log('✅ Official VAPI SDK initialized successfully');
      
    } catch (error) {
      console.error('❌ Failed to initialize VAPI SDK:', error);
    }
  }

  private setupEventListeners(): void {
    if (!this.vapi) return;

    // Call lifecycle events
    this.vapi.on('call-start', () => {
      console.log('📞 Call started');
      this.isConnected = true;
      this.emitEvent('call-start');
    });

    this.vapi.on('call-end', () => {
  console.log('Call ended');
      this.isConnected = false;
      this.metrics = {};
      this.emitEvent('call-end', data);
    });

    // Speech and audio events
    this.vapi.on('speech-start', () => {
      console.log('🎤 User speech started');
      this.metrics.isUserSpeaking = true;
      this.emitEvent('speech-start');
    });

    this.vapi.on('speech-end', () => {
      console.log('🎤 User speech ended');
      this.metrics.isUserSpeaking = false;
      this.emitEvent('speech-end');
    });

    // Message events
    this.vapi.on('message', (message: VAPIMessage) => {
      console.log('💬 VAPI message:', message);
      this.emitEvent('message', message);
      
      // Handle specific message types
      if (message.type === 'transcript' && message.role === 'assistant') {
        this.emitEvent('assistant-message', message);
      }
    });

    // Volume level events
    this.vapi.on('volume-level', (volume: number) => {
      this.metrics.audioLevel = volume;
      this.emitEvent('volume-level', volume);
    });

    // Error handling
    this.vapi.on('error', (error: any) => {
      console.error('❌ VAPI error:', error);
      this.emitEvent('error', error);
    });

    // Connection events
    this.vapi.on('connection-status-changed', (status: string) => {
      console.log('🔗 Connection status changed:', status);
      this.emitEvent('connection-status', status);
    });

    console.log('🎧 VAPI event listeners configured');
  }

  // Event management
  private emitEvent(eventName: string, data?: any): void {
    const listeners = this.eventListeners.get(eventName) || [];
    listeners.forEach(listener => {
      try {
        listener(data);
      } catch (error) {
        console.error(`Error in event listener for ${eventName}:`, error);
      }
    });
  }

  public on(eventName: string, callback: Function): void {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, []);
    }
    this.eventListeners.get(eventName)!.push(callback);
  }

  public off(eventName: string, callback: Function): void {
    const listeners = this.eventListeners.get(eventName);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // Core VAPI operations
  public async startCall(phoneNumber?: string): Promise<VAPICallResult> {
    if (!this.vapi || !this.isInitialized) {
      return {
        success: false,
        message: 'VAPI not initialized properly',
      };
    }

    try {
      console.log('🚀 Starting VAPI call...');
      console.log(`  Assistant ID: ${this.assistantId}`);
      console.log(`  Phone Number: ${phoneNumber || 'Web call (microphone)'}`);

      const callConfig: any = {};

      // Add phone number for outbound calls
      if (phoneNumber) {
        callConfig.customer = {
          number: phoneNumber,
        };
      }

      await this.vapi.start(callConfig);

      return {
        success: true,
        message: 'Call started successfully',
      };
    } catch (error) {
      console.error('❌ Failed to start call:', error);
      return {
        success: false,
        message: `Failed to start call: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error,
      };
    }
  }

  public async endCall(): Promise<VAPICallResult> {
    if (!this.vapi) {
      return {
        success: false,
        message: 'VAPI not initialized',
      };
    }

    try {
      await this.vapi.stop();
      console.log('📞 Call ended successfully');
      
      return {
        success: true,
        message: 'Call ended successfully',
      };
    } catch (error) {
      console.error('❌ Failed to end call:', error);
      return {
        success: false,
        message: `Failed to end call: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error,
      };
    }
  }

  // Audio controls
  public setMuted(muted: boolean): void {
    if (!this.vapi) return;
    
    try {
      this.vapi.setMuted(muted);
      console.log(muted ? '🔇 Muted' : '🔊 Unmuted');
    } catch (error) {
      console.error('❌ Failed to set mute state:', error);
    }
  }

  public isMuted(): boolean {
    return this.vapi?.isMuted() || false;
  }

  public toggleMute(): void {
    this.setMuted(!this.isMuted());
  }

  // Send message to assistant
  public async sendMessage(message: string): Promise<void> {
    if (!this.vapi) return;
    
    try {
      await this.vapi.send({
        type: 'add-message',
        message: {
          role: 'user',
          content: message,
        },
      });
      console.log('💬 Message sent:', message);
    } catch (error) {
      console.error('❌ Failed to send message:', error);
    }
  }

  // Status and metrics
  public isCallActive(): boolean {
    return this.isConnected;
  }

  public getMetrics(): VAPIMetrics {
    return { ...this.metrics };
  }

  public getStatus() {
    return {
      initialized: this.isInitialized,
      connected: this.isConnected,
      assistantId: this.assistantId,
      publicKeyHash: this.publicKey ? `${this.publicKey.substring(0, 8)}...` : 'Not set',
      sdkLoaded: !!this.vapi,
      configValid: validateVAPIConfig(),
    };
  }

  // Debug and testing
  public async testConfiguration(): Promise<VAPICallResult> {
    console.log('🔍 Testing VAPI configuration...');
    
    const status = this.getStatus();
    console.table(status);

    if (!status.configValid) {
      return {
        success: false,
        message: 'Configuration invalid. Check environment variables.',
      };
    }

    if (!status.initialized) {
      return {
        success: false,
        message: 'VAPI SDK not initialized properly.',
      };
    }

    return {
      success: true,
      message: 'VAPI configuration is valid and ready.',
    };
  }
}

// Create singleton instance
const vapiService = new VAPIService();

// Global access for debugging
if (typeof window !== 'undefined') {
  (window as any).VAPIService = vapiService;
  (window as any).testVAPI = () => vapiService.testConfiguration();
}

export default vapiService;