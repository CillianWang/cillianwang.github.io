# Cillian Wang

在完整旧版主页 `adee9cc` 上补充简历内容，保留 Vague 深色配色、等宽字体及 VLN / VLA / 4DGS 三段演示。

## 本地使用

直接打开 `index.html` 即可使用离线内容和视频。也可以在本目录运行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

打开 http://127.0.0.1:4173/ 。

## 编辑

- `content.json`：个人介绍、视频、精简工作经历和教育背景。
- `index.html`、`style.css`、`site.js`：页面结构、样式和交互。
- `documents/`：2026-10-29 保存的简历文件，主页不再展示或提供链接。
- `content-data.js`：离线打开时使用的内容副本；修改 JSON 后运行 `python3 scripts/sync-content.py` 同步。
- `fonts/`：原有字体及许可证；`media/`：原版视频和封面。

## 发布

GitHub Pages 使用 `main` 分支的根目录。主页保留作品、工作经历和教育背景；Momenta 任职时间为 2024.04–2026.05。
