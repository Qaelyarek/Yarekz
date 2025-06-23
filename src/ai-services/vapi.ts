// VAPI voice integration service
import { env } from '../config/environment';

class VAPIService {
  private assistantId: string;
  private publicKey: string;
  private baseUrl: string = 'https://api.vapi.ai';

  constructor() {
    this.assistantId = env.vapiAssistantId;
    this.publicKey = env.vapiPublicKey;
  }

  async startCall(phoneNumber?: string): Promise<{ callId: string; status: string }> {
    if (!this.assistantId || !this.publicKey) {
      throw new Error('VAPI credentials not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/call`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.publicKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistantId: this.assistantId,
          customer: phoneNumber ? { number: phoneNumber } : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`VAPI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        callId: data.id,
        status: data.status,
      };
    } catch (error) {
      console.error('VAPI service error:', error);
      throw error;
    }
  }

  async getCallStatus(callId: string): Promise<any> {
    if (!this.publicKey) {
      throw new Error('VAPI public key not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/call/${callId}`, {
        headers: {
          'Authorization': `Bearer ${this.publicKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`VAPI API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('VAPI get call status error:', error);
      throw error;
    }
  }

  async endCall(callId: string): Promise<void> {
    if (!this.publicKey) {
      throw new Error('VAPI public key not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/call/${callId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.publicKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'ended',
        }),
      });

      if (!response.ok) {
        throw new Error(`VAPI API error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('VAPI end call error:', error);
      throw error;
    }
  }

  // Initialize VAPI web client for browser-based calls
  initializeWebClient(): void {
    if (typeof window === 'undefined') return;

    // This would initialize the VAPI web SDK
    // You'll need to include their script in your HTML or install their package
    console.log('Initializing VAPI web client with assistant:', this.assistantId);
  }
}

export default new VAPIService();