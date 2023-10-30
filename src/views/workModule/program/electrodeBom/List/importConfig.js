/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-03-21 14:27:35
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { getAllUnit } from "@/api/basicApi/systemSettings/unit";
export class importEditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      data: [],
      title: i18n.t("menu.De_ToolingBOM"),
      chooseCol: true,
      operationWidth: 180,
      importBar: false,
      tableHeaderShow:false,

      sortCol: false,
      // sortCol:false
    });
  }
}

export const tableConfig = [

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
  {
    // 电极关联零件
    prop: "AssociationPartNo",
    label: i18n.t("program.Pr_AssociationPartNo"),
    formCpn: "FormInput",
  },
  {
    //材质（精）
    prop: "ElectrodeDescription1",
    label: i18n.t("program.Pr_ElectrodeDescription1"),
    formCpn: "FormInput",
  },
  {
    //材质（粗）
    prop: "ElectrodeDescription2",
    label: i18n.t("program.Pr_ElectrodeDescription2"),
    formCpn: "FormInput",
  },
  {
    //材质（中）
    prop: "ElectrodeDescription3",
    label: i18n.t("program.Pr_ElectrodeDescription3"),
    formCpn: "FormInput",
  },
  {
    //数量（精）
    prop: "ElectrodeQuantitySeiko",
    label: "数量(精)",
    formCpn: "FormInput",
  },
  {
    //数量（粗）
    prop: "ElectrodeQuantityRoughWork",
    label: "数量(粗)",
    formCpn: "FormInput",
  },
  {
    //数量（中）
    prop: "ElectrodeQuantityMiddleFinish",
    label: "数量(中)",
    formCpn: "FormInput",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
    width: 80,
  },



];
