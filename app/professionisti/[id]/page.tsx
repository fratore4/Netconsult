'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from "../../../src/lib/supabase";
import ProfessionistaDetails from "./ProfessionistaDetails";

interface Professionista {
  id: string;
  nome: string;
  ruolo: string;
  descrizione?: string;
  avatar_url?: string;
  prezzo?: number;
  valutazione?: number;
  disponibile?: boolean;
  email?: string;
  telefono?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  sito_web?: string;
}

// Componente client che recupera i dati
export default function Page() {
  const params = useParams();
  const [professionista, setProfessionista] = useState<Professionista | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfessionista() {
      if (!params?.id) return;
      
      setLoading(true);
      const { data, error } = await supabase
        .from("professionisti")
        .select("*")
        .eq("id", params.id)
        .single();
      
      if (error) {
        setError(error.message);
      } else {
        setProfessionista(data);
      }
      setLoading(false);
    }
    
    fetchProfessionista();
  }, [params?.id]);
  
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento professionista...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center py-20 text-red-600">
          Errore nel caricamento del professionista: {error}
        </div>
      </div>
    );
  }

  if (!professionista) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center py-20">Professionista non trovato</div>
      </div>
    );
  }

  return <ProfessionistaDetails professionista={professionista} />;
} 