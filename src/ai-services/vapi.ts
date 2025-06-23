// VAPI voice integration service
import { env, validateVAPIConfig } from '../config/environment';

// Using the specified agent ID
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
  private initializationPromise: Promise<void> | null = null;

  constructor() {
    this.publicKey = env.vapiPublicKey;
    this.initializeVapi();
  }

  private async initializeVapi(): Promise<void> {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = new Promise((resolve) => {
      // Wait for DOM to load and VAPI SDK to be available
      const checkAndInit = () => {
        if (typeof window === 'undefined') {
          console.warn('Not in browser environment');
          resolve();
          return;
        }

        if (!window.Vapi) {
          console.warn('VAPI SDK not loaded yet, retrying...');
          setTimeout(checkAndInit, 100);
          return;
        }

        // Validate configuration
        if (!validateVAPIConfig()) {
          console.error('VAPI configuration invalid');
          resolve();
          return;
        }

        try {
          console.log('Initializing VAPI with public key:', this.publicKey.substring(0, 8) + '...');
          this.vapi = new window.Vapi(this.publicKey);
          this.isInitialized = true;
          console.log('✅ VAPI initialized successfully');
          
          // Set up event listeners
          this.setupEventListeners();
          resolve();
        } catch (error) {
          console.error('❌ Failed to initialize VAPI:', error);
          resolve();
        }
      };

      // Start checking immediately, then fallback to DOM ready
      checkAndInit();
      
      // Also try when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndInit);
      }
    });

    return this.initializationPromise;
  }

  private setupEventListeners(): void {
    if (!this.vapi) return;

    this.vapi.on('call-start', () => {
      console.log('📞 VAPI call started');
    });

    this.vapi.on('call-end', () => {
      console.log('📞 VAPI call ended');
    });

    this.vapi.on('speech-start', () => {
      console.log('🎤 User started speaking');
    });

    this.vapi.on('speech-end', () => {
      console.log('🎤 User stopped speaking');
    });

    this.vapi.on('message', (message: any) => {
      console.log('💬 VAPI message received:', message);
    });

    this.vapi.on('error', (error: any) => {
      console.error('❌ VAPI error:', error);
    });

    this.vapi.on('volume-level', (volume: number) => {
      // Handle volume level for UI feedback
      console.log('🔊 Volume level:', volume);
    });
  }

  async startCall(phoneNumber?: string): Promise<{ success: boolean; message: string }> {
    // Ensure VAPI is initialized
    await this.initializeVapi();

    if (!this.isInitialized || !this.vapi) {
      return {
        success: false,
        message: 'VAPI not initialized. Please check your configuration and ensure the VAPI SDK is loaded.'
      };
    }

    try {
      console.log('🚀 Starting VAPI call with assistant:', VAPI_ASSISTANT_ID);
      
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
      console.error('❌ Failed to start VAPI call:', error);
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
      console.log('📞 VAPI call ended successfully');
    } catch (error) {
      console.error('❌ Failed to end VAPI call:', error);
    }
  }

  isMuted(): boolean {
    return this.vapi?.isMuted() || false;
  }

  toggleMute(): void {
    if (!this.vapi) return;
    
    if (this.isMuted()) {
      this.vapi.unmute();
      console.log('🔊 VAPI unmuted');
    } else {
      this.vapi.mute();
      console.log('🔇 VAPI muted');
    }
  }

  isCallActive(): boolean {
    return this.vapi?.isCallActive() || false;
  }

  // Get the assistant ID being used
  getAssistantId(): string {
    return VAPI_ASSISTANT_ID;
  }

  // Get the public key being used (for debugging)
  getPublicKey(): string {
    return this.publicKey.substring(0, 8) + '...';
  }

  // Check if VAPI is properly initialized
  isReady(): boolean {
    return this.isInitialized && !!this.vapi;
  }

  // Get current status for debugging
  getStatus(): {
    initialized: boolean;
    sdkLoaded: boolean;
    publicKeySet: boolean;
    assistantId: string;
  } {
    return {
      initialized: this.isInitialized,
      sdkLoaded: typeof window !== 'undefined' && !!window.Vapi,
      publicKeySet: !!this.publicKey && this.publicKey !== 'your-vapi-public-key',
      assistantId: VAPI_ASSISTANT_ID,
    };
  }
}

// Create and export singleton instance
const vapiService = new VAPIService();

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).VAPIService = vapiService;
}

export default vapiService;