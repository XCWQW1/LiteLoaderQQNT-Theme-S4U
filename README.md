# Theme-Template

- 这是个人版本的 [LiteLoaderQQNT](https://liteloaderqqnt.github.io/) 主题模板

- 已提供基础 scss 结构

- 技术栈：electron-vite + pnpm + js + scss，支持 scss 热更新

- Linter：eslint + prettier + stylelint

## How To Use

### 环境

- node >= 20
- pnpm >= 9
- 开发环境是 win10，未测试其他系统

### 安装

1. 在 GitHub 使用 Template 创建自己的 repo，并 clone 到 plugins 文件夹下

2. 进入文件夹，运行 `pnpm i` 安装依赖

### 构建

1. 修改 `package.json` 中的 `name` 和 `version` 字段

2. 修改 `manifest.json` 中的所需字段，不要修改 `injects` 部分

3. 用自己的 slug 关键词替换代码中全部的 `theme_template`

4. 替换 public 文件夹下的 icon 文件

   - icon 可在 [Icônes](https://icones.js.org/) 获取

5. 运行 `pnpm devbuild` 构建 dev 版本，产物在 dist 文件夹下

6. 重启 QQ，查看设置页是否出现新插件、是否报错

7. 修改 styles 文件夹下的 scss 文件，不出意外的话会实时生效，成功即可继续编写主题

   - `styles/chat/*.scss` 是聊天页样式，`styles/setting/*.scss` 是设置页样式

   - `index.scss` 是 scss 入口

   - 样式热更新基于文件监听和 IPC 实现，变更 scss 入口路径需同时修改 main 中对应代码

   - 样式较多时，由于 scss 编译时间增加，热更新会有短暂延迟

8. 产物由 `electron-vite` 控制，默认三个文件夹对应三个产物，可按需修改

   - 产物不含样式文件，css 会以 inline 形式包含在 `renderer/index.js` 内

9. 发布时，需使用 `pnpm build` 构建 prod 版本，prod 版本不含样式热更和文件监听
