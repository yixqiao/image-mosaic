'use strict'
// Modules to control application life and create native browser window

// const path = require('path')
const {
  app,
  ipcMain
} = require('electron')
const electronLocalshortcut = require('electron-localshortcut')
const { spawn } = require('child_process')

const Window = require('./Window')
// const DataStore = require('./DataStore')

function main () {
  const mainWindow = new Window({
    width: 1200,
    height: 800,
    // fullscreen: true,
    file: 'renderer/index.html'
  })

  // mainWindow.setMenu(null)
  mainWindow.webContents.openDevTools()

  electronLocalshortcut.register(mainWindow, 'Escape', () => {
    app.quit()
  })

  mainWindow.once('show', () => {
    // Do nothing
  })

  ipcMain.on('calc-avgs', (event, avgsSettings) => {
    const mosaicProcess = spawn('java', ['-jar', 'mosaic-0.2.1.jar', 'averages',
      '-i', avgsSettings.imgsPath, '-o', avgsSettings.avgsOutPath, '-t', avgsSettings.threadCount,
      '--electron-integration'])
    var totalCount = 0

    mosaicProcess.stdout.on('data', data => {
      const s = data.toString().split(' ')
      if (s[0] === 'total') {
        totalCount = parseInt(s[1])
      } else if (s[0] === 'completed') {
        mainWindow.send('progress', parseFloat(s[1]) / totalCount)
      } else {
        console.log(`stdout: ${data}`)
      }
    })
    mosaicProcess.stderr.on('data', data => {
      console.log(`stderr: ${data}`)
    })
    mosaicProcess.on('error', (error) => {
      console.log(`error: ${error.message}`)
    })
    mosaicProcess.on('close', code => {
      console.log(`average calculation exited with code ${code}`)
    })
  })

  ipcMain.on('build-mosaic', (event, buildSettings) => {
    console.log(buildSettings)
    const mosaicProcess = spawn('java', ['-jar', 'mosaic-0.2.1.jar', 'build',
      '-p', buildSettings.imgPath, '-o', buildSettings.imgOutPath,
      '-a', buildSettings.avgsOutPath, '-t', buildSettings.threadCount,
      '-c', buildSettings.chunkSize, '-s', buildSettings.scaleFactor,
      '--electron-integration'])
    var totalCount = 0

    mosaicProcess.stdout.on('data', data => {
      const s = data.toString().split(' ')
      if (s[0] === 'total') {
        totalCount = parseInt(s[1])
      } else if (s[0] === 'completed') {
        mainWindow.send('progress', parseFloat(s[1]) / totalCount)
      } else {
        console.log(`stdout: ${data}`)
      }
    })
    mosaicProcess.stderr.on('data', data => {
      console.log(`stderr: ${data}`)
    })
    mosaicProcess.on('error', (error) => {
      console.log(`error: ${error.message}`)
    })
    mosaicProcess.on('close', code => {
      console.log(`average calculation exited with code ${code}`)
    })
  })
}

app.on('ready', main)

app.on('window-all-closed', function () {
  app.quit()
})
