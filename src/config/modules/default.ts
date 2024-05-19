import { YiBaoStoreType } from "@/store/interface";

/** @description 默认英雄信息 */
export const heroDefault: () => Game.Hero.Detail = () => ({
  id: 0,
  price: "",
  attack: 0,
  difficulty: 0,
  effect: 0,
  survival: 0,
  camp: "",
  cover: "",
  coverBlur: "",
  avatar: "",
  height: 0,
  identity: "",
  location: "",
  mark: "",
  name: "",
  period: "",
  poster: "",
  posterBig: "",
  posterBlur: "",
  race: "",
  resume: "",
  gender: "男",
  skillUnit: "",
  profession: [],
  specialty: [],
  voices: [],
  skills: [],
  skins: [],
  relationships: [],
  skinCount: 0,
  relationCount: 0,
});

/** @description 默认用户信息 */
export const userInfoDefault: () => User.Data = () => ({
  id: "",
  avatar: "",
  username: "",
  password: "",
  secondaryPassword: "",
  role: 1,
  createTime: 0,
  lastLoginTime: 0,
  heroLotteryStoneWeekCardExpireTime: 0,
  skinLotteryStoneWeekCardExpireTime: 0,
  doubleGoldCardExpireTime: 0,
  doubleExpCardExpireTime: 0,
  isInvalid: false,
  isDev: false,
  guess: {
    poster: {
      guessCount: 0,
      guessing: false,
      skinIds: [],
    },
    skill: {
      guessCount: 0,
      guessing: false,
      skillIds: {},
    },
  },
  epigraphSuit: [],
  settingConfig: configDefault(),
  mail: [],
  mallMark: [],
  taskFinish: [],
  taskStatus: {
    today_online_duration: 0,
    today_gold_consume: 0,
    today_diamond_consume: 0,
    today_hero_lottery: 0,
    today_skin_lottery: 0,
    today_double_gold_card: 0,
    today_double_exp_card: 0,
    today_hero_coin: 0,
    today_skin_coin: 0,
    today_hero_stone: 0,
    today_skin_stone: 0,
    today_hero_supply: 0,
    today_skin_supply: 0,
    week_online_duration: 0,
    week_login_day: 0,
    week_hero_stone_card: 0,
    week_skin_stone_card: 0,
    week_zero_supply: 0,
    week_hero_coin: 0,
    week_skin_coin: 0,
    week_hero_stone: 0,
    week_skin_stone: 0,
  },
  bugIdea: [],
  behaviorMarker: {
    mc93: 0,
    tg73: 0,
    h3t4: 0,
    cq65: 0,
    d24r: 0,
    y8b2: 0,
    vu33: 0,
    i0k4: 0,
    iu48: 0,
    nn05: 0,
    ku27: 0,
    i87h: 0,
    g45c: 0,
    al38: 0,
    rj89: 0,
    q9y1: 0,
    kj05: 0,
    aw51: 0,
    ez16: 0,
    cz62: 0,
    cs01: 0,
    er08: 0,
    q65b: 0,
    k4f6: 0,
    yq53: 0,
    ag35: 0,
    cj13: 0,
    pa16: 0,
    j7m4: 0,
    my02: 0,
    ks52: 0,
    v87u: 0,
    ht88: 0,
    ff88: 0,
    er27: 0,
    ml55: 0,
    e13s: 0,
    c8k7: 0,
    mh01: 0,
  },
  lottery: {
    heroLucky: 0,
    skinLucky: 0,
    hero_order: [],
    skin_order: [],
  },
  knapsack: {
    articles: {
      DIAMOND: 0,
      GOLD: 0,
      BLESSING_BAG: 0,
      HERO_DEBRIS: 0,
      HONOR_CRYSTAL: 0,
      KING_CRYSTAL: 0,
      SKIN_DEBRIS: 0,
      HERO_LOTTERY_COIN: 25,
      SKIN_LOTTERY_COIN: 25,
      HERO_LOTTERY_STONE: 0,
      SKIN_LOTTERY_STONE: 0,
      HERO_LOTTERY_WEEK: 0,
      SKIN_LOTTERY_WEEK: 0,
      SKIN_CARD_INITIAL: 0,
      HERO_EXP_ONE: 0,
      HERO_EXP_TWO: 0,
      DOUBLE_GOLD: 0,
      DOUBLE_EXP: 0,
      HERO_TREASURE: 0,
      SKIN_BRAVE_TREASURE: 0,
      SKIN_EPIC_TREASURE: 0,
      SKIN_LEGEND_TREASURE: 0,
      SKIN_LIMIT_TREASURE: 0,
      HERO_CHEST_OPTIONAL: 0,
      HERO_CHEST_RANDOM: 0,
      SKIN_CHEST_BRAVE_OPTIONAL: 0,
      SKIN_CHEST_EPIC_OPTIONAL: 0,
      SKIN_CHEST_LEGEND_OPTIONAL: 0,
      SKIN_CHEST_LIMIT_OPTIONAL: 0,
      GUESS_CARD: 0,
      GUESS_COIN: 0,
      JUMP_COIN: 0,
    },
    heroList: {},
    skinList: [],
  },
  supply: {
    hero: {
      supply_remain_num: 200,
      startTime: 0,
      status: "IDLE",
      mode: {
        label: "",
        count: 0,
        seconds: 0,
      },
    },
    skin: {
      supply_remain_num: 200,
      startTime: 0,
      status: "IDLE",
      mode: {
        label: "",
        count: 0,
        seconds: 0,
      },
    },
  },
  yibao: {
    jumpCoinReceive: 0,
    ownedPartIds: ["dd09", "sa20", "nu37", "wt02", "ay75", "nw39", "d55c"],
    partDetail: {
      annulus: {
        type: "COLOR",
        id: "dd09",
      },
      antenna: {
        type: "COLOR",
        id: "sa20",
      },
      blush: {
        type: "COLOR",
        id: "nu37",
      },
      eye: {
        type: "COLOR",
        id: "wt02",
      },
      mouth: {
        type: "COLOR",
        id: "ay75",
      },
      side: {
        type: "COLOR",
        id: "nw39",
      },
      wing: {
        type: "COLOR",
        id: "d55c",
      },
    },
  },
});

/** @description 默认配置信息 */
export const configDefault: () => Global.SettingConfig = () => ({
  tip: true,
  audio: true,
  audioVolume: 50,
  music: true,
  musicVolume: 50,
  barrage: true,
  musicProgress: false,
  speed: 1,
  shine: true,
  particle: true,
  language: 0,
  noTips: {
    f1y0: false,
    mu63: false,
    ma67: false,
    v44s: false,
    d7o5: false,
    lp57: false,
    kr53: false,
    cl60: false,
  },
});

/** @description 默认乂宝部件信息 */
export const yiBaoPartConfigDefault: () => YiBaoStoreType.SuitDetail = () => ({
  annulus: {
    type: "COLOR",
    id: "dd09",
  },
  antenna: {
    type: "COLOR",
    id: "sa20",
  },
  blush: {
    type: "COLOR",
    id: "nu37",
  },
  eye: {
    type: "COLOR",
    id: "wt02",
  },
  mouth: {
    type: "COLOR",
    id: "ay75",
  },
  side: {
    type: "COLOR",
    id: "nw39",
  },
  wing: {
    type: "COLOR",
    id: "d55c",
  },
});

/** @description 默认乂宝选择栏信息 */
export const yiBaoSelectTabConfigDefault: () => YiBaoStoreType.PartColor = () => ({
  annulus: "",
  antenna: [],
  blush: "",
  eye: [],
  mouth: [],
  side: [],
  wing: "",
});

/** @description 默认乂宝部件对应贴图 */
export const yiBaoPartTextureConfigDefault: () => YiBaoStoreType.PartTexture = () => ({
  antenna: "",
  annulus: "",
  wing: "",
  side: {
    front: "",
    back: "",
    top: "",
    bottom: "",
    left: "",
    right: "",
  },
});
