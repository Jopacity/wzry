import { API_HERO } from "@/api";
import { get } from "@/api/helper/transfer";

/** @description 获取语音列表 */
export const getVoice = async (hero_name: string) => {
  const pinyin = await API_HERO.getHeroPinyin(hero_name);
  const voices = get<General[]>({ name: "voice_" + pinyin });
  return Promise.resolve(voices);
};

/** @description 获取指定皮肤语音 */
export const getSkinVoice = async (hero_name: string, skin_name: string) => {
  const pinyin = await API_HERO.getHeroPinyin(hero_name);

  if (!["梦奇", "盾山"].includes(hero_name)) {
    let voices = get<Hero.Voices>({
      name: "voice_" + pinyin,
      key: "name",
      value: skin_name,
    });

    //如果没有获取到对应皮肤的语音，则使用原皮肤语音
    if (!voices) {
      voices = get<Hero.Voices>({
        name: "voice_" + pinyin,
        key: "name",
        value: "原皮",
      });
    }

    return Promise.resolve(voices.voice);
  } else {
    return Promise.resolve([]);
  }
};
