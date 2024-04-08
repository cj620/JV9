import { EditTable as BaseTable } from "@/jv_doc/class/table";

export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema,
      data: [],
      title: "",
      tableHeaderShow: false,
      height: null,
      Height: 400,
      operationWidth: 80,
      chooseCol: false,
    });
  }
}

export const tableSchema = [
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
    formCpn: "FormInput",
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  {
    prop: "Device",
    label: i18n.t("production.Pr_DeviceName"),
    formCpn: "FormInput",
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  {
    prop: "TimeSpan",
    label: i18n.t("production.Pr_TimeSpan"),
    formCpn: "FormInput",
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  {
    prop: "CostRate",
    label: i18n.t("production.Pr_CostRate"),
    formCpn: "FormInput",
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  {
    prop: "MaxQuantiyUpMachine",
    label: i18n.t("production.Pr_MaximumNumberOfWorkSheet"),
    formCpn: "FormInput",
    editConfig: {
      rules: {
        required: true,
      },
    },
    type: "number",
  },
  {
    prop: "ShowInProdSchedule",
    label: i18n.t("Generality.Ge_ShowInProdSchedule"),
    custom: true,
  },
]
