# Cillian Wang

个人主页：[cillianwang.github.io](https://cillianwang.github.io/)。展示 VLN 仿真、VLA 仿真与 4D 高斯重建三段视频。

## 网页编辑，无需 git push

1. 登录 GitHub，打开 [content.json 编辑入口](https://github.com/CillianWang/cillianwang.github.io/edit/main/content.json)。
2. 修改 `name`、`intro`、总标题 `sectionTitle`，或者 `videos` 里的标题、说明和媒体路径。
3. 点击 **Commit changes…** 保存到 `main`，等待 GitHub Pages 自动部署。

换视频：在 [media 文件夹](https://github.com/CillianWang/cillianwang.github.io/tree/main/media) 使用 **Add file → Upload files** 上传 MP4 和封面，再改 `content.json`。可编辑多文件的 [github.dev](https://github.dev/CillianWang/cillianwang.github.io) 也无需本机推送。

## 视觉与文件

- 配色参考本机 Neovim 的 Vague：背景 `#141415`、正文 `#cdcdcd`、蓝色 `#6e94b2`、玫瑰色 `#c48282`。
- 字体来自本机配置的 IosevkaTerm NFM / CascadiaSarasa；为网页生成并重命名了 WOFF2 字符子集，详情与许可见 `fonts/`。
- `content.json` 管内容；`index.html`、`style.css`、`site.js` 管页面。无需安装依赖或构建。
- 页面视频点击后才加载，支持原生播放控制、全屏、Esc 关闭和减少动画偏好。

本地预览：`python3 -m http.server 4173 --bind 127.0.0.1`。
