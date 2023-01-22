import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  getPiece: () => ipcRenderer.invoke('get-piece'),
})
