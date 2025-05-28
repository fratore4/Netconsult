'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    dataNascita: '',
    sesso: '',
    password: '',
    confermaPassword: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Rimuovi l'errore quando l'utente inizia a digitare
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Validazione nome
    if (!formData.nome.trim()) {
      newErrors.nome = 'Il nome è obbligatorio';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Il nome deve avere almeno 2 caratteri';
    }

    // Validazione cognome
    if (!formData.cognome.trim()) {
      newErrors.cognome = 'Il cognome è obbligatorio';
    } else if (formData.cognome.trim().length < 2) {
      newErrors.cognome = 'Il cognome deve avere almeno 2 caratteri';
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }

    // Validazione telefono
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{8,15}$/;
    if (!formData.telefono) {
      newErrors.telefono = 'Il numero di telefono è obbligatorio';
    } else if (!phoneRegex.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'Inserisci un numero di telefono valido';
    }

    // Validazione data di nascita
    if (!formData.dataNascita) {
      newErrors.dataNascita = 'La data di nascita è obbligatoria';
    } else {
      const dataNascita = new Date(formData.dataNascita);
      const oggi = new Date();
      const eta = oggi.getFullYear() - dataNascita.getFullYear();
      const meseCompleanno = dataNascita.getMonth();
      const giornoCompleanno = dataNascita.getDate();
      const haGiaCompiutoAnni = oggi.getMonth() > meseCompleanno || 
        (oggi.getMonth() === meseCompleanno && oggi.getDate() >= giornoCompleanno);
      
      const etaEffettiva = haGiaCompiutoAnni ? eta : eta - 1;
      
      if (etaEffettiva < 16) {
        newErrors.dataNascita = 'Devi avere almeno 16 anni per registrarti';
      } else if (etaEffettiva > 100) {
        newErrors.dataNascita = 'Età non valida';
      }
    }

    // Validazione sesso
    if (!formData.sesso) {
      newErrors.sesso = 'Seleziona il tuo sesso';
    }

    // Validazione password
    if (!formData.password) {
      newErrors.password = 'La password è obbligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La password deve avere almeno 6 caratteri';
    }

    // Validazione conferma password
    if (!formData.confermaPassword) {
      newErrors.confermaPassword = 'Conferma la password';
    } else if (formData.password !== formData.confermaPassword) {
      newErrors.confermaPassword = 'Le password non corrispondono';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simula registrazione
    setTimeout(() => {
      alert('Registrazione completata con successo!\n\nBenvenuto in Netconsult!');
      
      // Simula login automatico dopo registrazione
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify({
        nome: formData.nome,
        cognome: formData.cognome,
        email: formData.email,
        telefono: formData.telefono,
        dataNascita: formData.dataNascita,
        sesso: formData.sesso
      }));
      
      // Reindirizza alla homepage
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/favicon.ico" alt="Netconsult Logo" className="w-16 h-16 mr-3" />
            <div>
              <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Net
              </span>
              <span className="text-4xl font-bold text-blue-600">
                consult
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crea il tuo Account</h1>
          <p className="text-gray-600">Unisciti alla nostra community di professionisti</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Nome e Cognome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.nome ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Mario"
                />
                {errors.nome && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.nome}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="cognome" className="block text-sm font-medium text-gray-700 mb-2">
                  Cognome *
                </label>
                <input
                  type="text"
                  id="cognome"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.cognome ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Rossi"
                />
                {errors.cognome && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.cognome}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="mario.rossi@email.com"
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

            {/* Telefono */}
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                Numero di Telefono *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.telefono ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="+39 333 123 4567"
              />
              {errors.telefono && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.telefono}
                </p>
              )}
            </div>

            {/* Data di nascita e Sesso */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dataNascita" className="block text-sm font-medium text-gray-700 mb-2">
                  Data di nascita *
                </label>
                <input
                  type="date"
                  id="dataNascita"
                  name="dataNascita"
                  value={formData.dataNascita}
                  onChange={handleInputChange}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 16)).toISOString().split('T')[0]}
                  min={new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.dataNascita ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {errors.dataNascita && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.dataNascita}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="sesso" className="block text-sm font-medium text-gray-700 mb-2">
                  Sesso *
                </label>
                <select
                  id="sesso"
                  name="sesso"
                  value={formData.sesso}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.sesso ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleziona...</option>
                  <option value="maschio">Maschio</option>
                  <option value="femmina">Femmina</option>
                  <option value="altro">Altro</option>
                  <option value="preferisco_non_dire">Preferisco non dire</option>
                </select>
                {errors.sesso && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.sesso}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Almeno 6 caratteri"
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

            {/* Conferma Password */}
            <div>
              <label htmlFor="confermaPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Conferma Password *
              </label>
              <input
                type="password"
                id="confermaPassword"
                name="confermaPassword"
                value={formData.confermaPassword}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.confermaPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Ripeti la password"
              />
              {errors.confermaPassword && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.confermaPassword}
                </p>
              )}
            </div>

            {/* Privacy Policy */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="privacy"
                  required
                  className="mt-1 mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  Accetto i <a href="#" className="text-blue-600 hover:underline">Termini di Servizio</a> e 
                  la <a href="#" className="text-blue-600 hover:underline ml-1">Privacy Policy</a> di Netconsult
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registrazione in corso...
                </>
              ) : (
                'Crea Account'
              )}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Hai già un account? {' '}
                <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                  Accedi qui
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Sicurezza Garantita</h3>
            <p className="text-gray-600 text-sm">I tuoi dati sono protetti con crittografia avanzata</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Professionisti Verificati</h3>
            <p className="text-gray-600 text-sm">Accesso a consulenti qualificati e certificati</p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Prenotazione Rapida</h3>
            <p className="text-gray-600 text-sm">Sistema di booking semplice e intuitivo</p>
          </div>
        </div>
      </div>
    </div>
  );
} 