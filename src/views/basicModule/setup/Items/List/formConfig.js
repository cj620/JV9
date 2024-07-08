/*
 * @Author: C.
 * @Date: 2024-05-14 08:48:29
 */
export const formSchema = [
  {
    // 字段名
    prop: "ItemType",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_ItemType"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: "blur",
      },
    ],
  },
  { label: "物料类别编号", prop: "TypeId", cpn: "FormInput" },
];
