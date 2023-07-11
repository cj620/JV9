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
  enumFilter,
} from "@/enum/workModule";

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
    custom: true,
  },
  {
    // 需求单
    prop: "PrDemandBillId",
    label: "需求单",
  },
  {
    // 计划交期
    prop: "DeliveryDate",
    label: i18n.t("Generality.Ge_DeliveryDate"),
    filter: "time",
  },
  {
    // 处理结果
    prop: "ProcessingResult",
    label: "检测结果",
    customFilter: (value, row) => {
      if (!value) return "";
      return ProcessingResult?.[value]?.name ?? value;
    },
  },
  {
    // 返工工序
    prop: "ReworkProcess",
    label: "返工工序",
  },
  {
    // 负责人
    prop: "PersonInCharge",
    label: "负责人",
  },
  {
    // 不合格原因
    prop: "AbnormalCause",
    label: "不合格原因",
  },
  {
    prop: "AbnormalCauseItem",
    label: "不合格原因子项",
  },
  {
    prop: "FinishedProductCheckType",
    label: "检验类型",
    customFilter: (value, row) => enumFilter(value, FinishedProductCheckType),
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
          label: i18n.t("Generality.Ge_Unsubmitted"),
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
];
