'use strict'

const {
  ipcRenderer
} = require('electron')

document.getElementById('p').addEventListener('click', () => {
  ipcRenderer.send('begin-process')
})

ipcRenderer.on('todos', (event, todos) => {

})
