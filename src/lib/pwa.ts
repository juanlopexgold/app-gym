// Registrar Service Worker para PWA
export function registerSW() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registrado exitosamente:', registration.scope)
        })
        .catch((registrationError) => {
          console.log('Error al registrar SW:', registrationError)
        })
    })
  }
}

// Función para instalar la PWA
export function installPWA() {
  let deferredPrompt: any

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevenir que Chrome muestre el prompt automáticamente
    e.preventDefault()
    // Guardar el evento para usarlo después
    deferredPrompt = e
    // Mostrar botón de instalación personalizado
    showInstallButton()
  })

  // Función para mostrar el botón de instalación
  function showInstallButton() {
    const installButton = document.createElement('button')
    installButton.textContent = 'Instalar App'
    installButton.className = 'fixed bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50 hover:bg-primary/90 transition-colors'
    installButton.onclick = () => {
      if (deferredPrompt) {
        // Mostrar el prompt de instalación
        deferredPrompt.prompt()
        // Esperar a que el usuario responda
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuario aceptó instalar la PWA')
          } else {
            console.log('Usuario rechazó instalar la PWA')
          }
          deferredPrompt = null
        })
      }
    }
    document.body.appendChild(installButton)
  }

  // Detectar si la app ya está instalada
  window.addEventListener('appinstalled', () => {
    console.log('PWA instalada exitosamente')
    // Ocultar el botón de instalación si existe
    const installButton = document.querySelector('button[onclick*="deferredPrompt"]')
    if (installButton) {
      installButton.remove()
    }
  })
}

// Función para verificar si la app está en modo standalone (instalada)
export function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true
}

// Función para solicitar permisos de notificaciones
export function requestNotificationPermission(): Promise<NotificationPermission> {
  if ('Notification' in window) {
    return Notification.requestPermission()
  }
  return Promise.resolve('denied')
}

// Función para mostrar notificación
export function showNotification(title: string, options?: NotificationOptions) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      ...options
    })
  }
}
