/** @description 隐藏侧边栏及顶部栏底部栏等，只留视频背景 */

import { ref } from "vue";

const hide_all = ref(false);

const useHideActivity = () => {
  const ExposeData = {
    /** 是否隐藏全部 */
    hide_all,
  };

  const ExposeMethods = {
    /** @description 设置隐藏状态 */
    setHideStatus(v: boolean) {
      if (v) {
        hide_all.value = v;
      } else {
        setTimeout(() => {
          hide_all.value = v;
        }, 500);
      }
    },
  };

  return {
    ...ExposeData,
    ...ExposeMethods,
  };
};

export { useHideActivity };
