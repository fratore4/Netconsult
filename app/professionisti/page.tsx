"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProfessionistaCard from "../../components/ProfessionistaCard";
import Link from 'next/link';

// Definisco un'interfaccia per il tipo Professionista
interface Professionista {
  id: string;
  nome: string;
  ruolo: string;
  descrizione?: string;
  avatar_url?: string;
  prezzo?: number;
  valutazione?: number;
  disponibile?: boolean;
  created_at: string;
}

function ProfessionistiContent() {
  const [professionisti, setProfessionisti] = useState<Professionista[]>([]);
  const [filteredProfessionisti, setFilteredProfessionisti] = useState<Professionista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Estraggo i filtri dai parametri URL
  const filters = {
    tipoConsulenza: searchParams.get('tipoConsulenza') || '',
    data: searchParams.get('data') || '',
    orario: searchParams.get('orario') || '',
    prezzoMax: parseInt(searchParams.get('prezzoMax') || '200')
  };

  const hasFilters = Object.values(filters).some(value => 
    typeof value === 'string' ? value !== '' : (value !== 200 && value !== 0)
  );

  useEffect(() => {
    async function fetchProfessionisti() {
      setLoading(true);
      
      try {
        // Usa dati mock per il deploy - previene errori di prerendering
        const mockProfessionisti: Professionista[] = [
          {
            id: '1',
            nome: 'Sara Bianchi',
            ruolo: 'Marketing Director',
            descrizione: 'Esperta in marketing digitale e social media strategy',
            avatar_url: '/favicon.ico',
            prezzo: 75,
            valutazione: 4.9,
            disponibile: true,
            created_at: '2024-01-01T00:00:00Z'
          },
          {
            id: '2',
            nome: 'Marco Rossi',
            ruolo: 'UX Designer',
            descrizione: 'Senior UX Designer con 10+ anni di esperienza',
            avatar_url: '/favicon.ico',
            prezzo: 85,
            valutazione: 4.8,
            disponibile: true,
            created_at: '2024-01-02T00:00:00Z'
          },
          {
            id: '3',
            nome: 'Giulia Verdi',
            ruolo: 'Business Consultant',
            descrizione: 'Consulente strategico per startup e PMI',
            avatar_url: '/favicon.ico',
            prezzo: 90,
            valutazione: 4.9,
            disponibile: true,
            created_at: '2024-01-03T00:00:00Z'
          }
        ];

        // Simula un piccolo delay per realismo
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setProfessionisti(mockProfessionisti);
        setError(null);
      } catch (err) {
        setError("Errore nel caricamento dei professionisti");
        setProfessionisti([]);
      }
      
      setLoading(false);
    }
    
    fetchProfessionisti();
  }, []);

  // Filtro i professionisti in base ai criteri di ricerca
  useEffect(() => {
    if (!hasFilters) {
      setFilteredProfessionisti(professionisti);
      return;
    }

    const filtered = professionisti.filter(prof => {
      // Filtro per tipo di consulenza
      if (filters.tipoConsulenza && !prof.ruolo.toLowerCase().includes(filters.tipoConsulenza.toLowerCase().split(' ')[0])) {
        return false;
      }

      // Filtro per prezzo massimo
      if (prof.prezzo && prof.prezzo > filters.prezzoMax) {
        return false;
      }

      // Filtro per disponibilità (semplificato - assume che tutti siano disponibili per ora)
      if (filters.data && !prof.disponibile) {
        return false;
      }

      return true;
    });

    setFilteredProfessionisti(filtered);
  }, [professionisti, filters, hasFilters]);

  const displayProfessionisti = hasFilters ? filteredProfessionisti : professionisti;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header con risultati filtri */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {hasFilters ? 'Risultati della Ricerca' : 'I nostri Professionisti'}
          </h1>
          
          {hasFilters && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Filtri Applicati:</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {filters.tipoConsulenza && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    📋 {filters.tipoConsulenza}
                  </span>
                )}
                {filters.prezzoMax && filters.prezzoMax < 200 && (
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    💰 Budget max: €{filters.prezzoMax}
                  </span>
                )}
                {filters.orario && (
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    🕐 {filters.orario}
                  </span>
                )}
                {filters.data && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    📅 {new Date(filters.data).toLocaleDateString('it-IT')}
                  </span>
                )}
              </div>
              
              <div className="mt-4 text-center">
                <span className="text-gray-600">
                  Trovati <strong>{displayProfessionisti.length}</strong> professionisti che corrispondono ai tuoi criteri
                </span>
              </div>
              
              <div className="mt-4">
                <Link 
                  href="/prenota" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                >
                  ← Modifica criteri di ricerca
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Stato di caricamento ed errori */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3">
              <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600">Caricamento professionisti...</span>
            </div>
          </div>
        )}
        
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-100 border border-red-300 rounded-lg p-6 max-w-md mx-auto">
              <svg className="w-8 h-8 text-red-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Nessun risultato */}
        {!loading && !error && displayProfessionisti.length === 0 && hasFilters && (
          <div className="text-center py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
              <svg className="w-12 h-12 text-yellow-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Nessun professionista trovato</h3>
              <p className="text-gray-600 mb-4">
                Non abbiamo trovato professionisti che corrispondono ai tuoi criteri di ricerca.
              </p>
              <div className="space-y-2">
                <Link 
                  href="/prenota" 
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Modifica Ricerca
                </Link>
                <div>
                  <Link 
                    href="/professionisti" 
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Vedi tutti i professionisti
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Griglia professionisti */}
        {!loading && !error && displayProfessionisti.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProfessionisti.map((prof) => (
              <ProfessionistaCard key={prof.id} prof={prof} />
            ))}
          </div>
        )}

        {/* Call to action se non ci sono filtri */}
        {!hasFilters && !loading && displayProfessionisti.length > 0 && (
          <div className="text-center mt-12">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Vuoi una ricerca più specifica?
              </h3>
              <p className="text-gray-600 mb-6">
                Usa i nostri filtri avanzati per trovare il professionista perfetto per le tue esigenze.
              </p>
              <Link 
                href="/prenota" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Ricerca Avanzata
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Professionisti() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfessionistiContent />
    </Suspense>
  );
} 