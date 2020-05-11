/* global dialog, ipcRenderer */

function pickImg () {
  dialog.showOpenDialog({
    properties: []
  }).then(result => {
    if (result.canceled) return
    const path = result.filePaths
    document.getElementById('imgPath').innerHTML = path
    document.getElementById('imgPath').dataset.dataHasSelected = 'y'
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
    document.getElementById('imgOutPath').dataset.dataHasSelected = 'y'
  })
}

document.getElementById('pickImgOut').addEventListener('click', pickImgOut)

function pickAvgsOut () {
  dialog.showOpenDialog({
  }).then(result => {
    if (result.canceled) return
    const path = result.filePaths
    document.getElementById('avgsInPath').innerHTML = path
    document.getElementById('avgsInPath').dataset.dataHasSelected = 'y'
  })
}

document.getElementById('pickAvgsIn').addEventListener('click', pickAvgsOut)

const chunkSizeInput = document.getElementById('chunkSize')
chunkSizeInput.addEventListener('click', function () { chunkSizeInput.select() })

const scaleFactorInput = document.getElementById('scaleFactor')
scaleFactorInput.addEventListener('click', function () { scaleFactorInput.select() })

function buildMosaic () {
  if (document.getElementById('imgPath').dataset.dataHasSelected !== 'y') {
    dialog.showMessageBox({
      type: 'error',
      title: 'Error',
      message: 'No image input path selected',
      detail: 'Please select an image to use as input',
      buttons: ['OK']
    })
    return
  }
  if (document.getElementById('imgOutPath').dataset.dataHasSelected !== 'y') {
    dialog.showMessageBox({
      type: 'error',
      title: 'Error',
      message: 'No image ouput path selected',
      detail: 'Please select an location to save the image',
      buttons: ['OK']
    })
    return
  }
  if (document.getElementById('avgsInPath').dataset.dataHasSelected !== 'y') {
    dialog.showMessageBox({
      type: 'error',
      title: 'Error',
      message: 'No averages in path selected',
      detail: 'Please select a path containing the generated averages',
      buttons: ['OK']
    })
    return
  }
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
