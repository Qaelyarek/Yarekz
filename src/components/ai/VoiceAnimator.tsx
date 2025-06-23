import React, { useState, useEffect } from 'react';

interface VoiceAnimatorProps {
  isActive: boolean;
  className?: string;
}

const VoiceAnimator: React.FC<VoiceAnimatorProps> = ({ isActive, className = "" }) => {
  const [animationFrames, setAnimationFrames] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    if (!isActive) {
      setAnimationFrames([0, 0, 0, 0, 0]);
      return;
    }

    const interval = setInterval(() => {
      setAnimationFrames(prev => 
        prev.map(() => Math.random() * 100 + 20)
      );
    }, 150);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {animationFrames.map((height, index) => (
        <div
          key={index}
          className={`bg-white rounded-full transition-all duration-150 ease-out ${
            isActive ? 'opacity-100' : 'opacity-30'
          }`}
          style={{
            width: '4px',
            height: isActive ? `${height}%` : '20%',
            maxHeight: '40px',
            minHeight: '8px',
          }}
        />
      ))}
    </div>
  );
};

export default VoiceAnimator;