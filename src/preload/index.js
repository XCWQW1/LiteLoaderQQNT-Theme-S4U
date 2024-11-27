import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('theme_template', {
  // 监听聊天窗口css更新
  onChatCssUpdate: (listener) => ipcRenderer.on('LiteLoader.theme_template.onChatCssUpdate', listener),
  // 监听设置窗口css更新
  onSettingCssUpdate: (listener) => ipcRenderer.on('LiteLoader.theme_template.onSettingCssUpdate', listener),
})
