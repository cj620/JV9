import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { getAllResource } from "@/api/workApi/production/baseData";

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
    });
  }
}

export const tableSchema = [
  {
    label: i18n.t("Generality.Ge_Process"),
    prop: "Process",
    formCpn: "FormInput",
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  {
    prop: "ProcessCode",
    label: i18n.t("production.Pr_ProcessCode"),
    formCpn: "FormInput",
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  {
    prop: "Department",
    label: i18n.t("Generality.Ge_Department"),
    formCpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      tree: true,
      treeProps: {
        children: "Children",
        keyName: "Department",
        valueName: "Department",
      },
    },
  },
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_TaskContent"),
    formCpn: "FormInput",
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  {
    prop: "Resource",
    label: i18n.t("menu.Pr_Resources"),
    formCpn: "SyncSelect",
    api: getAllResource,
    apiOptions: {
      keyName: "Resource",
      valueName: "ResourceId",
    },
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  {
    prop: "LeadTimeOfProcess",
    label: i18n.t("Generality.Ge_LeadTimeOfProcess"),
    formCpn: "FormInput",
    type: "number",
  },
  {
    prop: "PostTimeOfProcess",
    label: i18n.t("Generality.Ge_PostTimeOfProcess"),
    formCpn: "FormInput",
    type: "number",
  },
  {
    prop: "IsOutsourced",
    label: i18n.t("production.Pr_IsOutsourced"),
    custom: true,
  },
  {
    prop: "IsCompulsoryInspection",
    label: i18n.t("setup.IsCompulsoryInspection"),
    custom: true,
  },
  {
    prop: "ProgramingProcess",
    label: i18n.t("production.Pr_ProgramingProcess"),
    formCpn: "FormInput",
  }
]
