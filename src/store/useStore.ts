import { create } from 'zustand'

type Store = Record<string, unknown>

export const useStore = create<Store>(() => ({}))
