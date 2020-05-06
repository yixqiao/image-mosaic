'use strict'

const {
  ipcRenderer
} = require('electron')
const { dialog } = require('electron').remote
const os = require('os')

document.getElementById('threadCount').value = os.cpus().length

function pickImgs () {
  dialog.showOpenDialog({
    properties: ['openDirectory']
  }).then(result => {
    if (result.canceled) return
    const path = result.filePaths
    document.getElementById('imgsPath').innerHTML = path
    document.getElementById('imgsPath').dataset.selected = true
  })
}

document.getElementById('pickImgs').addEventListener('click', pickImgs)

function pickAvgsOut () {
  dialog.showSaveDialog({
    properties: ['showOverwriteConfirmation']
  }).then(result => {
    if (result.canceled) return
    const path = result.filePath
    document.getElementById('avgsOutPath').innerHTML = path
    document.getElementById('avgsOutPath').dataset.selected = true
  })
}

document.getElementById('pickAvgsOut').addEventListener('click', pickAvgsOut)

function calcAvgs () {
  const avgsSettings = {
    imgsPath: document.getElementById('imgsPath').innerHTML,
    avgsOutPath: document.getElementById('avgsOutPath').innerHTML,
    threadCount: document.getElementById('threadCount').value
  }
  ipcRenderer.send('calc-avgs', avgsSettings)
}

document.getElementById('calcAvgsButton').addEventListener('click', calcAvgs)

ipcRenderer.on('test', (event, todos) => {

})
