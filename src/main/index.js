import { chatCssWatcher, settingCssWatcher } from './watcher'

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
      chatCssWatcher(window)
    }
    // 捕获设置窗口
    if (url.includes('#/setting/settings')) {
      settingCssWatcher(window)
    }
  })
}
