"use client";
import Link from "next/link";
import { useState } from "react";
import CalendarioPrenotazione from "../../../components/CalendarioPrenotazione";

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

export default function ProfessionistaDetails({ professionista }: { professionista: Professionista }) {
  const [showCalendario, setShowCalendario] = useState(false);

  // Converti le righe della descrizione in un array per renderizzarle correttamente
  const descrizioneArray = professionista.descrizione?.split('\n').filter(line => line.trim() !== '') || [];

  // Calcola il numero di recensioni basato sull'ID (come nella card)
  const getReviewCount = () => {
    const seed = professionista.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 12 + (seed % 218); // Tra 12 e 230 recensioni
  };

  // Valutazione variabile tra 3 e 5 stelle, basata sull'ID del professionista
  const getRating = () => {
    if (professionista.valutazione) return professionista.valutazione;
    
    const seed = professionista.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Genera un valore tra 3.0 e 5.0 con una cifra decimale
    return 3 + ((seed % 20) / 10); // Tra 3.0 e 5.0 con incrementi di 0.1
  };

  const recensioni = getReviewCount();
  const rating = getRating();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link href="/professionisti" className="flex items-center text-blue-600 mb-6 hover:underline">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mr-2">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Torna alla lista dei professionisti
      </Link>

      <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
        {/* Header con foto e info principali */}
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-8">
          <img 
            src={professionista.avatar_url || '/favicon.ico'} 
            alt={professionista.nome} 
            className="w-32 h-32 rounded-full object-cover shadow-md"
          />
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{professionista.nome}</h1>
            <div className="text-xl text-gray-600 mb-2">{professionista.ruolo}</div>
            
            {/* Social icons */}
            <div className="flex gap-3 mb-4 justify-center md:justify-start">
              {professionista.linkedin && (
                <a href={professionista.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 3H3.5C2.12 3 1 4.12 1 5.5V18.5C1 19.88 2.12 21 3.5 21H20.5C21.88 21 23 19.88 23 18.5V5.5C23 4.12 21.88 3 20.5 3ZM8 19H5V9H8V19ZM6.5 7.5C5.67 7.5 5 6.83 5 6C5 5.17 5.67 4.5 6.5 4.5C7.33 4.5 8 5.17 8 6C8 6.83 7.33 7.5 6.5 7.5ZM19 19H16V13.3C16 11.3 13 11.5 13 13.3V19H10V9H13V10.7C14.5 8.1 19 8 19 12.5V19Z" />
                  </svg>
                </a>
              )}
              
              {professionista.facebook && (
                <a href={professionista.facebook} target="_blank" rel="noopener noreferrer" 
                   className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 3H3.5C2.12 3 1 4.12 1 5.5V18.5C1 19.88 2.12 21 3.5 21H12V14H9.5V11H12V8.5C12 6.57 13.57 5 15.5 5H18V8H15.5C14.67 8 14 8.67 14 9.5V11H18V14H14V21H20.5C21.88 21 23 19.88 23 18.5V5.5C23 4.12 21.88 3 20.5 3Z" />
                  </svg>
                </a>
              )}
              
              {professionista.instagram && (
                <a href={professionista.instagram} target="_blank" rel="noopener noreferrer" 
                   className="bg-gradient-to-r from-purple-500 via-pink-600 to-orange-500 text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7.5C9.5 7.5 7.5 9.5 7.5 12C7.5 14.5 9.5 16.5 12 16.5C14.5 16.5 16.5 14.5 16.5 12C16.5 9.5 14.5 7.5 12 7.5ZM12 15C10.3 15 9 13.7 9 12C9 10.3 10.3 9 12 9C13.7 9 15 10.3 15 12C15 13.7 13.7 15 12 15Z" />
                    <path d="M17.5 6.5C17.5 7.33 16.83 8 16 8C15.17 8 14.5 7.33 14.5 6.5C14.5 5.67 15.17 5 16 5C16.83 5 17.5 5.67 17.5 6.5Z" />
                    <path d="M17.4999 3H6.49994C4.49994 3 2.99994 4.5 2.99994 6.5V17.5C2.99994 19.5 4.49994 21 6.49994 21H17.4999C19.4999 21 20.9999 19.5 20.9999 17.5V6.5C20.9999 4.5 19.4999 3 17.4999 3ZM19.4999 17.5C19.4999 18.6 18.5999 19.5 17.4999 19.5H6.49994C5.39994 19.5 4.49994 18.6 4.49994 17.5V6.5C4.49994 5.4 5.39994 4.5 6.49994 4.5H17.4999C18.5999 4.5 19.4999 5.4 19.4999 6.5V17.5Z" />
                  </svg>
                </a>
              )}
              
              {professionista.twitter && (
                <a href={professionista.twitter} target="_blank" rel="noopener noreferrer" 
                   className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 5.8C21.2 6.1 20.4 6.3 19.5 6.4C20.4 5.9 21.1 5.1 21.4 4.1C20.6 4.6 19.7 4.9 18.8 5.1C18 4.3 16.9 3.8 15.7 3.8C13.5 3.8 11.7 5.6 11.7 7.8C11.7 8.1 11.7 8.4 11.8 8.6C8.3 8.5 5.1 6.9 3 4.4C2.6 4.9 2.4 5.6 2.4 6.3C2.4 7.6 3.1 8.8 4.2 9.5C3.5 9.5 2.8 9.3 2.2 9V9.1C2.2 11 3.6 12.6 5.5 13C5.1 13.1 4.7 13.1 4.3 13.1C4 13.1 3.7 13.1 3.5 13C4 14.6 5.6 15.7 7.4 15.7C5.9 16.7 4 17.3 2 17.3C1.7 17.3 1.4 17.3 1 17.2C2.9 18.3 5 19 7.2 19C15.7 19 20.3 12 20.3 6C20.3 5.8 20.3 5.7 20.3 5.5C21.2 5 21.8 4.3 22.3 3.6L22 5.8Z" />
                  </svg>
                </a>
              )}
              
              {professionista.sito_web && (
                <a href={professionista.sito_web} target="_blank" rel="noopener noreferrer" 
                   className="bg-gray-700 text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </a>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
              {professionista.disponibile && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Disponibile
                </span>
              )}
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                €{professionista.prezzo}/30min
              </span>
              <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                <div className="flex text-yellow-500 mr-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(rating) ? "★" : 
                      i < rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span>({recensioni} recensioni)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button
                onClick={() => setShowCalendario(true)} 
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:opacity-90 transition"
              >
                Prenota una sessione
              </button>
              <button className="bg-white border border-blue-500 text-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                Contatta
              </button>
            </div>
          </div>
        </div>
        
        {/* Biografia */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Biografia</h2>
          <div className="bg-gray-50 rounded-lg p-6 text-gray-700 leading-relaxed">
            {descrizioneArray.map((paragrafo, index) => (
              <p key={index} className="mb-4">{paragrafo}</p>
            ))}
          </div>
        </div>
        
        {/* Contatti */}
        {(professionista.email || professionista.telefono || professionista.sito_web) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contatti</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {professionista.email && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <a href={`mailto:${professionista.email}`} className="text-blue-600 hover:underline">{professionista.email}</a>
                  </div>
                </div>
              )}
              
              {professionista.telefono && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3747C21.0391 21.7498 20.5099 21.9605 19.96 21.96C16.4289 21.6894 13.0299 20.5396 10.05 18.63C7.28025 16.8902 4.94157 14.5516 3.2 11.78C1.3 8.79 0.150305 5.38 0 1.84C-0.000737921 1.29107 0.209133 0.763485 0.582378 0.388439C0.955623 0.0133923 1.48301 -0.196642 2.03 0.0400018H5.03C6.08 0.0400018 6.95 0.810002 7.13 1.84C7.24031 2.51756 7.4236 3.18131 7.68 3.82C7.94099 4.50998 7.89961 5.28494 7.56 5.94L6.5 7.86C8.13466 10.7447 10.558 13.1681 13.44 14.8L15.36 13.74C16.015 13.4004 16.7899 13.359 17.48 13.62C18.1187 13.8764 18.7824 14.0597 19.46 14.17C20.511 14.35 21.28 15.26 21.25 16.32L22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Telefono</div>
                    <a href={`tel:${professionista.telefono}`} className="text-blue-600 hover:underline">{professionista.telefono}</a>
                  </div>
                </div>
              )}
              
              {professionista.sito_web && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Sito Web</div>
                    <a href={professionista.sito_web} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{professionista.sito_web}</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Social media */}
        {(professionista.linkedin || professionista.facebook || professionista.instagram || professionista.twitter) && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Social Media</h2>
            <div className="flex flex-wrap gap-4">
              {professionista.linkedin && (
                <a href={professionista.linkedin} target="_blank" rel="noopener noreferrer" className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded-lg flex items-center gap-2 transition">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 3H3.5C2.12 3 1 4.12 1 5.5V18.5C1 19.88 2.12 21 3.5 21H20.5C21.88 21 23 19.88 23 18.5V5.5C23 4.12 21.88 3 20.5 3ZM8 19H5V9H8V19ZM6.5 7.5C5.67 7.5 5 6.83 5 6C5 5.17 5.67 4.5 6.5 4.5C7.33 4.5 8 5.17 8 6C8 6.83 7.33 7.5 6.5 7.5ZM19 19H16V13.3C16 11.3 13 11.5 13 13.3V19H10V9H13V10.7C14.5 8.1 19 8 19 12.5V19Z" />
                  </svg>
                  LinkedIn
                </a>
              )}
              
              {professionista.facebook && (
                <a href={professionista.facebook} target="_blank" rel="noopener noreferrer" className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded-lg flex items-center gap-2 transition">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.5 3H3.5C2.12 3 1 4.12 1 5.5V18.5C1 19.88 2.12 21 3.5 21H12V14H9.5V11H12V8.5C12 6.57 13.57 5 15.5 5H18V8H15.5C14.67 8 14 8.67 14 9.5V11H18V14H14V21H20.5C21.88 21 23 19.88 23 18.5V5.5C23 4.12 21.88 3 20.5 3Z" />
                  </svg>
                  Facebook
                </a>
              )}
              
              {professionista.instagram && (
                <a href={professionista.instagram} target="_blank" rel="noopener noreferrer" className="bg-pink-100 hover:bg-pink-200 text-pink-800 p-3 rounded-lg flex items-center gap-2 transition">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7.5C9.5 7.5 7.5 9.5 7.5 12C7.5 14.5 9.5 16.5 12 16.5C14.5 16.5 16.5 14.5 16.5 12C16.5 9.5 14.5 7.5 12 7.5ZM12 15C10.3 15 9 13.7 9 12C9 10.3 10.3 9 12 9C13.7 9 15 10.3 15 12C15 13.7 13.7 15 12 15Z" />
                    <path d="M17.5 6.5C17.5 7.33 16.83 8 16 8C15.17 8 14.5 7.33 14.5 6.5C14.5 5.67 15.17 5 16 5C16.83 5 17.5 5.67 17.5 6.5Z" />
                    <path d="M17.4999 3H6.49994C4.49994 3 2.99994 4.5 2.99994 6.5V17.5C2.99994 19.5 4.49994 21 6.49994 21H17.4999C19.4999 21 20.9999 19.5 20.9999 17.5V6.5C20.9999 4.5 19.4999 3 17.4999 3ZM19.4999 17.5C19.4999 18.6 18.5999 19.5 17.4999 19.5H6.49994C5.39994 19.5 4.49994 18.6 4.49994 17.5V6.5C4.49994 5.4 5.39994 4.5 6.49994 4.5H17.4999C18.5999 4.5 19.4999 5.4 19.4999 6.5V17.5Z" />
                  </svg>
                  Instagram
                </a>
              )}
              
              {professionista.twitter && (
                <a href={professionista.twitter} target="_blank" rel="noopener noreferrer" className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded-lg flex items-center gap-2 transition">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 5.8C21.2 6.1 20.4 6.3 19.5 6.4C20.4 5.9 21.1 5.1 21.4 4.1C20.6 4.6 19.7 4.9 18.8 5.1C18 4.3 16.9 3.8 15.7 3.8C13.5 3.8 11.7 5.6 11.7 7.8C11.7 8.1 11.7 8.4 11.8 8.6C8.3 8.5 5.1 6.9 3 4.4C2.6 4.9 2.4 5.6 2.4 6.3C2.4 7.6 3.1 8.8 4.2 9.5C3.5 9.5 2.8 9.3 2.2 9V9.1C2.2 11 3.6 12.6 5.5 13C5.1 13.1 4.7 13.1 4.3 13.1C4 13.1 3.7 13.1 3.5 13C4 14.6 5.6 15.7 7.4 15.7C5.9 16.7 4 17.3 2 17.3C1.7 17.3 1.4 17.3 1 17.2C2.9 18.3 5 19 7.2 19C15.7 19 20.3 12 20.3 6C20.3 5.8 20.3 5.7 20.3 5.5C21.2 5 21.8 4.3 22.3 3.6L22 5.8Z" />
                  </svg>
                  Twitter
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal Calendario */}
      {showCalendario && (
        <CalendarioPrenotazione
          onDateSelect={(date) => {
            console.log('Data selezionata:', date);
          }}
          onTimeSelect={(time) => {
            console.log('Orario selezionato:', time);
            setShowCalendario(false);
          }}
        />
      )}
    </div>
  );
} 