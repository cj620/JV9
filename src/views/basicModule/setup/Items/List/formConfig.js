export const formSchema = [
  {
    // 字段名
    prop: 'ItemType',
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_ItemType"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: 'blur'
      }
    ]
  },
];
