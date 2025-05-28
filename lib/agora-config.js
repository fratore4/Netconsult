// Configurazione Agora per MVP/Demo
// Queste sono chiavi demo pubbliche - per produzione usare variabili d'ambiente

export const AGORA_CONFIG = {
  // App ID demo gratuito di Agora (funziona per test)
  APP_ID: "4c4945c3b2b84b7199b7b8e8f6e6e5a9", // Demo App ID
  
  // Per MVP usiamo modalità testing (no token richiesto)
  // In produzione: implementare server per token generation
  CHANNEL_PREFIX: "netconsult-",
  
  // Configurazioni video
  VIDEO_CONFIG: {
    mode: "rtc",
    codec: "vp8",
    width: 640,
    height: 480,
    frameRate: 30,
    bitrateMin: 300,
    bitrateMax: 1500
  },
  
  // Configurazioni audio
  AUDIO_CONFIG: {
    sampleRate: 48000,
    stereo: false,
    bitrate: 48
  }
};

// Genera nome canale unico per sessione
export const generateChannelName = (consultantId, clientId) => {
  const timestamp = Date.now();
  return `${AGORA_CONFIG.CHANNEL_PREFIX}${consultantId}-${clientId}-${timestamp}`;
};

// Genera token per accesso alla videochiamata
export const generateToken = () => {
  // Per demo, usiamo un token nullo (modalità di test)
  // In produzione, questo dovrebbe essere generato dal vostro server backend
  return null;
}; 