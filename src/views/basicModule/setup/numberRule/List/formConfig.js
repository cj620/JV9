/*
 * @Author: H.
 * @Date: 2021-12-21 14:16:47
 * @LastEditTime: 2022-01-25 14:15:45
 * @Description:
 */
export const formSchema = [
  {
    prop: "BillKey",
    label: i18n.t("menu.Se_CodeRule"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["blur"],
      },
    ],
  },
  {
    prop: "BillName",
    label: i18n.t("Generality.Ge_DocumentName"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["blur"],
      },
    ],
  },
  {
    prop: "Prefixstring",
    label: i18n.t("Generality.Ge_PrefixCharacter"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["blur"],
      },
    ],
  },
  {
    prop: "StSpace",
    label: i18n.t("Generality.Ge_FirstSpacer"),
    cpn: "FormInput",
  },
  {
    prop: "DateFormat",
    label: i18n.t("Generality.Ge_DateFormat"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "yyyyMMdd",
          label: "yyyyMMdd",
        },
        {
          value: "yyMMdd",
          label: "yyMMdd",
        },
      ],
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["blur"],
      },
    ],
  },
  {
    prop: "NdSpace",
    label: i18n.t("Generality.Ge_SecondSpacer"),
    cpn: "FormInput",
  },

  {
    prop: "IncrementFormat",
    label: i18n.t("Generality.Ge_SelfIncreasing"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "000",
          label: "3",
        },
        {
          value: "0000",
          label: "4",
        },
        {
          value: "00000",
          label: "5",
        },
        {
          value: "000000",
          label: "6",
        },
      ],
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["blur"],
      },
    ],
  },
];
