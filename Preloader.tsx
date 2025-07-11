import React, { useEffect, useState } from 'react';

const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  
  const phases = [
    "Initializing Arena...",
    "Loading Sports Data...",
    "Connecting Players...",
    "Preparing Experience...",
    "Almost Ready!"
  ];

  useEffect(() => {
    const totalDuration = 5000; // 5 seconds
    const interval = 50; // Update every 50ms
    const increment = 100 / (totalDuration / interval);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        
        // Update phase based on progress
        const phaseIndex = Math.floor((newProgress / 100) * phases.length);
        setCurrentPhase(Math.min(phaseIndex, phases.length - 1));
        
        if (newProgress >= 100) {
          setIsComplete(true);
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, interval);
    
    return () => clearInterval(progressInterval);
  }, []);

  // Enhanced floating particle component
  const Particle = ({ delay, duration, size }: { delay: number; duration: number; size: number }) => (
    <div
      className="absolute rounded-full opacity-70 animate-pulse"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, rgba(255,94,20,0.8) 0%, rgba(255,68,68,0.6) 50%, rgba(255,127,80,0.3) 100%)`,
        animation: `float ${duration}s ease-in-out infinite, glow ${duration * 0.8}s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        filter: 'blur(0.5px)',
        boxShadow: `0 0 ${size * 2}px rgba(255,94,20,0.4)`,
      }}
    />
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(25)].map((_, i) => (
          <Particle
            key={i}
            delay={i * 0.15}
            duration={2.5 + Math.random() * 2.5}
            size={3 + Math.random() * 12}
          />
        ))}
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-xl animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-xl animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
      </div>
      
      {/* Enhanced animated grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent h-px w-full animate-pulse" style={{ top: '25%', animationDuration: '2s' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400 to-transparent h-px w-full animate-pulse" style={{ top: '75%', animationDuration: '2.5s', animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-400 to-transparent w-px h-full animate-pulse" style={{ left: '25%', animationDuration: '3s', animationDelay: '0.5s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-400 to-transparent w-px h-full animate-pulse" style={{ left: '75%', animationDuration: '2.2s', animationDelay: '1.5s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Enhanced logo with multiple rings */}
        <div className="relative w-56 h-56 mb-10">
          {/* Outer glow rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-500 opacity-20 animate-pulse" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 opacity-15 animate-pulse" style={{ animationDuration: '1.8s', animationDelay: '0.3s' }} />
          <div className="absolute inset-4 rounded-full bg-gradient-to-r from-orange-400 to-red-400 opacity-10 animate-pulse" style={{ animationDuration: '2.2s', animationDelay: '0.6s' }} />
          
          {/* Enhanced progress ring */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff5e14" />
                <stop offset="30%" stopColor="#ff7f50" />
                <stop offset="70%" stopColor="#ff6b35" />
                <stop offset="100%" stopColor="#ff4444" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Multiple background circles */}
            <circle
              className="text-slate-700"
              strokeWidth="2"
              stroke="currentColor"
              fill="transparent"
              r="47"
              cx="50"
              cy="50"
              opacity="0.2"
            />
            <circle
              className="text-slate-600"
              strokeWidth="1"
              stroke="currentColor"
              fill="transparent"
              r="44"
              cx="50"
              cy="50"
              opacity="0.15"
            />
            
            {/* Enhanced progress circle */}
            <circle
              strokeWidth="4"
              strokeDasharray={295}
              strokeDashoffset={295 - (progress / 100) * 295}
              strokeLinecap="round"
              stroke="url(#progressGradient)"
              fill="transparent"
              r="47"
              cx="50"
              cy="50"
              className="transition-all duration-100 ease-out"
              filter="url(#glow)"
            />
          </svg>
          
          {/* Enhanced center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Main lightning bolt */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-20 w-20 text-orange-400 animate-pulse" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  style={{
                    filter: 'drop-shadow(0 0 25px rgba(255, 94, 20, 0.9)) drop-shadow(0 0 45px rgba(255, 94, 20, 0.6))'
                  }}
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              {/* Enhanced rotating rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-24 h-24 border-2 border-orange-400 rounded-full border-dashed animate-spin opacity-40"
                  style={{ animationDuration: '4s' }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-28 h-28 border border-red-400 rounded-full border-dotted animate-spin opacity-30"
                  style={{ animationDuration: '5s', animationDirection: 'reverse' }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-32 h-32 border border-orange-300 rounded-full opacity-20 animate-spin"
                  style={{ animationDuration: '6s' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced brand name */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 relative">
            <span className="text-white relative z-10 tracking-wide">Arena</span>
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-500 relative z-10 tracking-wide"
              style={{
                filter: 'drop-shadow(0 0 15px rgba(255, 94, 20, 0.4))',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease-in-out infinite'
              }}
            >
              Hub
            </span>
          </h1>
          
          {/* Enhanced animated underline */}
          <div className="relative w-80 h-2 bg-slate-700 rounded-full overflow-hidden mt-4 mx-auto">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 rounded-full transition-all duration-100 ease-out"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 20px rgba(255, 94, 20, 0.8), 0 0 40px rgba(255, 94, 20, 0.4)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s ease-in-out infinite'
              }}
            />
          </div>
        </div>

        {/* Enhanced loading text */}
        <div className="text-center space-y-4">
          <p className="text-slate-300 text-xl font-medium animate-pulse tracking-wide">
            {phases[currentPhase]}
          </p>
          
          {/* Enhanced progress percentage */}
          <div className="flex items-center justify-center space-x-4">
            <span 
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-400"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 2s ease-in-out infinite'
              }}
            >
              {Math.round(progress)}%
            </span>
            <div className="flex space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-bounce"
                  style={{ 
                    animationDelay: `${i * 0.15}s`,
                    boxShadow: '0 0 10px rgba(255, 94, 20, 0.6)'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced completion animation */}
        {isComplete && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-r from-orange-400 to-red-500 opacity-30 animate-ping" />
            <div className="absolute w-60 h-60 rounded-full bg-gradient-to-r from-orange-300 to-red-400 opacity-20 animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-orange-200 to-red-300 opacity-10 animate-ping" style={{ animationDelay: '1s' }} />
          </div>
        )}
      </div>

      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-15px) rotate(120deg) scale(1.1); }
          66% { transform: translateY(-10px) rotate(240deg) scale(0.9); }
        }
        
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(255, 94, 20, 0.4), 0 0 40px rgba(255, 94, 20, 0.2);
            filter: blur(0.5px);
          }
          50% { 
            box-shadow: 0 0 30px rgba(255, 94, 20, 0.8), 0 0 60px rgba(255, 94, 20, 0.4);
            filter: blur(1px);
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;