export default function CallToAction() {
  return (
    <section className="w-full py-10 px-4">
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl shadow-lg p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">Pronto a trovare il tuo mentore?</h3>
          <p className="text-white text-opacity-90">Migliaia di professionisti hanno già accelerato il loro percorso professionale con Netconsult.</p>
        </div>
        <a href="/register" className="px-8 py-3 bg-white text-blue-700 rounded-lg font-semibold shadow hover:bg-gray-100 transition text-center whitespace-nowrap mt-4 sm:mt-0">Inizia gratuitamente</a>
      </div>
    </section>
  );
} 