/*
 * @Author: your name
 * @Date: 2021-11-10 13:23:00
 * @LastEditTime: 2022-01-14 09:56:03
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\stockroom\baseData\stockroomInfo\List\formConfig.js
 */
export const formSchema = [
  {
    // 字段名
    prop: 'Stockroom',
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Unit"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ['change', 'blur']
      }
    ]
  },
];
