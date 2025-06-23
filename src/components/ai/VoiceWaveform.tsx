import React, { useEffect, useState } from 'react';

interface VoiceWaveformProps {
  isActive: boolean;
  isAISpeaking?: boolean;
  className?: string;
  intensity?: number;
}

const VoiceWaveform: React.FC<VoiceWaveformProps> = ({
  isActive,
  isAISpeaking = false,
  className = "",
  intensity = 1
}) => {
  const [waveData, setWaveData] = useState<number[]>(new Array(20).fill(0));

  useEffect(() => {
    if (!isActive) {
      setWaveData(new Array(20).fill(0));
      return;
    }

    const interval = setInterval(() => {
      setWaveData(prevData => {
        return prevData.map((_, index) => {
          if (isAISpeaking) {
            // More dramatic waves when AI is speaking
            const baseHeight = 20 + Math.sin(Date.now() * 0.001 + index * 0.5) * 40;
            const variation = Math.random() * 60 * intensity;
            return Math.max(10, Math.min(80, baseHeight + variation));
          } else {
            // Subtle ambient waves when listening
            const baseHeight = 10 + Math.sin(Date.now() * 0.002 + index * 0.3) * 15;
            const variation = Math.random() * 20 * intensity;
            return Math.max(5, Math.min(40, baseHeight + variation));
          }
        });
      });
    }, isAISpeaking ? 80 : 150);

    return () => clearInterval(interval);
  }, [isActive, isAISpeaking, intensity]);

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {waveData.map((height, index) => (
        <div
          key={index}
          className={`bg-current rounded-full transition-all duration-100 ease-out ${
            isActive ? 'opacity-100' : 'opacity-30'
          }`}
          style={{
            width: '3px',
            height: `${height}%`,
            maxHeight: '40px',
            minHeight: '4px',
            transform: isAISpeaking ? `scaleY(${1 + Math.sin(Date.now() * 0.005 + index) * 0.3})` : 'scaleY(1)',
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;