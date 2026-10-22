# Cillian Wang · 个人主页

访问 **https://cillianwang.github.io/**。

## 不用 git push，直接在网页编辑

1. 打开 [content.json 网页编辑器](https://github.com/CillianWang/cillianwang.github.io/edit/main/content.json)。
2. 修改双引号里的文字，保留逗号、括号与字段名。
3. 点击 **Commit changes…**，保存到 `main`。GitHub Pages 完成部署后，刷新主页即可。

`tagline` 是首页介绍，`bio` 是个人简介，`projects` 是项目，`now` 是近况。每个项目的 `media` 可增减：`poster` 是封面，`video` 是视频，`caption` 是短说明，`detail` 是播放时的详细说明。

也可以在 [github.dev 在线编辑器](https://github.dev/CillianWang/cillianwang.github.io) 同时编辑多个文件，再从 Source Control 提交。GitHub 官方 [网页编辑说明](https://docs.github.com/en/repositories/working-with-files/managing-files/editing-files)。

## 换图或视频

从 [media 文件夹](https://github.com/CillianWang/cillianwang.github.io/tree/main/media) 选择 **Add file → Upload files** 上传文件，然后在 `content.json` 填入对应的 `media/文件名`。建议上传 H.264 MP4 与 JPG 封面，视频控制在几 MB 内。更新媒体时同时维护 `media/README.md` 的来源说明。

## 文件

- `content.json`：日常编辑的文字、项目和媒体清单。
- `index.html`、`style.css`、`site.js`：静态网页结构、样式与轻量交互。
- `media/`：精选展示媒体。项目本身的代码不包含在本仓库。

这是原生 HTML / CSS / JavaScript 页面，无依赖、无需构建。默认深色，可切换浅色；视频点击后才加载，支持键盘操作与减少动画偏好。

本地预览：`python3 -m http.server 4173 --bind 127.0.0.1`。
