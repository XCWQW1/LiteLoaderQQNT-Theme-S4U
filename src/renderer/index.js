import { setupChatPageCss, setupSettingPageCss } from './setupCss'

// 处理空白页跳转
await new Promise((resolve) => {
  if (location.hash !== '#/blank') {
    resolve()
  }
  navigation.addEventListener('navigatesuccess', resolve, { once: true })
})

// 聊天页样式
setupChatPageCss()

// 打开设置界面时触发
export const onSettingWindowCreated = (view) => {
  // 设置页样式
  setupSettingPageCss(view)
}
