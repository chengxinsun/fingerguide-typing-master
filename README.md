# FingerGuide Typing Master

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Electron-41-47848F?logo=electron&logoColor=white" alt="Electron">
</p>

<p align="center">
  <b>指法引导打字大师</b> - 通过可视化指法提示，帮助你养成正确的盲打习惯
</p>

---

## 功能特点

### 可视化指法引导
- **实时键盘高亮** - 当前需要敲击的键位会高亮显示
- **手指位置提示** - 实时提示应该用哪根手指敲击（如"左手食指"、"右手中指"）
- **3D 键盘效果** - 精美的拟物化键盘设计，带有按压动画效果

### 分级练习内容
| 类别 | 难度 | 内容描述 |
|------|------|----------|
| **Basic** | 入门级 | 基础英文句子，适合初学者 |
| **KET** | A2 | 剑桥英语 Key English Test 级别 |
| **PET** | B1 | 剑桥英语 Preliminary English Test 级别 |
| **FCE** | B2 | 剑桥英语 First Certificate 级别 |
| **Quotes** | 中级 | 名人名言，包含中英文对照 |
| **Classics** | 高级 | 经典文学名著开篇名句 |

### 本地用户与统计
- **多账户支持** - 可创建多个本地用户，适合家庭共享
- **进度自动保存** - 练习数据保存在本地，自动累计统计
- **历史记录** - 查看平均 WPM、准确率、总练习时长、练习次数
- **实时反馈** - 打字过程中实时显示 WPM 和准确率

### 交互体验
- **音效反馈** - 正确/错误按键有不同的音效提示
- **动画效果** - 使用 Framer Motion 实现流畅的过渡动画
- **完成庆祝** - 练习完成后显示成绩统计和庆祝动画
- **空格继续** - 完成后按空格键即可开始下一轮随机练习

---

## 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite 6
- **样式方案**: Tailwind CSS 4
- **动画库**: Framer Motion
- **桌面打包**: Electron 41 + electron-builder
- **图标**: Lucide React

---

## 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```
应用将在 http://localhost:3000 运行

### 构建生产版本
```bash
npm run build
```
构建后的文件位于 `dist/` 目录

### 打包桌面应用
```bash
# macOS
npm run desktop:pack

# 打包后的应用位于 release/ 目录
```

---

## 项目结构

```
fingerguide-typing-master/
├── src/
│   ├── components/
│   │   ├── Keyboard.tsx    # 可视化键盘组件
│   │   └── Stats.tsx       # 统计面板组件
│   ├── constants.ts        # 练习文本、键位映射配置
│   ├── App.tsx            # 主应用组件
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── electron/
│   └── main.mjs           # Electron 主进程
├── dist/                  # 构建输出
├── release/               # 桌面应用打包输出
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 指法映射规则

应用基于标准键盘指法规则，将每个字符映射到对应的手指：

| 手指 | 负责按键 |
|------|----------|
| 左手小指 | `1` `q` `a` `z` `` ` `` |
| 左手无名指 | `2` `w` `s` `x` |
| 左手中指 | `3` `e` `d` `c` |
| 左手食指 | `4` `5` `r` `t` `f` `g` `v` `b` |
| 右手食指 | `6` `7` `y` `u` `h` `j` `n` `m` |
| 右手中指 | `8` `i` `k` `,` |
| 右手无名指 | `9` `o` `l` `.` |
| 右手小指 | `0` `p` `;` `/` `-` `=` `[` `]` `'` `\` |
| 右手拇指 | 空格键 |

---

## 许可证

MIT License

---

<p align="center">
  Made with  for better typing skills
</p>
