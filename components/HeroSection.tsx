import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contenuto Sinistra */}
          <div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Connetti con <span className="text-yellow-300">Esperti</span> del tuo Settore
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Accedi a consulenze personalizzate con professionisti verificati. Migliora le tue competenze e accelera la tua carriera.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/professionisti"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg"
              >
                Esplora Professionisti
              </Link>
              <div className="flex items-center gap-4">
                <img src="/favicon.ico" alt="Utente 1" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="/favicon.ico" alt="Utente 2" className="w-10 h-10 rounded-full border-2 border-white -ml-3" />
                <img src="/favicon.ico" alt="Utente 3" className="w-10 h-10 rounded-full border-2 border-white -ml-3" />
                <span className="text-sm text-blue-100 ml-2">+1.200 professionisti attivi</span>
              </div>
            </div>
          </div>

          {/* Immagine/Elementi Grafici Destra */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Consulenza Completata</h3>
                    <p className="text-blue-100 text-sm">Marketing Strategy con Sara B.</p>
                  </div>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <img src="/favicon.ico" alt="Dashboard Preview" className="w-full rounded-lg opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 