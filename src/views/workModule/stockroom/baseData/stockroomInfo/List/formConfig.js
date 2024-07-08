/*
 * @Author: your name
 * @Date: 2021-11-10 13:23:00
 * @LastEditTime: 2024-07-03 15:49:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\stockroom\baseData\stockroomInfo\List\formConfig.js
 */
export const formSchema = [
  {
    // 字段名
    prop: "Stockroom",
    cpn: "FormInput",
    label: i18n.t("setup.Stockroom"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
  },
  { label: "编号", cpn: "FormInput", prop: "SubjectId" },
  { label: "仓库地址", prop: "DepAddress", cpn: "FormInput" },
  { label: "仓库电话", prop: "DepTel", cpn: "FormInput" },
  { label: "仓管", prop: "DepManage", cpn: "FormInput" },
  {
    label: "使用状态",
    prop: "IsUse",
    cpn: "FormRadio",
    default: true,
    options: {
      list: [
        {
          value: true,
          label: "是",
        },
        {
          value: false,
          label: "否",
        },
      ],
    },
  },
  // { label: "默认仓库", prop: "IsDefault", cpn: "FormInput" },
  {
    label: "Mrp允许",
    prop: "MrpAllow",
    cpn: "FormRadio",
    default: true,
    options: {
      list: [
        {
          value: true,
          label: "是",
        },
        {
          value: false,
          label: "否",
        },
      ],
    },
  },
  { label: "备注", prop: "Remark", cpn: "FormInput" },
];
