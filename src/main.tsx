import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Amplify } from 'aws-amplify'
import './index.css'
import App from './App.tsx'
import { registerSW, installPWA, setupReminders } from './lib/pwa'

// Configuración de AWS Amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      // Más configuración...
    },
  },
  API: {
    GraphQL: {
      endpoint: import.meta.env.VITE_REALTIME_API_ENDPOINT,
      defaultAuthMode: 'userPool',
    }
  }
})

// Registrar Service Worker y configurar PWA
registerSW()
installPWA()
setupReminders()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)