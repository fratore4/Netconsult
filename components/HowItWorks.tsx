export default function HowItWorks() {
  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center">Come Funziona</h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl">
          Connettiti facilmente con professionisti esperti e ricevi consulenza personalizzata in tre semplici passaggi
        </p>
        <div className="flex flex-col sm:flex-row gap-8 w-full justify-center">
          {/* Step 1 */}
          <div className="flex-1 bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center gap-3 border-t-4 border-blue-400">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5Z" fill="currentColor"/></svg>
            </div>
            <div className="font-bold text-lg">Crea un profilo</div>
            <div className="text-gray-500 text-center text-sm">Registrati e crea il tuo profilo indicando il tuo percorso e le tue competenze o esigenze professionali.</div>
          </div>
          {/* Step 2 */}
          <div className="flex-1 bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center gap-3 border-t-4 border-purple-400">
            <div className="bg-purple-100 text-purple-600 rounded-full p-3 mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm0 14.2a7.2 7.2 0 0 1-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.2 7.2 0 0 1-6 3.2Z" fill="currentColor"/></svg>
            </div>
            <div className="font-bold text-lg">Trova il tuo professionista</div>
            <div className="text-gray-500 text-center text-sm">Cerca tra i professionisti disponibili utilizzando filtri per competenze, ruolo o settore di interesse.</div>
          </div>
          {/* Step 3 */}
          <div className="flex-1 bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center gap-3 border-t-4 border-blue-400">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M17 10.5V7a5 5 0 0 0-10 0v3.5M5 10.5V7a7 7 0 0 1 14 0v3.5M12 17v2m-6-2a6 6 0 0 0 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="font-bold text-lg">Prenota una consulenza</div>
            <div className="text-gray-500 text-center text-sm">Scegli uno slot disponibile nel calendario del professionista e paga per prenotare la tua videoconsulenza.</div>
          </div>
        </div>
        <a href="/register" className="mt-10 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow hover:opacity-90 transition">Inizia ora</a>
      </div>
    </section>
  );
} 