// VAPI voice integration service
import { env } from '../config/environment';

// Hardcoded agent ID as specified
const VAPI_ASSISTANT_ID = 'd7f2e641-d690-412d-b8b0-db973ff0d937';

declare global {
  interface Window {
    Vapi: any;
  }
}

class VAPIService {
  private vapi: any = null;
  private publicKey: string;
  private isInitialized: boolean = false;

  constructor() {
    this.publicKey = env.vapiPublicKey || 'your-vapi-public-key'; // You'll need to set this
    this.initializeVapi();
  }

  private initializeVapi(): void {
    if (typeof window === 'undefined' || !window.Vapi) {
      console.warn('VAPI SDK not loaded');
      return;
    }

    try {
      this.vapi = new window.Vapi(this.publicKey);
      this.isInitialized = true;
      console.log('VAPI initialized successfully');
      
      // Set up event listeners
      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to initialize VAPI:', error);
    }
  }

  private setupEventListeners(): void {
    if (!this.vapi) return;

    this.vapi.on('call-start', () => {
      console.log('Call started');
    });

    this.vapi.on('call-end', () => {
      console.log('Call ended');
    });

    this.vapi.on('speech-start', () => {
      console.log('User started speaking');
    });

    this.vapi.on('speech-end', () => {
      console.log('User stopped speaking');
    });

    this.vapi.on('message', (message: any) => {
      console.log('Message received:', message);
    });

    this.vapi.on('error', (error: any) => {
      console.error('VAPI error:', error);
    });
  }

  async startCall(phoneNumber?: string): Promise<{ success: boolean; message: string }> {
    if (!this.isInitialized || !this.vapi) {
      // Try to initialize again
      this.initializeVapi();
      
      if (!this.vapi) {
        return {
          success: false,
          message: 'VAPI not initialized. Please ensure VAPI SDK is loaded.'
        };
      }
    }

    try {
      const callConfig = {
        assistantId: VAPI_ASSISTANT_ID,
        ...(phoneNumber && { customer: { number: phoneNumber } })
      };

      await this.vapi.start(callConfig);
      
      return {
        success: true,
        message: 'Call started successfully'
      };
    } catch (error) {
      console.error('Failed to start call:', error);
      return {
        success: false,
        message: `Failed to start call: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  async endCall(): Promise<void> {
    if (!this.vapi) return;

    try {
      await this.vapi.stop();
      console.log('Call ended successfully');
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  }

  isMuted(): boolean {
    return this.vapi?.isMuted() || false;
  }

  toggleMute(): void {
    if (!this.vapi) return;
    
    if (this.isMuted()) {
      this.vapi.unmute();
    } else {
      this.vapi.mute();
    }
  }

  isCallActive(): boolean {
    return this.vapi?.isCallActive() || false;
  }

  // Get the assistant ID being used
  getAssistantId(): string {
    return VAPI_ASSISTANT_ID;
  }

  // Check if VAPI is properly initialized
  isReady(): boolean {
    return this.isInitialized && !!this.vapi;
  }
}

export default new VAPIService();