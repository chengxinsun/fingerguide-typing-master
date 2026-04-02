import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const NoiseTexture = ({ opacity = 0.15 }) => (
  <div 
    className="absolute inset-0 pointer-events-none mix-blend-overlay" 
    style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E")`,
      filter: 'contrast(150%) brightness(80%)'
    }} 
  />
);

const Vignette = ({ color = '#021207', opacity = 0.7 }) => (
  <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, transparent 0%, ${color} 120%)`, opacity }} />
);

const CommonStyles = () => (
  <style>
    {`
      @keyframes floatDown {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translate(15vw, 110vh) rotate(720deg); opacity: 0; }
      }
      @keyframes floatUp {
        0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        80% { opacity: 1; }
        100% { transform: translate(-10vw, -10vh) rotate(-360deg); opacity: 0; }
      }
      @keyframes driftRight {
        0% { transform: translateX(-20vw); opacity: 0; }
        10% { opacity: 0.8; }
        90% { opacity: 0.8; }
        100% { transform: translateX(120vw); opacity: 0; }
      }
      @keyframes driftClouds {
        0% { transform: translateX(-50vw); }
        100% { transform: translateX(100vw); }
      }
      @keyframes swaySlow {
        0% { transform: rotate(-3deg); }
        100% { transform: rotate(3deg); }
      }
      @keyframes pulseGlow {
        0% { opacity: 0.5; transform: scale(1); }
        100% { opacity: 0.8; transform: scale(1.1); }
      }
      @keyframes heatDistortion {
        0% { transform: translateY(0) scaleY(1); }
        50% { transform: translateY(-2%) scaleY(1.05); }
        100% { transform: translateY(0) scaleY(1); }
      }
    `}
  </style>
);

const ForestEffects = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#0A1F13]">
    <div className="absolute inset-0 opacity-40 mix-blend-screen"
      style={{
        background: 'conic-gradient(from 180deg at 50% -30%, transparent 40%, rgba(180, 255, 180, 0.3) 45%, transparent 50%, rgba(200, 255, 200, 0.2) 55%, transparent 60%)',
        animation: 'swaySlow 6s infinite alternate ease-in-out',
        transformOrigin: 'top center'
      }}
    />
    <NoiseTexture />
    
    <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-900 rounded-full mix-blend-multiply opacity-60 blur-3xl" style={{ animation: 'swaySlow 10s infinite alternate ease-in-out', transformOrigin: 'top left' }} />
    <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-emerald-900 rounded-full mix-blend-multiply opacity-50 blur-3xl" style={{ animation: 'swaySlow 14s infinite alternate ease-in-out', transformOrigin: 'top right' }} />
    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#021207] to-transparent opacity-80" />

    {Array.from({ length: 40 }).map((_, i) => (
      <div key={`leaf-${i}`} className="absolute opacity-0"
        style={{
          left: `${Math.random() * 100}vw`,
          top: `-5vh`,
          animation: `floatDown ${12 + Math.random() * 25}s linear infinite`,
          animationDelay: `-${Math.random() * 30}s`,
          width: `${8 + Math.random() * 16}px`,
          height: `${4 + Math.random() * 10}px`,
          background: Math.random() > 0.5 ? 'rgba(21, 128, 61, 0.9)' : 'rgba(74, 222, 128, 0.8)',
          borderRadius: '2px 12px 2px 12px',
          filter: Math.random() > 0.6 ? 'blur(3px)' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
        }}
      />
    ))}
    <Vignette color="#021207" opacity={0.7} />
  </div>
);

const MeadowEffects = () => (
  <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#fff1f2] via-[#ffe4e6] to-[#fbcfe8]">
    <div className="absolute inset-0 opacity-40 mix-blend-screen"
      style={{
        background: 'radial-gradient(circle at 10% 10%, rgba(255, 230, 240, 0.8) 0%, transparent 60%)',
        animation: 'pulseGlow 8s infinite alternate ease-in-out'
      }}
    />
    <NoiseTexture opacity={0.1} />
    
    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#fce7f3] to-transparent opacity-80" />

    {Array.from({ length: 45 }).map((_, i) => {
      const size = 6 + Math.random() * 8;
      const isBlurred = Math.random() > 0.7;
      return (
        <div key={`petal-${i}`} className="absolute opacity-0"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `-5vh`,
            animation: `floatDown ${10 + Math.random() * 20}s ease-in-out infinite`,
            animationDelay: `-${Math.random() * 30}s`,
            width: `${size}px`,
            height: `${size * 0.8}px`,
            background: Math.random() > 0.5 ? '#f472b6' : '#f9a8d4',
            borderRadius: '10px 0 10px 0',
            transform: `rotate(${Math.random() * 360}deg)`,
            filter: isBlurred ? 'blur(2px)' : 'none',
            opacity: 0.7
          }}
        />
      );
    })}
    <Vignette color="#831843" opacity={0.3} />
  </div>
);

const DesertEffects = () => (
  <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#ea580c] via-[#f97316] to-[#fdba74]">
    <NoiseTexture opacity={0.2} />
    {/* Sun */}
    <div className="absolute top-[10%] left-[80%] w-48 h-48 bg-[#ffedd5] rounded-full blur-[10px] mix-blend-overlay" />
    
    {/* Heat distortion layer */}
    <div className="absolute inset-0 mix-blend-overlay opacity-30" style={{ backgroundImage: 'linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)', animation: 'heatDistortion 3s infinite ease-in-out' }} />
    
    {/* Dunes silhouettes */}
    <div className="absolute -bottom-20 -left-10 w-[70vw] h-64 bg-[#c2410c] rounded-[100%] blur-[2px] opacity-80" />
    <div className="absolute -bottom-10 -right-20 w-[60vw] h-48 bg-[#9a3412] rounded-[100%] blur-[2px] opacity-90" />

    {/* Flying dust */}
    {Array.from({ length: 60 }).map((_, i) => (
      <div key={`dust-${i}`} className="absolute opacity-0"
        style={{
          top: `${Math.random() * 100}vh`,
          left: `-5vw`,
          animation: `driftRight ${2 + Math.random() * 4}s linear infinite`,
          animationDelay: `-${Math.random() * 10}s`,
          width: `${3 + Math.random() * 8}px`,
          height: `2px`,
          background: 'rgba(255, 237, 213, 0.6)',
          borderRadius: '2px',
          filter: Math.random() > 0.5 ? 'blur(1px)' : 'none'
        }}
      />
    ))}
    <Vignette color="#431407" opacity={0.5} />
  </div>
);

const SavannaEffects = () => (
  <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#fef08a] via-[#fde047] to-[#eab308]">
    <NoiseTexture opacity={0.12} />
    
    {/* Giant warm sun / glare */}
    <div className="absolute -top-10 -right-10 w-[600px] h-[600px] bg-[#fefce8] rounded-full mix-blend-overlay blur-3xl opacity-60" style={{ animation: 'pulseGlow 6s infinite alternate ease-in-out' }} />

    {/* Golden dust motes floating up */}
    {Array.from({ length: 50 }).map((_, i) => (
      <div key={`mote-${i}`} className="absolute opacity-0"
        style={{
          left: `${Math.random() * 100}vw`,
          bottom: `-5vh`,
          animation: `floatUp ${15 + Math.random() * 25}s linear infinite`,
          animationDelay: `-${Math.random() * 30}s`,
          width: `${2 + Math.random() * 5}px`,
          height: `${2 + Math.random() * 5}px`,
          background: Math.random() > 0.5 ? '#fefce8' : '#facc15',
          borderRadius: '50%',
          boxShadow: '0 0 10px 2px rgba(253, 224, 71, 0.4)',
          filter: Math.random() > 0.5 ? 'blur(2px)' : 'none'
        }}
      />
    ))}
    <Vignette color="#713f12" opacity={0.4} />
  </div>
);

const SkyEffects = () => (
  <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1e3a8a] via-[#3b82f6] to-[#93c5fd]">
    <NoiseTexture opacity={0.08} />
    
    {/* Sun glare */}
    <div className="absolute top-[5%] left-[10%] w-64 h-64 bg-white rounded-full mix-blend-overlay blur-3xl" style={{ animation: 'pulseGlow 5s infinite alternate ease-in-out' }} />

    {/* Drifting soft clouds */}
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={`cloud-${i}`} className="absolute mix-blend-screen overflow-visible"
        style={{
          top: `${10 + Math.random() * 60}vh`,
          left: `-30vw`,
          animation: `driftClouds ${60 + Math.random() * 60}s linear infinite`,
          animationDelay: `-${Math.random() * 100}s`,
          width: `${200 + Math.random() * 300}px`,
          height: `${100 + Math.random() * 150}px`,
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          transform: `scale(${0.8 + Math.random() * 0.5})`
        }}
      />
    ))}

    {/* Very sparse floating light particles */}
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={`light-${i}`} className="absolute opacity-0"
        style={{
          top: `${Math.random() * 100}vh`,
          left: `-5vw`,
          animation: `driftRight ${20 + Math.random() * 30}s linear infinite`,
          animationDelay: `-${Math.random() * 30}s`,
          width: `3px`, height: `3px`,
          background: 'white',
          borderRadius: '50%',
          filter: 'blur(1px)'
        }}
      />
    ))}
    <Vignette color="#172554" opacity={0.3} />
  </div>
);

const VolcanoEffects = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#0F010A]">
    <NoiseTexture opacity={0.3} />
    
    {/* Pulsating magma core at bottom */}
    <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[120vw] h-96 bg-[radial-gradient(ellipse_at_top,_#9f1239_0%,_transparent_70%)] opacity-80 blur-xl" style={{ animation: 'pulseGlow 4s infinite alternate ease-in-out' }} />
    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80vw] h-64 bg-[radial-gradient(ellipse_at_top,_#d946ef_0%,_transparent_70%)] opacity-50 blur-2xl flex mix-blend-screen" style={{ animation: 'pulseGlow 3s infinite alternate ease-in-out' }} />

    {/* Rising Embers */}
    {Array.from({ length: 60 }).map((_, i) => {
      const isPurple = Math.random() > 0.7;
      return (
        <div key={`ember-${i}`} className="absolute opacity-0"
          style={{
            left: `${Math.random() * 100}vw`,
            bottom: `-5vh`,
            animation: `floatUp ${4 + Math.random() * 8}s ease-in infinite`,
            animationDelay: `-${Math.random() * 10}s`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: isPurple ? '#d946ef' : '#fb923c',
            borderRadius: '50%',
            boxShadow: `0 0 8px 2px ${isPurple ? 'rgba(217, 70, 239, 0.6)' : 'rgba(251, 146, 60, 0.6)'}`,
            filter: 'blur(0.5px)'
          }}
        />
      );
    })}

    {/* Falling dark ash */}
    {Array.from({ length: 30 }).map((_, i) => (
      <div key={`ash-${i}`} className="absolute opacity-0"
        style={{
          left: `${Math.random() * 100}vw`,
          top: `-5vh`,
          animation: `floatDown ${8 + Math.random() * 12}s linear infinite`,
          animationDelay: `-${Math.random() * 15}s`,
          width: `${3 + Math.random() * 5}px`,
          height: `${3 + Math.random() * 5}px`,
          background: '#1a1016',
          borderRadius: '50%',
          filter: 'blur(1px)'
        }}
      />
    ))}
    
    <Vignette color="#000000" opacity={0.8} />
  </div>
);

export const ThemeEffects: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]" aria-hidden="true">
      <CommonStyles />
      {theme.id === 'forest' && <ForestEffects />}
      {theme.id === 'meadow' && <MeadowEffects />}
      {theme.id === 'desert' && <DesertEffects />}
      {theme.id === 'savanna' && <SavannaEffects />}
      {theme.id === 'sky' && <SkyEffects />}
      {theme.id === 'volcano' && <VolcanoEffects />}
    </div>
  );
};
