export const formSchema = [
  {
    prop: "PlanDevice",
    custom: true,
    label: i18n.t('production.Pr_Device'),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "PlanStart",
    cpn: "SingleDateTime",
    label: i18n.t("Generality.Ge_PlanStart"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "PlanEnd",
    cpn: "SingleDateTime",
    label: i18n.t("Generality.Ge_PlanEnd"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
];
