import { defineStore } from "pinia";
import { ref } from "vue";

const switchStore = defineStore("setting", () => {
  const config = ref<SettingConfig>({
    tip: true,
    videoBg: false,
    audio: true,
    audioVolume: 50,
    music: true,
    musicVolume: 0.5,
    lazy: true,
    theme: 0,
    speed: 1,
    loginSound: true,
  });

  const data = localStorage.getItem("config");
  if (data) config.value = { ...config.value, ...JSON.parse(data) };

  /** @description: 保存设置 */
  const saveConfig = (v: SettingConfig) => {
    config.value = { ...config.value, ...v };
    localStorage.setItem("config", JSON.stringify(config.value));
  };
  return { config, saveConfig };
});

export default switchStore;
