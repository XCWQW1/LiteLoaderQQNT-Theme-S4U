import chatCSS from '../styles/chat/index.scss?inline'
import settingCSS from '../styles/setting/index.scss?inline'

const isPageBlank = () => location.hash === '#/blank'
const isPageChat = () => location.hash.includes('#/main') || location.hash.includes('#/chat')
const isPageSetting = () => location.hash.includes('#/setting/settings')

// 处理空白页跳转
await new Promise((resolve) => {
  if (!isPageBlank()) {
    resolve()
  }
  navigation.addEventListener(
    'navigatesuccess',
    () => {
      resolve()
    },
    { once: true },
  )
})

if (isPageChat()) {
  // 样式注入到 html 节点下方
  if (!document.querySelector('html > style.theme_template')) {
    const node = document.createElement('style')
    node.className = 'theme_template'
    node.textContent = chatCSS
    document.documentElement.appendChild(node)
  }

  // development 模式下，热更新样式
  if (import.meta.env.MODE === 'development') {
    // eslint-disable-next-line no-undef
    theme_template.onChatCssUpdate((_event, css) => {
      if (isPageChat()) {
        const style = document.querySelector('html > style.theme_template')
        if (style) {
          style.textContent = css
        }
      }
    })
  }
}

// 打开设置界面时触发
// view 为 Element 对象，修改将同步到插件设置界面
export const onSettingWindowCreated = (view) => {
  if (!document.querySelector('style.theme_template')) {
    const node = document.createElement('style')
    node.className = 'theme_template'
    node.textContent = settingCSS
    view.appendChild(node)
  }

  if (import.meta.env.MODE === 'development') {
    // eslint-disable-next-line no-undef
    theme_template.onSettingCssUpdate((_event, css) => {
      if (isPageSetting()) {
        const style = document.querySelector('style.theme_template')
        if (style) {
          style.textContent = css
        }
      }
    })
  }
}
