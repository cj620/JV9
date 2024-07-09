// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { API } from "@/api/workApi/production/partProductionDemand";
let { api_delete, api_list } = API;
class api extends TableAPI {
  // 获取列表
  getData = api_list;
  // 删除单据
  del = api_delete;
}
export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableConfig,
      // 表单配置
      formSchema,
      // 行标识
      rowId: "BillId",
      // 表格标题
      title: i18n.t("menu.Pr_PartProductionDemand"),
      // 接口类
      api,
      // 操作列宽度
      operationWidth: 150,
      // 打印模块标识
      printMod: "Pr_PartProductionDemand",
    });
  }
}
export const tableConfig = [
  /*图片*/
  {
    prop: "PhotoUrl",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    cpn: "Image",
    width: "100px",
    cpnProps: {
      //Image的props与element的el-image一直 按需配置
      // fit:'scale-down'
      // 宽高默认 38px
    },
  },
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",
    width: "180px",
    cpnProps: {
      // 路由名称
      routeName: "Pr_PartProductionDemand_Detail",
      // 路由路径（名称和路径二选一）
      // routePath:'/project/pm_TrialTask_Detail',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
    },
  },
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: "180px",
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    custom: true,
    width: "115px",
  },
  { label: "需求日期", prop: "DemandDate", filter: "date" },
  { label: "需求类别", prop: "DemandType" },
  { label: "相关单据", prop: "PmTaskBillId" },
  { label: "审核人", prop: "Audit" },
  { label: "审核日期", prop: "AuditDate", filter: "time" },
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
];
export const formSchema = [
  //单号搜索
  {
    prop: "BillId",
    label: "单号",
    cpn: "FormInput",
  },
  {
    prop: "StartDate",
    label:
      i18n.t("Generality.Ge_DeliveryDate") +
      " " +
      i18n.t("Generality.Ge_StartTime"),
    cpn: "SingleTime",
  },
  {
    prop: "EndDate",
    label:
      i18n.t("Generality.Ge_DeliveryDate") +
      " " +
      i18n.t("Generality.Ge_EndTime"),
    cpn: "SingleTime",
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
];
