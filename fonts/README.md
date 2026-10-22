# 字体与配色来源

页面参考用户现有 Neovim 配置：Vague 配色；`IosevkaTerm NFM,CascadiaSarasa:h16` 字体组合。

- `cw-mono.woff2`：由本机 `IosevkaTermNerdFontMono-Regular.ttf` 生成的 Latin / 标点 / 箭头字符子集，重命名为 CW Mono。原字体来自 [Nerd Fonts](https://github.com/ryanoasis/nerd-fonts)，基础字体为 [Iosevka](https://github.com/be5invis/Iosevka)。保留其原始版权与许可元数据，另附 Iosevka OFL 与 Nerd Fonts 许可。
- `cw-cjk.woff2`：由本机 `CascadiaSarasa-Regular.ttf` 生成的页面所需汉字与标点子集，重命名为 CW CJK。原文件中的版权和许可原文保存在 `LICENSE-CascadiaSarasa.txt`。保留字形，仅删去网页未用字符和转换格式。
- 新增的汉字若不在子集中，会回退到本机 CascadiaSarasa / Sarasa / 系统中文字体；现有页面文字均包含在子集中。
- Vague 配色采用本机已安装版本的色值；附 [Vague](https://github.com/vague-theme/vague.nvim) 的 MIT 许可。辅助文字调整为更易阅读的灰色。

`manifest.json` 保存原文件与网页字体的 SHA256、文件大小和子集范围数量。
