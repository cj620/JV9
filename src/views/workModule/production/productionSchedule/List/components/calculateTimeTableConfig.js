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
        // 经典算法
        {
          value: 0,
          label: i18n.t("production.Pr_ClassicalAlgorithm"),
        },
        // 最短工期
        {
          value: 1,
          label: i18n.t("production.Pr_MinimumWorkingPeriod"),
        },
        // 最早交货期
        {
          value: 2,
          label: i18n.t("production.Pr_EarliestDeliveryDate"),
        },
        // CR值排程
        {
          value: 3,
          label: i18n.t("production.Pr_CR"),
        },
      ],
    },
  },
];
