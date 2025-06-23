// Debug utility for VAPI troubleshooting
import { env, validateVAPIConfig } from '../config/environment';

export interface DebugInfo {
  environment: {
    vapiAssistantId: string;
    vapiPublicKey: string;
    isConfigured: boolean;
  };
  sdk: {
    isLoaded: boolean;
    version?: string;
    loadTime?: number;
  };
  browser: {
    userAgent: string;
    hasWebRTC: boolean;
    hasMicrophone: boolean;
  };
  network: {
    isOnline: boolean;
    effectiveType?: string;
  };
}

class VAPIDebugger {
  private startTime: number = Date.now();

  async generateReport(): Promise<DebugInfo> {
    const report: DebugInfo = {
      environment: {
        vapiAssistantId: env.vapiAssistantId || 'NOT_SET',
        vapiPublicKey: env.vapiPublicKey ? `${env.vapiPublicKey.substring(0, 8)}...` : 'NOT_SET',
        isConfigured: validateVAPIConfig(),
      },
      sdk: {
        isLoaded: typeof window !== 'undefined' && !!window.Vapi,
        version: this.getSDKVersion(),
        loadTime: Date.now() - this.startTime,
      },
      browser: {
        userAgent: navigator.userAgent,
        hasWebRTC: this.checkWebRTCSupport(),
        hasMicrophone: await this.checkMicrophoneAccess(),
      },
      network: {
        isOnline: navigator.onLine,
        effectiveType: (navigator as any).connection?.effectiveType || 'unknown',
      },
    };

    return report;
  }

  private getSDKVersion(): string | undefined {
    if (typeof window !== 'undefined' && window.Vapi) {
      return window.Vapi.version || 'unknown';
    }
    return undefined;
  }

  private checkWebRTCSupport(): boolean {
    return !!(
      window.RTCPeerConnection ||
      (window as any).webkitRTCPeerConnection ||
      (window as any).mozRTCPeerConnection
    );
  }

  private async checkMicrophoneAccess(): Promise<boolean> {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        return false;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.warn('Microphone access check failed:', error);
      return false;
    }
  }

  logReport(report: DebugInfo): void {
    console.group('🔍 VAPI Debug Report');
    
    console.group('📝 Environment Configuration');
    console.log('Assistant ID:', report.environment.vapiAssistantId);
    console.log('Public Key:', report.environment.vapiPublicKey);
    console.log('Is Configured:', report.environment.isConfigured ? '✅' : '❌');
    console.groupEnd();

    console.group('📦 SDK Status');
    console.log('Is Loaded:', report.sdk.isLoaded ? '✅' : '❌');
    console.log('Version:', report.sdk.version || 'Unknown');
    console.log('Load Time:', `${report.sdk.loadTime}ms`);
    console.groupEnd();

    console.group('🌐 Browser Compatibility');
    console.log('WebRTC Support:', report.browser.hasWebRTC ? '✅' : '❌');
    console.log('Microphone Access:', report.browser.hasMicrophone ? '✅' : '❌');
    console.log('User Agent:', report.browser.userAgent);
    console.groupEnd();

    console.group('🔗 Network Status');
    console.log('Online:', report.network.isOnline ? '✅' : '❌');
    console.log('Connection Type:', report.network.effectiveType);
    console.groupEnd();

    console.groupEnd();
  }

  async runDiagnostics(): Promise<void> {
    console.log('🚀 Starting VAPI diagnostics...');
    
    const report = await this.generateReport();
    this.logReport(report);

    // Check for common issues
    this.checkCommonIssues(report);
  }

  private checkCommonIssues(report: DebugInfo): void {
    const issues: string[] = [];

    if (!report.environment.isConfigured) {
      issues.push('❌ Environment variables not configured properly');
    }

    if (!report.sdk.isLoaded) {
      issues.push('❌ VAPI SDK failed to load');
    }

    if (!report.browser.hasWebRTC) {
      issues.push('❌ WebRTC not supported in this browser');
    }

    if (!report.browser.hasMicrophone) {
      issues.push('❌ Microphone access denied or not available');
    }

    if (!report.network.isOnline) {
      issues.push('❌ Network connection unavailable');
    }

    if (issues.length > 0) {
      console.group('⚠️ Issues Found');
      issues.forEach(issue => console.warn(issue));
      console.groupEnd();
    } else {
      console.log('✅ No issues found - VAPI should work correctly');
    }
  }
}

export const vapiDebugger = new VAPIDebugger();

// Make it available globally for easy access in console
if (typeof window !== 'undefined') {
  (window as any).vapiDebugger = vapiDebugger;
  (window as any).runVAPIDiagnostics = () => vapiDebugger.runDiagnostics();
}