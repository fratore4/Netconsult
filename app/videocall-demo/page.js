'use client';

import { useState } from 'react';
import VideoCall from '../../components/VideoCall';
import { generateChannelName } from '../../lib/agora-config';

export default function VideoCallDemo() {
  const [activeCall, setActiveCall] = useState(null);
  const [userType, setUserType] = useState('client'); // 'client' o 'consultant'

  const startDemoCall = () => {
    // Genera un canale demo
    const channelName = generateChannelName('demo-consultant', 'demo-client');
    setActiveCall(channelName);
  };

  const endCall = () => {
    setActiveCall(null);
  };

  if (activeCall) {
    return (
      <div className="h-screen">
        <VideoCall 
          channelName={activeCall}
          isConsultant={userType === 'consultant'}
          onCallEnd={endCall}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <img src="/favicon.ico" alt="Netconsult Logo" className="w-16 h-16 mr-3" />
            <div>
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Net
              </span>
              <span className="text-4xl font-bold text-blue-600">
                consult
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Demo Videochiamate
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prova il sistema di videochiamate integrato con Agora.io. 
            Completamente gratuito per le prime 10.000 ore al mese!
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Video HD</h3>
            <p className="text-gray-600">Qualità video 720p con codec VP8 ottimizzato</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Audio Cristallino</h3>
            <p className="text-gray-600">Audio 48kHz con riduzione rumore avanzata</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Latenza Ultra-Bassa</h3>
            <p className="text-gray-600">Meno di 300ms di latenza globale</p>
          </div>
        </div>

        {/* Demo Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Inizia Demo Videochiamata</h2>
          
          {/* User Type Selection */}
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-4 text-center">
              Entra come:
            </label>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setUserType('client')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  userType === 'client' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                👤 Cliente
              </button>
              <button
                onClick={() => setUserType('consultant')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  userType === 'consultant' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🎓 Consulente
              </button>
            </div>
          </div>

          {/* Start Call Button */}
          <div className="text-center">
            <button
              onClick={startDemoCall}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg flex items-center space-x-3 mx-auto"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Inizia Videochiamata Demo</span>
            </button>
            <p className="text-gray-500 mt-4">
              Per testare completamente, apri questa pagina in due browser diversi
            </p>
          </div>
        </div>

        {/* Technical Info */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">🔧 Dettagli Tecnici MVP</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Agora.io Integration:</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• SDK: agora-rtc-sdk-ng</li>
                <li>• 10.000 minuti gratuiti/mese</li>
                <li>• Qualità video: 640x480@30fps</li>
                <li>• Audio: 48kHz mono</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Funzionalità Demo:</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Video bidirezionale HD</li>
                <li>• Controlli audio/video</li>
                <li>• Timer durata chiamata</li>
                <li>• UI responsive Netconsult</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Integration Preview */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-4">🚀 Integrazione Futura</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            In produzione, questo sistema si integrerà perfettamente con:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">Sistema Prenotazioni</span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full">Pagamenti Stripe</span>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full">Profili Utenti</span>
            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">Rating & Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
} 