'use strict'
// Modules to control application life and create native browser window

// const path = require('path')
const {
  app
  // ipcMain
} = require('electron')
const electronLocalshortcut = require('electron-localshortcut')

const Window = require('./Window')
// const DataStore = require('./DataStore')

function main () {
  const mainWindow = new Window({
    width: 300,
    height: 120,
    // fullscreen: true,
    frame: false,
    file: 'renderer/index.html'
  })

  mainWindow.setMenu(null)
  // mainWindow.webContents.openDevTools();

  mainWindow.setAlwaysOnTop(!mainWindow.isFullScreen())
  mainWindow.setVisibleOnAllWorkspaces(!mainWindow.isFullScreen())

  electronLocalshortcut.register(mainWindow, 'F11', () => {
    mainWindow.setFullScreen(!mainWindow.isFullScreen())
    mainWindow.setAlwaysOnTop(!mainWindow.isFullScreen())
    mainWindow.setVisibleOnAllWorkspaces(!mainWindow.isFullScreen())
  })

  electronLocalshortcut.register(mainWindow, 'Escape', () => {
    app.quit()
  })

  mainWindow.once('show', () => {
    // Do nothing
  })
}

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})
