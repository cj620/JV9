export const formSchema = [
  {
    prop: "StartDate",
    label: i18n.t("production.Pr_StartScheduleTime"),
    cpn: "SingleTime",
    rules: [
      {
        required: true,
        message: i18n.t("production.Pr_PleaseSelectStartScheduleTime"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // prop/value待确定
    prop: "SchedulingType",
    label: i18n.t("production.Pr_SchedulingAlgorithmSelection"),
    cpn: "FormRadio",
    default: 0,
    options: {
      list: [
        {
          value: 0,
          label: i18n.t("production.Pr_ClassicalAlgorithm"),
        },
        {
          value: 1,
          label: i18n.t("production.Pr_CR"),
        },
        {
          value: 2,
          label: i18n.t("production.Pr_MinimumWorkingPeriod"),
        },
        {
          value: 3,
          label: i18n.t("production.Pr_EarliestDeliveryDate"),
        },
      ],
    },
  },
];
