import { supabase } from "../../../src/lib/supabase";
import ProfessionistaDetails from "./ProfessionistaDetails";

// Componente server che recupera i dati
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { data: professionista, error } = await supabase
    .from("professionisti")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();
  
  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center py-20 text-red-600">
          Errore nel caricamento del professionista: {error.message}
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