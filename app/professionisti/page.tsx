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
        // Updated: 12 professionisti con foto reali - versione 2.0
        const mockProfessionisti: Professionista[] = [
          {
            id: '1',
            nome: 'Sara Bianchi',
            ruolo: 'Marketing Director',
            descrizione: 'Esperta in marketing digitale e social media strategy con oltre 8 anni di esperienza in aziende Fortune 500',
            avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=150&h=150&fit=crop&crop=face',
            prezzo: 75,
            valutazione: 4.9,
            disponibile: true,
            created_at: '2024-01-01T00:00:00Z'
          },
          {
            id: '2',
            nome: 'Marco Rossi',
            ruolo: 'UX Designer',
            descrizione: 'Senior UX Designer con 10+ anni di esperienza in app mobile e web design',
            avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            prezzo: 85,
            valutazione: 4.8,
            disponibile: true,
            created_at: '2024-01-02T00:00:00Z'
          },
          {
            id: '3',
            nome: 'Giulia Verdi',
            ruolo: 'Business Consultant',
            descrizione: 'Consulente strategico per startup e PMI, specializzata in growth hacking e analisi di mercato',
            avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            prezzo: 90,
            valutazione: 4.9,
            disponibile: true,
            created_at: '2024-01-03T00:00:00Z'
          },
          {
            id: '4',
            nome: 'Alessandro Ferrari',
            ruolo: 'Sviluppatore Web',
            descrizione: 'Full-stack developer specializzato in React, Node.js e architetture cloud moderne',
            avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            prezzo: 70,
            valutazione: 4.7,
            disponibile: true,
            created_at: '2024-01-04T00:00:00Z'
          },
          {
            id: '5',
            nome: 'Francesca Romano',
            ruolo: 'Consulente Finanziaria',
            descrizione: 'Esperta in pianificazione finanziaria personale e investimenti, con certificazione CFA',
            avatar_url: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
            prezzo: 95,
            valutazione: 4.8,
            disponibile: true,
            created_at: '2024-01-05T00:00:00Z'
          },
          {
            id: '6',
            nome: 'Roberto Colombo',
            ruolo: 'Legal Advisor',
            descrizione: 'Avvocato specializzato in diritto commerciale e startup, partner in studio legale internazionale',
            avatar_url: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face',
            prezzo: 120,
            valutazione: 4.9,
            disponibile: true,
            created_at: '2024-01-06T00:00:00Z'
          },
          {
            id: '7',
            nome: 'Chiara Esposito',
            ruolo: 'HR Specialist',
            descrizione: 'Consulente risorse umane con focus su talent acquisition e sviluppo organizzativo',
            avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
            prezzo: 65,
            valutazione: 4.6,
            disponibile: true,
            created_at: '2024-01-07T00:00:00Z'
          },
          {
            id: '8',
            nome: 'Luca Moretti',
            ruolo: 'Data Scientist',
            descrizione: 'Esperto in machine learning e analytics, con esperienza in progetti big data enterprise',
            avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            prezzo: 100,
            valutazione: 4.8,
            disponibile: true,
            created_at: '2024-01-08T00:00:00Z'
          },
          {
            id: '9',
            nome: 'Elena Ricci',
            ruolo: 'Content Strategist',
            descrizione: 'Specialista in content marketing e storytelling per brand digitali e social media',
            avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
            prezzo: 60,
            valutazione: 4.7,
            disponibile: true,
            created_at: '2024-01-09T00:00:00Z'
          },
          {
            id: '10',
            nome: 'Andrea Fontana',
            ruolo: 'E-commerce Expert',
            descrizione: 'Consulente e-commerce con focus su Shopify, Amazon e strategie di vendita online',
            avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
            prezzo: 80,
            valutazione: 4.6,
            disponibile: true,
            created_at: '2024-01-10T00:00:00Z'
          },
          {
            id: '11',
            nome: 'Valentina Galli',
            ruolo: 'Psicologa del Lavoro',
            descrizione: 'Supporto psicologico per professionisti, gestione stress e work-life balance',
            avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
            prezzo: 70,
            valutazione: 4.9,
            disponibile: true,
            created_at: '2024-01-11T00:00:00Z'
          },
          {
            id: '12',
            nome: 'Matteo Conti',
            ruolo: 'SEO Specialist',
            descrizione: 'Esperto in ottimizzazione motori di ricerca e digital marketing strategico',
            avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
            prezzo: 75,
            valutazione: 4.7,
            disponibile: true,
            created_at: '2024-01-12T00:00:00Z'
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