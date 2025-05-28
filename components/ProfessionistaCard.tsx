import Link from 'next/link';

type Professionista = {
  id: string;
  nome: string;
  ruolo: string;
  descrizione?: string;
  avatar_url?: string;
  prezzo?: number;
  valutazione?: number;
  disponibile?: boolean;
};

export default function ProfessionistaCard({ prof }: { prof: Professionista }) {
  // Genera un numero casuale di recensioni tra 12 e 230 utilizzando l'id come seed
  const getReviewCount = () => {
    // Usa l'id come un elemento per generare un numero "casuale" ma deterministico
    const seed = prof.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 12 + (seed % 218); // Tra 12 e 230 recensioni
  };

  const recensioni = getReviewCount();
  const rating = prof.valutazione || 5; // Valore predefinito di 5 se valutazione è undefined

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-auto flex flex-col gap-4 relative hover:shadow-2xl transition-shadow duration-300">
      {/* Info professionista */}
      <div className="flex items-center gap-3">
        <img src={prof.avatar_url || '/favicon.ico'} alt={prof.nome} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1">
          <div className="font-bold text-lg">{prof.nome}</div>
          <div className="text-gray-500 text-sm">{prof.ruolo}</div>
        </div>
        {prof.disponibile && <span className="text-green-600 font-semibold text-sm">Online</span>}
      </div>
      
      {/* Valutazione e prezzo */}
      <div className="flex items-center gap-2 mt-1">
        <div className="flex items-center text-yellow-500 text-lg">
          {[...Array(5)].map((_, i) => (
            <span key={i}>
              {i < Math.floor(rating) ? "★" : 
               i < rating ? "★" : // Stella piena
               "☆"} {/* Stella vuota */}
            </span>
          ))}
        </div>
        <span className="text-gray-500 text-sm">({recensioni})</span>
        <span className="ml-auto text-black font-bold text-lg">
          €{prof.prezzo || '--'}<span className="text-xs font-normal">/30min</span>
        </span>
      </div>
      
      {/* Descrizione professionista */}
      <div className="w-full bg-gray-50 rounded-lg p-3 mt-2">
        <p className="text-gray-700 text-sm italic">
          {prof.descrizione || "Professionista esperto nel suo campo, pronto ad offrirti consulenze personalizzate di alta qualità."}
        </p>
      </div>
      
      <div className="flex gap-2 mt-3">
        {/* Pulsante per vedere profilo */}
        <Link 
          href={`/professionisti/${prof.id}`} 
          className="flex-1 text-center py-2 border border-blue-500 text-blue-500 rounded-lg font-semibold hover:bg-blue-50 transition"
        >
          Vedi profilo
        </Link>
        
        {/* Pulsante prenota */}
        <a 
          href="/prenota" 
          className="flex-1 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
        >
          Prenota
        </a>
      </div>
    </div>
  );
} 