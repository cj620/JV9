export const formSchema = [
  {
    // 字段名
    prop: 'Department',
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Department"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: 'blur'
      }
    ]
  },
];
