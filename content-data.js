// Generated from content.json by scripts/sync-content.py
window.siteContent = {
  "name": "Cillian Wang",
  "intro": "Robotics & simulation.",
  "sectionTitle": "闭环仿真",
  "github": "https://github.com/CillianWang",
  "videos": [
    {
      "id": "vslam",
      "title": "VLN 仿真",
      "caption": "vslam建图+导航",
      "note": "仿真 RGB-D · cuVSLAM / G2P5 · 4×",
      "detail": "仿真 RGB-D 与原生 cuVSLAM / G2P5 建图回放，4 倍速。导航使用独立预建真值地图。",
      "duration": "2:46",
      "poster": "media/vslam.jpg",
      "video": "media/vslam.mp4"
    },
    {
      "id": "vla",
      "title": "VLA 仿真",
      "caption": "橙子抓取回放",
      "note": "Recorded-state replay · 原始速度",
      "detail": "VLA 7791 橙子抓取的已录制状态回放，保持原始录制速度。",
      "duration": "0:22",
      "poster": "media/vla.jpg",
      "video": "media/vla.mp4"
    },
    {
      "id": "gaussian4d",
      "title": "4D 高斯重建",
      "caption": "同向车辆移除",
      "note": "原始画面对比 · 新视角渲染",
      "detail": "同向车辆移除的 4D 高斯重建演示，包含原始画面对比和新视角渲染；遮挡背景含模型生成与几何推测。",
      "duration": "0:18",
      "poster": "media/gaussian4d.jpg",
      "video": "media/gaussian4d.mp4"
    }
  ],
  "role": "仿真算法研发工程师",
  "about": "从自动驾驶到机器人，关注物理与视觉联合仿真、场景生成和闭环评测。",
  "email": "cillianwxp@gmail.com",
  "experience": [
    {
      "company": "傅利叶机器人",
      "role": "仿真算法研发工程师",
      "date": "2026.06 — 至今",
      "lines": [
        "面向 VLN / VLA 构建 MuJoCo × UE5 联合仿真，输出与物理交互对齐的 RGB-D。",
        "建设千级 3D 资产库与 17 个场景，打通 3DGS–MeshSplatting 资产流程，支持约束布局与域随机化。",
        "建设量产评测与回归平台；预研 4DGS 对象编辑、背景补全与混合渲染。"
      ]
    },
    {
      "company": "Momenta",
      "role": "AEB 系统研发工程师",
      "date": "2024.04 — 2026.05",
      "lines": [
        "研发闭环 AEB 与 E2E-AEB SDK，在万级正报仿真数据上验证；RTR / IHC 适配数十车型。",
        "构建日志分析 Agent：80% 以上问题自动处理，手动分析提效 5 倍，每日流转 100+ 个案例。"
      ]
    },
    {
      "company": "极氪智能驾驶",
      "role": "泊车感知 USS 算法工程师",
      "date": "2022.11 — 2024.03",
      "lines": [
        "推动极氪首款自研 USS 上线，融合超声波回波与视觉完成障碍物高度分类。",
        "优化记忆泊车仿真与可视化调试，提升场景问题定位效率。"
      ]
    }
  ],
  "education": [
    {
      "school": "埃因霍温理工大学 · TU/e",
      "degree": "硕士 · 信号处理系统",
      "date": "2020 — 2022",
      "text": "研究 Diffusion、VAE 等生成式多模态模型，面向肌电、脑电信号生成分析结论与诊断报告。"
    },
    {
      "school": "复旦大学",
      "degree": "本科 · 电子信息科学与技术",
      "date": "2016 — 2020",
      "text": "电子信息、数字电路与信号处理；主导自动分类太阳能垃圾桶项目，并在校园落地。"
    }
  ]
};
