'use client';

import { useState, useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { AGORA_CONFIG, generateToken } from '../lib/agora-config';

const VideoCall = ({ channelName, isConsultant = false, onCallEnd }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [remoteUser, setRemoteUser] = useState(null);
  const [callDuration, setCallDuration] = useState(0);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const clientRef = useRef(null);
  const localTracksRef = useRef([]);
  const intervalRef = useRef(null);

  // Inizializza client Agora
  useEffect(() => {
    const initClient = async () => {
      try {
        const client = AgoraRTC.createClient({
          mode: AGORA_CONFIG.VIDEO_CONFIG.mode,
          codec: AGORA_CONFIG.VIDEO_CONFIG.codec
        });
        
        clientRef.current = client;

        // Event listeners
        client.on("user-published", handleUserPublished);
        client.on("user-unpublished", handleUserUnpublished);
        client.on("user-left", handleUserLeft);

      } catch (error) {
        console.error("Errore inizializzazione client:", error);
      }
    };

    initClient();

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      leaveCall();
    };
  }, []);

  useEffect(() => {
    return () => {
      leaveCall();
    };
  }, [leaveCall]);

  // Gestisce utente che entra
  const handleUserPublished = async (user, mediaType) => {
    const client = clientRef.current;
    
    await client.subscribe(user, mediaType);
    
    if (mediaType === 'video') {
      setRemoteUser(user);
      if (remoteVideoRef.current) {
        user.videoTrack.play(remoteVideoRef.current);
      }
    }
    
    if (mediaType === 'audio') {
      user.audioTrack.play();
    }
  };

  // Gestisce utente che esce
  const handleUserUnpublished = (user, mediaType) => {
    if (mediaType === 'video') {
      setRemoteUser(null);
    }
  };

  const handleUserLeft = () => {
    setRemoteUser(null);
  };

  // Unisciti alla chiamata
  const joinCall = async () => {
    if (!clientRef.current) return;
    
    setIsLoading(true);
    
    try {
      const client = clientRef.current;
      const uid = Math.floor(Math.random() * 10000);
      const token = generateToken(channelName, uid);

      // Entra nel canale
      await client.join(AGORA_CONFIG.APP_ID, channelName, token, uid);

      // Crea tracks locali
      const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(
        AGORA_CONFIG.AUDIO_CONFIG,
        AGORA_CONFIG.VIDEO_CONFIG
      );

      localTracksRef.current = [audioTrack, videoTrack];

      // Riproduci video locale
      if (localVideoRef.current) {
        videoTrack.play(localVideoRef.current);
      }

      // Pubblica tracks
      await client.publish([audioTrack, videoTrack]);

      setIsJoined(true);
      
      // Avvia timer durata chiamata
      const startTime = Date.now();
      intervalRef.current = setInterval(() => {
        setCallDuration(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

    } catch (error) {
      console.error("Errore durante l'ingresso:", error);
      alert("Errore durante la connessione alla videochamata");
    } finally {
      setIsLoading(false);
    }
  };

  // Esci dalla chiamata
  const leaveCall = async () => {
    if (!clientRef.current) return;

    try {
      // Ferma timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Distruggi tracks locali
      localTracksRef.current.forEach(track => {
        track.stop();
        track.close();
      });
      localTracksRef.current = [];

      // Esci dal canale
      await clientRef.current.leave();
      
      setIsJoined(false);
      setRemoteUser(null);
      setCallDuration(0);

      // Callback esterno
      if (onCallEnd) {
        onCallEnd();
      }

    } catch (error) {
      console.error("Errore durante l'uscita:", error);
    }
  };

  // Toggle video
  const toggleVideo = async () => {
    if (localTracksRef.current[1]) {
      await localTracksRef.current[1].setEnabled(!isVideoOn);
      setIsVideoOn(!isVideoOn);
    }
  };

  // Toggle audio
  const toggleAudio = async () => {
    if (localTracksRef.current[0]) {
      await localTracksRef.current[0].setEnabled(!isAudioOn);
      setIsAudioOn(!isAudioOn);
    }
  };

  // Formatta durata
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">
            {isConsultant ? "Sessione di Consulenza" : "Consulenza con Professionista"}
          </h2>
          <p className="text-gray-400 text-sm">
            {isJoined ? `Durata: ${formatDuration(callDuration)}` : "In attesa di connessione..."}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isJoined ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm">{isJoined ? 'Connesso' : 'Disconnesso'}</span>
        </div>
      </div>

      {/* Video Container */}
      <div className="flex-1 flex">
        {/* Video Remoto (Principale) */}
        <div className="flex-1 relative bg-gray-800">
          {remoteUser ? (
            <div 
              ref={remoteVideoRef}
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="text-gray-400">
                  {isJoined ? "In attesa dell'altro partecipante..." : "Non connesso"}
                </p>
              </div>
            </div>
          )}

          {/* Video Locale (Picture in Picture) */}
          {isJoined && (
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
              <div 
                ref={localVideoRef}
                className="w-full h-full"
              />
              {!isVideoOn && (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                  </svg>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Controlli */}
      <div className="bg-gray-800 p-6">
        <div className="flex justify-center space-x-4">
          {!isJoined ? (
            <button
              onClick={joinCall}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold disabled:opacity-50 flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Connessione...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Inizia Chiamata</span>
                </>
              )}
            </button>
          ) : (
            <>
              {/* Toggle Video */}
              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full ${isVideoOn ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'}`}
                title={isVideoOn ? 'Disattiva Video' : 'Attiva Video'}
              >
                {isVideoOn ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                  </svg>
                )}
              </button>

              {/* Toggle Audio */}
              <button
                onClick={toggleAudio}
                className={`p-3 rounded-full ${isAudioOn ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'}`}
                title={isAudioOn ? 'Disattiva Audio' : 'Attiva Audio'}
              >
                {isAudioOn ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                )}
              </button>

              {/* Termina Chiamata */}
              <button
                onClick={leaveCall}
                className="bg-red-600 hover:bg-red-700 p-3 rounded-full"
                title="Termina Chiamata"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCall; 