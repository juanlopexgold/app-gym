// Utilidad simple para IndexedDB
export function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("fitcrono-db", 1)
        request.onupgradeneeded = () => {
            const db = request.result
            if (!db.objectStoreNames.contains("songs")) {
                db.createObjectStore("songs", { keyPath: "id", autoIncrement: true })
            }
        }
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

export async function saveSong(file: File): Promise<number> {
    const db = await openDB()
    return new Promise((resolve, reject) => {
        const tx = db.transaction("songs", "readwrite")
        const store = tx.objectStore("songs")
        const req = store.add({ name: file.name, blob: file })
        req.onsuccess = () => resolve(req.result as number)
        req.onerror = () => reject(req.error)
    })
}

export async function getAllSongs(): Promise<{ id: number; name: string; blob: Blob }[]> {
    const db = await openDB()
    return new Promise((resolve, reject) => {
        const tx = db.transaction("songs", "readonly")
        const store = tx.objectStore("songs")
        const req = store.getAll()
        req.onsuccess = () => resolve(req.result as { id: number; name: string; blob: Blob }[])
        req.onerror = () => reject(req.error)
    })
}
