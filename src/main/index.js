// eslint-disable-next-line no-undef
const pluginPath = LiteLoader.plugins['theme_template'].path.plugin // 主题代码路径

/**
 * 创建窗口时触发
 *
 * @param {Electron.BrowserWindow} window
 */
exports.onBrowserWindowCreated = (window) => {
  window.webContents.on('did-stop-loading', () => {
    const url = window.webContents.getURL()
    // 捕获聊天窗口
    if (url.includes('#/main') || url.includes('#/chat')) {
      const chatWindow = window
      chatCssWatcher(chatWindow)
    }
    // 捕获设置窗口
    if (url.includes('#/setting/settings')) {
      const settingWindow = window
      settingCssWatcher(settingWindow)
    }
  })
}

/**
 * development 模式下，监听本地样式文件夹，通过 IPC 更新 Renderer 样式
 * @see https://vite.dev/guide/env-and-mode.html#modes
 *
 * 监听聊天窗口样式
 *
 * @param {Electron.BrowserWindow} chatWindow
 * @returns {void}
 */
const chatCssWatcher = (chatWindow) => {
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const path = require('path')
  const chokidar = require('chokidar')
  const sass = require('sass-embedded')

  // 样式文件夹、样式入口文件
  const styleFolder = path.join(pluginPath, 'src', 'styles', 'chat')
  const styleEntry = path.join(styleFolder, 'index.scss')

  const watcher = chokidar.watch(styleFolder, { persistent: true })
  const fn = () => {
    const css = sass.compile(styleEntry).css
    chatWindow?.webContents.send('LiteLoader.theme_template.onChatCssUpdate', css)
  }

  watcher.on('change', fn)
  watcher.on('add', fn)
  watcher.on('addDir', fn)
  watcher.on('unlink', fn)
  watcher.on('unlinkDir', fn)
}

/**
 * 监听设置窗口样式
 *
 * @param {Electron.BrowserWindow} settingWindow
 * @returns {void}
 */
const settingCssWatcher = (settingWindow) => {
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const path = require('path')
  const chokidar = require('chokidar')
  const sass = require('sass-embedded')

  const styleFolder = path.join(pluginPath, 'src', 'styles', 'setting')
  const styleEntry = path.join(styleFolder, 'index.scss')

  const watcher = chokidar.watch(styleFolder, { persistent: true })
  const fn = () => {
    const css = sass.compile(styleEntry).css
    settingWindow?.webContents.send('LiteLoader.theme_template.onSettingCssUpdate', css)
  }

  watcher.on('change', fn)
  watcher.on('add', fn)
  watcher.on('addDir', fn)
  watcher.on('unlink', fn)
  watcher.on('unlinkDir', fn)
}
