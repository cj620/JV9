/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-11-02 15:50:53
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
    editConfig: {
      disabled: true,
    },
  },
  /*描述2*/
  {
    prop: "Description2",
    label: i18n.t("design.De_Description2"),
    editConfig: {
      disabled: true,
    },
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
    type: "number",
    width: "100px",
    filter: "amount",
  },
  /*批号*/
  {
    prop: "BatchNo",
    label: '批号',
    align: "right",
    width: "100px",
    formCpn: "FormInput",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
  },
];
