/*
 * @Author: H.
 * @Date: 2022-01-20 14:11:35
 * @LastEditTime: 2022-01-20 18:54:28
 * @Description:
 */

import i18n from "@/i18n/i18n";
function isEn(key) {
  return i18n.t("systemSetupData." + key);
}
export function translation(data) {
  return data.map((item) => {
    return {
      Category: isEn(item.Category),
      ConfigList: item.ConfigList.map((c) => {
        return {
          ...c,
          Category: isEn(c.Category),
          Description: isEn(c.Description),
          ConfigName: isEn(c.ConfigName),
        };
      }),
    };
  });
}
