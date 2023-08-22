export const formSchema = [
  // {
  //   // 提交人
  //   prop: "Submitter",
  //   cpn: "SyncSelect",
  //   label: i18n.t("stockroom.St_Submitter"),
  //   custom: true,
  //   apiOptions: {
  //     immediate: true,
  //     keyName: "UserName",
  //     valueName: "UserName",
  //   },
  //   rules: [
  //     {
  //       required: true,
  //       message: i18n.t("Generality.Ge_PleaseEnter"),
  //       trigger: ["change", "blur"],
  //     },
  //   ],
  // },
  // {
  //   // 部门
  //   prop: "Department",
  //   label: i18n.t("Generality.Ge_Department"),
  //   cpn: "FormInput",
  //   cpnProps: {
  //     disabled: true,
  //   },
  // },
  {
    prop: "EndDate",
    cpn: "SingleDateTime",
    label: "结束日期",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Title",
    cpn: "FormInput",
    label: "标题",
    rules: [
        {
          required: true,
          message: i18n.t("Generality.Ge_PleaseEnter"),
          trigger: ["change", "blur"],
        },
      ],
  },
//   {
//     // 计划交期
//     prop: "DeliveryDate",
//     cpn: "SingleTime",
//     label: i18n.t("Generality.Ge_DeliveryDate"),
//     rules: [
//       {
//         required: true,
//         message: i18n.t("Generality.Ge_PleaseEnter"),
//         trigger: ["change", "blur"],
//       },
//     ],
//   },
];
