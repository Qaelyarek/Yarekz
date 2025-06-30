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

export interface VAPICallState {
  inCall: boolean;
  isConnecting: boolean;
  callDuration: number;
  callStartTime?: Date;
}

class VAPIService {
  private vapi: Vapi | null = null;
  private assistantId: string;
  private publicKey: string;
  private isInitialized: boolean = false;
  private eventListeners: Map<string, Function[]> = new Map();
  private metrics: VAPIMetrics = {};
  
  // Call state management
  private callState: VAPICallState = {
    inCall: false,
    isConnecting: false,
    callDuration: 0,
    callStartTime: undefined,
  };
  
  private callTimer: NodeJS.Timeout | null = null;

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

    // Call lifecycle events - handle both old and new event names
    this.vapi.on('call-start', () => this.handleCallStarted());
    this.vapi.on('callStarted', () => this.handleCallStarted());
    
    this.vapi.on('call-end', () => this.handleCallEnded());
    this.vapi.on('callEnded', () => this.handleCallEnded());

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
    this.vapi.on('connection-status-changed' as any, (status: string) => {
      console.log('🔗 Connection status:', status);
      this.emitEvent('connection-status', status);
    });

    console.log('🎧 VAPI event listeners configured');
  }

  private handleCallStarted(): void {
    console.log('📞 Call started - updating state');
    
    this.callState.inCall = true;
    this.callState.isConnecting = false;
    this.callState.callStartTime = new Date();
    this.callState.callDuration = 0;
    
    // Start call duration timer
    this.startCallTimer();
    
    this.emitEvent('call-start');
    this.emitEvent('call-state-changed', this.callState);
  }

  private handleCallEnded(): void {
    console.log('📞 Call ended - updating state');
    
    this.callState.inCall = false;
    this.callState.isConnecting = false;
    this.callState.callStartTime = undefined;
    this.callState.callDuration = 0;
    
    // Stop call duration timer
    this.stopCallTimer();
    
    // Reset metrics
    this.metrics = {};
    
    this.emitEvent('call-end');
    this.emitEvent('call-state-changed', this.callState);
  }

  private startCallTimer(): void {
    this.stopCallTimer(); // Clear any existing timer
    
    this.callTimer = setInterval(() => {
      if (this.callState.inCall && this.callState.callStartTime) {
        this.callState.callDuration = Math.floor(
          (Date.now() - this.callState.callStartTime.getTime()) / 1000
        );
        this.emitEvent('call-duration-updated', this.callState.callDuration);
      }
    }, 1000);
  }

  private stopCallTimer(): void {
    if (this.callTimer) {
      clearInterval(this.callTimer);
      this.callTimer = null;
    }
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

      // Update state to connecting
      this.callState.isConnecting = true;
      this.emitEvent('call-state-changed', this.callState);

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
      
      // Reset connecting state on error
      this.callState.isConnecting = false;
      this.emitEvent('call-state-changed', this.callState);
      
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
    return this.callState.inCall;
  }

  public isConnecting(): boolean {
    return this.callState.isConnecting;
  }

  public getCallState(): VAPICallState {
    return { ...this.callState };
  }

  public getMetrics(): VAPIMetrics {
    return { ...this.metrics };
  }

  public getCallDuration(): number {
    return this.callState.callDuration;
  }

  public formatCallDuration(): string {
    const duration = this.callState.callDuration;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  public getStatus() {
    return {
      initialized: this.isInitialized,
      connected: this.callState.inCall,
      connecting: this.callState.isConnecting,
      assistantId: this.assistantId,
      publicKeyHash: this.publicKey ? `${this.publicKey.substring(0, 8)}...` : 'Not set',
      sdkLoaded: !!this.vapi,
      configValid: validateVAPIConfig(),
      callState: this.callState,
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

  // Cleanup
  public destroy(): void {
    this.stopCallTimer();
    this.eventListeners.clear();
    if (this.vapi) {
      try {
        this.vapi.stop();
      } catch (error) {
        console.error('Error stopping VAPI during cleanup:', error);
      }
    }
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