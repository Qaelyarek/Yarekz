// VAPI voice integration service
import { env, validateVAPIConfig } from '../config/environment';

declare global {
  interface Window {
    Vapi: any;
  }
}

export interface VAPICallResult {
  success: boolean;
  message: string;
  error?: any;
}

export interface VAPIStatus {
  initialized: boolean;
  sdkLoaded: boolean;
  configValid: boolean;
  connected: boolean;
  assistantId: string;
  publicKeyHash: string;
}

class VAPIService {
  private vapi: any = null;
  private assistantId: string;
  private publicKey: string;
  private isInitialized: boolean = false;
  private isConnected: boolean = false;
  private initializationPromise: Promise<void> | null = null;
  private eventListeners: Map<string, Function[]> = new Map();

  constructor() {
    this.assistantId = env.vapiAssistantId;
    this.publicKey = env.vapiPublicKey;
    
    // Initialize VAPI when service is created
    this.initializeVapi();
  }

  private async initializeVapi(): Promise<void> {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = new Promise((resolve) => {
      const checkAndInit = () => {
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
          console.warn('⚠️ Not in browser environment - VAPI initialization skipped');
          resolve();
          return;
        }

        // Check if VAPI SDK is loaded
        if (!window.Vapi) {
          console.log('⏳ Waiting for VAPI SDK to load...');
          setTimeout(checkAndInit, 100);
          return;
        }

        // Validate configuration
        if (!validateVAPIConfig()) {
          console.error('❌ VAPI configuration validation failed');
          resolve();
          return;
        }

        try {
          console.log('🚀 Initializing VAPI with configuration:');
          console.log(`  - Assistant ID: ${this.assistantId}`);
          console.log(`  - Public Key: ${this.publicKey.substring(0, 8)}...`);
          
          this.vapi = new window.Vapi(this.publicKey);
          this.isInitialized = true;
          
          // Set up event listeners
          this.setupEventListeners();
          
          console.log('✅ VAPI initialized successfully');
          resolve();
        } catch (error) {
          console.error('❌ Failed to initialize VAPI:', error);
          this.handleInitializationError(error);
          resolve();
        }
      };

      // Start checking immediately
      checkAndInit();
      
      // Also set up DOM ready fallback
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndInit);
      }
    });

    return this.initializationPromise;
  }

  private handleInitializationError(error: any): void {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('VAPI Initialization Error Details:', {
      error: errorMessage,
      assistantIdPresent: !!this.assistantId,
      publicKeyPresent: !!this.publicKey,
      sdkLoaded: !!window.Vapi,
    });
  }

  private setupEventListeners(): void {
    if (!this.vapi) return;

    // Call lifecycle events
    this.vapi.on('call-start', () => {
      console.log('📞 VAPI call started');
      this.isConnected = true;
      this.emitEvent('call-start');
    });

    this.vapi.on('call-end', () => {
      console.log('📞 VAPI call ended');
      this.isConnected = false;
      this.emitEvent('call-end');
    });

    // Speech events
    this.vapi.on('speech-start', () => {
      console.log('🎤 User started speaking');
      this.emitEvent('speech-start');
    });

    this.vapi.on('speech-end', () => {
      console.log('🎤 User stopped speaking');
      this.emitEvent('speech-end');
    });

    // Message events
    this.vapi.on('message', (message: any) => {
      console.log('💬 VAPI message:', message);
      this.emitEvent('message', message);
    });

    // Error events
    this.vapi.on('error', (error: any) => {
      console.error('❌ VAPI error:', error);
      this.emitEvent('error', error);
    });

    // Volume events
    this.vapi.on('volume-level', (volume: number) => {
      this.emitEvent('volume-level', volume);
    });

    console.log('🎧 VAPI event listeners configured');
  }

  // Event emitter functionality
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

  async startCall(phoneNumber?: string): Promise<VAPICallResult> {
    try {
      // Ensure VAPI is initialized
      await this.initializeVapi();

      if (!this.isInitialized || !this.vapi) {
        return {
          success: false,
          message: 'VAPI not initialized. Please check your configuration and ensure the VAPI SDK is loaded.',
        };
      }

      // Validate configuration before starting call
      if (!validateVAPIConfig()) {
        return {
          success: false,
          message: 'Invalid VAPI configuration. Please check your environment variables.',
        };
      }

      console.log('🚀 Starting VAPI call with configuration:');
      console.log(`  - Assistant ID: ${this.assistantId}`);
      console.log(`  - Phone Number: ${phoneNumber || 'Web call (microphone)'}`);
      
      const callConfig: any = {
        assistantId: this.assistantId,
      };

      // Add phone number for outbound calls if provided
      if (phoneNumber) {
        callConfig.customer = { number: phoneNumber };
      }

      await this.vapi.start(callConfig);
      
      return {
        success: true,
        message: 'Call started successfully',
      };
    } catch (error) {
      console.error('❌ Failed to start VAPI call:', error);
      return {
        success: false,
        message: `Failed to start call: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error,
      };
    }
  }

  async endCall(): Promise<VAPICallResult> {
    try {
      if (!this.vapi) {
        return {
          success: false,
          message: 'VAPI not initialized',
        };
      }

      await this.vapi.stop();
      console.log('📞 VAPI call ended successfully');
      
      return {
        success: true,
        message: 'Call ended successfully',
      };
    } catch (error) {
      console.error('❌ Failed to end VAPI call:', error);
      return {
        success: false,
        message: `Failed to end call: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error,
      };
    }
  }

  isMuted(): boolean {
    return this.vapi?.isMuted() || false;
  }

  toggleMute(): void {
    if (!this.vapi) return;
    
    try {
      if (this.isMuted()) {
        this.vapi.unmute();
        console.log('🔊 VAPI unmuted');
      } else {
        this.vapi.mute();
        console.log('🔇 VAPI muted');
      }
    } catch (error) {
      console.error('❌ Failed to toggle mute:', error);
    }
  }

  isCallActive(): boolean {
    return this.isConnected && this.vapi?.isCallActive();
  }

  // Get the assistant ID being used
  getAssistantId(): string {
    return this.assistantId || 'Not configured';
  }

  // Get the public key being used (for debugging - masked for security)
  getPublicKeyHash(): string {
    if (!this.publicKey) return 'Not configured';
    return this.publicKey.substring(0, 8) + '...' + this.publicKey.substring(-4);
  }

  // Check if VAPI is properly initialized
  isReady(): boolean {
    return this.isInitialized && !!this.vapi;
  }

  // Get current status for debugging
  getStatus(): VAPIStatus {
    return {
      initialized: this.isInitialized,
      sdkLoaded: typeof window !== 'undefined' && !!window.Vapi,
      configValid: validateVAPIConfig(),
      connected: this.isConnected,
      assistantId: this.getAssistantId(),
      publicKeyHash: this.getPublicKeyHash(),
    };
  }

  // Debug method to test configuration
  async testConfiguration(): Promise<VAPICallResult> {
    console.log('🔍 Testing VAPI configuration...');
    
    const status = this.getStatus();
    console.table(status);

    if (!status.sdkLoaded) {
      return {
        success: false,
        message: 'VAPI SDK not loaded. Check if the script tag is included in your HTML.',
      };
    }

    if (!status.configValid) {
      return {
        success: false,
        message: 'VAPI configuration is invalid. Check your environment variables.',
      };
    }

    if (!status.initialized) {
      return {
        success: false,
        message: 'VAPI not initialized. Check the browser console for errors.',
      };
    }

    return {
      success: true,
      message: 'VAPI configuration is valid and ready to use.',
    };
  }
}

// Create and export singleton instance
const vapiService = new VAPIService();

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).VAPIService = vapiService;
  (window as any).testVAPI = () => vapiService.testConfiguration();
}

export default vapiService;