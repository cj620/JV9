/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-20 18:19:06
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { getAllUnit } from "@/api/basicApi/systemSettings/unit";
export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      data: [],
      title: i18n.t("menu.De_ToolingBOM"),
      chooseCol: true,
      operationWidth: 180,
      importBar: false,
      sortCol: false,
      // sortCol:false
    });
  }
}

export const tableConfig = [
  /*图片*/
  {
    prop: "PhotoUrl",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    width: 120,
    editConfig: {
      disabled: true,
    },
    custom: true,
  },
  /*编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_ID"),
    formCpn: "FormInput",
    width: 120,
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
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
    prop: "PartName",
    label: i18n.t("Generality.Ge_ItemName"),
    formCpn: "FormInput",
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
    formCpn: "FormInput",
  },

  /*单位*/
  {
    prop: "Unit",
    formCpn: "SyncSelect",
    width: 70,
    label: i18n.t("Generality.Ge_Unit"),
    api: getAllUnit,
    apiOptions: {
      keyName: "Unit",
      valueName: "Unit",
    },
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    formCpn: "FormInput",
    align: "right",
    width: 120,
    type: "number",
    filter: "amount",
    editConfig: {
      rules: {
        // 是否必填项
        required: true,
        // 提示信息
        message: i18n.t("Generality.Ge_QuantityShouldBeGreaterThan"),
        // 自定义校验 返回bool值
        validate: (val) => {
          return val > 0;
        },
      },
      colInit: true,
    },
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
    width: 80,
  },
  /*级别*/
  {
    prop: "PartLevel",
    label: i18n.t("Generality.Ge_Level"),
    custom: true,
    width: 70,
    editConfig: {
      disabled: true,
    },
  },
  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
    formCpn: "FormInput",
    width: 80,
    editConfig: {
      disabled: true,
    },
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width: 140,
    editConfig: {
      disabled: true,
    },
  },
];
