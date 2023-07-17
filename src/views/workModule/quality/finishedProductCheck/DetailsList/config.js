/*
 * @Author: C.
 * @Date: 2022-02-22 16:21:55
 * @LastEditTime: 2022-02-25 17:04:19
 * @Description: file content
 */
//销售订单明细 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { get_qc_finished_product_item_list } from "@/api/workApi/quality/finishedProduct";
import { ProcessingResult, enumToList } from "@/enum/workModule";
import { itemList } from "@/api/basicApi/systemSettings/Item";
class api extends TableAPI {
  // 获取列表
  getData = get_qc_finished_product_item_list;
}
export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableSchema,
      // 表单配置
      formSchema: formSchema,
      // 行标识
      rowId: "Id",
      // 表格标题
      title:
        i18n.t("menu.Qc_FinishedProduct") +
        "   " +
        i18n.t("Generality.Ge_Details1"),
      // 接口类
      api,
      // 打印模块标识
      printMod: "Qc_FinishedProduct_Detail_list",
      operationCol: false,
      printBar: false,
    });
  }
}
//  表格配置
const tableSchema = [
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",
    width: "140px",
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
    width: "120px",
    align: "center",
  },
  {
    // 加工单
    prop: "PrTaskBillId",
    label: i18n.t("Generality.Ge_PrTaskBillId"),
    width: "120px",
  },
  {
    // 制单日期
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width: "150px",
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
    // 返工工序
    prop: "ReworkProcess",
    label: i18n.t("quality.Qc_ReworkProcess"),
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
  /*物料编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
  },
  /*名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
  },

  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },

  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    formCpn: "FormInput",
    align: "right",
    type: "number",
    filter: "amount",
    width: "100px",
  },
];
//  搜索表单配置
const formSchema = [
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
  {
    prop: "BillId",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_BillId"),
  },

  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_PartNo"),
    cpn: "AsyncSearch",
    api: itemList,
    apiOptions: {
      keyName: "ItemName",
      descriptionOnly: true,
      valueName: "ItemId",
      params: {
        ItemCategory: "Part",
      },
    },
  },
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartDate"),
    cpn: "SingleTime",
  },
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_EndDate"),
    cpn: "SingleTime",
  },
  // QueryAll
];
