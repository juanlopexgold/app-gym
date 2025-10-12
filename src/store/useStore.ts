import { create } from 'zustand'

interface Store {
  // Aquí puedes agregar el estado global que necesites
  // Ejemplo:
  // user: User | null
  // setUser: (user: User | null) => void
}

export const useStore = create<Store>(() => ({
  // Implementa tu estado aquí
}))
