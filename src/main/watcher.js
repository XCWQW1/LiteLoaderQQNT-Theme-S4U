// eslint-disable-next-line no-undef
const pluginPath = LiteLoader.plugins['s4u_template'].path.plugin // 主题代码路径

/**
 * development 模式下，监听本地样式文件夹，通过 IPC 更新 Renderer 样式
 * @see https://vite.dev/guide/env-and-mode.html#modes
 *
 * 监听聊天窗口样式
 *
 * @param {Electron.BrowserWindow} chatWindow
 * @returns {void}
 */
export const chatCssWatcher = (chatWindow) => {
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const path = require('path')
  const chokidar = require('chokidar')
  const sass = require('sass-embedded')
  const _ = require('lodash')

  // 样式文件夹、样式入口文件
  const styleFolder = path.join(pluginPath, 'src', 'styles', 'chat')
  const styleEntry = path.join(styleFolder, 'index.scss')

  const update = _.throttle(() => {
    if (!chatWindow.isDestroyed()) {
      const css = sass.compile(styleEntry).css
      chatWindow.webContents.send('LiteLoader.s4u_template.onChatCssUpdate', css)
    }
  }, 1000)

  const watcher = chokidar.watch(styleFolder, { persistent: true })
  watcher.on('change', update)
  watcher.on('add', update)
  watcher.on('addDir', update)
  watcher.on('unlink', update)
  watcher.on('unlinkDir', update)
}

/**
 * 监听设置窗口样式
 *
 * @param {Electron.BrowserWindow} settingWindow
 * @returns {void}
 */
export const settingCssWatcher = (settingWindow) => {
  if (import.meta.env.MODE !== 'development') {
    return
  }

  const path = require('path')
  const chokidar = require('chokidar')
  const sass = require('sass-embedded')
  const _ = require('lodash')

  const styleFolder = path.join(pluginPath, 'src', 'styles', 'setting')
  const styleEntry = path.join(styleFolder, 'index.scss')

  const update = _.throttle(() => {
    if (!settingWindow.isDestroyed()) {
      const css = sass.compile(styleEntry).css
      settingWindow.webContents.send('LiteLoader.s4u_template.onSettingCssUpdate', css)
    }
  }, 1000)

  const watcher = chokidar.watch(styleFolder, { persistent: true })
  watcher.on('change', update)
  watcher.on('add', update)
  watcher.on('addDir', update)
  watcher.on('unlink', update)
  watcher.on('unlinkDir', update)

  settingWindow.on('closed', () => {
    watcher.off('change', update)
    watcher.off('add', update)
    watcher.off('addDir', update)
    watcher.off('unlink', update)
    watcher.off('unlinkDir', update)
  })

  // 设置窗口可能多次开启，主动更新样式
  let cnt = 0
  const id = setInterval(() => {
    update()
    ++cnt > 5 && clearInterval(id)
  }, 1000)
}
