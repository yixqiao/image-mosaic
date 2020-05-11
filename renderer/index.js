'use strict'

const {
  ipcRenderer
} = require('electron')

const { dialog } = require('electron').remote // eslint-disable-line no-unused-vars

// Building image

ipcRenderer.on('progress', (event, p) => {
  document.getElementById('progressbar').style.width = p * 100 + '%'
  document.getElementById('progressbar').innerHTML = Math.round(p * 100) + '%'
})
