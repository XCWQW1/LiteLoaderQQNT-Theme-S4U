import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('theme_template', {
  onChatCssUpdate: (listener) => ipcRenderer.on('LiteLoader.theme_template.onChatCssUpdate', listener),
  onSettingCssUpdate: (listener) => ipcRenderer.on('LiteLoader.theme_template.onSettingCssUpdate', listener),
})
