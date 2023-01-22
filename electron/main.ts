import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

import * as P from './domain/piece'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile('../dist/index.html')
  }
}

app.whenReady().then(() => {
  ipcMain.on('say-hi', () => console.log('Coucou'))

  ipcMain.handle('get-piece', async () => P.instanciate(P.EXAMPLE))

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
