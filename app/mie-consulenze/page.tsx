'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import VideoCall from '../../components/VideoCall';
import { generateChannelName } from '../../lib/agora-config';

interface Consulenza {
  id: string;
  professionista: {
    nome: string;
    ruolo: string;
    avatar_url: string;
  };
  data: string;
  orario: string;
  prezzo: number;
  stato: 'confermata' | 'in_attesa' | 'completata' | 'cancellata';
  tipoConsulenza: string;
}

export default function MieConsulenze() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [consulenze, setConsulenze] = useState<Consulenza[]>([]);
  const [selectedConsulenza, setSelectedConsulenza] = useState<Consulenza | null>(null);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [activeChannelName, setActiveChannelName] = useState<string>('');

  useEffect(() => {
    // Controlla se siamo nel browser prima di accedere a localStorage
    if (typeof window !== 'undefined') {
      const loginStatus = localStorage.getItem('userLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
      
      if (loginStatus) {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        }
        // Simula il caricamento delle consulenze dell'utente
        generateMockConsulenze();
      }
    }
  }, []);

  // Genera consulenze di esempio per la demo
  const generateMockConsulenze = () => {
    // Consulenze mock di base
    const mockData: Consulenza[] = [
      {
        id: '1',
        professionista: {
          nome: 'Sara Bianchi',
          ruolo: 'Marketing Director @ Google',
          avatar_url: '/favicon.ico'
        },
        data: '2024-01-25',
        orario: '14:30',
        prezzo: 75,
        stato: 'confermata',
        tipoConsulenza: 'Marketing Digitale e Social Media'
      },
      {
        id: '2',
        professionista: {
          nome: 'Marco Rossi',
          ruolo: 'Senior UX Designer @ Adobe',
          avatar_url: '/favicon.ico'
        },
        data: '2024-01-22',
        orario: '10:00',
        prezzo: 85,
        stato: 'completata',
        tipoConsulenza: 'Design UX/UI e Grafica'
      }
    ];

    // Recupera le consulenze reali dal localStorage solo se siamo nel browser
    let consulenzeReali: Consulenza[] = [];
    if (typeof window !== 'undefined') {
      consulenzeReali = JSON.parse(localStorage.getItem('userConsulenze') || '[]');
    }
    
    // Combina consulenze mock e reali
    const tutteLeconsulenze = [...mockData, ...consulenzeReali];
    
    setConsulenze(tutteLeconsulenze);
  };

  const formatData = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatoStyle = (stato: string) => {
    switch (stato) {
      case 'confermata':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_attesa':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completata':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancellata':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatoText = (stato: string) => {
    switch (stato) {
      case 'confermata':
        return 'Confermata';
      case 'in_attesa':
        return 'In Attesa';
      case 'completata':
        return 'Completata';
      case 'cancellata':
        return 'Cancellata';
      default:
        return stato;
    }
  };

  // Apri dettagli consulenza
  const openConsulenzaDetails = (consulenza: Consulenza) => {
    setSelectedConsulenza(consulenza);
  };

  // Chiudi modal dettagli
  const closeConsulenzaDetails = () => {
    setSelectedConsulenza(null);
  };

  // Avvia videochiamata
  const startVideoCall = (consulenza: Consulenza) => {
    const channelName = generateChannelName(
      consulenza.professionista.nome.replace(/\s+/g, '-'),
      'client-user'
    );
    setActiveChannelName(channelName);
    setIsVideoCallActive(true);
    setSelectedConsulenza(null); // Chiudi il modal
  };

  // Termina videochiamata
  const endVideoCall = () => {
    setIsVideoCallActive(false);
    setActiveChannelName('');
  };

  // Se è attiva una videochiamata, mostra solo quella
  if (isVideoCallActive) {
    return (
      <div className="h-screen">
        <VideoCall 
          channelName={activeChannelName}
          isConsultant={false} // L'utente è sempre il cliente
          onCallEnd={endVideoCall}
        />
      </div>
    );
  }

  // Stato di caricamento
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto py-16 px-4">
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <div className="mb-6">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Accesso Richiesto</h1>
                <p className="text-gray-600 mb-8">
                  Per visualizzare le tue consulenze devi prima effettuare l&apos;accesso al tuo account.
                </p>
              </div>
              
              <div className="space-y-4">
                <Link 
                  href="/login"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity block text-center"
                >
                  Accedi al tuo Account
                </Link>
                
                <Link 
                  href="/register"
                  className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors block text-center"
                >
                  Crea un Account
                </Link>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Torna alla <Link href="/" className="text-blue-600 hover:underline">homepage</Link> oppure 
                  <Link href="/professionisti" className="text-blue-600 hover:underline ml-1">esplora i professionisti</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Utente loggato - Mostra le consulenze
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Le Mie Consulenze</h1>
              <p className="text-gray-600">Gestisci e monitora tutti i tuoi appuntamenti</p>
            </div>
            
            <Link
              href="/prenota"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nuova Consulenza
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Confermate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {consulenze.filter(c => c.stato === 'confermata').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">In Attesa</p>
                <p className="text-2xl font-bold text-gray-900">
                  {consulenze.filter(c => c.stato === 'in_attesa').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Completate</p>
                <p className="text-2xl font-bold text-gray-900">
                  {consulenze.filter(c => c.stato === 'completata').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Totale Speso</p>
                <p className="text-2xl font-bold text-gray-900">
                  €{consulenze.reduce((total, c) => total + c.prezzo, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista Consulenze */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Cronologia Consulenze</h2>
          </div>

          {consulenze.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nessuna consulenza ancora</h3>
              <p className="text-gray-600 mb-6">Prenota la tua prima consulenza per iniziare!</p>
              <Link
                href="/prenota"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Prenota Ora
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {consulenze.map((consulenza) => (
                <div key={consulenza.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <img
                        src={consulenza.professionista.avatar_url}
                        alt={consulenza.professionista.nome}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {consulenza.professionista.nome}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatoStyle(consulenza.stato)}`}>
                            {getStatoText(consulenza.stato)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-1">
                          {consulenza.professionista.ruolo}
                        </p>
                        
                        <p className="text-sm text-blue-600 font-medium mb-2">
                          {consulenza.tipoConsulenza}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatData(consulenza.data)}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {consulenza.orario}
                          </span>
                          <span className="flex items-center font-semibold text-gray-900">
                            €{consulenza.prezzo}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {consulenza.stato === 'confermata' && (
                        <button 
                          onClick={() => openConsulenzaDetails(consulenza)}
                          className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          Dettagli
                        </button>
                      )}
                      
                      {consulenza.stato === 'completata' && (
                        <button className="px-4 py-2 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                          Lascia Recensione
                        </button>
                      )}
                      
                      {consulenza.stato === 'in_attesa' && (
                        <button className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
                          Cancella
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Hai bisogno di aiuto?</h2>
              <p className="text-blue-100">
                Contatta il nostro team di supporto per assistenza con le tue consulenze
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Supporto
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                FAQ
              </button>
            </div>
          </div>
        </div>

        {/* Pulsante per simulare login/logout */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              const newStatus = !isLoggedIn;
              localStorage.setItem('userLoggedIn', newStatus.toString());
              setIsLoggedIn(newStatus);
              if (!newStatus) {
                setConsulenze([]);
              } else {
                generateMockConsulenze();
              }
            }}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            {isLoggedIn ? 'Simula Logout' : 'Simula Login'} (Solo per demo)
          </button>
        </div>

        {/* Modal Dettagli Consulenza */}
        {selectedConsulenza && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              
              {/* Header Modal */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedConsulenza.professionista.avatar_url}
                      alt={selectedConsulenza.professionista.nome}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedConsulenza.professionista.nome}
                      </h2>
                      <p className="text-gray-600">{selectedConsulenza.professionista.ruolo}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mt-2 ${getStatoStyle(selectedConsulenza.stato)}`}>
                        {getStatoText(selectedConsulenza.stato)}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={closeConsulenzaDetails}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Contenuto Modal */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  
                  {/* Informazioni Consulenza */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Dettagli Consulenza</h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="font-medium text-gray-900">Tipo di Consulenza</span>
                      </div>
                      <p className="text-blue-600 font-medium">{selectedConsulenza.tipoConsulenza}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-gray-900">Data e Ora</span>
                      </div>
                      <p className="text-gray-700">
                        {formatData(selectedConsulenza.data)} alle {selectedConsulenza.orario}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span className="font-medium text-gray-900">Prezzo</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">€{selectedConsulenza.prezzo}</p>
                    </div>
                  </div>

                  {/* Azioni Videochiamata */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Videochiamata</h3>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Sessione Video Ready
                      </h4>
                      
                      <p className="text-gray-600 text-sm mb-4">
                        La tua consulenza è confermata. Puoi avviare la videochiamata quando sei pronto.
                      </p>

                      <button
                        onClick={() => startVideoCall(selectedConsulenza)}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Avvia Videochiamata</span>
                      </button>

                      <div className="mt-4 text-xs text-gray-500">
                        <p>🔒 Connessione sicura e crittografata</p>
                        <p>🎥 Video HD + Audio cristallino</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informazioni Aggiuntive */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Informazioni Utili</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-sm">
                        <p className="font-medium text-yellow-800 mb-1">Prima della chiamata:</p>
                        <ul className="text-yellow-700 space-y-1 text-xs">
                          <li>• Assicurati di avere una connessione internet stabile</li>
                          <li>• Testa microfono e webcam</li>
                          <li>• Prepara le domande che vuoi fare</li>
                          <li>• Trova un ambiente tranquillo</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Modal */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Hai problemi? Contatta il supporto
                  </div>
                  <button
                    onClick={closeConsulenzaDetails}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Chiudi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 