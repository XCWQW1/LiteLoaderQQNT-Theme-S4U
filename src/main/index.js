const chokidar = require('chokidar')
const path = require('path')
const sass = require('sass-embedded')

// eslint-disable-next-line no-undef
const pluginPath = LiteLoader.plugins['theme_template'].path.plugin // 主题代码路径

let chatWindow // 聊天窗口
let settingWindow // 设置窗口

// 创建窗口时触发
exports.onBrowserWindowCreated = (window) => {
  window.webContents.on('did-stop-loading', () => {
    const url = window.webContents.getURL()
    if (url.includes('#/main') || url.includes('#/chat')) {
      chatWindow = window // 捕获聊天窗口
      chatCssWatcher()
    }
    if (url.includes('#/setting/settings')) {
      settingWindow = window // 捕获设置窗口
      settingCssWatcher()
    }
  })
}

/**
 * development 模式下，监听本地样式文件夹，通过 IPC 更新 Renderer 样式
 * @see https://vite.dev/guide/env-and-mode.html#modes
 */
// 聊天页
let chatCssWatcher = () => {
  if (import.meta.env.MODE !== 'development') {
    return
  }

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

// 设置页
let settingCssWatcher = () => {
  if (import.meta.env.MODE !== 'development') {
    return
  }

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
