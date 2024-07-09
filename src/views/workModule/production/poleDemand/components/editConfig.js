/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2024-07-09 16:24:23
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";

export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      data: [],
      title: "",
      tableHeaderShow: false,
      height: 350,
      operationWidth: 80,
    });
  }
}

export const tableConfig = [
  /*物料编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
    editConfig: {
      disabled: true,
    },
  },
  /*名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
    editConfig: {
      disabled: true,
    },
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
    formCpn: "FormInput",
  },
  /*描述2*/
  {
    prop: "Description2",
    label: i18n.t("design.De_Description2"),
    formCpn: "FormInput",
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
    width: "70px",
    editConfig: {
      disabled: true,
    },
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    formCpn: "FormInput",
    align: "right",
    width: "100px",
    type: "number",
    filter: "amount",
  },
  {
    //数量（精）
    prop: "ProductionSeiko",
    label: "生产精工",
    formCpn: "FormInput",
    align: "right",
    width: 120,
    type: "number",
    filter: "amount",
  },
  {
    //数量（粗）
    prop: "ProductionRoughWorker",
    label: "生产粗工",
    formCpn: "FormInput",
    align: "right",
    width: 120,
    type: "number",
    filter: "amount",
  },
  {
    //数量（中）
    prop: "ProductionZhonggong",
    label: "生产中工",
    formCpn: "FormInput",
    align: "right",
    width: 120,
    type: "number",
    filter: "amount",
  },
  /*需求日期*/
  // {
  //   prop: "DemandDate",
  //   label: i18n.t("Generality.Ge_DemandDate"),
  //   formCpn: "SingleTime",
  //   filter: "date",
  //   width: "155px",
  //   editConfig: {
  //     rules: {
  //       required: true,
  //     },
  //     colInit: true,
  //   },
  // },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
  },
];
