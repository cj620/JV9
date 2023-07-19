/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2022-06-03 13:29:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */

export const formSchema = [

  //设备名称
  {
    prop: "TemplateName",
    label: '名称',
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  //设备描述
  {
    prop: "Description",
    label: '描述',
    cpn: "FormInput",
    // rules: [
    //   {
    //     required: true,
    //     message: i18n.t("Generality.Ge_PleaseSelect"),
    //     trigger: ["change", "blur"],
    //   },
    // ],
  },
];
