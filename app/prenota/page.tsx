'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchFilters {
  tipoConsulenza: string;
  data: string;
  orario: string;
  prezzoMax: number;
}

export default function PrenotaConsulenza() {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFilters>({
    tipoConsulenza: '',
    data: '',
    orario: '',
    prezzoMax: 100
  });

  const [isSearching, setIsSearching] = useState(false);

  // Opzioni disponibili
  const tipiConsulenza = [
    'Marketing Digitale e Social Media',
    'Coaching e Sviluppo Personale', 
    'Consulenza Finanziaria e Investimenti',
    'Design UX/UI e Grafica',
    'Sviluppo Web e App',
    'Strategia Aziendale e Business',
    'Consulenza Legale',
    'Consulenza Fiscale e Commerciale',
    'Supporto Psicologico',
    'Nutrizione e Benessere'
  ];

  const fasce_orarie = [
    '09:00 - 10:00',
    '10:00 - 11:00', 
    '11:00 - 12:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00'
  ];

  const handleInputChange = (field: keyof SearchFilters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = async () => {
    setIsSearching(true);
    
    // Simulo una ricerca di 1 secondo
    setTimeout(() => {
      // Costruisco i parametri di ricerca per passarli alla pagina professionisti
      const searchParams = new URLSearchParams();
      
      if (filters.tipoConsulenza) searchParams.set('tipoConsulenza', filters.tipoConsulenza);
      if (filters.data) searchParams.set('data', filters.data);
      if (filters.orario) searchParams.set('orario', filters.orario);
      if (filters.prezzoMax) searchParams.set('prezzoMax', filters.prezzoMax.toString());

      // Reindirizzo alla pagina professionisti con i filtri
      router.push(`/professionisti?${searchParams.toString()}`);
      setIsSearching(false);
    }, 1000);
  };

  const resetFilters = () => {
    setFilters({
      tipoConsulenza: '',
      data: '',
      orario: '',
      prezzoMax: 100
    });
  };

  // Formatto la data per mostrarla in modo user-friendly
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Trova la Consulenza che Cerchi
          </h1>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Scopri professionisti qualificati pronti ad aiutarti. Scegli il tipo di consulenza, 
            la data e l&apos;orario che preferisci.
          </p>

          {/* Search Box - Stile Booking */}
          <div className="bg-white rounded-lg shadow-2xl p-1 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-1">
              
              {/* Tipo di Consulenza */}
              <div className="relative">
                <div className="p-3 border-r border-gray-200 lg:border-r-1 lg:border-b-0 border-b">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-1.5 rounded-full flex-shrink-0">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2h2a2 2 0 002-2V6z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Tipo di consulenza
                      </label>
                      <select
                        value={filters.tipoConsulenza}
                        onChange={(e) => handleInputChange('tipoConsulenza', e.target.value)}
                        className="w-full text-gray-900 font-medium bg-transparent border-none outline-none text-sm truncate pr-1"
                      >
                        <option value="">Di cosa hai bisogno?</option>
                        {tipiConsulenza.map(tipo => (
                          <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data */}
              <div className="relative">
                <div className="p-3 border-r border-gray-200 lg:border-r-1 lg:border-b-0 border-b">
                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-1.5 rounded-full flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Data
                      </label>
                      <input
                        type="date"
                        value={filters.data}
                        onChange={(e) => handleInputChange('data', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full text-gray-900 font-medium bg-transparent border-none outline-none text-sm"
                      />
                      {filters.data && (
                        <div className="text-xs text-gray-500 mt-0.5 truncate">
                          {formatDate(filters.data)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fascia Oraria */}
              <div className="relative">
                <div className="p-3 border-r border-gray-200 lg:border-r-1 lg:border-b-0 border-b">
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-100 p-1.5 rounded-full flex-shrink-0">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Fascia oraria
                      </label>
                      <select
                        value={filters.orario}
                        onChange={(e) => handleInputChange('orario', e.target.value)}
                        className="w-full text-gray-900 font-medium bg-transparent border-none outline-none text-sm truncate pr-1"
                      >
                        <option value="">Quando preferisci?</option>
                        {fasce_orarie.map(orario => (
                          <option key={orario} value={orario}>{orario}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prezzo Massimo */}
              <div className="relative">
                <div className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-orange-100 p-1.5 rounded-full flex-shrink-0">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Budget massimo
                      </label>
                      <div className="flex items-center gap-1">
                        <input
                          type="range"
                          min="25"
                          max="200"
                          step="25"
                          value={filters.prezzoMax}
                          onChange={(e) => handleInputChange('prezzoMax', parseInt(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer min-w-0"
                        />
                        <span className="text-xs font-bold text-gray-900 whitespace-nowrap ml-1">
                          €{filters.prezzoMax}/30min
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="border-t border-gray-200 p-3 flex gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors text-sm"
              >
                Cancella
              </button>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-base"
              >
                {isSearching ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Cercando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Cerca Professionisti
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perché Scegliere Netconsult?
            </h2>
            <p className="text-xl text-gray-600">
              La piattaforma più affidabile per trovare consulenti professionali
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professionisti Verificati</h3>
              <p className="text-gray-600">Tutti i nostri consulenti sono verificati e certificati nel loro settore</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Flessibilità Oraria</h3>
              <p className="text-gray-600">Prenota quando vuoi, anche negli orari serali e nei weekend</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prezzi Trasparenti</h3>
              <p className="text-gray-600">Nessun costo nascosto, paghi solo per la consulenza che ricevi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Professionisti Attivi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">5000+</div>
              <div className="text-gray-600">Consulenze Completate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">4.8★</div>
              <div className="text-gray-600">Rating Medio</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">24h</div>
              <div className="text-gray-600">Supporto Disponibile</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 