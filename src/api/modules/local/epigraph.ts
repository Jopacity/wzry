import { get } from "@/api/helper/transfer";
import { LOCAL_KEY } from "@/config/modules/local-key";

/** @description 获取铭文列表 */
export const getEpigraphList = async () => {
  return await get<number[]>(LOCAL_KEY.EPIGRAPH);
};

/** @description 获取铭文效果列表 */
export const getEpigraphColorList = async () => {
  return await get<Remote.Epigraph.Color[]>(LOCAL_KEY.EPIGRAPH_COLOR);
};

/** @description 获取铭文效果列表 */
export const getEpigraphEffectList = async () => {
  return await get<Remote.Epigraph.Effect[]>(LOCAL_KEY.EPIGRAPH_EFFECT);
};

/** @description 获取铭文图片列表 */
export const getEpigraphImageList = async () => {
  return await get<Remote.Epigraph.Image[]>(LOCAL_KEY.EPIGRAPH_IMAGE);
};

/** @description 获取铭文名称列表 */
export const getEpigraphNameList = async () => {
  return await get<Remote.Epigraph.Name[]>(LOCAL_KEY.EPIGRAPH_NAME);
};

/** @description 获取铭文类型列表 */
export const getEpigraphTypeList = async () => {
  return await get<Remote.Epigraph.Type[]>(LOCAL_KEY.EPIGRAPH_TYPE);
};
