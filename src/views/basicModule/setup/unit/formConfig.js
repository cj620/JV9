/*
 * @Author: C.
 * @Date: 2024-05-14 08:48:29
 */
export const formSchema = [
  {
    // 字段名
    prop: "Unit",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Unit"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "UnitConvert",
    cpn: "FormInput",
    label: "转换率",
    type: "number",
    default: 1,
  },
  {
    prop: "MinAmount",
    cpn: "FormInput",
    label: "MPR运算增量",
    type: "number",
    default: 0,
  },
  {
    prop: "IsDefault",
    cpn: "FormRadio",
    label: "基本单位",
    default: false,
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
];
