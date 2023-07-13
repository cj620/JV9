/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-11-29 13:45:06
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// 引入模块API接口
import {
  qc_process_check_list,
  qc_process_check_delete,
} from "@/api/workApi/quality/processCheck";
import {
  ProcessingResult,
  ProcessCheckTypeEnum,
  enumToList,
  enumFilter,
} from "@/enum/workModule";

import { getAllUserData } from "@/api/basicApi/systemSettings/user";

// 结构
export class api extends TableAPI {
  // 获取列表
  getData = qc_process_check_list;
  // 删除单据
  del = qc_process_check_delete;
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
      title: i18n.t("menu.Qc_ProcessCheck"),
      // 接口类
      api,
      // 操作列宽度
      operationWidth: 110,
      // 打印模块标识
      printMod: "Qc_ProcessCheck",
    });
  }
}
//  表格配置
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
      routeName: "Qc_ProcessCheck_Detail",
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
    width: "115px",
  },
  /*加工单*/
  {
    prop: "PrTaskBillId",
    label: i18n.t("production.Pr_WorkSheetNo"),
  },
  {
    // 零件编号
    prop: "ItemId",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  {
    // 自检工序
    prop: "SelfCheckProcess",
    label: "自检工序",
  },
  {
    // 检验类型
    prop: "ProcessCheckType",
    label: "检验类型",
    customFilter: (value, row) => enumFilter(value, ProcessCheckTypeEnum),
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
    // 检验人
    prop: "Operator",
    label: i18n.t("quality.Qc_Operator"),
  },
  {
    // 检验日期
    prop: "OperationDate",
    label: i18n.t("quality.Qc_CheckDate"),
    filter: "date",
    width: "150px",
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
    prop: "SubmittedForInspectionQty",
    label: "送检数量",
  },
  {
    // 检验数量
    prop: "InspectionQty",
    label: "检验数量",
  },
  {
    // 不合格数量
    prop: "UnqualifiedQty",
    label: "不合格数量",
  },
  {
    // 关联编号
    prop: "AssociatedNo",
    label: "关联编号",
  },
  {
    // 制单人
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width: "150px",
  },
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
// 表单配置
export const formSchema = [
  //单号搜索
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    cpn: "FormInput",
  },
  //零件编号
  {
    prop: "ItemId",
    label: "零件编号",
    cpn: "FormInput",
  },
  //操作人
  {
    prop: "Operator",
    label: "操作人",
    cpn: "SyncSelect",
    api: getAllUserData,
    apiOptions: {
      immediate: true,
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  //检测结果
  {
    prop: "ProcessCheckType",
    label: "检验类型",
    cpn: "FormSelect",
    options: {
      list: enumToList(ProcessCheckTypeEnum),
    },
  },
  //检测结果
  {
    prop: "ProcessingResult",
    label: "检测结果",
    cpn: "FormSelect",
    options: {
      list: enumToList(ProcessingResult),
    },
  },
  //加工单号
  {
    prop: "PrTaskBillId",
    label: "加工单号",
    cpn: "FormInput",
  },
  {
    prop: "StartDate",
    label: "开始时间",
    cpn: "SingleTime",
  },
  {
    prop: "EndDate",
    label: "结束时间",
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
