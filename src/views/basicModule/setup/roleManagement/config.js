/*
 * @Author: H.
 * @Date: 2021-10-29 11:30:59
 * @LastEditTime: 2023-09-28 15:04:12
 * @Description:
 */
import { getConfigKey } from "@/api/basicApi/systemSettings/sysSettings";

// DefaultNavigationBarConfiguration
async function getIndexNav() {
  const data = await getConfigKey({
    ConfigKey: "DefaultNavigationBarConfiguration",
  });
  // console.log(JSON.parse(data.ConfigValue), "sadfasdfdsfsadfsafas");
  const arr = JSON.parse(data.ConfigValue) || [];
  return {
    Items: arr.map((item) => {
      return {
        label: i18n.t(`menu.${item}`),
        value: item,
      };
    }),
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
