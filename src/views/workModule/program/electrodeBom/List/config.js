/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2024-07-11 09:19:35
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { getAllUnit } from "@/api/basicApi/systemSettings/unit";
export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      data: [],
      title: i18n.t("menu.Pa_ElectrodeBom"),
      chooseCol: true,
      operationWidth: 160,
      importBar: false,
      sortCol: false,
      tid: "Pa_ElectrodeBom",
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
  // /*描述2*/
  // {
  //   prop: "Description2",
  //   label: i18n.t("design.De_Description2"),
  //   formCpn: "FormInput",
  // },
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
  {
    //材质（精）
    prop: "ElectrodeDescription1",
    label: i18n.t("program.Pr_ElectrodeDescription1"),
    formCpn: "FormInput",
  },
  {
    //材质（精）
    prop: "ElectrodeDescription2",
    label: i18n.t("program.Pr_ElectrodeDescription2"),
    formCpn: "FormInput",
  },
  {
    //材质（精）
    prop: "ElectrodeDescription3",
    label: i18n.t("program.Pr_ElectrodeDescription3"),
    formCpn: "FormInput",
  },
  {
    //数量（精）
    prop: "ElectrodeQuantitySeiko",
    label: i18n.t("program.Pr_ElectrodeQuantitySeiko"),
    formCpn: "FormInput",
    align: "right",
    width: 120,
    type: "number",
    filter: "amount",
  },
  {
    //数量（粗）
    prop: "ElectrodeQuantityRoughWork",
    label: i18n.t("program.Pr_ElectrodeQuantityRoughWork"),
    formCpn: "FormInput",
    align: "right",
    width: 120,
    type: "number",
    filter: "amount",
  },
  {
    //数量（中）
    prop: "ElectrodeQuantityMiddleFinish",
    label: i18n.t("program.Pr_ElectrodeQuantityMiddleFinish"),
    formCpn: "FormInput",
    align: "right",
    width: 120,
    type: "number",
    filter: "amount",
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
    width: 80,
    editConfig: {
      disabled: true,
    },
  },
  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
    formCpn: "FormInput",
    width: 100,
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
  /*物料需求状态*/
  {
    prop: "MaterialRequirementState",
    label: i18n.t("Generality.Ge_MaterialRequirementState"),
    width: 140,
    custom: true,
    sortable: true,
    editConfig: {
      disabled: true,
    },
  },
  {
    prop: "AssociationPartNo",
    label: i18n.t("program.Pr_AssociationPartNo"),
    editConfig: {
      disabled: true,
    },
  },
  {
    label: "物料需求",
    prop: "MaterialsDemand",
    formCpn: "FormInput",
    type: "number",
  },
  {
    label: "精工需求",
    prop: "ProduceDemand",
    formCpn: "FormInput",
    type: "number",
  },
  {
    label: "粗工需求",
    prop: "ProduceDemandA",
    formCpn: "FormInput",
    type: "number",
  },
  {
    label: "中工需求",
    prop: "ProduceDemandB",
    formCpn: "FormInput",
    type: "number",
  },
  { label: "类别", prop: "ResType", formCpn: "FormInput" },
];
