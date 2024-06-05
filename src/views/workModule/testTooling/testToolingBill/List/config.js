import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { API, trial_tooling_list } from "@/api/workApi/project/projectTask";
import { itemList } from "@/api/basicApi/systemSettings/Item";
let { api_delete } = API;
class api extends TableAPI {
  // 获取列表
  getData = trial_tooling_list;
  // 删除单据
  del = api_delete;
}
export class Table extends BaseTable {
  constructor() {
    super(
      {
        tableSchema: tableConfig,
        formSchema,
        rowId: "BillId",
        title: i18n.t("menu.Tt_TestToolingBill"),
        api,
        operationWidth: 150,
        printMod: "TestToolingTask",
      }
    );
  }
}
export const tableConfig = [
  /*图片*/
  {
    prop: "PhotoUrl",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    cpn: "Image",
    width: "60px",
  },
  {
    prop: "BillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
    align: "center",
    cpn: "Link",
    cpnProps: {
      routeName: "Pm_TrialTask_Detail",
      methods: "query",
      parameterKey: "BillId",
    },
  },
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    custom: true,
    width: "115px",
  },
  // /*计划开始*/
  // {
  //   prop: "PlanStart",
  //   label: i18n.t("Generality.Ge_PlanStart"),
  //   filter: "date",
  //   width: "120px",
  // },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "date",
    width: "120px",
  },
  /*试模机台*/
  {
    prop: "TestMouldMachine",
    label: i18n.t("project.Pro_TestMouldMachine"),
  },
  /*试模原因*/
  {
    prop: "TestMouldReason",
    label: i18n.t("project.Pro_TestMouldReason"),
  },
  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
    width: "95px",
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width: "150px",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
]
export const formSchema = [
  //单号搜索
  {
    prop: "Project",
    label: i18n.t("menu.Pm_Project"),
    cpn: "FormInput",
  },
  //单号搜索
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "AsyncSearch",
    api: itemList,
    apiOptions: {
      keyName: "ItemName",
      showValue: true,
      valueName: "ItemId",
      params: {
        ItemCategory: "Tooling",
      },
    },
  },
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_DeliveryDate")+' '+ i18n.t("Generality.Ge_StartTime"),
    cpn: "SingleTime"
  },
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_DeliveryDate")+' '+ i18n.t("Generality.Ge_EndTime"),
    cpn: "SingleTime"
  },
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "Unsubmitted",
          label: i18n.t("Generality.Ge_UnSubmitted"),
        },
        {
          value: "Submitted",
          label: i18n.t("Generality.Ge_Submitted"),
        },
        {
          value: "Approving",
          label: i18n.t("Generality.Ge_Approving"),
        },
        {
          value: "Approved",
          label: i18n.t("Generality.Ge_Approved"),
        },
        {
          value: "Rejected",
          label: i18n.t("Generality.Ge_Rejected"),
        },
        {
          value: "Completed",
          label: i18n.t("Generality.Ge_Completed"),
        },
        {
          value: "Discarded",
          label: i18n.t("Generality.Ge_Discarded"),
        },
      ],
    },
  },
  {
    prop: "SortType",
    label: i18n.t("Generality.Ge_SortType"),
    cpn: "FormRadio",
    default: "CreationDateOrder",
    options: {
      list: [
        {
          value: "DeliveryDateOrder",
          label: i18n.t("Generality.Ge_SortByDeliveryDate"),
        },
        {
          value: "CreationDateOrder",
          label: i18n.t("Generality.Ge_SortByCreationDate"),
        },
      ],
    },
  },
  {
    prop: "IncludingCompleted",
    label: i18n.t("Generality.Ge_IncludingCompleted"),
    cpn: "FormRadio",
    default: 'False',
    options: {
      list: [
        {
          value: "True",
          label: i18n.t("Generality.Ge_Yes"),
        },
        {
          value: "False",
          label: i18n.t("Generality.Ge_No"),
        },
      ],
    },
  },
];

