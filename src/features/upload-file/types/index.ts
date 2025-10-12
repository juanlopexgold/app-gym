export interface Playlist {
  id: string
  nombre: string
  canciones: string[]
  tipo: 'youtube' | 'local'
}
