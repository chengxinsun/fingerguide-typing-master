export const zhTranslations = {
  app: { name: 'FingerGuide', tagline: '打字练习大师' },
  nav: { practice: '练习', stats: '统计', achievements: '成就', settings: '设置' },
  practice: { wpm: '速度', accuracy: '准确率', time: '时间', completed: '练习完成！', continuePrompt: '按空格键或点击按钮继续', totalTime: '总时长', sessions: '练习次数' },
  completion: { title: '练习完成！', saved: '您的进步已成功保存。', continue: '按空格键或点击按钮继续', continueButton: '继续练习' },
  mode: { normal: '普通模式', timeChallenge: '倒计时模式', custom: '自定义文本', selectDuration: '选择时长', start: '开始', cancel: '取消' },
  user: { createAccount: '创建账户', selectAccount: '选择账户', localAccount: '本地账户', switchAccount: '切换账户', enterName: '输入您的名字' },
  stats: { avgWpm: '平均速度', avgAccuracy: '平均准确率', accuracy: '准确率', recentSessions: '最近练习', errorHeatmap: '错误热力图', progressTrend: '进度趋势', clickToExpand: '点击展开', noHeatmapData: '完成练习查看错误模式', noProgressData: '每日练习查看进度', justNow: '刚刚', ago: '前', charsTyped: '已输入字符', currentStreak: '连续天数', bestStreak: '最佳连续' },
  settings: { title: '设置', language: '语言', theme: '主题', pet: '宠物', selectPet: '选择宠物', selectLanguage: '选择语言', chinese: '中文', english: 'English' },
  achievements: {
    title: '成就', unlocked: '已解锁', locked: '未解锁', reward: '奖励', xp: 'XP', progress: '进度', congrats: '恭喜！', autoDismiss: '几秒后自动关闭...',
    all: '全部', milestone: '里程碑', streak: '连续', accuracy: '精准', overallProgress: '总体进度', noAchievements: '暂无成就',
    first_try: { name: '初次尝试', description: '完成第1次练习' },
    centurion: { name: '百字先锋', description: '累计输入100字符' },
    thousand_master: { name: '千字达人', description: '累计输入1,000字符' },
    ten_king: { name: '万字王者', description: '累计输入10,000字符' },
    speed_star: { name: '速度之星', description: 'WPM首次突破50' },
    speed_master: { name: '极速高手', description: 'WPM首次突破80' },
    perfect_accuracy: { name: '百发百中', description: '单次准确率100%' },
    persistent: { name: '持之以恒', description: '累计练习30分钟' },
    streak_3: { name: '三日连击', description: '连续3天练习' },
    streak_7: { name: '七日达人', description: '连续7天练习' },
    streak_30: { name: '月度王者', description: '连续30天练习' },
    accuracy_streak_5: { name: '精准大师', description: '连续5次准确率>95%' }
  },
  level: { title: '等级', current: '当前等级', nextLevel: '下一级', level_1: '打字小蜗牛', level_6: '打字小兔子', level_11: '打字小狐狸', level_16: '打字小猎豹', level_21: '打字老鹰', level_26: '打字巨龙' },
  pet: { title: '宠物', growth: '成长值', stage_baby: '幼年', stage_teen: '少年', stage_adult: '成年', unlocked_at: '解锁等级', snail: { name: '蜗牛小慢', description: '稳重踏实的初学者伙伴' }, rabbit: { name: '兔子小跳', description: '灵活敏捷的速度型伙伴' }, fox: { name: '狐狸小智', description: '聪明机灵的技巧型伙伴' }, cheetah: { name: '猎豹小快', description: '极速如风的高手伙伴' }, eagle: { name: '老鹰小高', description: '翱翔天际的大师伙伴' }, dragon: { name: '巨龙小飞', description: '至高无上的王者伙伴' } }
};

export type Translations = typeof zhTranslations;
