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
  { en: "There is no greater agony than bearing an untold story inside you.", zh: "没有比在内心深处埋藏一个未讲出的故事更痛苦的了。", category: "Classics" }
];
