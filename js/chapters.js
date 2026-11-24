/**
 * NIKA: A LITTLE ADVENTURE THROUGH US
 * Chapter Definitions & Story Lorebook Data
 */

const CHAPTERS = [
  // ==========================================
  // CHAPTER 0: PROLOGUE
  // ==========================================
  {
    id: 'intro',
    number: 'PROLOGUE',
    title: 'A Little Adventure',
    subtitle: 'Hey Nika! I have something to show you...',
    theme: 'garden_dawn',
    levelWidth: 640,
    spawn: { x: 50, y: 210 },
    platforms: [
      { x: 0, y: 250, w: 640, h: 90, type: 'ground' },
      { x: 140, y: 220, w: 55, h: 12, type: 'wood' },
      { x: 210, y: 190, w: 90, h: 12, type: 'wood', vines: 3 },
      { x: 320, y: 165, w: 100, h: 12, type: 'wood', vines: 4 }
    ],
    decorations: [
      { x: 30, y: 250, type: 'tree', height: 75 },
      { x: 260, y: 250, type: 'tree', height: 80 },
      { x: 490, y: 250, type: 'tree', height: 70 },
      { x: 15, y: 250, type: 'bush', size: 16 },
      { x: 120, y: 250, type: 'kaki_rose' },
      { x: 150, y: 250, type: 'daisy' },
      { x: 300, y: 250, type: 'bellflower' },
      { x: 420, y: 250, type: 'kaki_rose' },
      { x: 450, y: 250, type: 'mushroom' },
      { x: 80, y: 250, type: 'tall_grass' },
      { x: 220, y: 250, type: 'tall_grass' },
      { x: 380, y: 250, type: 'tall_grass' },
      { x: 140, y: 215, type: 'butterfly', color: '#f4a261', baseFlyX: 140, baseFlyY: 215 }
    ],
    collectibles: [
      {
        id: 'intro_star',
        title: 'A Spark of Us',
        desc: 'Every journey begins with a tiny spark ✨',
        x: 365, y: 135, w: 14, h: 14, type: 'star'
      }
    ],
    interactives: [
      {
        id: 'portal_ch1',
        type: 'portal',
        label: 'Step Into the Story',
        targetChapter: 1,
        x: 560,
        y: 200,
        w: 24,
        h: 50
      }
    ],
    npcs: [
      {
        id: 'gautam_intro',
        name: 'Gautam',
        x: 100,
        y: 250 - 24,
        w: 16,
        h: 24,
        dialogue: [
          { speaker: 'Gautam', text: 'Hey Nika! ❤️' },
          { speaker: 'Nika', text: 'Gautam? What is this place?' },
          { speaker: 'Gautam', text: 'I built a little world for you to celebrate your birthday.' },
          { speaker: 'Gautam', text: 'It\'s an adventure through our memories, inside jokes, and how we got here.' },
          { speaker: 'Nika', text: 'Aww... really?!' },
          { speaker: 'Gautam', text: 'Yess! Walk to the glowing portal on the right whenever you\'re ready.' }
        ]
      }
    ]
  },

  // ==========================================
  // CHAPTER 1: THE ACCIDENTAL ENCOUNTER
  // (With Irfan chase + Landmine trap & "Distance between us" gap)
  // ==========================================
  {
    id: 'ch1',
    number: 'CHAPTER 1',
    title: 'The Accidental Encounter',
    subtitle: 'Obby Royale, Irfan chase, surprise traps & "its k"...',
    theme: 'obby_royale',
    levelWidth: 1600,
    spawn: { x: 50, y: 220 },
    platforms: [
      // Ground 1
      { x: 0, y: 270, w: 320, h: 90, type: 'obby_block' },
      { x: 120, y: 235, w: 75, h: 12, type: 'neon_platform' },
      { x: 220, y: 205, w: 80, h: 12, type: 'neon_platform' },
      { x: 330, y: 175, w: 75, h: 12, type: 'neon_platform' },

      // Obstacle: "Distance between us" (parkour gap across neon beams)
      { x: 440, y: 270, w: 120, h: 90, type: 'obby_block' },
      { x: 580, y: 235, w: 55, h: 12, type: 'neon_platform' },
      { x: 660, y: 205, w: 55, h: 12, type: 'neon_platform' },
      { x: 740, y: 235, w: 55, h: 12, type: 'neon_platform' },

      // Irfan Obstacle Course: Platforms leading up to the Landmine!
      { x: 820, y: 270, w: 140, h: 90, type: 'obby_block' },
      { x: 920, y: 235, w: 60, h: 12, type: 'neon_platform' },
      { x: 1000, y: 205, w: 60, h: 12, type: 'neon_platform' },
      { x: 1080, y: 175, w: 80, h: 12, type: 'neon_platform' }, // Peak with landmine!

      // End Section: Reachable steps from ground
      { x: 1180, y: 270, w: 420, h: 90, type: 'obby_block' },
      { x: 1220, y: 240, w: 70, h: 12, type: 'neon_platform' },
      { x: 1300, y: 210, w: 80, h: 12, type: 'neon_platform' },
      { x: 1400, y: 180, w: 80, h: 12, type: 'neon_platform' },
      { x: 1490, y: 150, w: 90, h: 12, type: 'neon_platform' }
    ],
    traps: [
      // False floor pit with "oops Lost DD !" toast
      { x: 370, y: 280, w: 70, h: 80, type: 'lost_dd_trap', respawnX: 330, respawnY: 150 }
    ],
    hazards: [
      // Landmine at peak of Irfan course
      { x: 1120, y: 165, w: 16, h: 10, type: 'landmine', exploded: false }
    ],
    decorations: [
      { x: 20, y: 270, type: 'sign', text: 'Obby Royale Lobby' },
      { x: 460, y: 270, type: 'sign', text: 'OBSTACLE: "Distance between us"' },
      { x: 860, y: 270, type: 'sign', text: 'IRFAN ZONE: RUN TO LANDMINE!' },
      { x: 1240, y: 270, type: 'sign', text: 'Mystery Player spotted!' }
    ],
    collectibles: [
      {
        id: 'discord_icon',
        title: 'Added on Discord',
        desc: 'From an Obby lobby into late night chats 💬',
        x: 1520, y: 118, w: 16, h: 16, type: 'discord'
      }
    ],
    interactives: [
      {
        id: 'portal_ch2',
        type: 'portal',
        label: 'Open Discord Archives',
        targetChapter: 2,
        x: 1545,
        y: 215,
        w: 24,
        h: 50
      }
    ],
    npcs: [
      // Gautam at start
      {
        id: 'gautam_first_knock',
        name: 'Gautam',
        x: 235,
        y: 205 - 24,
        w: 16,
        h: 24,
        dialogue: [
          { speaker: 'Nika', text: 'Im soo sorry I smurfed you.' },
          { speaker: 'Gautam', text: 'its k' },
          { speaker: 'Nika', text: '...scuse me? Why are you so cold?!' },
          { speaker: 'Gautam', text: 'I was cold to everyone!' },
          { speaker: 'Gautam', text: 'I had no idea this was the start of something amazing.' }
        ],
        memoryOnComplete: {
          id: 'mem_coldest_impression',
          title: 'Coldest First Impression',
          desc: '"its k" — Obby Royale, 2024'
        }
      },
      // Brok
      {
        id: 'brok_npc',
        name: 'brok',
        x: 480,
        y: 270 - 24,
        w: 16,
        h: 24,
        dialogue: [
          { speaker: 'brok', text: 'Hey Nika! Watch out for the gap ahead!' },
          { speaker: 'Nika', text: 'Easy, I was a gymnast!' }
        ]
      },
      // Irfan (Chaser NPC!)
      {
        id: 'irfan_chaser',
        name: 'Irfan',
        isIrfanChaser: true,
        x: 840,
        y: 270 - 24,
        w: 16,
        h: 24,
        speed: 3,
        chasing: false,
        shoutTimer: 0,
        shoutText: 'hi nikii can u boost me plss',
        alive: true,
        facing: 1,
        onGround: true,
        vy: 0
      },
      // Mystery Alt Account
      {
        id: 'alt_gautam',
        name: 'Mystery Player',
        x: 1320,
        y: 210 - 24,
        w: 16,
        h: 24,
        dialogue: [
          { speaker: 'Nika', text: 'Hey, nice skills! You\'re pretty good.' },
          { speaker: 'Mystery Player', text: 'Thanks :)' },
          { speaker: 'Nika', text: 'Wait... we\'ve been playing together for like a solid hour...' },
          { speaker: 'Nika', text: '...WAIT A MINUTE. Ryvenic?!' },
          { speaker: 'Gautam', text: 'LOOL,you didn\'t realise it was me the whole time? ' },
          { speaker: 'Nika', text: 'NO I TOTALLY KNEW IT WAS YOU 😡! ' }
        ],
        memoryOnComplete: {
          id: 'mem_alt_account',
          title: 'The Mystery Alt Account',
          desc: 'Fooled for a solid hour before adding on Discord!'
        }
      }
    ]
  },

  // ==========================================
  // CHAPTER 2: THE DISCORD ARCHIVES
  // (With Authentic Online Chat Screen Overlay!)
  // ==========================================
  {
    id: 'ch2',
    number: 'CHAPTER 2',
    title: 'The Discord Archives',
    subtitle: 'Late nights, unhinged questions & caring chats...',
    theme: 'cozy_room',
    levelWidth: 1050,
    spawn: { x: 50, y: 220 },
    platforms: [
      { x: 0, y: 260, w: 1050, h: 90, type: 'carpet_floor' },
      { x: 90, y: 235, w: 45, h: 25, type: 'desk_shelf' },
      { x: 140, y: 210, w: 90, h: 12, type: 'desk_shelf' },
      { x: 370, y: 230, w: 85, h: 30, type: 'desk_shelf' },
      { x: 540, y: 230, w: 55, h: 12, type: 'desk_shelf' },
      { x: 610, y: 200, w: 90, h: 12, type: 'desk_shelf' },
      { x: 740, y: 235, w: 40, h: 25, type: 'desk_shelf' },
      { x: 790, y: 205, w: 90, h: 12, type: 'desk_shelf' }
    ],
    decorations: [
      { x: 40, y: 260, type: 'house_plant' },
      { x: 270, y: 260, type: 'bean_bag' },
      { x: 500, y: 260, type: 'fairy_lights' },
      { x: 720, y: 260, type: 'warm_lamp' }
    ],
    collectibles: [
      {
        id: 'midnight_mug',
        title: '3 AM Chats',
        desc: 'Falling asleep in each other\'s dms.. 🌙',
        x: 670, y: 172, w: 14, h: 14, type: 'mug'
      }
    ],
    interactives: [
      // 1. PC: Dream Girl Online Chat
      {
        id: 'chat_dream_girl',
        type: 'online_chat',
        label: 'Open PC Chat: Dream Girl',
        x: 155, y: 182, w: 26, h: 26,
        objType: 'pc',
        chatTitle: 'The Dream Girl Question',
        messages: [
          { sender: 'Nika', time: '02:14 AM', text: 'If me and ur dream girl were there with u would u still choose me?' },
          { sender: 'Gautam', time: '02:15 AM', text: 'I would choose my dream girl and i would go home with her' },
          { sender: 'Nika', time: '02:15 AM', text: 'scuse me?? 🤨' },
          { sender: 'Gautam', time: '02:16 AM', text: 'I would pick my dream girl and i would be going home with u😅' },
          { sender: 'Nika', time: '02:16 AM', text: 'awww okay you passed ❤️🥰' }
        ],
        memoryReward: {
          id: 'mem_dream_girl',
          title: 'The Dream Girl Question',
          desc: '"I would pick my dream girl and i would be going home with u"'
        }
      },
      // 2. Phone: "Don't be mad" Online Chat
      {
        id: 'chat_dont_be_mad',
        type: 'online_chat',
        label: 'Open Phone Chat: "Don\'t be mad"',
        x: 395, y: 208, w: 16, h: 22,
        objType: 'phone',
        chatTitle: 'The "Don\'t Be Mad" Test',
        messages: [
          { sender: 'Nika', time: '01:22 AM', text: 'If I text u \'dont be mad\' what is the first thing u assume i did?' },
          { sender: 'Gautam', time: '01:23 AM', text: 'I would assume u bummed obby royale till 4 am' },
          { sender: 'Nika', time: '01:23 AM', text: 'okay so ur assuming im a bum? thx a lot.' },
          { sender: 'Gautam', time: '01:24 AM', text: 'NOO NOT WT I MEAN 😭😂' }
        ],
        memoryReward: {
          id: 'mem_dont_be_mad',
          title: 'The "Don\'t Be Mad" Test',
          desc: '"okay so ur assuming im a bum? thx a lot."'
        }
      },
      // 3. Clock: 4 AM Late Night Chat
      {
        id: 'chat_late_night',
        type: 'online_chat',
        label: 'Check 4 AM Discord Call',
        x: 630, y: 180, w: 18, h: 18,
        objType: 'clock',
        chatTitle: 'Late-Night Obby Addict',
        messages: [
          { sender: 'Gautam', time: '04:17 AM', text: 'WHY do u stay up so late playing obr??' },
          { sender: 'Nika', time: '04:18 AM', text: 'Becauseee i can\'t sleeepp' },
          { sender: 'Gautam', time: '04:19 AM', text: 'Then in the morning you\'re soo tired.. 😴❤️' }
        ],
        memoryReward: {
          id: 'mem_late_night_gamer',
          title: 'Late-Night Obby Addict',
          desc: 'Bumming Obby Royale till 4 am and suffering in the morning.'
        }
      },
      // 4. Window: Halloween Night Chat
      {
        id: 'chat_halloween',
        type: 'online_chat',
        label: 'Look at Halloween Night Call',
        x: 810, y: 160, w: 32, h: 44,
        objType: 'window',
        chatTitle: 'Halloween Night Guardian',
        messages: [
          { sender: 'Nika', time: '11:45 PM', text: 'IM LOST I CAN\'T FIND MY WAY HOME SERIOUSLY' },
          { sender: 'Gautam', time: '11:45 PM', text: 'Omg pls call ur sister and tell her to pick you up or smth im worried' },
          { sender: 'Nika', time: '11:58 PM', text: 'My brother and sister picked me up' },
          { sender: 'Gautam', time: '11:59 PM', text: 'oh thank god stay safe kay go to sleep I love you ❤️' }
        ],
        memoryReward: {
          id: 'mem_halloween_night',
          title: 'Halloween Night Guardian',
          desc: 'Staying on the phone until you were safe and sound with family.'
        }
      },
      // Portal to Chapter 3
      {
        id: 'portal_ch3',
        type: 'portal',
        label: 'Enter Kaki Garden',
        targetChapter: 3,
        x: 960,
        y: 210,
        w: 24,
        h: 50
      }
    ],
    npcs: [
      { id: 'gautam_c2_pc', name: 'Gautam (At PC)', x: 185, y: 210 - 24, w: 16, h: 24 },
      { id: 'gautam_c2_phone', name: 'Gautam (On Phone)', x: 420, y: 230 - 24, w: 16, h: 24 },
      { id: 'gautam_c2_clock', name: 'Gautam (Sleepy)', x: 645, y: 200 - 24, w: 16, h: 24 },
      { id: 'gautam_c2_win', name: 'Gautam (Looking out)', x: 845, y: 205 - 24, w: 16, h: 24 }
    ]
  },

  // ==========================================
  // CHAPTER 3: THE LITTLE THINGS BETWEEN US
  // ==========================================
  {
    id: 'ch3',
    number: 'CHAPTER 3',
    title: 'The Little Things Between Us',
    subtitle: 'The beauty, grace & comforting warmth of Nika...',
    theme: 'kaki_garden',
    levelWidth: 1200,
    spawn: { x: 50, y: 220 },
    platforms: [
      { x: 0, y: 260, w: 1200, h: 90, type: 'garden_soil' },
      { x: 135, y: 235, w: 40, h: 25, type: 'garden_bridge' },
      { x: 180, y: 210, w: 90, h: 12, type: 'garden_bridge' },
      { x: 365, y: 235, w: 40, h: 25, type: 'garden_bridge' },
      { x: 410, y: 205, w: 90, h: 12, type: 'garden_bridge' },
      { x: 615, y: 235, w: 40, h: 25, type: 'garden_bridge' },
      { x: 660, y: 200, w: 90, h: 12, type: 'garden_bridge' },
      { x: 855, y: 235, w: 40, h: 25, type: 'garden_bridge' },
      { x: 900, y: 195, w: 100, h: 12, type: 'garden_bridge' }
    ],
    decorations: [
      { x: 40, y: 260, type: 'tree', height: 85 },
      { x: 300, y: 260, type: 'tree', height: 75 },
      { x: 580, y: 260, type: 'tree', height: 80 },
      { x: 820, y: 260, type: 'tree', height: 75 },
      { x: 1080, y: 260, type: 'tree', height: 90 },
      { x: 90, y: 260, type: 'kaki_rose' },
      { x: 130, y: 260, type: 'kaki_rose' },
      { x: 230, y: 260, type: 'bellflower' },
      { x: 370, y: 260, type: 'daisy' },
      { x: 520, y: 260, type: 'kaki_rose' },
      { x: 630, y: 260, type: 'bellflower' },
      { x: 760, y: 260, type: 'kaki_rose' },
      { x: 870, y: 260, type: 'daisy' },
      { x: 1000, y: 260, type: 'kaki_rose' },
      { x: 1040, y: 260, type: 'kaki_rose' },
      { x: 220, y: 165, type: 'butterfly', color: '#7c9454', baseFlyX: 220, baseFlyY: 165 },
      { x: 720, y: 140, type: 'butterfly', color: '#faeed9', baseFlyX: 720, baseFlyY: 140 }
    ],
    collectibles: [
      {
        id: 'kaki_blossom',
        title: 'Kaki Green Bouquet',
        desc: 'A garden blooming in your most beloved colour 🌿',
        x: 940, y: 165, w: 14, h: 14, type: 'kaki_flower'
      }
    ],
    interactives: [
      {
        id: 'obj_vanity',
        type: 'scenery_object',
        objType: 'vanity',
        label: 'Inspect Vanity (Lash Clusters)',
        x: 140, y: 215, w: 22, h: 24,
        dialogue: [
          { speaker: 'Nika', text: 'My lash cluster essentials! ✨' },
          { speaker: 'Gautam', text: 'You take so much precision and care with your lashes. You always look stunning.' }
        ],
        memoryOnComplete: {
          id: 'mem_lashes',
          title: 'The Lash Cluster Artist',
          desc: 'Perfection in every little detail ✨'
        }
      },
      {
        id: 'obj_gymnastics',
        type: 'scenery_object',
        objType: 'ribbon',
        label: 'Examine Gymnast Ribbon',
        x: 375, y: 215, w: 20, h: 22,
        dialogue: [
          { speaker: 'Gautam', text: 'Your gymnast background explains how agile and athletic you are!' },
          { speaker: 'Nika', text: 'Years of training and flexibility!' },
          { speaker: 'Gautam', text: 'And mental strength too. You\'re so tough and resilient.' }
        ],
        memoryOnComplete: {
          id: 'mem_gymnast',
          title: 'The Determined Gymnast',
          desc: 'Years of flexibility, discipline and strength 🤸‍♀️'
        }
      },
      {
        id: 'obj_teaching',
        type: 'scenery_object',
        objType: 'book',
        label: 'Open Teaching Notebook (German)',
        x: 625, y: 215, w: 20, h: 22,
        dialogue: [
          { speaker: 'Notebook', text: '🇩🇪 "Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben."' },
          { speaker: 'Gautam', text: 'You\'ve told me you wanting to become a teacher.' },
          { speaker: 'Gautam', text: 'With how loving, patient, and understanding you are, you\'d be an incredible teacher.' },
          { speaker: 'Nika', text: 'Aww, I love you thanks a lot..' }
        ],
        memoryOnComplete: {
          id: 'mem_teacher_dream',
          title: 'The Future Teacher',
          desc: 'Patient, caring, and inspiring the next generation 📚👩‍🏫'
        }
      },
      {
        id: 'obj_reassurance',
        type: 'scenery_object',
        objType: 'star_stand',
        label: 'Touch Star of Reassurance',
        x: 865, y: 215, w: 22, h: 24,
        dialogue: [
          { speaker: 'Gautam', text: 'Whenever something hurt me or made me anxious, you never dismissed it.' },
          { speaker: 'Gautam', text: 'You apologize, you reassure me, and you make sure I go to sleep peaceful and cared for.' },
          { speaker: 'Gautam', text: 'That kind of emotional loyalty and genuine love is so rare.' },
          { speaker: 'Nika', text: 'I always want you to feel safe with me ❤️' }
        ],
        memoryOnComplete: {
          id: 'mem_reassurance',
          title: 'Reassurance & Comfort',
          desc: 'Always making sure I go to sleep feeling safe, heard and loved.'
        }
      },
      {
        id: 'portal_ch4',
        type: 'portal',
        label: 'Enter Obby Royale Arena',
        targetChapter: 4,
        x: 1140,
        y: 210,
        w: 24,
        h: 50
      }
    ],
    npcs: []
  },

  // ==========================================
  // CHAPTER 4: OBBY ROYALE: THE LEGENDARY CHAPTER
  // (LHJ Leap, bored Mini-Race, Stick Whack, and Death Defier Course)
  // ==========================================
  {
    id: 'ch4',
    number: 'CHAPTER 4',
    title: 'Obby Royale: The Legendary Chapter',
    subtitle: 'LHJ leap, race vs bored & the Golden Death Defier badge!',
    theme: 'obby_championship',
    levelWidth: 1650,
    spawn: { x: 50, y: 220 },
    platforms: [
      { x: 0, y: 270, w: 280, h: 90, type: 'obby_block' },
      { x: 130, y: 240, w: 75, h: 12, type: 'neon_red' },
      { x: 230, y: 210, w: 75, h: 12, type: 'neon_red' },

      // LHJ Jump Section: Middle block removed!
      // Gautam starts at bottom (x: 390, y: 246).
      // High platform at (x: 520, y: 145) with jump pad at (x: 430, y: 262)!
      { x: 380, y: 270, w: 240, h: 90, type: 'obby_block' },
      { x: 430, y: 262, w: 32, h: 8, type: 'jumppad' },
      { x: 520, y: 145, w: 90, h: 12, type: 'neon_platform' }, // High ledge!

      // Bored Race Track: With Hurdles!
      { x: 670, y: 270, w: 380, h: 90, type: 'obby_block' },
      // Hurdles on track
      { x: 760, y: 250, w: 12, h: 20, type: 'race_hurdle' },
      { x: 840, y: 250, w: 12, h: 20, type: 'race_hurdle' },
      { x: 920, y: 250, w: 12, h: 20, type: 'race_hurdle' },

      // Complex Obstacle Course to DEATH DEFIER BADGE!
      { x: 1100, y: 270, w: 550, h: 90, type: 'obby_block' },
      { x: 1140, y: 235, w: 50, h: 12, type: 'gold_platform' },
      { x: 1210, y: 200, w: 50, h: 12, type: 'gold_platform' },
      { x: 1280, y: 165, w: 50, h: 12, type: 'gold_platform' },
      { x: 1350, y: 130, w: 50, h: 12, type: 'gold_platform' },
      { x: 1420, y: 100, w: 50, h: 12, type: 'gold_platform' },
      { x: 1500, y: 75, w: 90, h: 14, type: 'gold_platform' } // Summit Peak!
    ],
    decorations: [
      { x: 60, y: 270, type: 'sign', text: 'MODE: DEATH PENALTY' },
      { x: 400, y: 270, type: 'sign', text: 'LHJ ZONE: GAUTAM LEAP' },
      { x: 700, y: 270, type: 'sign', text: 'RACE START: VS BORED' },
      { x: 980, y: 270, type: 'sign', text: 'FINISH LINE' },
      { x: 1120, y: 270, type: 'sign', text: 'DEATH DEFIER OBBY COURSE' }
    ],
    collectibles: [
      // THE LEGENDARY DEATH DEFIER (DD) BADGE
      {
        id: 'golden_dd_badge',
        title: 'DEATH DEFIER (DD BADGE)',
        desc: 'Over 2 months of relentless grind. You earned this legend! 🏆',
        x: 1530, y: 46, w: 24, h: 24, type: 'golden_dd'
      }
    ],
    interactives: [
      // Death Penalty mode
      {
        id: 'obj_death_penalty',
        type: 'scenery_object',
        objType: 'signboard',
        label: 'Examine Death Penalty Mode',
        x: 100, y: 242, w: 24, h: 28,
        dialogue: [
          { speaker: 'Obby Royale', text: '⚠️ MODE SELECTION: DEATH PENALTY (99% of players skip)' },
          { speaker: 'Nika', text: '"yayy DP! its my favourite mode!" *smirks*' },
          { speaker: 'Gautam', text: 'You legit picked it just to ragebait the entire server 😂' },
          { speaker: 'Nika', text: 'LOL watch them all get mad!' }
        ],
        memoryOnComplete: {
          id: 'mem_death_penalty',
          title: 'Death Penalty Ragebait',
          desc: 'Sarcastically claiming the most hated mode as your favourite!'
        }
      },
      // Stick Pickup
      {
        id: 'obj_stick_pickup',
        type: 'stick_pickup',
        label: 'Take Gautam\'s Wooden Stick 🪵',
        x: 990, y: 245, w: 20, h: 20
      },
      // Portal to Boss Arena
      {
        id: 'portal_ch5',
        type: 'portal',
        label: 'Enter Squad Boss Arena',
        targetChapter: 5,
        x: 1590,
        y: 220,
        w: 24,
        h: 50
      }
    ],
    npcs: [
      // Gautam showing off LHJ Leap from bottom to top!
      {
        id: 'gautam_lhj',
        name: 'Gautam (LHJ Leap)',
        x: 390,
        y: 270 - 24,
        w: 16,
        h: 24,
        isLhjGautam: true,
        hasLeaped: false,
        targetY: 145 - 24,
        targetX: 540,
        dialogue: [
          { speaker: 'Gautam', text: 'Watch this PC lag jump Nika!' },
          { speaker: 'Nika', text: 'Wait, how are you going to reach that high platform ?!' },
          { speaker: 'Gautam', text: 'Hold my beer. *LHJ LAG JUMP ACTIVATED*' }
        ]
      },
      // bored NPC (Racer & Whack target)
      {
        id: 'bored_racer',
        name: 'bored',
        isBoredRacer: true,
        isBoredBoss: true,
        hp: 3,
        x: 700,
        y: 270 - 24,
        w: 16,
        h: 24,
        raceActive: false,
        raceFinished: false,
        dialogue: [
          { speaker: 'bored', text: 'bro how tf did i lose to niki' },
          { speaker: 'Nika', text: 'HAHA bored you suck, now Gautam gave me a stick...' },
          { speaker: 'Gautam', text: 'WHACK HIM NIKA! Press [F] or tap ⚔️!' }
        ]
      }
    ]
  },

  // ==========================================
  // CHAPTER 5: THE SQUAD SHOWDOWN (BOSS BATTLE!)
  // ==========================================
  {
    id: 'ch5_boss',
    number: 'CHAPTER 5',
    title: 'The Squad Showdown',
    subtitle: 'Defeat brok, toast, honie & traces in the ultimate arena!',
    theme: 'boss_arena',
    isBossChapter: true,
    levelWidth: 1000,
    spawn: { x: 50, y: 220 },
    platforms: [
      { x: 0, y: 260, w: 1000, h: 90, type: 'boss_metal_floor' },
      { x: 260, y: 195, w: 75, h: 12, type: 'boss_platform' },
      { x: 440, y: 165, w: 80, h: 12, type: 'boss_platform' },
      { x: 620, y: 165, w: 80, h: 12, type: 'boss_platform' },
      { x: 790, y: 195, w: 75, h: 12, type: 'boss_platform' },
      { x: 160, y: 225, w: 50, h: 12, type: 'neon_platform' },
      { x: 360, y: 225, w: 50, h: 12, type: 'neon_platform' },
      { x: 530, y: 225, w: 50, h: 12, type: 'neon_platform' },
      { x: 710, y: 225, w: 50, h: 12, type: 'neon_platform' }
    ],
    decorations: [
      { x: 40, y: 260, type: 'sign', text: 'BOSS ARENA: 4 CHALLENGERS' }
    ],
    collectibles: [],
    interactives: [
      {
        id: 'portal_ch6',
        type: 'portal',
        lockedByBosses: true,
        label: 'Step onto the Sunset Bridge',
        targetChapter: 6,
        x: 930,
        y: 210,
        w: 24,
        h: 50
      }
    ],
    bosses: [
      { id: 'boss_brok', name: 'brok', color: '#2980b9', x: 290, y: 195 - 24, w: 16, h: 24, hp: 3, maxHp: 3, shootCooldown: 150, bulletColor: '#3498db' },
      { id: 'boss_toast', name: 'toast', color: '#d35400', x: 470, y: 165 - 24, w: 16, h: 24, hp: 3, maxHp: 3, shootCooldown: 150, bulletColor: '#e67e22' },
      { id: 'boss_honie', name: 'honie', color: '#f1c40f', x: 650, y: 165 - 24, w: 16, h: 24, hp: 3, maxHp: 3, shootCooldown: 150, bulletColor: '#f39c12' },
      { id: 'boss_traces', name: 'traces', color: '#8e44ad', x: 820, y: 195 - 24, w: 16, h: 24, hp: 3, maxHp: 3, shootCooldown: 150, bulletColor: '#9b59b6' }
    ],
    npcs: [
      {
        id: 'gautam_boss_coach',
        name: 'Gautam (Support)',
        x: 90,
        y: 260 - 24,
        w: 16,
        h: 24,
        dialogue: [
          { speaker: 'Gautam', text: 'Watch out Nika! brok, toast, honie, and traces challenged you!' },
          { speaker: 'Gautam', text: 'Dodge their shots and shoot heart blasts back! (Press [F] or tap ⚔️)' },
          { speaker: 'Nika', text: 'I\'ll take them all down!! ❤️' }
        ]
      }
    ]
  },

  // ==========================================
  // CHAPTER 6: SOMEHOW, WE GOT HERE
  // ==========================================
  {
    id: 'ch6',
    number: 'CHAPTER 6',
    title: 'Somehow, We Got Here',
    subtitle: 'From distant worlds to becoming each other\'s person...',
    theme: 'sunset_bridge',
    levelWidth: 1300,
    spawn: { x: 50, y: 220 },
    platforms: [
      { x: 0, y: 260, w: 1300, h: 90, type: 'bridge_wood' }
    ],
    decorations: [
      { x: 30, y: 260, type: 'cherry_tree', height: 75 },
      { x: 250, y: 260, type: 'lantern_post' },
      { x: 450, y: 260, type: 'cherry_tree', height: 80 },
      { x: 650, y: 260, type: 'lantern_post' },
      { x: 850, y: 260, type: 'cherry_tree', height: 75 },
      { x: 1050, y: 260, type: 'lantern_post' }
    ],
    collectibles: [
      {
        id: 'instagram_heart',
        title: 'The Instagram Connection',
        desc: 'Crossing platforms, growing closer with every single message ❤️',
        x: 860, y: 220, w: 16, h: 16, type: 'insta_heart'
      }
    ],
    interactives: [
      {
        id: 'portal_final',
        type: 'portal',
        label: 'Walk Up to the Birthday Hill',
        targetChapter: 7,
        x: 1220,
        y: 210,
        w: 24,
        h: 50
      }
    ],
    npcs: [
      {
        id: 'gautam_ch6_college',
        name: 'Gautam',
        isGautam: true,
        sprite: 'gautam',
        x: 200,
        y: 260 - 24,
        w: 16,
        h: 24,
        dialogue: [
          { speaker: 'Gautam', text: 'When I went to college, I honestly got worried we\'d slowly become distant.' },
          { speaker: 'Gautam', text: 'I remember asking you not to forget about me.' },
          { speaker: 'Nika', text: 'I never could have forgotten about you, Gautam.' }
        ]
      },
      {
        id: 'gautam_ch6_discord',
        name: 'Gautam',
        isGautam: true,
        sprite: 'gautam',
        x: 550,
        y: 260 - 24,
        w: 16,
        h: 24,
        dialogue: [
          { speaker: 'Gautam', text: 'After college, we actually ended up talking even more.' },
          { speaker: 'Gautam', text: 'Then one day you mentioned wanting to take distance from everyone on Discord.' },
          { speaker: 'Gautam', text: 'I asked you: "Add me on Instagram instead?"' },
          { speaker: 'Nika', text: 'And I did. And that changed everything.' }
        ]
      },
      {
        id: 'gautam_ch6_person',
        name: 'Gautam',
        isGautam: true,
        sprite: 'gautam',
        x: 950,
        y: 260 - 24,
        w: 16,
        h: 24,
        dialogue: [
          { speaker: 'Gautam', text: 'There wasn\'t one particular day when everything changed.' },
          { speaker: 'Gautam', text: 'We just kept finding our way back to each other...' },
          { speaker: 'Gautam', text: '...until eventually, we became each other\'s person. ❤️' },
          { speaker: 'Nika', text: 'And that\'s why we\'re here today. ❤️' }
        ],
        memoryOnComplete: {
          id: 'mem_each_others_person',
          title: 'Each Other\'s Person',
          desc: 'We kept finding our way back until you became my person.'
        }
      }
    ]
  },

  // ==========================================
  // CHAPTER 7: EPILOGUE — A LETTER FOR NIKA
  // ==========================================
  {
    id: 'final_scene',
    number: 'EPILOGUE',
    title: 'A Letter for Nika',
    subtitle: 'With all my love, on your special day...',
    theme: 'starlit_hill',
    levelWidth: 640,
    spawn: { x: 50, y: 220 },
    platforms: [
      { x: 0, y: 260, w: 640, h: 90, type: 'ground' },
      { x: 260, y: 215, w: 120, h: 14, type: 'stone_altar' }
    ],
    decorations: [
      { x: 50, y: 260, type: 'tree', height: 80 },
      { x: 520, y: 260, type: 'tree', height: 80 },
      { x: 120, y: 260, type: 'kaki_rose' },
      { x: 160, y: 260, type: 'kaki_rose' },
      { x: 440, y: 260, type: 'kaki_rose' },
      { x: 480, y: 260, type: 'kaki_rose' }
    ],
    collectibles: [],
    interactives: [
      {
        id: 'birthday_envelope',
        type: 'letter',
        label: 'Open Birthday Letter 💌',
        x: 310, y: 185, w: 26, h: 22
      }
    ],
    npcs: [
      {
        id: 'gautam_final',
        name: 'Gautam',
        x: 230,
        y: 215 - 24,
        w: 16,
        h: 24,
        dialogue: [
          { speaker: 'Gautam', text: 'You made it to the end, Nika! ❤️' },
          { speaker: 'Gautam', text: 'You defeated all obstacles, beat the squad, and conquered every challenge.' },
          { speaker: 'Gautam', text: 'There\'s a letter waiting for you on the pedestal. Go ahead and open it.' }
        ]
      }
    ]
  }
];

// Complete Birthday Letter Text
const BIRTHDAY_LETTER_DATA = {
  salutation: 'Dear Nika,',
  subtitle: 'Happy Birthday!! 🎉🎂',
  paragraphs: [
    'I honestly don\'t think I could have predicted that a random encounter in Obby Royale would eventually lead me to someone as special as you.',
    'From that very first "Im soo sorry I smurfed you." followed by my incredibly enthusiastic "its k", to all the ridiculous conversations, late nights, arguments about lag jumps, your questionable obsession with Death Penalty, and everything in between, I\'m really glad our paths crossed.',
    'I hope you know just how appreciated you are.',
    'You\'re such a gem of a person, and one of the things I admire most about you is how loving, understanding and emotionally available you are. The way you reassure me, care about how I feel and make sure I\'m okay means more to me than I can properly explain.',
    'I also want you to know how mentally strong you are. I hope you never lose that part of yourself.',
    'Keep being determined, keep chasing the things you want, and never stop believing in what you\'re capable of.',
    'Whether you end up becoming a teacher or discovering an entirely different dream along the way, I genuinely hope you get to accomplish everything your heart desires.',
    'I wish you a life filled with happiness, success, love and all the beautiful things you deserve.',
    'I wish I could be there to celebrate with you properly, but until then, I hope this little game reminds you that even from miles away, someone is incredibly happy to have you in their life.',
    'Thank you for being you, Nika.',
    'Happy Birthday once again.',
    'I hope this next chapter of your life is your best one yet.'
  ],
  closing: 'With lots of love,',
  signature: 'Gautam ❤️'
};