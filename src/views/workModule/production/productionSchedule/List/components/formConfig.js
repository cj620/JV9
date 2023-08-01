export const formSchema = [
  {
    prop: "StartDate",
    label: i18n.t("production.Pr_StartScheduleTime"),
    cpn: "SingleTime",
    rules: [
      {
        required: true,
        message: i18n.t(""),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // prop/value待确定
    prop: "CalculateMethods",
    label: i18n.t("production.Pr_SchedulingAlgorithmSelection"),
    cpn: "FormCheckBox",
    type: "button",
    rules: [
      {
        required: true,
        message: i18n.t(""),
        trigger: ["change", "blur"],
      },
    ],
    options: {
      list: [
        {
          value: 0,
          label: i18n.t("production.Pr_ConventionalAlgorithm"),
        },
        {
          value: 1,
          label: i18n.t("production.Pr_CRValueScheduling"),
        },
        {
          value: 2,
          label: i18n.t("production.Pr_ShortestDurationAlgorithm"),
        },
        {
          value: 3,
          label: i18n.t("production.Pr_AlgorithmForEarliestDeliveryTime"),
        },
      ],
    },
  },
];
