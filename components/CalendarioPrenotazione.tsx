'use client';

import { useState } from 'react';

interface CalendarioPrenotazioneProps {
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

interface OrarioSlot {
  ora: string;
  disponibile: boolean;
}

export default function CalendarioPrenotazione({ 
  onDateSelect, 
  onTimeSelect 
}: CalendarioPrenotazioneProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [step, setStep] = useState<'calendario' | 'orari' | 'conferma'>('calendario');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Genera 30 giorni dal oggi
  const generaGiorni = () => {
    const giorni = [];
    const oggi = new Date();
    
    for (let i = 0; i < 30; i++) {
      const data = new Date();
      data.setDate(oggi.getDate() + i);
      
      // Simula disponibilità: 70% delle date sono disponibili
      const seed = data.getDate() + data.getMonth();
      const disponibile = seed % 10 < 7; // 70% di probabilità
      
      giorni.push({
        data: data.toISOString().split('T')[0],
        dataObj: data,
        disponibile,
        isPast: data < oggi
      });
    }
    return giorni;
  };

  // Genera slot orari per la data selezionata
  const generaOrariDisponibili = (): OrarioSlot[] => {
    const orari = [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30', '18:00', '18:30'
    ];

    return orari.map(ora => {
      // Simula disponibilità orari: 60% disponibili
      const seed = parseInt(ora.replace(':', ''));
      const disponibile = seed % 10 < 6;
      
      return { ora, disponibile };
    });
  };

  const giorni = generaGiorni();
  const orariDisponibili = generaOrariDisponibili();

  const formatData = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const handleDataClick = (data: string) => {
    setSelectedDate(data);
    setStep('orari');
  };

  const handleOrarioClick = (orario: string) => {
    setSelectedTime(orario);
    setStep('conferma');
  };

  const handleConfermaPrenotazione = async () => {
    setIsSubmitting(true);
    
    // Simula invio richiesta e salva nel localStorage
    setTimeout(() => {
      // Crea la nuova consulenza
      const nuovaConsulenza = {
        id: Date.now().toString(),
        professionista: {
          nome: 'Professionista',
          ruolo: 'Consulente Professionale',
          avatar_url: '/favicon.ico'
        },
        data: selectedDate,
        orario: selectedTime,
        prezzo: 50,
        stato: 'in_attesa' as const,
        tipoConsulenza: 'Consulenza Personalizzata'
      };

      // Recupera le consulenze esistenti dal localStorage
      const consulenzeEsistenti = JSON.parse(localStorage.getItem('userConsulenze') || '[]');
      
      // Aggiungi la nuova consulenza
      const consulenzeAggiornate = [...consulenzeEsistenti, nuovaConsulenza];
      
      // Salva nel localStorage
      localStorage.setItem('userConsulenze', JSON.stringify(consulenzeAggiornate));
      
      alert(`Richiesta inviata con successo!\n\nDettagli:\n- Professionista: Professionista\n- Data: ${formatData(selectedDate)}\n- Orario: ${selectedTime}\n- Prezzo: €50/30min\n\nRiceverai una conferma via email.\n\nTrova la tua prenotazione in "Le Mie Consulenze"!`);
      setIsSubmitting(false);
      onDateSelect(selectedDate);
      onTimeSelect(selectedTime);
    }, 2000);
  };

  const resetSelection = () => {
    setSelectedDate('');
    setSelectedTime('');
    setStep('calendario');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Prenota con Professionista</h2>
              <p className="text-blue-100 mt-1">Scegli data e orario per la tua consulenza</p>
            </div>
            <button 
              onClick={resetSelection}
              className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center mt-6 space-x-4">
            <div className={`flex items-center ${step === 'calendario' ? 'text-white' : 'text-blue-200'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${step === 'calendario' ? 'bg-white text-blue-600' : 
                  selectedDate ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                {selectedDate ? '✓' : '1'}
              </div>
              <span className="ml-2 font-medium">Data</span>
            </div>
            
            <div className="flex-1 h-0.5 bg-blue-400"></div>
            
            <div className={`flex items-center ${step === 'orari' ? 'text-white' : 'text-blue-200'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${step === 'orari' ? 'bg-white text-blue-600' : 
                  selectedTime ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                {selectedTime ? '✓' : '2'}
              </div>
              <span className="ml-2 font-medium">Orario</span>
            </div>
            
            <div className="flex-1 h-0.5 bg-blue-400"></div>
            
            <div className={`flex items-center ${step === 'conferma' ? 'text-white' : 'text-blue-200'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${step === 'conferma' ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Conferma</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          
          {/* Step 1: Calendario */}
          {step === 'calendario' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Seleziona una data disponibile</h3>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(giorno => (
                  <div key={giorno} className="text-center font-semibold text-gray-600 py-2">
                    {giorno}
                  </div>
                ))}
                
                {giorni.map((giorno, index) => {
                  const dayOfWeek = giorno.dataObj.getDay();
                  if (index === 0) {
                    // Aggiungi spazi vuoti per allineare il primo giorno
                    const emptyDays = Array.from({ length: dayOfWeek }, (_, i) => (
                      <div key={`empty-${i}`} className="h-12"></div>
                    ));
                    return [
                      ...emptyDays,
                      <button
                        key={giorno.data}
                        onClick={() => giorno.disponibile && !giorno.isPast && handleDataClick(giorno.data)}
                        disabled={!giorno.disponibile || giorno.isPast}
                        className={`h-12 rounded-lg text-sm font-medium transition-all duration-200 ${
                          giorno.isPast 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : giorno.disponibile 
                              ? 'bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-300'
                              : 'bg-red-100 text-red-700 cursor-not-allowed border-2 border-red-300'
                        }`}
                      >
                        {giorno.dataObj.getDate()}
                      </button>
                    ];
                  }
                  
                  return (
                    <button
                      key={giorno.data}
                      onClick={() => giorno.disponibile && !giorno.isPast && handleDataClick(giorno.data)}
                      disabled={!giorno.disponibile || giorno.isPast}
                      className={`h-12 rounded-lg text-sm font-medium transition-all duration-200 ${
                        giorno.isPast 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : giorno.disponibile 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-300'
                            : 'bg-red-100 text-red-700 cursor-not-allowed border-2 border-red-300'
                      }`}
                    >
                      {giorno.dataObj.getDate()}
                    </button>
                  );
                })}
              </div>
              
              {/* Legenda */}
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
                  <span>Disponibile</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
                  <span>Occupato</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                  <span>Passato</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Selezione Orario */}
          {step === 'orari' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">
                  Scegli un orario per {formatData(selectedDate)}
                </h3>
                <button 
                  onClick={resetSelection}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Cambia data
                </button>
              </div>
              
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {orariDisponibili.map(slot => (
                  <button
                    key={slot.ora}
                    onClick={() => slot.disponibile && handleOrarioClick(slot.ora)}
                    disabled={!slot.disponibile}
                    className={`p-3 rounded-lg font-medium transition-all duration-200 ${
                      slot.disponibile 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-300'
                        : 'bg-red-100 text-red-700 cursor-not-allowed border-2 border-red-300'
                    }`}
                  >
                    {slot.ora}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Conferma */}
          {step === 'conferma' && (
            <div>
              <h3 className="text-xl font-bold mb-6">Conferma la prenotazione</h3>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Professionista:</span>
                    <span>Professionista</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Data:</span>
                    <span>{formatData(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Orario:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Durata:</span>
                    <span>30 minuti</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Totale:</span>
                    <span>€50</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setStep('orari')}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Indietro
                </button>
                <button 
                  onClick={handleConfermaPrenotazione}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                >
                  {isSubmitting ? 'Invio richiesta...' : 'Conferma Prenotazione'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 