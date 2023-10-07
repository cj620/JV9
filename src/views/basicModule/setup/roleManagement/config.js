/*
 * @Author: H.
 * @Date: 2021-10-29 11:30:59
 * @LastEditTime: 2023-09-28 15:04:12
 * @Description:
 */
import { getConfigKey } from "@/api/basicApi/systemSettings/sysSettings";
// import * as filters from "@/filters";
// import Vue from "_vue@2.6.10@vue";

// DefaultNavigationBarConfiguration
async function getIndexNav() {
  const data = await getConfigKey({
    ConfigKey: "DefaultNavigationBarConfiguration",
  });
  // console.log(JSON.parse(data.ConfigValue), "sadfasdfdsfsadfsafas");
  const arr = JSON.parse(data.ConfigValue) || [];
  let Items = [];
  arr.forEach((item) => {
    for (let key in item) {
      Items.push({
        label: item[key],
        value: key,
      });
    }
  });
  return {
    Items,
    Count: arr.length,
  };

}
export const formSchema = [
  {
    prop: "RoleName",
    label: i18n.t("Generality.Ge_RoleName"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "RoleDefaultNavigationBar",
    label: "默认首页",
    cpn: "SyncSelect",
    api: getIndexNav,
    apiOptions: {
      immediate: true,
      keyName: "label",
      valueName: "value",
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
  },
];
