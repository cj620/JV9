/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-11-29 13:45:18
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { API } from "@/api/workApi/quality/finishedProduct";
import {
  ProcessingResult,
  FinishedProductCheckType,
  enumFilter, AbnormalCategoryEnum, enumToList,
} from "@/enum/workModule";
import {itemList} from "@/api/basicApi/systemSettings/Item";

let { api_list, api_delete } = API;
export class api extends TableAPI {
  getData = api_list;
  // 删除单据
  del = api_delete;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      title: i18n.t("menu.Qc_FinishedProduct"),
      api,
      operationWidth: 110,
      // 打印模板标识 谨慎删除
      printMod: "Qc_FinishedProduct",
    });
  }
}

export const tableConfig = [
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",
    width: "150px",
    innerSearch: {
      prop: "BillId",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_BillId"),
    },
    cpnProps: {
      // 路由名称
      routeName: "Qc_FinishedProduct_Detail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
      // 补充动态参数
      moreDynamicParameters: [
        {
          keyName: "ItemId",
          valueName: "ItemId",
        },
      ],
    },
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    width: "115px",
    custom: true,
  },
  {
    // 模具编号
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: "130px",
  },
  {
    // 零件编号
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    width: "130px",
  },
  {
    // 加工单
    prop: "PrTaskBillId",
    label: i18n.t("Generality.Ge_PrTaskBillId"),
    cpn: "Link",
    width: "130px",
    cpnProps: {
      routeName: "ProductionTaskDetails",
      methods: "query",
      parameterKey: "BillId",
    },
  },
  {
    // 返工工序
    prop: "ReworkProcess",
    label: i18n.t("quality.Qc_ReworkProcess"),
  },
  {
    // 检测结果
    prop: "ProcessingResult",
    label: i18n.t("quality.Qc_CheckResult"),
    customFilter: (value, row) => {
      if (!value) return "";
      return ProcessingResult?.[value]?.name ?? value;
    },
  },
  {
    // 负责人
    prop: "PersonInCharge",
    label: i18n.t("project.Pro_Worker"),
  },
  {
    // 不合格原因
    prop: "AbnormalCause",
    label: i18n.t("quality.Qc_AbnormalCause"),
  },
  {
    prop: "Analyst",
    label: i18n.t("quality.Qc_AbnormalCauseAnalyst"),
  },
  {
    prop: "SubmittedForInspectionQty",
    label: i18n.t("quality.Qc_SubmittedForInspectionQty"),
  },
  {
    // 检验数量
    prop: "InspectionQty",
    label: i18n.t("quality.Qc_InspectionQty"),
  },
  {
    // 不合格数量
    prop: "UnqualifiedQty",
    label: i18n.t("quality.Qc_UnqualifiedQty"),
  },
  {
    // 异常类别
    prop: "AbnormalCategory",
    label: i18n.t("quality.Qc_AbnormalCategory"),
    customFilter: (value, row) => enumFilter(value, AbnormalCategoryEnum),
  },
  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
  },
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
export const formSchema = [
  {
    prop: "BillId",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_BillId"),
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
  //模具搜索
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "AsyncSearch",
    api: itemList,
    apiOptions: {
      keyName: "ItemName",
      valueName: "ItemId",
      params:{
        ItemCategory:'Tooling'
      }
    },
  },
  //零件编号
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    cpn: "FormInput",
  },
  {
    prop: "ProcessingResult",
    label: i18n.t("quality.Qc_CheckResult"),
    cpn: "FormSelect",
    options: {
      list: enumToList(ProcessingResult),
    },
  },
];
