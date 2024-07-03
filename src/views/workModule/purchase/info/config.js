import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getPu_Requisition_Detail } from "@/api/workApi/purchase/requisition";
class api extends TableAPI {
  getData = getPu_Requisition_Detail;
}
export class NotPurchasedTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableSchema,
      formSchema: [
        {
          prop: "ItemStates",
          default: ["NotPurchased"],
          hidden: true,
        },
        ...formSchema,
      ],
      rowId: "Id",
      api,
      printMod: "Pu_NotPurchasedInfo",
      operationCol: false,
      searchBar: false,
      printBar: false,
    });
  }
}
export class PurchasedTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableSchema,
      formSchema: [
        {
          prop: "ItemStates",
          default: ["Purchased"],
          hidden: true,
        },
        ...formSchema,
      ],
      rowId: "Id",
      api,
      printMod: "Pu_NotPurchasedInfo",
      operationCol: false,
      searchBar: false,
      printBar: false,
    });
  }
}
const tableSchema = [
  /*申请单号*/
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
      routeName: "Pu_Requisition_Detail",
      methods: "query",
      parameterKey: "BillId",
    }
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    cpn: "BillStateTags",
    width: "120px",
  },
  /*计划交期*/
  {
    prop: "DeliveryDate",
    label: i18n.t("Generality.Ge_DeliveryDate"),
    filter: "date",
    width: "120px",
  },
  /*物料编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
  },
  /*物料名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
    innerSearch: {
      prop: "Keyword",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_KeyWords"),
    },
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
    innerSearch: {
      prop: "Keyword",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_KeyWords"),
    },
  },
  /*描述2*/
  {
    prop: "Description2",
    label: i18n.t("design.De_Description2"),
    innerSearch: {
      prop: "Keyword",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_KeyWords"),
    },
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
    width: "70px",
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    width: "90px",
    align: "right",
    filter: "amount",
    custom: true,
  },
  /*备注*/
  {
    prop: "ItemRemarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
]

const formSchema = [
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    cpn: "FormInput",
    hidden: true,
  },
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
    hidden: true,
  },
  {
    prop: "State",
    default: "Approved",
    hidden: true,
  },
]
