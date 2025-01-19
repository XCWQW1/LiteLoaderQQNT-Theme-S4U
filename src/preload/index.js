import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('s4u_template', {
  // 监听聊天窗口css更新
  onChatCssUpdate: (listener) => ipcRenderer.on('LiteLoader.s4u_template.onChatCssUpdate', listener),
  // 监听设置窗口css更新
  onSettingCssUpdate: (listener) => ipcRenderer.on('LiteLoader.s4u_template.onSettingCssUpdate', listener),
})
