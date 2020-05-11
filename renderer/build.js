/* global dialog, ipcRenderer */

function pickImg () {
  dialog.showOpenDialog({
    properties: []
  }).then(result => {
    if (result.canceled) return
    const path = result.filePaths
    document.getElementById('imgPath').innerHTML = path
    document.getElementById('imgPath').dataset.selected = true
  })
}

document.getElementById('pickImg').addEventListener('click', pickImg)

function pickImgOut () {
  dialog.showSaveDialog({
    properties: ['showOverwriteConfirmation']
  }).then(result => {
    if (result.canceled) return
    const path = result.filePath
    document.getElementById('imgOutPath').innerHTML = path
    document.getElementById('imgOutPath').dataset.selected = true
  })
}

document.getElementById('pickImgOut').addEventListener('click', pickImgOut)

function pickAvgsOut () {
  dialog.showOpenDialog({
  }).then(result => {
    if (result.canceled) return
    const path = result.filePaths
    document.getElementById('avgsInPath').innerHTML = path
    document.getElementById('avgsInPath').dataset.selected = true
  })
}

document.getElementById('pickAvgsIn').addEventListener('click', pickAvgsOut)

function buildMosaic () {
  const buildSettings = {
    imgPath: document.getElementById('imgPath').innerHTML,
    imgOutPath: document.getElementById('imgOutPath').innerHTML,
    avgsInPath: document.getElementById('avgsInPath').innerHTML,
    chunkSize: document.getElementById('chunkSize').value,
    scaleFactor: document.getElementById('scaleFactor').value,
    threadCount: document.getElementById('threadCount').value
  }
  ipcRenderer.send('build-mosaic', buildSettings)
}

document.getElementById('buildMosaicButton').addEventListener('click', buildMosaic)
