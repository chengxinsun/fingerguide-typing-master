# FingerGuide Typing Master

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Electron-41-47848F?logo=electron&logoColor=white" alt="Electron">
</p>

<p align="center">
  <b>指法引导打字大师</b> - 通过可视化指法提示、 gamification 系统，帮助你养成正确的盲打习惯
</p>

---

## 功能特点

### Phase 1: 核心打字功能

#### 可视化指法引导
- **实时键盘高亮** - 当前需要敲击的键位会高亮显示
- **手指位置提示** - 实时提示应该用哪根手指敲击（如"左手食指"、"右手中指"）
- **3D 键盘效果** - 精美的拟物化键盘设计，带有按压动画效果

#### 分级练习内容
| 类别 | 难度 | 内容描述 |
|------|------|----------|
| **Basic** | 入门级 | 基础英文句子，适合初学者 |
| **KET** | A2 | 剑桥英语 Key English Test 级别 |
| **PET** | B1 | 剑桥英语 Preliminary English Test 级别 |
| **FCE** | B2 | 剑桥英语 First Certificate 级别 |
| **Quotes** | 中级 | 名人名言，包含中英文对照 |
| **Classics** | 高级 | 经典文学名著开篇名句 |

#### 练习模式
- **普通模式** - 随机练习，完成后自动切换
- **倒计时模式** - 在限定时间内尽可能多地输入
- **自定义文本** - 粘贴自己的文本进行练习

### Phase 2: Gamification 系统

#### 等级系统
通过练习获得 XP，从 Level 1 升级到 Level 26：

| 等级 | 称号 | 所需 XP |
|------|------|---------|
| 1-5 | 打字小蜗牛 | 0-499 |
| 6-10 | 打字小兔子 | 500-2,499 |
| 11-15 | 打字小狐狸 | 2,500-7,499 |
| 16-20 | 打字小猎豹 | 7,500-17,499 |
| 21-25 | 打字老鹰 | 17,500-37,499 |
| 26 | 打字巨龙 | 37,500+ |

#### 宠物系统
6 种可爱宠物，随等级解锁并自动切换：

| 宠物 | 解锁等级 | 描述 |
|------|----------|------|
| 蜗牛小慢 | Lv.1 | 稳重踏实的初学者伙伴 |
| 兔子小跳 | Lv.6 | 灵活敏捷的速度型伙伴 |
| 狐狸小智 | Lv.11 | 聪明机灵的技巧型伙伴 |
| 猎豹小快 | Lv.16 | 极速如风的高手伙伴 |
| 老鹰小高 | Lv.21 | 翱翔天际的大师伙伴 |
| 巨龙小飞 | Lv.26 | 至高无上的王者伙伴 |

宠物拥有成长值系统，随着你的打字量增加而成长。

#### 主题系统
6 种精美主题，随等级解锁：

| 主题 | 解锁等级 | 风格 |
|------|----------|------|
| 森林 | Lv.1 | 清新翠绿，自然气息 |
| 草地 | Lv.6 | 粉色浪漫，花海 meadow |
| 沙漠 | Lv.11 | 暖橙金黄，落日余晖 |
| 草原 | Lv.16 | 明媚阳光，金色草原 |
| 天空 | Lv.21 | 蔚蓝清新，天空之境 |
| 火山 | Lv.26 | 紫色神秘，火山熔岩 |

#### 成就系统
12 个成就等你解锁：

**里程碑成就**
- 初次尝试 - 完成第1次练习
- 百字先锋 - 累计输入100字符
- 千字达人 - 累计输入1,000字符
- 万字王者 - 累计输入10,000字符
- 速度之星 - WPM 首次突破50
- 极速高手 - WPM 首次突破80
- 百发百中 - 单次准确率100%
- 持之以恒 - 累计练习30分钟

**连续成就**
- 三日连击 - 连续3天练习
- 七日达人 - 连续7天练习
- 月度王者 - 连续30天练习

**精准成就**
- 精准大师 - 连续5次准确率>95%

#### 统计与可视化
- **错误热力图** - 可视化展示最常输错的按键
- **进度趋势** - 追踪 WPM 和准确率的变化趋势（7/30/90天）
- **每日记录** - 自动记录每日练习数据

#### 多语言支持
- **中文** - 完整中文界面
- **English** - Full English interface

### 本地用户与统计
- **多账户支持** - 可创建多个本地用户，适合家庭共享
- **进度自动保存** - 练习数据保存在本地，自动累计统计
- **历史记录** - 查看平均 WPM、准确率、总练习时长、练习次数
- **实时反馈** - 打字过程中实时显示 WPM 和准确率

### 交互体验
- **音效反馈** - 正确/错误按键有不同的音效提示
- **动画效果** - 使用 Framer Motion 实现流畅的过渡动画
- **完成庆祝** - 练习完成后显示成绩统计和庆祝动画
- **升级提示** - 升级时显示等级提升弹窗和解锁内容
- **成就解锁** - 解锁成就时显示庆祝动画
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
│   │   ├── Keyboard.tsx           # 可视化键盘组件
│   │   ├── Stats.tsx              # 统计面板组件
│   │   ├── Hands.tsx              # 手指位置提示组件
│   │   ├── ModeSelector.tsx       # 练习模式选择器
│   │   ├── LevelProgress.tsx      # 等级进度显示
│   │   ├── PetDisplay.tsx         # 宠物展示组件
│   │   ├── LevelUpModal.tsx       # 升级弹窗
│   │   ├── AchievementCard.tsx    # 成就卡片
│   │   ├── AchievementUnlockModal.tsx  # 成就解锁弹窗
│   │   ├── ProgressChart.tsx      # 进度趋势图表
│   │   ├── HeatmapKeyboard.tsx    # 热力图键盘
│   │   ├── ThemeEffects.tsx       # 主题特效
│   │   └── modals/
│   │       ├── SettingsModal.tsx      # 设置页面
│   │       ├── AchievementsModal.tsx  # 成就页面
│   │       ├── HeatmapModal.tsx       # 热力图弹窗
│   │       ├── ProgressModal.tsx      # 进度趋势弹窗
│   │       ├── TimeChallengeModal.tsx # 倒计时模式弹窗
│   │       └── CustomTextModal.tsx    # 自定义文本弹窗
│   ├── contexts/
│   │   ├── I18nContext.tsx        # 国际化上下文
│   │   ├── ProgressContext.tsx    # 进度/等级上下文
│   │   ├── AchievementContext.tsx # 成就上下文
│   │   └── ThemeContext.tsx       # 主题上下文
│   ├── constants/
│   │   ├── themes.ts              # 主题配置
│   │   ├── levels.ts              # 等级配置
│   │   ├── pets.ts                # 宠物配置
│   │   └── achievements.ts        # 成就配置
│   ├── utils/
│   │   ├── xpCalculator.ts        # XP计算
│   │   ├── achievementChecker.ts  # 成就检查
│   │   ├── dateUtils.ts           # 日期工具
│   │   └── heatmapColors.ts       # 热力图颜色
│   ├── i18n/
│   │   ├── index.ts               # i18n入口
│   │   └── translations/
│   │       ├── zh.ts              # 中文翻译
│   │       └── en.ts              # 英文翻译
│   ├── constants.ts               # 练习文本、键位映射配置
│   ├── App.tsx                    # 主应用组件
│   ├── main.tsx                   # 应用入口
│   └── index.css                  # 全局样式
├── electron/
│   └── main.mjs                   # Electron 主进程
├── dist/                          # 构建输出
├── release/                       # 桌面应用打包输出
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

## 更新日志

### Phase 2 (2025-04)
- 新增等级系统（26级）
- 新增宠物系统（6种宠物）
- 新增主题系统（6种主题）
- 新增成就系统（12个成就）
- 新增倒计时模式和自定义文本模式
- 新增错误热力图和进度趋势图
- 新增中英文国际化支持
- 新增主题特效

### Phase 1 (2025-03)
- 基础打字功能
- 可视化指法引导
- 分级练习内容
- 本地用户系统

---

## 许可证

MIT License

---

<p align="center">
  Made with 💚 for better typing skills
</p>
