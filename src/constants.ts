export type Finger = 
  | 'left-pinky' 
  | 'left-ring' 
  | 'left-middle' 
  | 'left-index' 
  | 'left-thumb' 
  | 'right-thumb' 
  | 'right-index' 
  | 'right-middle' 
  | 'right-ring' 
  | 'right-pinky';

export const KEY_MAP: Record<string, Finger> = {
  '1': 'left-pinky', 'q': 'left-pinky', 'a': 'left-pinky', 'z': 'left-pinky', '`': 'left-pinky',
  '2': 'left-ring', 'w': 'left-ring', 's': 'left-ring', 'x': 'left-ring',
  '3': 'left-middle', 'e': 'left-middle', 'd': 'left-middle', 'c': 'left-middle',
  '4': 'left-index', 'r': 'left-index', 'f': 'left-index', 'v': 'left-index',
  '5': 'left-index', 't': 'left-index', 'g': 'left-index', 'b': 'left-index',
  '6': 'right-index', 'y': 'right-index', 'h': 'right-index', 'n': 'right-index',
  '7': 'right-index', 'u': 'right-index', 'j': 'right-index', 'm': 'right-index',
  '8': 'right-middle', 'i': 'right-middle', 'k': 'right-middle', ',': 'right-middle',
  '9': 'right-ring', 'o': 'right-ring', 'l': 'right-ring', '.': 'right-ring',
  '0': 'right-pinky', 'p': 'right-pinky', ';': 'right-pinky', '/': 'right-pinky', '-': 'right-pinky', '=': 'right-pinky', '[': 'right-pinky', ']': 'right-pinky', "'": 'right-pinky', '\\': 'right-pinky',
  ' ': 'right-thumb', // Usually right thumb for space
};

export const KEYBOARD_ROWS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
  ['Space']
];

export type Category = 'Basic' | 'KET' | 'PET' | 'FCE' | 'Quotes' | 'Classics';

export interface PracticeItem {
  en: string;
  zh: string;
  category: Category;
}

export type PracticeMode = 'normal' | 'time-challenge' | 'custom';

export interface DailyRecord {
  date: string;
  avgWpm: number;
  avgAccuracy: number;
  sessionCount: number;
}

export interface PracticeSession {
  wpm: number;
  accuracy: number;
  timestamp: number;
}

export interface ExtendedUserStats {
  keyMistakes: Record<string, number>;
  dailyRecords: DailyRecord[];
}

// Phase 2: User Progress Interface
export interface UserProgress {
  totalXP: number;
  currentLevel: number;
  unlockedPets: string[];
  activePet: string | null;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;
  totalChars: number;
  totalPracticeTime: number; // in minutes
}

// Phase 2: Achievement Record Interface
export interface AchievementRecord {
  id: string;
  unlockedAt: number;
  progress: number;
}

// Phase 2: User Preferences Interface
export interface UserPreferences {
  language: 'zh' | 'en';
  theme: string;
  soundEnabled: boolean;
  showKeyHints: boolean;
}

// Phase 2: Extended LocalUser interface with new fields
export interface LocalUser {
  id: string;
  name: string;
  totalWpm: number;
  totalAccuracy: number;
  totalTime: number;
  sessionCount: number;
  recentSessions?: PracticeSession[];
  keyMistakes?: Record<string, number>;
  dailyRecords?: DailyRecord[];
  // Phase 2 fields
  progress?: UserProgress;
  achievements?: AchievementRecord[];
  preferences?: UserPreferences;
}

export const TIME_CHALLENGE_OPTIONS = [
  { value: 60, label: '1 Minute' },
  { value: 180, label: '3 Minutes' },
  { value: 300, label: '5 Minutes' },
] as const;

export const PRACTICE_TEXTS: PracticeItem[] = [
  // Basic
  { en: "The quick brown fox jumps over the lazy dog.", zh: "敏捷的棕色狐狸跳过了那只懒狗。", category: "Basic" },
  { en: "Typing is a skill that improves with consistent practice.", zh: "打字是一项通过持续练习而提高的技能。", category: "Basic" },
  { en: "Keep your fingers on the home row keys for better speed.", zh: "将手指放在基准行按键上以获得更好的速度。", category: "Basic" },
  { en: "Practice makes perfect when it comes to learning new things.", zh: "学习新事物时，熟能生巧。", category: "Basic" },
  { en: "A journey of a thousand miles begins with a single step.", zh: "千里之行，始于足下。", category: "Basic" },
  { en: "Success is not final, failure is not fatal: it is the courage to continue that counts.", zh: "成功不是终点，失败也不是终结：唯有继续前行的勇气才是最重要的。", category: "Basic" },
  { en: "Believe you can and you are halfway there.", zh: "相信你能做到，你就已经成功了一半。", category: "Basic" },
  { en: "The only limit to our realization of tomorrow will be our doubts of today.", zh: "实现明天的唯一障碍就是今天的疑虑。", category: "Basic" },
  { en: "Do not wait for the perfect moment, take the moment and make it perfect.", zh: "不要等待完美的时刻，抓住当下并使其完美。", category: "Basic" },
  { en: "Your time is limited, so do not waste it living someone else's life.", zh: "你的时间有限，所以不要把它浪费在过别人的生活上。", category: "Basic" },
  { en: "Life is what happens when you are busy making other plans.", zh: "生活就是当你忙于制定其他计划时发生的事情。", category: "Basic" },
  { en: "Get busy living or get busy dying.", zh: "忙着活，或者忙着死。", category: "Basic" },
  { en: "You only live once, but if you do it right, once is enough.", zh: "你只活一次，但如果你活得正确，一次就够了。", category: "Basic" },
  { en: "Many of life's failures are people who did not realize how close they were to success when they gave up.", zh: "生活中的许多失败者在放弃时都没有意识到他们离成功有多近。", category: "Basic" },
  { en: "If you want to live a happy life, tie it to a goal, not to people or things.", zh: "如果你想过上幸福的生活，就把它与目标联系起来，而不是与人或事联系起来。", category: "Basic" },
  { en: "I like to eat apples and bananas every morning.", zh: "我喜欢每天早上吃苹果和香蕉。", category: "Basic" },
  { en: "Where is the nearest bus stop?", zh: "最近的公交站在哪里？", category: "Basic" },
  { en: "It is a beautiful day today.", zh: "今天是个艳阳天。", category: "Basic" },
  { en: "Can you help me with my homework?", zh: "你能帮我做功课吗？", category: "Basic" },
  { en: "I have a small dog named Max.", zh: "我有一只叫马克斯的小狗。", category: "Basic" },
  { en: "What time does the movie start?", zh: "电影几点开始？", category: "Basic" },
  { en: "I am learning how to play the guitar.", zh: "我正在学习如何弹吉他。", category: "Basic" },
  { en: "My favorite color is blue.", zh: "我最喜欢的颜色是蓝色。", category: "Basic" },
  { en: "Please close the door when you leave.", zh: "离开时请关门。", category: "Basic" },
  { en: "I want to travel to Japan next year.", zh: "我想明年去日本旅游。", category: "Basic" },
  { en: "How much does this shirt cost?", zh: "这件衬衫多少钱？", category: "Basic" },
  { en: "I am so happy to meet you.", zh: "很高兴见到你。", category: "Basic" },
  { en: "Let's go for a walk in the park.", zh: "我们去公园散步吧。", category: "Basic" },
  { en: "She is my best friend.", zh: "她是我的好朋友。", category: "Basic" },
  { en: "They are playing soccer on the field.", zh: "他们在球场上踢足球。", category: "Basic" },
  { en: "The weather is very cold today.", zh: "今天天气很冷。", category: "Basic" },
  { en: "I need to buy some milk at the store.", zh: "我需要在商店买些牛奶。", category: "Basic" },
  { en: "Could you pass me the salt, please?", zh: "能把盐递给我吗？", category: "Basic" },
  { en: "I am very tired after work.", zh: "工作后我很累。", category: "Basic" },
  { en: "Do you speak English?", zh: "你会说英语吗？", category: "Basic" },
  { en: "I love listening to music.", zh: "我喜欢听音乐。", category: "Basic" },
  { en: "What is your name?", zh: "你叫什么名字？", category: "Basic" },
  { en: "I live in a big city.", zh: "我住在一个大城市。", category: "Basic" },
  { en: "My father is a doctor.", zh: "我父亲是一名医生。", category: "Basic" },
  { en: "We are having dinner together.", zh: "我们正在一起吃晚饭。", category: "Basic" },
  { en: "The book is on the table.", zh: "书在桌子上。", category: "Basic" },
  { en: "I have a sister and two brothers.", zh: "我有一个姐姐和两个弟弟。", category: "Basic" },
  { en: "Today is Monday.", zh: "今天是周一。", category: "Basic" },
  { en: "I am twenty years old.", zh: "我二十岁。", category: "Basic" },
  { en: "Happy birthday to you!", zh: "祝你生日快乐！", category: "Basic" },
  
  // KET (Key English Test - A2)
  { en: "I would like to invite you to my birthday party next Saturday.", zh: "我想邀请你参加下周六我的生日派对。", category: "KET" },
  { en: "The museum is open from nine in the morning until six in the evening.", zh: "博物馆从早上九点开放到晚上六点。", category: "KET" },
  { en: "Could you tell me the way to the nearest underground station?", zh: "你能告诉我去最近的地铁站怎么走吗？", category: "KET" },
  { en: "I am going to buy some bread and milk at the supermarket.", zh: "我要去超市买些面包和牛奶。", category: "KET" },
  { en: "My favorite hobby is playing football with my friends at the weekend.", zh: "我最喜欢的爱好是周末和朋友们一起踢足球。", category: "KET" },
  { en: "Yesterday I went to the cinema with my sister to watch a comedy.", zh: "昨天我和我姐姐去电影院看了一部喜剧。", category: "KET" },
  { en: "Please remember to bring your dictionary to the English class tomorrow.", zh: "请记得明天带你的字典来上英语课。", category: "KET" },
  { en: "It is very cold today, so you should wear a warm coat and a scarf.", zh: "今天很冷，所以你应该穿一件暖和的大衣并戴上围巾。", category: "KET" },
  { en: "I usually have breakfast at half past seven before I go to school.", zh: "我通常在七点半吃早餐，然后去上学。", category: "KET" },
  { en: "The weather was beautiful, so we decided to have a picnic by the lake.", zh: "天气很好，所以我们决定在湖边野餐。", category: "KET" },
  { en: "I am sorry I cannot come to your house tonight because I am busy.", zh: "很抱歉今晚我不能去你家，因为我很忙。", category: "KET" },
  { en: "My father works in a large office in the center of the city.", zh: "我父亲在市中心的一家大办公室工作。", category: "KET" },
  { en: "There are many interesting books in the library near my house.", zh: "我家附近的图书馆里有很多有趣的书。", category: "KET" },
  { en: "I love listening to pop music when I am doing my homework.", zh: "我做作业时喜欢听流行音乐。", category: "KET" },
  { en: "We are going to travel to London by train next summer holiday.", zh: "明年暑假我们要坐火车去伦敦旅行。", category: "KET" },
  { en: "I hope you have a wonderful time at the party tonight.", zh: "希望你今晚在派对上玩得开心。", category: "KET" },
  { en: "The teacher told us to open our books at page twenty-five.", zh: "老师叫我们把书翻到第25页。", category: "KET" },
  { en: "I like to wear comfortable clothes when I go to the park.", zh: "我去公园时喜欢穿舒适的衣服。", category: "KET" },
  { en: "Can you help me find my keys? I think I lost them in the garden.", zh: "你能帮我找钥匙吗？我想我把它们丢在花园里了。", category: "KET" },
  { en: "My brother is very good at drawing animals and landscapes.", zh: "我哥哥非常擅长画动物和风景。", category: "KET" },
  { en: "We usually have a big dinner together on Sunday evenings.", zh: "我们通常在周日晚上一起吃一顿丰盛的晚餐。", category: "KET" },
  { en: "I am learning how to cook Italian food from my grandmother.", zh: "我正在向我祖母学习如何烹饪意大利菜。", category: "KET" },
  { en: "The swimming pool is closed for repairs until next Monday morning.", zh: "游泳池因维修关闭，直到下周一早上。", category: "KET" },
  { en: "I need to buy a new pair of shoes for the school trip.", zh: "我需要为学校旅行买一双新鞋。", category: "KET" },
  { en: "My sister is a nurse and she works in a local hospital.", zh: "我姐姐是一名护士，她在当地一家医院工作。", category: "KET" },
  { en: "We had a great time at the beach despite the windy weather.", zh: "尽管天气很大风，我们在海滩还是玩得很开心。", category: "KET" },
  { en: "Please turn off the lights when you leave the classroom.", zh: "离开教室时请关灯。", category: "KET" },
  { en: "I am writing this email to tell you about my new job.", zh: "我写这封邮件是为了告诉你关于我新工作的事。", category: "KET" },
  { en: "The train station is just a five-minute walk from the hotel.", zh: "火车站距离酒店只有五分钟的步行路程。", category: "KET" },
  { en: "I enjoy reading science fiction novels in my free time.", zh: "我空闲时间喜欢读科幻小说。", category: "KET" },
  { en: "My favorite sport is swimming because it is very relaxing.", zh: "我最喜欢的运动是游泳，因为它非常令人放松。", category: "KET" },
  { en: "I have to finish my project before the end of the week.", zh: "我必须在周末之前完成我的项目。", category: "KET" },
  { en: "The food at the new restaurant was delicious and not too expensive.", zh: "新餐厅的食物很好吃，而且不太贵。", category: "KET" },
  { en: "I am looking for a birthday present for my younger brother.", zh: "我正在给我弟弟找生日礼物。", category: "KET" },
  { en: "We are planning to go camping in the mountains next month.", zh: "我们计划下个月去山里露营。", category: "KET" },
  { en: "I'm writing to invite you to my birthday party next weekend.", zh: "我写信是想邀请你参加我下周末的生日派对。", category: "KET" },
  { en: "Could you please tell me what time the train leaves for London?", zh: "请问你能告诉我去伦敦的火车几点出发吗？", category: "KET" },
  { en: "The weather was very hot, so we decided to go swimming in the lake.", zh: "天气非常热，所以我们决定去湖里游泳。", category: "KET" },
  { en: "I have two brothers and one sister, and we all live together in a big house.", zh: "我有两个哥哥（或弟弟）和一个姐姐（或妹妹），我们都住在一栋大房子里。", category: "KET" },
  { en: "My favorite hobby is playing basketball with my friends on Saturdays.", zh: "我最喜欢的爱好是周六和朋友们一起打篮球。", category: "KET" },
  { en: "I usually go to the library to study after school.", zh: "放学后我通常去图书馆学习。", category: "KET" },
  { en: "My mother cooks delicious food for our family every day.", zh: "我妈妈每天为我们全家做美味的食物。", category: "KET" },
  { en: "I want to learn how to drive a car when I am older.", zh: "我想等我大一点后学习如何开车。", category: "KET" },
  { en: "We went on a school trip to the science museum yesterday.", zh: "昨天我们学校组织去科技馆参观。", category: "KET" },
  { en: "I am looking for a new pair of jeans for the party.", zh: "我正在寻找一条参加派对的新牛仔裤。", category: "KET" },
  { en: "Is there a post office near here?", zh: "这附近有邮局吗？", category: "KET" },
  { en: "I like to wear comfortable clothes when I am at home.", zh: "我在家时喜欢穿舒适的衣服。", category: "KET" },
  { en: "My sister is very good at playing the violin.", zh: "我姐姐很擅长拉小提琴。", category: "KET" },
  { en: "We are going to have a picnic if the weather is nice.", zh: "如果天气好，我们就去野餐。", category: "KET" },
  { en: "Can you lend me your dictionary for a moment?", zh: "你能借我用一下你的字典吗？", category: "KET" },
  { en: "I usually have cereal and orange juice for breakfast.", zh: "我通常早餐吃谷物片，喝橙汁。", category: "KET" },
  { en: "My bedroom is small but it is very cozy.", zh: "我的卧室很小，但非常温馨。", category: "KET" },
  { en: "I am interested in learning more about different cultures.", zh: "我有兴趣更深入地了解不同的文化。", category: "KET" },
  { en: "We watched a very funny comedy movie last night.", zh: "昨天晚上我们看了一部非常搞笑的喜剧电影。", category: "KET" },
  { en: "I hope you have a great holiday in Spain.", zh: "希望你在西班牙度假愉快。", category: "KET" },
  { en: "Please remember to bring your passport to the airport.", zh: "请记得带护照去机场。", category: "KET" },
  { en: "My grandfather tells me interesting stories about the past.", zh: "我爷爷给我讲过去发生的有趣故事。", category: "KET" },
  { en: "I want to buy a new computer for my studies.", zh: "我想买一台新电脑供学习使用。", category: "KET" },
  { en: "We are planning to visit the zoo this weekend.", zh: "我们计划这周末去动物园。", category: "KET" },
  { en: "My friends and I enjoy playing video games together.", zh: "我和我的朋友们喜欢一起玩电子游戏。", category: "KET" },
  
  // PET (Preliminary English Test - B1)
  { en: "Although it was raining heavily, we decided to go for a walk in the park.", zh: "虽然雨下得很重，我们还是决定去公园散步。", category: "PET" },
  { en: "I am looking forward to hearing from you as soon as possible.", zh: "我期待尽快收到你的回复。", category: "PET" },
  { en: "The film was so boring that I fell asleep before the end.", zh: "电影太无聊了，以至于我在结束前就睡着了。", category: "PET" },
  { en: "If I were you, I would take the opportunity to study abroad next year.", zh: "如果我是你，我会抓住明年出国留学的机会。", category: "PET" },
  { en: "Environmental protection has become one of the most important issues today.", zh: "环境保护已成为当今最重要的问题之一。", category: "PET" },
  { en: "I have been learning English for five years and I really enjoy it.", zh: "我学习英语已经五年了，我真的很喜欢它。", category: "PET" },
  { en: "It is necessary to have a good understanding of different cultures.", zh: "有必要对不同的文化有良好的理解。", category: "PET" },
  { en: "The teacher explained the rules clearly so that everyone could understand.", zh: "老师清楚地解释了规则，以便每个人都能理解。", category: "PET" },
  { en: "I am not sure whether I will be able to attend the meeting tomorrow.", zh: "我不确定明天是否能参加会议。", category: "PET" },
  { en: "The new shopping center offers a wide range of products at reasonable prices.", zh: "新的购物中心以合理的价格提供各种各样的产品。", category: "PET" },
  { en: "She has a lot of experience in working with children of all ages.", zh: "她在与各年龄段儿童合作方面有丰富的经验。", category: "PET" },
  { en: "We should encourage young people to take part in more sports activities.", zh: "我们应该鼓励年轻人参加更多的体育活动。", category: "PET" },
  { en: "The internet has changed the way we live and work in many ways.", zh: "互联网在许多方面改变了我们的生活和工作方式。", category: "PET" },
  { en: "It is important to keep a balance between work and personal life.", zh: "在工作 and 个人生活之间保持平衡很重要。", category: "PET" },
  { en: "I would like to complain about the service I received at your restaurant.", zh: "我想投诉我在你们餐厅受到的服务。", category: "PET" },
  { en: "It is widely known that smoking is harmful to your health.", zh: "众所周知，吸烟有害健康。", category: "PET" },
  { en: "The company has decided to postpone the meeting until next week.", zh: "公司已决定将会议推迟到下周。", category: "PET" },
  { en: "I was surprised to see so many people at the concert last night.", zh: "我很惊讶昨晚音乐会有这么多人。", category: "PET" },
  { en: "You should take a map with you in case you get lost in the city.", zh: "你应该随身带一张地图，以防在城市里迷路。", category: "PET" },
  { en: "The price of the tickets includes a guided tour of the museum.", zh: "门票价格包括博物馆的导览服务。", category: "PET" },
  { en: "I am thinking of moving to a smaller house in the countryside.", zh: "我正考虑搬到农村的一间小房子里。", category: "PET" },
  { en: "She managed to finish the race despite having a painful injury.", zh: "尽管受了伤很疼，她还是成功完成了比赛。", category: "PET" },
  { en: "It is worth visiting the ancient castle if you have enough time.", zh: "如果你有足够的时间，那座古堡值得一游。", category: "PET" },
  { en: "The government is planning to build a new high-speed railway line.", zh: "政府正计划建设一条新的高速铁路线。", category: "PET" },
  { en: "I would appreciate it if you could send me more information about the course.", zh: "如果您能给我发送更多关于课程的信息，我将不胜感激。", category: "PET" },
  { en: "The exhibition features a collection of modern art from around the world.", zh: "这次展览展示了来自世界各地的现代艺术收藏。", category: "PET" },
  { en: "It is essential to follow the safety instructions when using the equipment.", zh: "使用设备时必须遵守安全说明。", category: "PET" },
  { en: "The local community is working together to improve the neighborhood.", zh: "当地社区正在共同努力改善社区环境。", category: "PET" },
  { en: "I am considering applying for a scholarship to study at university.", zh: "我正在考虑申请奖学金去大学学习。", category: "PET" },
  { en: "The weather forecast predicts that it will be sunny and warm all week.", zh: "天气预报预测全周都将是晴朗温暖的天气。", category: "PET" },
  { en: "I am writing to inform you that the meeting has been rescheduled.", zh: "我写信是为了通知您会议已重新安排。", category: "PET" },
  { en: "It is a great pleasure to welcome you to our annual conference.", zh: "非常荣幸地欢迎您参加我们的年度会议。", category: "PET" },
  { en: "The project requires a high level of commitment and dedication.", zh: "该项目需要高度的承诺和奉献精神。", category: "PET" },
  { en: "We need to find a way to reduce our energy consumption at home.", zh: "我们需要找到一种方法来减少家里的能源消耗。", category: "PET" },
  { en: "The city center is always crowded with tourists during the summer months.", zh: "在夏季的几个月里，市中心总是挤满了游客。", category: "PET" },
  { en: "Although I had studied for the exam all week, I still found it quite challenging.", zh: "尽管我整个星期都在为考试学习，但我仍然觉得考试很有挑战性。", category: "PET" },
  { en: "Have you ever considered traveling abroad to improve your language skills?", zh: "你有没有考虑过出国旅行来提高你的语言能力？", category: "PET" },
  { en: "The reason I was late for the meeting was because there was a lot of traffic on the motorway.", zh: "我开会迟到的原因是高速公路上交通非常拥堵。", category: "PET" },
  { en: "I’m looking forward to starting my new job next month, although I will miss my current colleagues.", zh: "我很期待下个月开始新工作，尽管我会想念现在的同事。", category: "PET" },
  { en: "If you have any questions regarding the new project, please feel free to contact me by email.", zh: "如果你对新项目有任何疑问，请随时通过电子邮件与我联系。", category: "PET" },
  { en: "It is important to have a healthy diet and exercise regularly.", zh: "保持健康的饮食并定期锻炼很重要。", category: "PET" },
  { en: "I am thinking of taking up a new hobby, such as photography or painting.", zh: "我正考虑培养一个新的爱好，比如摄影或绘画。", category: "PET" },
  { en: "The city center is very busy during the Christmas shopping season.", zh: "圣诞购物季期间市中心非常繁忙。", category: "PET" },
  { en: "We should be more careful about how much water and energy we use.", zh: "我们应该更注意我们的水和能源消耗量。", category: "PET" },
  { en: "I received a letter from my pen pal who lives in Australia.", zh: "我收到了一封来自住在澳大利亚的笔友的信。", category: "PET" },
  { en: "The local museum has a fascinating collection of ancient artifacts.", zh: "当地博物馆收藏了一批迷人的古代文物。", category: "PET" },
  { en: "I am not sure if I will be able to attend the wedding next Saturday.", zh: "我不确定下周六是否能参加婚礼。", category: "PET" },
  { en: "You should try to read at least one English book every month to improve your vocabulary.", zh: "你应该尝试每月至少读一本英文书以增加词汇量。", category: "PET" },
  { en: "My parents encouraged me to follow my dreams and be happy.", zh: "我父母鼓励我追求梦想并保持快乐。", category: "PET" },
  { en: "The public transport system in this city is very efficient and reliable.", zh: "这个城市的公共交通系统非常高效可靠。", category: "PET" },
  { en: "I am very impressed by the quality of the service in this hotel.", zh: "这家酒店的服务质量给我留下了深刻印象。", category: "PET" },
  { en: "We need to find a solution to the environmental problems we are facing.", zh: "我们需要为我们面临的环境问题找到解决方案。", category: "PET" },
  { en: "I am planning to go hiking in the mountains with some friends this summer.", zh: "我计划今年夏天和一些朋友去山里远足。", category: "PET" },
  { en: "It is a good idea to research the company before you go for a job interview.", zh: "在参加面试之前先研究一下公司是个好主意。", category: "PET" },
  { en: "I was very surprised when I won first prize in the competition.", zh: "当我在比赛中获得一等奖时，我非常惊讶。", category: "PET" },
  { en: "We should support local businesses and buy products made in our own country.", zh: "我们应该支持当地企业，购买本国制造的产品。", category: "PET" },
  { en: "Moving to a new house is a lot of work, but it is also very exciting.", zh: "搬新家有很多工作要做，但也非常令人兴奋。", category: "PET" },
  { en: "I am interested in learning how to speak several foreign languages.", zh: "我有兴趣学习如何说几种外语。", category: "PET" },
  { en: "We should treat others with respect and kindness at all times.", zh: "我们应该始终以尊重和友善对待他人。", category: "PET" },
  { en: "Learning a new skill can be a great way to boost your confidence.", zh: "学习一项新技能是增强自信的好方法。", category: "PET" },
  
  // FCE (First Certificate in English - B2)
  { en: "The environmental impact of plastic pollution has reached a critical point globally.", zh: "塑料污染对环境的影响在全球范围内已达到临界点。", category: "FCE" },
  { en: "Despite the economic downturn, the company managed to increase its annual turnover.", zh: "尽管经济低迷，该公司仍成功增加了年营业额。", category: "FCE" },
  { en: "It is widely believed that technology has fundamentally changed the way we communicate.", zh: "人们普遍认为，技术从根本上改变了我们的交流方式。", category: "FCE" },
  { en: "The government is considering implementing new measures to reduce traffic congestion.", zh: "政府正在考虑实施新措施以减少交通拥堵。", category: "FCE" },
  { en: "Success often depends on one's ability to adapt to rapidly changing circumstances.", zh: "成功往往取决于一个人适应快速变化环境的能力。", category: "FCE" },
  { en: "There is no doubt that regular exercise is beneficial for both physical and mental health.", zh: "毫无疑问，定期锻炼对身心健康都有好处。", category: "FCE" },
  { en: "The researchers have discovered a significant link between diet and certain diseases.", zh: "研究人员发现饮食与某些疾病之间存在显著联系。", category: "FCE" },
  { en: "It is essential to take into account the views of all stakeholders before making a decision.", zh: "在做出决定之前，必须考虑到所有利益相关者的意见。", category: "FCE" },
  { en: "The project was completed ahead of schedule thanks to the hard work of the team.", zh: "由于团队的努力，该项目提前完成了。", category: "FCE" },
  { en: "Many people find it difficult to cope with the pressure of modern life.", zh: "许多人发现很难应对现代生活的压力。", category: "FCE" },
  { en: "The company is looking for a highly motivated individual with excellent communication skills.", zh: "公司正在寻找一位具有极高积极性和出色沟通能力的个人。", category: "FCE" },
  { en: "It is important to recognize the contribution that volunteers make to our society.", zh: "认识到志愿者对我们社会的贡献是很重要的。", category: "FCE" },
  { en: "The rise in global temperatures is largely attributed to human activities.", zh: "全球气温升高在很大程度上归因于人类活动。", category: "FCE" },
  { en: "We need to find a sustainable solution to the problem of waste management.", zh: "我们需要为废物管理问题找到一个可持续化解决方案。", category: "FCE" },
  { en: "The film received positive reviews from critics for its original plot and strong performances.", zh: "这部电影因其原创的情节和强有力的表演而受到评论家的好评。", category: "FCE" },
  { en: "The new legislation aims to provide better protection for consumers.", zh: "新立法旨在为消费者提供更好的保护。", category: "FCE" },
  { en: "It is vital to maintain a high level of security in the workplace.", zh: "在工作场所保持高水平的安全至关重要。", category: "FCE" },
  { en: "The success of the project is largely due to the effective collaboration between departments.", zh: "该项目的成功在很大程度上归功于部门间的有效协作。", category: "FCE" },
  { en: "We must take immediate action to address the issue of climate change.", zh: "我们必须立即采取行动解决气候变化问题。", category: "FCE" },
  { en: "The company is committed to providing its employees with opportunities for professional development.", zh: "公司致力于为员工提供职业发展机会。", category: "FCE" },
  { en: "It is often argued that the media has a significant influence on public opinion.", zh: "人们经常争论媒体对公众舆论有重大影响。", category: "FCE" },
  { en: "The researchers conducted a series of experiments to test their hypothesis.", zh: "研究人员进行了一系列实验来测试他们的假设。", category: "FCE" },
  { en: "It is important to strike a balance between economic growth and environmental preservation.", zh: "在经济增长和环境保护之间取得平衡很重要。", category: "FCE" },
  { en: "The rapid development of artificial intelligence raises important ethical questions.", zh: "人工智能的快速发展引发了重要的伦理问题。", category: "FCE" },
  { en: "Many species are currently facing extinction due to habitat loss and climate change.", zh: "由于栖息地丧失和气候变化，许多物种目前面临灭绝。", category: "FCE" },
  { en: "The education system should focus on developing critical thinking and problem-solving skills.", zh: "教育系统应侧重于培养批判性思维和解决问题的能力。", category: "FCE" },
  { en: "It is widely recognized that cultural diversity enriches our society in many ways.", zh: "人们广泛认识到，文化多样性在许多方面丰富了我们的社会。", category: "FCE" },
  { en: "The company has implemented a new policy to promote gender equality in the workplace.", zh: "公司实施了一项新政策，以促进工作场所的性别平等。", category: "FCE" },
  { en: "We need to invest more in renewable energy sources to reduce our dependence on fossil fuels.", zh: "我们需要在可再生能源方面投入更多，以减少对化石燃料的依赖。", category: "FCE" },
  { en: "The globalization of the economy has led to increased competition between companies.", zh: "经济全球化导致公司之间的竞争加剧。", category: "FCE" },
  { en: "The unemployment rate has fallen significantly over the past few months.", zh: "在过去的几个月里，失业率大幅下降。", category: "FCE" },
  { en: "It is essential to have a clear understanding of the project's objectives.", zh: "对项目的目标有清晰的理解是至关重要的。", category: "FCE" },
  { en: "The new technology has the potential to revolutionize the manufacturing industry.", zh: "这项新技术有潜力彻底改变制造业。", category: "FCE" },
  { en: "We should encourage more people to use public transport to reduce pollution.", zh: "我们应该鼓励更多的人使用公共交通以减少污染。", category: "FCE" },
  { en: "The company's success is built on a foundation of innovation and quality.", zh: "公司的成功建立在创新和质量的基础之上。", category: "FCE" },
  { en: "It is widely argued that the integration of artificial intelligence in schools could revolutionize traditional teaching methods.", zh: "人们普遍认为，在学校中引入人工智能可能会彻底改变传统的教学方法。", category: "FCE" },
  { en: "Regardless of the risks involved, the company decided to proceed with the investment plan as it offered significant long-term benefits.", zh: "不管涉及什么风险，该公司还是决定继续推进投资计划，因为它能带来显著的长期利益。", category: "FCE" },
  { en: "Had I known about the changes to the schedule earlier, I would have made different arrangements for my journey.", zh: "如果我早点知道时间表的变动，我就会为我的行程做不同的安排了。", category: "FCE" },
  { en: "The success of the event was largely due to the meticulous planning and dedication of the entire team.", zh: "活动的成功在很大程度上归功于整个团队细致的规划和敬业精神。", category: "FCE" },
  { en: "Not only is it important to learn a new language, but it also broadens one’s cultural perspective and understanding of the world.", zh: "学习一门新语言不仅很重要，而且还能拓宽个人的文化视野和对世界的理解。", category: "FCE" },
  { en: "The impact of climate change is becoming increasingly apparent in many parts of the world.", zh: "气候变化的影响在世界许多地方正变得越来越明显。", category: "FCE" },
  { en: "It is essential to develop critical thinking skills in order to navigate the vast amount of information available online.", zh: "为了在网上大量的信息中辨别真伪，培养批判性思维能力至关重要。", category: "FCE" },
  { en: "The government is implementing new policies to promote renewable energy and reduce carbon emissions.", zh: "政府正在实施新的政策以推广可再生能源并减少碳排放。", category: "FCE" },
  { en: "Many people believe that the traditional workplace is becoming obsolete as more people work from home.", zh: "许多人认为，随着越来越多的人居家办公，传统的工作场所正变得过时。", category: "FCE" },
  { en: "The researchers have found a significant correlation between sleep deprivation and a range of health problems.", zh: "研究人员发现睡眠不足与一系列健康问题之间存在显著相关性。", category: "FCE" },
  { en: "It is vital to maintain a balanced lifestyle in order to achieve both professional and personal success.", zh: "为了在事业和个人生活中都取得成功，保持平衡的生活方式至关重要。", category: "FCE" },
  { en: "The rise of social media has fundamentally changed the way we communicate and consume information.", zh: "社交媒体的兴起从根本上改变了我们交流和消费信息的方式。", category: "FCE" },
  { en: "Educational institutions should focus on providing students with practical skills that are relevant to the modern job market.", zh: "教育机构应侧重于为学生提供与现代就业市场相关的实际技能。", category: "FCE" },
  { en: "The globalization of the economy has led to increased competition and opportunities for businesses worldwide.", zh: "经济全球化给全世界的企业带来了更大的竞争和机遇。", category: "FCE" },
  { en: "It is important to be aware of the ethical implications of new technologies such as gene editing and facial recognition.", zh: "意识到基因编辑和面部识别等新技术的伦理影响非常重要。", category: "FCE" },
  { en: "The success of a business often depends on its ability to adapt and innovate in a rapidly changing environment.", zh: "企业的成功往往取决于其在快速变化的环境中适应和创新的能力。", category: "FCE" },
  { en: "Many species are currently facing extinction as a result of habitat destruction and illegal poaching.", zh: "由于栖息地遭到破坏和非法偷猎，许多物种目前正面临灭绝。", category: "FCE" },
  { en: "It is essential to provide equal opportunities for all individuals, regardless of their background or circumstances.", zh: "无论背景或情况如何，都必须为所有人提供平等的机会。", category: "FCE" },
  { en: "The study of history provides valuable insights into the complexities of human nature and society.", zh: "历史研究为人类本质和社会的复杂性提供了宝贵的见解。", category: "FCE" },
  { en: "Creative arts play a crucial role in fostering individual expression and cultural identity.", zh: "创作艺术在促进个人表达和文化身份方面起着至关重要的作用。", category: "FCE" },
  { en: "We must take collective action to address the global challenge of plastic pollution in our oceans.", zh: "我们必须采取集体行动来应对全球海洋塑料污染的挑战。", category: "FCE" },
  { en: "The development of high-speed rail networks has significantly reduced travel times between major cities.", zh: "高速铁路网的发展显著缩短了大城市之间的旅行时间。", category: "FCE" },
  { en: "Lifelong learning is becoming increasingly important in a world where knowledge and technology evolve so rapidly.", zh: "在知识和技术发展如此迅速的世界里，终身学习变得越来越重要。", category: "FCE" },
  { en: "It is essential to protect cultural heritage sites for future generations to appreciate and learn from.", zh: "保护文化遗产地以供子孙后代欣赏和学习至关重要。", category: "FCE" },
  { en: "The promotion of mental health and well-being should be a priority in schools and workplaces.", zh: "在学校和工作场所应优先推广心理健康。", category: "FCE" },
  
  // Quotes
  { en: "Stay hungry, stay foolish.", zh: "求知若饥，虚心若愚。", category: "Quotes" },
  { en: "The only way to do great work is to love what you do.", zh: "成就卓越工作的唯一途径是热爱你的工作。", category: "Quotes" },
  { en: "Innovation distinguishes between a leader and a follower.", zh: "创新是区分领导者和追随者的标准。", category: "Quotes" },
  { en: "Be the change that you wish to see in the world.", zh: "欲变世界，先变自身。", category: "Quotes" },
  { en: "In the middle of every difficulty lies opportunity.", zh: "在困难的中心，机会就等在那里。", category: "Quotes" },
  { en: "The future belongs to those who believe in the beauty of their dreams.", zh: "未来属于那些相信梦想之美的人。", category: "Quotes" },
  { en: "It does not matter how slowly you go as long as you do not stop.", zh: "只要你不停止，走得多慢都没有关系。", category: "Quotes" },
  { en: "Everything you have ever wanted is on the other side of fear.", zh: "你想要的一切都在恐惧的另一边。", category: "Quotes" },
  { en: "Happiness is not something ready made. It comes from your own actions.", zh: "幸福不是现成的。它来自你自己的行动。", category: "Quotes" },
  { en: "The best way to predict the future is to create it.", zh: "预测未来的最好方法就是去创造它。", category: "Quotes" },
  { en: "Your life does not get better by chance, it gets better by change.", zh: "你的生活不会因巧合而变好，它会因改变而变好。", category: "Quotes" },
  { en: "Success is walking from failure to failure with no loss of enthusiasm.", zh: "成功就是从一个失败走向另一个失败，却不丧失热情。", category: "Quotes" },
  { en: "The only person you are destined to become is the person you decide to be.", zh: "你注定要成为的唯一的人就是你决定要成为的那个人。", category: "Quotes" },
  { en: "Do not judge each day by the harvest you reap but by the seeds that you plant.", zh: "不要根据你收获的果实来判断每一天，而要根据你播下的种子来判断。", category: "Quotes" },
  { en: "The purpose of our lives is to be happy.", zh: "我们生活的目的是快乐。", category: "Quotes" },
  { en: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart. - Helen Keller", zh: "世界上最好、最美的东西是看不见也摸不着的——它们必须用心去感受。 —— 海伦·凯勒", category: "Quotes" },
  { en: "Life is what happens when you're busy making other plans. - John Lennon", zh: "生活就是当你忙于制定其他计划时发生的事情。 —— 约翰·列侬", category: "Quotes" },
  { en: "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt", zh: "实现明天的唯一障碍就是今天的疑虑。 —— 富兰克林·D·罗斯福", category: "Quotes" },
  { en: "Keep your face always toward the sunshine - and shadows will fall behind you. - Walt Whitman", zh: "始终面向阳光，阴影就会落在你身后。 —— 沃尔特·惠特曼", category: "Quotes" },
  { en: "Do what you can, with what you have, where you are. - Theodore Roosevelt", zh: "在你所在之处，用你所有的，尽你所能。 —— 西奥多·罗斯福", category: "Quotes" },
  { en: "You must be the change you wish to see in the world. - Mahatma Gandhi", zh: "你必须成为你希望在世界上看到的改变。 —— 圣雄甘地", category: "Quotes" },
  { en: "The only way to do great work is to love what you do. - Steve Jobs", zh: "成就卓越工作的唯一途径是热爱你的工作。 —— 史蒂夫·乔布斯", category: "Quotes" },
  { en: "Spread love everywhere you go. Let no one ever come to you without leaving happier. - Mother Teresa", zh: "无论走到哪里，请播撒爱。不要让任何人在离开你时，不感到更快乐。 —— 德兰修女", category: "Quotes" },
  { en: "It is during our darkest moments that we must focus to see the light. - Aristotle", zh: "在最黑暗的时刻，我们必须集中精力寻找光明。 —— 亚里士多德", category: "Quotes" },
  { en: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success. - James Cameron", zh: "如果你把目标定得极高，即使失败了，你的失败也高于他人的成功。 —— 詹姆斯·卡梅隆", category: "Quotes" },
  { en: "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln", zh: "最后，重要的不是你生命中的岁月，而是你岁月中的生命。 —— 亚伯拉罕·林肯", category: "Quotes" },
  { en: "Go confidently in the direction of your dreams! Live the life you’ve imagined. - Henry David Thoreau", zh: "自信地朝梦想的方向前进！过你想象中的生活。 —— 亨利·戴维·梭罗", category: "Quotes" },
  { en: "What you get by achieving your goals is not as important as what you become by achieving your goals. - Zig Ziglar", zh: "达成目标所获得的并不像你因达成目标而成为的样貌那样重要。 —— 吉格·金克拉", category: "Quotes" },
  { en: "Try to be a rainbow in someone else's cloud. - Maya Angelou", zh: "试着成为别人乌云中的彩虹。 —— 玛雅·安杰洛", category: "Quotes" },
  { en: "You are never too old to set another goal or to dream a new dream. - C.S. Lewis", zh: "你永远不会因为太老而不能设定另一个目标或追逐一个新的梦想。 —— C.S. 路易斯", category: "Quotes" },
  { en: "To see what is right and not do it is a lack of courage. - Confucius", zh: "见义不为，无勇也。 —— 孔子", category: "Quotes" },
  { en: "The power of imagination makes us infinite. - John Muir", zh: "想象的力量使我们变得无限。 —— 约翰·缪尔", category: "Quotes" },
  { en: "Whether you think you can or you think you can’t, you’re right. - Henry Ford", zh: "无论你认为自己行还是不行，你都是对的。 —— 亨利·福特", category: "Quotes" },
  { en: "Everything you’ve ever wanted is on the other side of fear. - George Addair", zh: "你想要的一切都在恐惧的另一边。 —— 乔治·阿戴尔", category: "Quotes" },
  { en: "Challenges are what make life interesting and overcoming them is what makes life meaningful. - Joshua J. Marine", zh: "挑战使生活变得有趣，而克服挑战则使生活变得有意义。 —— 约书亚·J·马林", category: "Quotes" },
  { en: "The way to get started is to quit talking and begin doing. - Walt Disney", zh: "开始的方法是停止说话，开始行动。 —— 华特·迪士尼", category: "Quotes" },
  { en: "Don't let yesterday take up too much of today. - Will Rogers", zh: "不要让昨天占用太多的今天。 —— 威尔·罗杰斯", category: "Quotes" },
  { en: "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison", zh: "我没有失败。我只是发现了1万种无法奏效的方法。 —— 托马斯·爱迪生", category: "Quotes" },
  { en: "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill", zh: "成功就是从一个失败走向另一个失败，却不丧失热情。 —— 温斯顿·丘吉尔", category: "Quotes" },
  { en: "A person who never made a mistake never tried anything new. - Albert Einstein", zh: "一个从未犯错的人从未尝试过任何新事物。 —— 阿尔伯特·爱因斯坦", category: "Quotes" },
  { en: "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt", zh: "未来属于那些相信梦想之美的人。 —— 埃莉诺·罗斯福", category: "Quotes" },
  { en: "Your time is limited, don't waste it living someone else's life. - Steve Jobs", zh: "你的时间有限，不要把它浪费在过别人的生活上。 —— 史蒂夫·乔布斯", category: "Quotes" },
  { en: "Believe you can and you're halfway there. - Theodore Roosevelt", zh: "相信你能做到，你就已经成功了一半。 —— 西奥多·罗斯福", category: "Quotes" },
  { en: "It does not matter how slowly you go as long as you do not stop. - Confucius", zh: "只要你不停止，走得多慢都没有关系。 —— 孔子", category: "Quotes" },
  { en: "If you can dream it, you can do it. - Walt Disney", zh: "如果你能做梦，你就能实现它。 —— 华特·迪士尼", category: "Quotes" },
  
  // Classics
  { en: "It was the best of times, it was the worst of times.", zh: "那是最好的时代，那是最坏的时代。", category: "Classics" },
  { en: "All animals are equal, but some animals are more equal than others.", zh: "所有动物一律平等，但有些动物比其他动物更平等。", category: "Classics" },
  { en: "To be, or not to be, that is the question.", zh: "生存还是毁灭，这是一个问题。", category: "Classics" },
  { en: "Call me Ishmael.", zh: "叫我以实玛利吧。", category: "Classics" },
  { en: "Happy families are all alike; every unhappy family is unhappy in its own way.", zh: "幸福的家庭都是相似的，不幸的家庭各有各的不幸。", category: "Classics" },
  { en: "In a hole in the ground there lived a hobbit.", zh: "在底下的一个洞穴里，住着一个霍比特人。", category: "Classics" },
  { en: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.", zh: "凡是有钱的单身汉，总想娶位太太，这已经成了一条举世公认的真理。", category: "Classics" },
  { en: "The sun shone, having no alternative, on the nothing new.", zh: "太阳照常升起，别无选择，照在毫无新意的事物上。", category: "Classics" },
  { en: "I am an invisible man.", zh: "我是一个隐形人。", category: "Classics" },
  { en: "All children, except one, grow up.", zh: "所有的孩子，除了一个，都会长大。", category: "Classics" },
  { en: "Whatever our souls are made of, his and mine are the same.", zh: "无论我们的灵魂是由什么组成的，他的和我的都是一样的。", category: "Classics" },
  { en: "The only way out of the labyrinth of suffering is to forgive.", zh: "走出痛苦迷宫的唯一方法就是原谅。", category: "Classics" },
  { en: "It is only with the heart that one can see rightly; what is essential is invisible to the eye.", zh: "只有用心才能看得清；本质的东西用眼睛是看不见的。", category: "Classics" },
  { en: "I am not afraid of storms, for I am learning how to sail my ship.", zh: "我不害怕风暴，因为我正在学习如何驾驶我的船。", category: "Classics" },
  { en: "There is no greater agony than bearing an untold story inside you.", zh: "没有比在内心深处埋藏一个未讲出的故事更痛苦的了。", category: "Classics" },
  { en: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. - F. Scott Fitzgerald, The Great Gatsby", zh: "在我年纪更轻、更容易受影响的岁月里，父亲给我的一些建议，我至今仍铭记在心。 —— F·斯科特·菲茨杰拉德，《了不起的盖茨比》", category: "Classics" },
  { en: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. - Jane Austen, Pride and Prejudice", zh: "凡是有钱的单身汉，总想娶位太太，这已经成了一条举世公认的真理。 —— 简·奥斯汀，《傲慢与偏见》", category: "Classics" },
  { en: "All happy families are alike; each unhappy family is unhappy in its own way. - Leo Tolstoy, Anna Karenina", zh: "幸福的家庭都是相似的，不幸的家庭各有各的不幸。 —— 列夫·托尔斯泰，《安娜·卡列尼娜》", category: "Classics" },
  { en: "Stay Gold, Ponyboy, Stay Gold. - S.E. Hinton, The Outsiders", zh: "保持本色，波尼贝尔，保持本色。 —— S.E. 欣顿，《局外人》", category: "Classics" },
  { en: "One day I will find the right words, and they will be simple. - Jack Kerouac, The Dharma Bums", zh: "总有一天，我会找到合适的词句，而且它们将是简单的。 —— 杰克·凯鲁亚克，《达摩流浪者》", category: "Classics" },
  { en: "And so we beat on, boats against the current, borne back ceaselessly into the past. - F. Scott Fitzgerald, The Great Gatsby", zh: "于是我们奋力向前，逆水行舟，被不断地推向过去。 —— F·斯科特·菲茨杰拉德，《了不起的盖茨比》", category: "Classics" },
  { en: "Things fall apart; the center cannot hold. - W.B. Yeats", zh: "事物四分五裂；中心无法维持。 —— W·B·叶芝", category: "Classics" },
  { en: "Not all those who wander are lost. - J.R.R. Tolkien, The Fellowship of the Ring", zh: "并非所有流浪的人都迷失了方向。 —— J.R.R. 托尔金，《护戒使者》", category: "Classics" },
  { en: "Whatever our souls are made of, his and mine are the same. - Emily Brontë, Wuthering Heights", zh: "无论我们的灵魂是由什么组成的，他的和我的都是一样的。 —— 艾米莉·勃朗特，《呼啸山庄》", category: "Classics" },
  { en: "To be or not to be, that is the question. - William Shakespeare, Hamlet", zh: "生存还是毁灭，这是一个问题。 —— 威廉·莎士比亚，《哈姆雷特》", category: "Classics" },
  { en: "We are such stuff as dreams are made on, and our little life is rounded with a sleep. - William Shakespeare, The Tempest", zh: "我们是由梦想构成的物质，我们短暂的一生因睡眠而圆满。 —— 威廉·莎士比亚，《暴风雨》", category: "Classics" },
  { en: "Memory is the diary we all carry about with us. - Oscar Wilde", zh: "记忆是我们每个人都随身携带的日记。 —— 奥斯卡·王尔德", category: "Classics" },
  { en: "Real courage is when you know you're licked before you begin, but you begin anyway and see it through no matter what. - Harper Lee, To Kill a Mockingbird", zh: "真正的勇气是你还没开始就知道自己输定了，但无论如何都要开始，并坚持到底。 —— 哈珀·李，《杀死一只知更鸟》", category: "Classics" },
  { en: "Most people are nice, when you finally see them. - Harper Lee, To Kill a Mockingbird", zh: "当你最终看到他们时，大多数人都是好人。 —— 哈珀·李，《杀死一只知更鸟》", category: "Classics" },
  { en: "I took a deep breath and listened to the old brag of my heart. I am, I am, I am. - Sylvia Plath, The Bell Jar", zh: "我深吸一口气，听着我内心古老的吹嘘：我是，我是，我是。 —— 西尔维亚·普拉斯，《钟形罩》", category: "Classics" },
  { en: "Beware; for I am fearless, and therefore powerful. - Mary Shelley, Frankenstein", zh: "小心；因为我无所畏惧，因此也就无所不能。 —— 玛丽·雪莱，《弗兰肯斯坦》", category: "Classics" },
  { en: "The only people for me are the mad ones, the ones who are mad to live, mad to talk, mad to be saved. - Jack Kerouac, On the Road", zh: "对我来说，唯一的人是那些疯子，那些渴望生活、渴望交谈、渴望被拯救的疯子。 —— 杰克·凯鲁亚克，《在路上》", category: "Classics" },
  { en: "Nature's first green is gold, Her hardest hue to hold. - Robert Frost", zh: "大自然的第一抹新绿是金色的，那是她最难留住的颜色。 —— 罗伯特·弗罗斯特", category: "Classics" },
  { en: "The answer to the ultimate question of life, the universe, and everything is 42. - Douglas Adams, The Hitchhiker's Guide to the Galaxy", zh: "生命、宇宙及万物的终极问题的答案是42。 —— 道格拉斯·亚当斯，《银河系漫游指南》", category: "Classics" },
  { en: "Deep in the human unconscious is a pervasive need for a logical universe that makes sense. But the real universe is always one step beyond logic. - Frank Herbert, Dune", zh: "人类潜意识深处普遍需要一个合乎逻辑、有意义的宇宙。但真实的宇宙总是超越逻辑一步。 —— 弗兰克·赫伯特，《沙丘》", category: "Classics" },
  { en: "Wait and hope. - Alexandre Dumas, The Count of Monte Cristo", zh: "等待并怀抱希望。 —— 大仲马，《基督山伯爵》", category: "Classics" },
  { en: "It was the best of times, it was the worst of times. - Charles Dickens, A Tale of Two Cities", zh: "那是最好的时代，那是最坏的时代。 —— Charles Dickens, 《双城记》", category: "Classics" },
  { en: "All children, except one, grow up. - J.M. Barrie, Peter Pan", zh: "所有的孩子，除了一个，都会长大。 —— J.M. 巴里，《彼得·潘》", category: "Classics" },
  { en: "Even the darkest night will end and the sun will rise. - Victor Hugo, Les Misérables", zh: "即使是最黑暗的夜晚也会结束，太阳会升起。 —— 维克多·雨果，《悲惨世界》", category: "Classics" },
  { en: "I cannot fix on the hour, or the spot, or the look or the words, which laid the foundation. - Jane Austen, Pride and Prejudice", zh: "我无法准确说出是在什么时候，在什么时候，看你的神情，还是听你的谈话，才奠定了基础。 —— 简·奥斯汀，《傲慢与偏见》", category: "Classics" },
  { en: "He’s more myself than I am. - Emily Brontë, Wuthering Heights", zh: "他比我更像我自己。 —— 艾米莉·勃朗特，《呼啸山庄》", category: "Classics" },
  { en: "Tomorrow is another day. - Margaret Mitchell, Gone with the Wind", zh: "明天又是新的一天。 —— 玛格丽特·米切尔，《飘》", category: "Classics" },
  { en: "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals. - J.K. Rowling, Harry Potter and the Goblet of Fire", zh: "如果你想知道一个人是什么样的，那就好好看看他是如何对待下级的，而不是看他如何对待平级的。 —— J.K. 罗琳，《哈利·波特与火焰杯》", category: "Classics" },
  { en: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic. - J.K. Rowling, Harry Potter and the Deathly Hallows", zh: "但在我看来，文字是我们最取之不竭的魔力源泉。 —— J.K. 罗琳，《哈利·波特与死亡圣器》", category: "Classics" },
  { en: "So it goes. - Kurt Vonnegut, Slaughterhouse-Five", zh: "就是这样。 —— 库尔特·冯内古特，《第五号屠宰场》", category: "Classics" },
];
