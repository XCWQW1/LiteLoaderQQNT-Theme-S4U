import chatCSS from '../styles/chat/index.scss?inline'
import settingCSS from '../styles/setting/index.scss?inline'

const isPageChat = () => location.hash.includes('#/main') || location.hash.includes('#/chat')
const isPageSetting = () => location.hash.includes('#/setting/settings')

/**
 * 配置聊天页样式，在dev mode进行样式热更新
 */
export const setupChatPageCss = () => {
  if (isPageChat()) {
    // 样式注入到 html 节点下方
    if (!document.querySelector('html > style.theme_template')) {
      const node = document.createElement('style')
      node.className = 'theme_template'
      node.textContent = chatCSS
      document.documentElement.appendChild(node)
    }

    // development mode 热更新样式
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
}

/**
 * 配置设置页样式，在dev mode进行样式热更新
 *
 * @param {HTMLElement} view 插件菜单节点
 */
export const setupSettingPageCss = (view) => {
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
