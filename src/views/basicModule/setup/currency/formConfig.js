/*
 * @Author: your name
 * @Date: 2021-11-01 14:35:10
 * @LastEditTime: 2021-11-01 15:11:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\views\basicModule\setup\currency\formConfig.js
 */
export const formSchema = [
  {
    prop: "Currency",
    label: i18n.t("Generality.Ge_Currency"),/* 货币 */
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: [ "blur"]
      }
    ]
  },
  {
    prop: "ExchangeRate",
    label:i18n.t("Generality.Ge_ExchangeRate"),/* 汇率 */
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: [ "blur"]
      }
    ]
  },
  {
    prop: "LocalCurrency",
    label:i18n.t("Generality.Ge_LocalCurrency"),/* 本币 */
    cpn: "FormCheckBox",
    options: {
      list: [
        {
          value: true,
        },

      ]
    }
  },
];
