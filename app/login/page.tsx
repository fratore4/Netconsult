'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  // Credenziali demo valide per il MVP
  const validCredentials = [
    { email: 'demo@netconsult.com', password: 'demo123', nome: 'Mario', cognome: 'Rossi', tipo: 'cliente' },
    { email: 'consulente@netconsult.com', password: 'consulente123', nome: 'Giulia', cognome: 'Bianchi', tipo: 'consulente' },
    { email: 'admin@netconsult.com', password: 'admin123', nome: 'Francesco', cognome: 'Admin', tipo: 'admin' },
    { email: 'test@test.com', password: 'test123', nome: 'Test', cognome: 'User', tipo: 'cliente' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Rimuovi errore quando l'utente inizia a digitare
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Validazione email
    if (!formData.email) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }

    // Validazione password
    if (!formData.password) {
      newErrors.password = 'La password è obbligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simula chiamata API
    setTimeout(() => {
      // Verifica credenziali
      const user = validCredentials.find(
        cred => cred.email === formData.email && cred.password === formData.password
      );

      if (user) {
        // Login riuscito
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify({
          nome: user.nome,
          cognome: user.cognome,
          email: user.email,
          tipo: user.tipo
        }));

        alert(`Benvenuto ${user.nome}! Login effettuato con successo.`);
        
        // Reindirizza alla homepage
        window.location.href = '/';
      } else {
        // Login fallito
        setErrors({
          general: 'Email o password non corretti. Prova con le credenziali demo.'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <img src="/favicon.ico" alt="Logo" className="w-12 h-12 mb-2" />
          <h2 className="text-2xl font-bold">Accedi a Netconsult</h2>
          <p className="text-gray-600 text-center text-sm">
            Accedi al tuo account per gestire le tue consulenze
          </p>
        </div>

        {/* Credenziali Demo */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">🔑 Credenziali Demo:</h3>
          <div className="text-xs text-blue-700 space-y-1">
            <div><strong>Cliente:</strong> demo@netconsult.com / demo123</div>
            <div><strong>Consulente:</strong> consulente@netconsult.com / consulente123</div>
            <div><strong>Test:</strong> test@test.com / test123</div>
          </div>
        </div>

        {/* Errore Generale */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-700 text-sm flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.general}
            </p>
          </div>
        )}

        {/* Login Sociale */}
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100 transition">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Accedi con Google
        </button>
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-2 hover:bg-gray-100 transition">
          <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="w-5 h-5" />
          Accedi con GitHub
        </button>
        
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs">Oppure</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        
        {/* Form Login */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              required
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-blue-600 text-sm hover:underline">Password dimenticata?</a>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Accesso in corso...
              </>
            ) : (
              'Accedi'
            )}
          </button>
        </form>
        
        <p className="text-center text-sm mt-2">
          Non hai un account? <Link href="/register" className="text-blue-600 hover:underline">Registrati</Link>
        </p>
      </div>
    </div>
  );
} 