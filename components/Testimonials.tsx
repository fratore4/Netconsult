export default function Testimonials() {
  const testimonials = [
    {
      nome: "Marco Rossi",
      ruolo: "Startup Founder",
      testo: "&ldquo;Grazie alla consulenza di marketing ho aumentato le vendite del 300%. Un investimento che ha cambiato il destino della mia azienda!&rdquo;",
      avatar: "/favicon.ico",
      rating: 5
    },
    {
      nome: "Giulia Bianchi", 
      ruolo: "Digital Marketing Manager",
      testo: "&ldquo;Il consulente di strategia aziendale mi ha aiutato a strutturare l&apos;intera organizzazione. Risultati concreti fin dal primo incontro.&rdquo;",
      avatar: "/favicon.ico",
      rating: 5
    },
    {
      nome: "Andrea Verdi",
      ruolo: "E-commerce Owner", 
      testo: "&ldquo;Consulenza UX/UI eccezionale! Il redesign del mio sito ha incrementato le conversioni del 250%. Altamente raccomandato.&rdquo;",
      avatar: "/favicon.ico",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cosa Dicono i Nostri Clienti
          </h2>
          <p className="text-xl text-gray-600">
            Testimonianze reali da professionisti che hanno trasformato il loro business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.nome}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.nome}</h3>
                  <p className="text-sm text-gray-600">{testimonial.ruolo}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              
              <p 
                className="text-gray-700 italic"
                dangerouslySetInnerHTML={{ __html: testimonial.testo }}
              />
              
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 