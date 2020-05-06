'use strict'

const {
  BrowserWindow
} = require('electron')

const defaultProps = {
  width: 800,
  height: 600,
  minWidth: 50,
  minHeight: 50,
  show: false,
  webPreferences: {
    nodeIntegration: true
  }
}

class Window extends BrowserWindow {
  constructor ({
    file,
    ...windowSettings
  }) {
    super({
      ...defaultProps,
      ...windowSettings
    })
    this.loadFile(file)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

module.exports = Window
