# Phase 2 功能增强设计文档

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 实现关卡/成就系统、主题/外观系统、多语言切换功能

**Architecture:**
- 等级系统：基于XP的进度系统，结合打字表现计算经验值
- 成就系统：独立成就追踪，完成奖励额外XP
- 宠物系统：随等级解锁，通过练习成长，有幼年/少年/成年三阶段
- 主题系统：等级关联的主题配色和宠物主题背景
- 多语言：i18n国际化支持，界面语言切换

**Tech Stack:** React Context/i18next, localStorage persistence, Framer Motion animations

---

## 1. 等级/成就系统

### 1.1 经验值(XP)计算规则

```typescript
// XP计算公式
function calculateXP(chars: number, durationMinutes: number, wpm: number): number {
  let xp = 0;
  // 基础：每字符1 XP
  xp += chars * 1;
  // 时长奖励：每分钟10 XP
  xp += durationMinutes * 10;
  // WPM奖励
  if (wpm > 60) xp += 100;      // 极速高手
  else if (wpm > 30) xp += 50;  // 速度之星

  return Math.round(xp);
}
```

### 1.2 等级称号（动物成长主题）

| 等级 | 称号 | 动物 | 解锁XP |
|------|------|------|--------|
| 1-5 | 打字小蜗牛 | 🐌 Snail | 0 |
| 6-10 | 打字小兔子 | 🐰 Rabbit | 500 |
| 11-15 | 打字小狐狸 | 🦊 Fox | 2,000 |
| 16-20 | 打字小猎豹 | 🐆 Cheetah | 5,000 |
| 21-25 | 打字老鹰 | 🦅 Eagle | 10,000 |
| 26+ | 打字巨龙 | 🐉 Dragon | 20,000 |

每级所需XP递增：Level 1=0, Level 2=100, Level 3=250, Level 4=450, Level 5=700...

### 1.3 成就系统

**里程碑成就：**
| 成就ID | 名称 | 描述 | 奖励XP |
|--------|------|------|--------|
| first_try | 初次尝试 | 完成第1次练习 | +50 |
| centurion | 百字先锋 | 累计输入100字符 | +200 |
| thousand_master | 千字达人 | 累计输入1,000字符 | +300 |
| ten_king | 万字王者 | 累计输入10,000字符 | +1000 |
| speed_star | 速度之星 | WPM首次突破50 | +200 |
| speed_master | 极速高手 | WPM首次突破80 | +500 |
| perfect_accuracy | 百发百中 | 单次准确率100% | +300 |
| persistent | 持之以恒 | 累计练习30分钟 | +200 |

**连续成就：**
| 成就ID | 名称 | 描述 | 奖励XP |
|--------|------|------|--------|
| streak_3 | 三日连击 | 连续3天练习 | +200 |
| streak_7 | 七日达人 | 连续7天练习 | +500 |
| streak_30 | 月度王者 | 连续30天练习 | +2000 |
| accuracy_streak_5 | 精准大师 | 连续5次准确率>95% | +300 |

### 1.4 数据结构

```typescript
interface UserProgress {
  totalXP: number;
  currentLevel: number;
  unlockedPets: string[];
  activePet: string | null;
  achievements: AchievementRecord[];
  currentStreak: number;      // 当前连续天数
  longestStreak: number;      // 最长连续天数
  lastPracticeDate: string;   // 最后练习日期 YYYY-MM-DD
  totalChars: number;         // 累计字符
  totalPracticeTime: number;  // 累计练习分钟
}

interface AchievementRecord {
  id: string;
  unlockedAt: number;         // 解锁时间戳
  progress?: number;          // 进度（用于连续成就）
}

interface Pet {
  id: string;
  name: string;
  emoji: string;
  growth: number;             // 成长值 0-100
  unlockedAt: number;
}
```

---

## 2. 宠物系统

### 2.1 宠物成长机制

```typescript
// 成长值获取
function calculateGrowth(dailyPractice: boolean, streak: number, achievementsUnlocked: number): number {
  let growth = 0;
  if (dailyPractice) growth += 1;           // 每日练习+1
  if (streak >= 7) growth += 1;             // 连续7天额外+1
  if (streak >= 30) growth += 2;            // 连续30天额外+2
  growth += achievementsUnlocked * 2;       // 每个成就+2
  return growth;
}

// 成长阶段
function getPetStage(growth: number): 'baby' | 'teen' | 'adult' {
  if (growth < 20) return 'baby';      // 幼年
  if (growth < 50) return 'teen';      // 少年
  return 'adult';                      // 成年
}
```

### 2.2 宠物解锁条件

| 宠物 | 解锁等级 | 描述 |
|------|----------|------|
| 蜗牛小慢 | Lv 1 (默认) | 稳重踏实的初学者伙伴 |
| 兔子小跳 | Lv 6 | 灵活敏捷的速度型伙伴 |
| 狐狸小智 | Lv 11 | 聪明机灵的技巧型伙伴 |
| 猎豹小快 | Lv 16 | 极速如风的高手伙伴 |
| 老鹰小高 | Lv 21 | 翱翔天际的大师伙伴 |
| 巨龙小飞 | Lv 26 | 至高无上的王者伙伴 |

### 2.3 宠物展示

- 宠物显示在练习页面角落
- 根据成长阶段显示不同大小和动画
- 点击宠物可以查看详细信息和成长进度

---

## 3. 主题/外观系统

### 3.1 主题与等级关联

每个等级区间有专属主题色和背景：

| 等级区间 | 主题名称 | 主色调 | 背景风格 | 宠物元素 |
|----------|----------|--------|----------|----------|
| Lv 1-5 | 森林秘境 | 绿色 #22c55e | 森林、树叶、草地 | 蜗牛壳纹理 |
| Lv 6-10 | 粉色草原 | 粉色 #f472b6 | 花海、草地、云朵 | 兔子耳朵元素 |
| Lv 11-15 | 夕阳沙漠 | 橙色 #f97316 | 沙丘、落日、仙人掌 | 狐狸尾巴元素 |
| Lv 16-20 | 金色草原 | 黄色 #eab308 | 草原、太阳、风 | 猎豹斑纹元素 |
| Lv 21-25 | 天空之城 | 蓝色 #3b82f6 | 云朵、天空、彩虹 | 老鹰翅膀元素 |
| Lv 26+ | 火山深渊 | 紫色 #8b5cf6 | 岩浆、岩石、火焰 | 龙鳞纹理 |

### 3.2 主题应用

- 主色调：用于强调色、按钮、进度条等
- 背景：微妙的渐变或图案背景
- 键盘样式：根据主题调整按键颜色

---

## 4. 多语言系统

### 4.1 支持语言

- 中文 (zh-CN) - 默认
- 英文 (en)

### 4.2 需要翻译的内容

- 所有UI文本（按钮、标签、提示）
- 成就名称和描述
- 等级称号
- 宠物名称和描述
- 错误提示信息

### 4.3 数据结构

```typescript
// i18n配置
interface Translations {
  zh: TranslationSet;
  en: TranslationSet;
}

interface TranslationSet {
  // 通用
  appName: string;
  welcome: string;

  // 导航
  nav: {
    practice: string;
    stats: string;
    achievements: string;
    settings: string;
  };

  // 练习页面
  practice: {
    startTyping: string;
    wpm: string;
    accuracy: string;
    time: string;
    completed: string;
  };

  // 成就
  achievements: {
    title: string;
    unlocked: string;
    locked: string;
    [key: string]: AchievementTranslation;
  };

  // 等级
  levels: {
    [key: string]: LevelTranslation;
  };

  // 宠物
  pets: {
    [key: string]: PetTranslation;
  };
}
```

### 4.4 语言切换

- 在设置页面提供语言切换选项
- 保存用户偏好到 localStorage
- 首次访问根据浏览器语言自动检测

---

## 5. UI设计

### 5.1 新增页面/组件

1. **成就页面** (`/achievements`)
   - 成就网格展示
   - 已完成/未完成状态
   - 进度显示

2. **宠物展示组件** (`PetDisplay`)
   - 宠物形象（带动画）
   - 成长进度条
   - 点击展开详细信息

3. **等级进度条** (`LevelProgress`)
   - 当前等级显示
   - XP进度条
   - 下一级所需XP

4. **设置页面** (`/settings`)
   - 语言切换
   - 主题预览
   - 宠物选择（已解锁的）

5. **成就解锁弹窗** (`AchievementUnlockModal`)
   - 成就达成动画
   - XP奖励展示
   - 分享按钮

### 5.2 现有页面修改

1. **主练习页面**
   - 右上角添加等级/XP显示
   - 角落添加宠物显示
   - 根据当前等级应用主题色

2. **统计页面**
   - 添加等级信息卡片
   - 添加成就完成度卡片
   - 添加宠物成长卡片

---

## 6. 数据持久化

### 6.1 存储结构

```typescript
// localStorage键值
const STORAGE_KEYS = {
  USERS: 'typing_users',
  LAST_USER_ID: 'last_user_id',
  LANGUAGE: 'typing_language',
  THEME: 'typing_theme',
};

// 用户数据扩展
interface LocalUser {
  id: string;
  name: string;
  // ... existing fields ...

  // Phase 2新增
  progress: UserProgress;
  pets: Pet[];
  preferences: {
    language: 'zh' | 'en';
    theme: string;
    activePet: string | null;
  };
}
```

### 6.2 数据迁移

对于已有用户数据，需要添加默认值：
- totalXP: 0
- currentLevel: 1
- 根据历史数据计算初始XP（反向计算累计字符、时长等）

---

## 7. 技术实现要点

### 7.1 状态管理

使用 React Context 创建：
- `ProgressContext` - 等级/XP/成就状态
- `PetContext` - 宠物状态
- `ThemeContext` - 主题状态
- `I18nContext` - 语言状态

### 7.2 动画效果

- 宠物：CSS动画（眨眼、跳跃、呼吸）
- 成就解锁：Framer Motion入场动画 + 粒子效果
- 等级提升：进度条动画 + 升级特效

### 7.3 性能考虑

- 成就检查在练习完成后进行
- 主题样式使用CSS变量，切换时无闪烁
- 宠物动画使用CSS transform，GPU加速

---

## 8. 测试清单

### 8.1 XP计算
- [ ] 字符计数准确
- [ ] 时长奖励正确
- [ ] WPM bonus正确应用
- [ ] 成就奖励XP正确添加

### 8.2 等级系统
- [ ] 等级提升时更新称号
- [ ] 新等级解锁新宠物
- [ ] 主题随等级自动切换

### 8.3 宠物系统
- [ ] 成长值正确累积
- [ ] 阶段变化时外观更新
- [ ] 点击宠物显示详细信息

### 8.4 成就系统
- [ ] 里程碑成就正确检测
- [ ] 连续天数计算正确
- [ ] 成就解锁时显示弹窗

### 8.5 多语言
- [ ] 所有文本都有翻译
- [ ] 切换语言即时生效
- [ ] 语言偏好正确保存

---

## 9. 实现顺序建议

1. **多语言系统** - 基础功能，影响所有UI
2. **XP/等级系统** - 核心玩法机制
3. **成就系统** - 与等级系统联动
4. **宠物系统** - 视觉效果增强
5. **主题系统** - 最终视觉完善
