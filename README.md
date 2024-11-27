# Theme-Template

这是个人版本的 [LiteLoaderQQNT](https://liteloaderqqnt.github.io/) Theme Template，使用 Vite + JS + PNPM

## How To Use

### 环境

- node >= 20
- pnpm >= 9
- 开发环境是 win10，未测试其他系统

### 安装

1. 在 GitHub 使用 Template 创建自己的 repo，并 clone 到 plugins 文件夹下

2. 进入文件夹，运行 `pnpm i` 安装依赖

### 构建

1. 修改 `package.json` 中的 `name` 和 `version` 部分

2. 修改 `manifest.json` 中的所需字段，不要修改 `injects` 部分

3. 用自己的关键词替换代码中全部的 `theme_template`

4. 运行 `pnpm devbuild` 构建 dev 版本，产物在 dist 文件夹下

5. 重启 QQ，查看设置页是否出现新主题、是否报错

6. 修改 styles 文件夹下的 scss 文件，不出意外的话会实时生效，成功即可继续编写主题

   - `styles/chat` 文件夹下的 scss 是聊天页的

   - `styles/setting` 文件夹下的 scss 是设置页的

   - 目前样式热更新基于文件监听和 IPC 实现，变更 scss 路径需同时修改 main 中对应代码，以免失效

7. 发布时，需使用 `pnpm build` 构建 prod 版本，prod 版本不含样式热更和文件监听
