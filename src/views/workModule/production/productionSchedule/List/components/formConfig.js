export const formSchema = [
  {
    prop: "StartDate",
    label: "开始排程时间",
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
    prop: "CalculateMethods",
    label: "排程算法选择",
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
          label: "经典算法",
        },
        {
          value: 1,
          label: "CR值排程",
        },
        {
          value: 2,
          label: "最短工期",
        },
        {
          value: 3,
          label: "最早交货期",
        },
      ],
    },
  },
];
