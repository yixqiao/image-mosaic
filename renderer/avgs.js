'use strict'

/* global dialog, ipcRenderer */

const os = require('os')

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
    document.getElementById('avgsInPath').innerHTML = path
    document.getElementById('avgsInPath').dataset.selected = true
  })
}

document.getElementById('pickAvgsOut').addEventListener('click', pickAvgsOut)

const threadCountInput = document.getElementById('threadCount')
threadCountInput.value = os.cpus().length
threadCountInput.addEventListener('click', function () { threadCountInput.select() })

function calcAvgs () {
  const avgsSettings = {
    imgsPath: document.getElementById('imgsPath').innerHTML,
    avgsOutPath: document.getElementById('avgsOutPath').innerHTML,
    threadCount: document.getElementById('threadCount').value
  }
  ipcRenderer.send('calc-avgs', avgsSettings)
}

document.getElementById('calcAvgsButton').addEventListener('click', calcAvgs)
