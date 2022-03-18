export const formSchema = [
  {
    // 字段名
    prop: 'Unit',
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
