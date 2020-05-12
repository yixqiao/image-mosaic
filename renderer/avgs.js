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
    document.getElementById('imgsPath').dataset.dataHasSelected = 'y'
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
    document.getElementById('avgsOutPath').dataset.dataHasSelected = 'y'
    document.getElementById('avgsInPath').innerHTML = path
    document.getElementById('avgsInPath').dataset.dataHasSelected = 'y'
  })
}

document.getElementById('pickAvgsOut').addEventListener('click', pickAvgsOut)

const threadCountInput = document.getElementById('threadCount')
threadCountInput.value = os.cpus().length
threadCountInput.addEventListener('click', function () { threadCountInput.select() })

function calcAvgs () {
  if (document.getElementById('imgsPath').dataset.dataHasSelected !== 'y') {
    dialog.showMessageBox({
      type: 'error',
      title: 'Error',
      message: 'No images path selected',
      detail: 'Please select a directory',
      buttons: ['OK']
    })
    return
  }
  if (document.getElementById('avgsOutPath').dataset.dataHasSelected !== 'y') {
    dialog.showMessageBox({
      type: 'error',
      title: 'Error',
      message: 'No averages out path selected',
      detail: 'Please select a file to save the averages in',
      buttons: ['OK']
    })
    return
  }
  const threadCount = Math.floor(Number(document.getElementById('threadCount').value))
  if (threadCount === Infinity || String(threadCount) !== document.getElementById('threadCount').value ||
      threadCount <= 0 || threadCount > 128) {
    dialog.showMessageBox({
      type: 'error',
      title: 'Error',
      message: 'Invalid thread count',
      detail: 'Thread count has to be an integer between 1 and 128',
      buttons: ['OK']
    })
    return
  }
  const avgsSettings = {
    imgsPath: document.getElementById('imgsPath').innerHTML,
    avgsOutPath: document.getElementById('avgsOutPath').innerHTML,
    threadCount: document.getElementById('threadCount').value
  }
  ipcRenderer.send('calc-avgs', avgsSettings)
}

document.getElementById('calcAvgsButton').addEventListener('click', calcAvgs)
