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

// Building image

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

function buildMosaic () {
  const buildSettings = {
    imgPath: document.getElementById('imgPath').innerHTML,
    imgOutPath: document.getElementById('imgOutPath').innerHTML,
    avgsOutPath: document.getElementById('avgsOutPath').innerHTML,
    threadCount: document.getElementById('threadCount').value
  }
  ipcRenderer.send('build-mosaic', buildSettings)
}

document.getElementById('buildMosaicButton').addEventListener('click', buildMosaic)

ipcRenderer.on('progress', (event, p) => {
  document.getElementById('progressbar').style.width = p * 100 + '%'
  document.getElementById('progressbar').innerHTML = Math.round(p * 100) + '%'
})
