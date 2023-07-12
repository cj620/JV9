/*
 * @Author: H.
 * @Date: 2021-11-26 11:16:23
 * @LastEditTime: 2022-01-14 09:26:09
 * @Description:
 */

export const formSchema = [
  {
    // 字段名
    prop: "ConfigValue",
    cpn: "FormInput",
    label: i18n.t('Generality.Ge_ConfigurationValue'),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: "blur",
      },
    ],
  },
];
