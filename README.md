# 🚀 Netconsult - Piattaforma di Consulenze Online

Una piattaforma moderna per prenotare e gestire consulenze online con sistema di videochiamate integrato.

## ✨ Funzionalità Principali

- 🔍 **Sistema di Prenotazione**: Ricerca e prenota consulenze con filtri avanzati
- 👥 **Gestione Professionisti**: Profili dettagliati e specializzazioni multiple
- 📹 **Videochiamate HD**: Sistema integrato con Agora.io per chiamate video
- 🔐 **Autenticazione**: Sistema di login sicuro e gestione utenti
- 📱 **Design Responsive**: Ottimizzato per desktop, tablet e mobile
- 💎 **UI Moderna**: Design accattivante con Tailwind CSS

## 🛠 Tecnologie Utilizzate

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Videochiamate**: Agora.io SDK
- **Database**: Supabase (configurazione per il futuro)
- **Deploy**: Render.com + GitHub

## 🚀 Avvio Locale

```bash
# Clona il repository
git clone <url-repository>
cd consulenze-online

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## 🌐 Deploy Online

### Prerequisiti
1. Account GitHub
2. Account Render.com (gratuito)

### Istruzioni Deploy
1. Pusha il codice su GitHub
2. Collega il repository a Render
3. Configura il build e deploy automatico

Render detecta automaticamente Next.js e configura:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18+

## 🔑 Credenziali Demo

Per testare il sistema, usa una di queste credenziali:

- **Cliente**: demo@netconsult.com / demo123
- **Consulente**: consulente@netconsult.com / consulente123
- **Admin**: admin@netconsult.com / admin123

## 📋 Variabili d'Ambiente (Opzionali)

Crea un file `.env.local` per la configurazione locale:

```env
NEXT_PUBLIC_AGORA_APP_ID=your_agora_app_id
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

**Nota**: Il progetto funziona anche senza variabili d'ambiente utilizzando configurazioni demo.

## 🎯 Roadmap

- [ ] Integrazione pagamenti Stripe
- [ ] Sistema notifiche real-time
- [ ] Chat testuale durante videochiamate
- [ ] App mobile React Native
- [ ] Dashboard analytics per consulenti

## 📞 Supporto

Per supporto tecnico o domande:
- 📧 Email: supporto@netconsult.com
- 💬 Chat: Disponibile nella piattaforma

---

Sviluppato con ❤️ per rendere le consulenze online più accessibili e professionali.
