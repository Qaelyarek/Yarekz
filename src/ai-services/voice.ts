// Voice integration service using ElevenLabs and Azure Speech
import { env } from '../config/environment';
import type { VoiceSettings } from '../types/index';

class VoiceService {
  private elevenlabsApiKey: string;
  // Note: Azure Speech variables temporarily commented out to avoid unused variable errors
  // private azureSpeechKey: string;
  // private azureSpeechRegion: string;

  constructor() {
    this.elevenlabsApiKey = env.elevenlabsApiKey;
    // this.azureSpeechKey = env.azureSpeechKey;
    // this.azureSpeechRegion = env.azureSpeechRegion;
  }

  async textToSpeech(text: string, settings: VoiceSettings): Promise<Blob> {
    if (!this.elevenlabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${settings.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.elevenlabsApiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.0,
            use_speaker_boost: true,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Text-to-speech error:', error);
      throw error;
    }
  }

  async speechToText(audioBlob: Blob): Promise<string> {
    // This would typically use Azure Speech Services or similar
    // For now, return a placeholder
    console.log('Speech-to-text processing:', audioBlob);
    return 'Speech recognition not yet implemented';
  }

  async getAvailableVoices(): Promise<Array<{ id: string; name: string; preview_url?: string }>> {
    if (!this.elevenlabsApiKey) {
      return [];
    }

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': this.elevenlabsApiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.voices.map((voice: any) => ({
        id: voice.voice_id,
        name: voice.name,
        preview_url: voice.preview_url,
      }));
    } catch (error) {
      console.error('Get voices error:', error);
      return [];
    }
  }

  playAudio(audioBlob: Blob): void {
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play().catch(error => {
      console.error('Audio playback error:', error);
    });
  }
}

export default new VoiceService();