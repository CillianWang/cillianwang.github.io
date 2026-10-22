# 展示媒体

本页使用用户选定的三段既有录像，保留完整时长和原始画面内容。

| 文件 | 来源 | 网页处理 |
| --- | --- | --- |
| `vslam.mp4` / `vslam.jpg` | 用户指定钉钉文档「wizard 闭环仿真-导航应用」开头的「demo: Vslam建图」，2026-10-22 下载。 | 完整 166 秒，沿用原视频 4 倍速时间线；H.264 1280×720 转码，保留原音轨；第 85 秒抽帧作封面。 |
| `vla.mp4` / `vla.jpg` | 用户提供的 `orange-grasp-restored.mp4`。 | 完整约 21.6 秒，保持播放速度；H.264 640×544 / 30fps 转码；第 10 秒抽帧作封面。 |
| `gaussian4d.mp4` / `gaussian4d.jpg` | 用户提供的 `same-direction-removal-demo.mp4`。 | 完整 17.9 秒，保留 H.264 1920×696 / 10fps 原始视频流，仅优化 MP4 渐进加载；第 4 秒抽帧作封面。 |

VSLAM 画面是仿真 RGB-D 和原生 cuVSLAM / G2P5 建图回放；导航使用独立预建真值地图。VLA 画面保留原视频的「RECORDED STATE REPLAY / VLA 7791」标注，不将状态回放描述为在线策略推理。

4D 高斯重建视频包含同向车辆移除对比和新视角渲染；保留原视频关于遮挡背景含模型生成与几何推测的标注。

原文件摘要：

- VSLAM：`874ebf3f91fe7f145e6e375aed23cc62be163be97d4ceba41cf02e5fd02359d2`
- VLA：`683afd673857e0cc1717b9e0060ac2ec2d28ce1e5b83a768990ffe1aaac4895c`
- 4D 高斯重建：`5f7d386a565508a914f2a31b65396ccceb0254559df72f1efa0642c41cf7a53e`
