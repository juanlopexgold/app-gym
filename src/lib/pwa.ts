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

// Función para instalar la PWA (ahora manejada por el hook usePWAInstall)
export function installPWA() {
  // Esta función ahora solo registra los event listeners básicos
  // El manejo de la instalación se hace a través del hook usePWAInstall
  
  // Detectar si la app ya está instalada
  window.addEventListener('appinstalled', () => {
    console.log('PWA instalada exitosamente')
  })
}

// Función para verificar si la app está en modo standalone (instalada)
export function isStandalone(): boolean {
  const nav = window.navigator as unknown as { standalone?: boolean }
  return window.matchMedia('(display-mode: standalone)').matches || nav.standalone === true
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

// Función para programar recordatorio de IMC
export function scheduleIMCReminder() {
  if ('Notification' in window && Notification.permission === 'granted') {
    // Verificar si ya hay un recordatorio programado
    const lastReminder = localStorage.getItem('lastIMCReminder')
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    if (!lastReminder || new Date(lastReminder) < oneWeekAgo) {
      // Programar notificación para mañana a las 9 AM
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(9, 0, 0, 0)
      
      const timeUntilNotification = tomorrow.getTime() - now.getTime()
      
      if (timeUntilNotification > 0) {
        setTimeout(() => {
          showNotification('📊 Recordatorio de IMC', {
            body: 'Es hora de registrar tu peso y altura para mantener un seguimiento de tu progreso.',
            tag: 'imc-reminder',
            requireInteraction: false
          })
          localStorage.setItem('lastIMCReminder', now.toISOString())
        }, timeUntilNotification)
      }
    }
  }
}

// Función para programar recordatorio de entrenamiento
export function scheduleWorkoutReminder() {
  if ('Notification' in window && Notification.permission === 'granted') {
    // Verificar si ya hay un recordatorio programado hoy
    const lastWorkoutReminder = localStorage.getItem('lastWorkoutReminder')
    const now = new Date()
    const today = now.toDateString()
    
    if (!lastWorkoutReminder || new Date(lastWorkoutReminder).toDateString() !== today) {
      // Programar notificación para las 6 PM
      const today6PM = new Date(now)
      today6PM.setHours(18, 0, 0, 0)
      
      const timeUntilNotification = today6PM.getTime() - now.getTime()
      
      if (timeUntilNotification > 0) {
        setTimeout(() => {
          showNotification('💪 ¡Hora de entrenar!', {
            body: 'No olvides hacer tu rutina de ejercicios de hoy. ¡Tu cuerpo te lo agradecerá!',
            tag: 'workout-reminder',
            requireInteraction: false
          })
          localStorage.setItem('lastWorkoutReminder', now.toISOString())
        }, timeUntilNotification)
      }
    }
  }
}

// Función para configurar recordatorios automáticos
export function setupReminders() {
  if ('Notification' in window) {
    // Solicitar permisos si no están concedidos
    if (Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          scheduleIMCReminder()
          scheduleWorkoutReminder()
        }
      })
    } else if (Notification.permission === 'granted') {
      scheduleIMCReminder()
      scheduleWorkoutReminder()
    }
  }
}
