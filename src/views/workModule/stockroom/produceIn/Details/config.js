import { Table as BaseTable } from "@/jv_doc/class/table";
import stockroomTypeEnum from "@/enum/workModule/Stockroom/stockroomTypeEnum";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow:false,
    });
  }
}
export const tableConfig = [
  /*物料编号*/
  {
    prop: "ItemId",
    label:i18n.t("Generality.Ge_ItemId"),
  },
  /*名称*/
  {
    prop: "ItemName",
    label: '品名',
  },
  /*描述*/
  {
    prop: "Description",
    label:i18n.t("Generality.Ge_Describe"),
  },
  /*描述2*/
  {
    prop: "Description2",
    label: '描述2',
  },
  /*单位*/
  {
    prop: "Unit",
    label:i18n.t("Generality.Ge_Unit"),
    width:'70px',

  },
  /*数量*/
  {
    prop: "Quantity",
    label:i18n.t("Generality.Ge_Quantity"),
    formCpn: "FormInput",
    align:'right',
    type:'number',
    filter: "amount",
    width:'100px',
  },
  /*批量*/
  {
    prop: "BatchNo",
    label: '批号',
  },
  /*生产日期*/
  {
    prop: "ProductionDate",
    label: '生产日期',
    filter: "time",
  },
  /*有效期*/
  // {
  //   prop: "Effective",
  //   label: '有效期',
  // },
]
export const detailConfig=[
  /*类别*/
  {
    prop: "Category",
    label: '类别',
    customFilter(v) {
      return stockroomTypeEnum[v] ? stockroomTypeEnum[v].name : v
    }
  },
  /*仓库*/
  {
    prop: "Stockroom",
    label: '存货地点',
  },
  {
    // 提交人
    prop:'Submitter',
    label: i18n.t("stockroom.St_Submitter"),
  },
  {
    // 部门
    prop:'Department',
    label: i18n.t("Generality.Ge_Department"),
  },
  /*来源单据*/
  {
    prop: "RelationId",
    label: '来源单据',
  },
  {
    // 制单人
    prop:'Creator',
    label: i18n.t("Generality.Ge_Creator"),
  },
  {
    // 制单日期
    prop:'CreationDate',
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
  }
]
