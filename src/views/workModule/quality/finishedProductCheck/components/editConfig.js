/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2023-06-01 11:12:34
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { StateEnum, enumToList } from "@/enum/workModule";

export class EditTable0 extends BaseTable {
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
  {
    // 计划交期
    prop: "BatchNumber",
    label: "批次",
    formCpn: "FormInput",
  },
  /*关联编码*/
  {
    prop: "RelatedCode",
    label: "关联编码",
    editConfig: {
      disabled: true,
    },
  },
  /*  /!*生产任务明细Id*!/
  {
    prop: "TaskProcessId",
    label:'生产任务明细Id',
    editConfig:{
      disabled:true,
    }
  },*/
  /*  /!*品质状态*!/
  {
    prop: "Description",
    label:'品质状态',
    editConfig:{
      disabled:true,
    }
  },*/
  /*结果*/
  {
    prop: "CheckResult",
    label: "结果",
    formCpn: "FormSelect",
    options: {
      list: enumToList(StateEnum),
    },
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
];

export class EditTable1 extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig1,
      data: [],
      title: "",
      tableHeaderShow: false,
      chooseCol: false,
      sortCol: false,
      height: 180,
      operationWidth: 80,
      operationCol: false,
    });
  }
}

export const tableConfig1 = [
  /*物料编号*/
  {
    prop: "Type",
    label: "类别",
    editConfig: {
      disabled: true,
    },
  },

  /*Item1*/
  {
    prop: "Item1",
    label: "测量1",
    formCpn: "FormSelect",
    options: {
      list: enumToList(StateEnum),
    },
    editConfig: {
      colInit: true,
    },
  },
  /*Item2*/
  {
    prop: "Item2",
    label: "测量2",
    formCpn: "FormSelect",
    options: {
      list: enumToList(StateEnum),
    },
    editConfig: {
      colInit: true,
    },
  },

  /*Item3*/
  {
    prop: "Item3",
    label: "测量3",
    formCpn: "FormSelect",
    options: {
      list: enumToList(StateEnum),
    },
    editConfig: {
      colInit: true,
    },
  },

  /*Item4*/
  {
    prop: "Item4",
    label: "测量4",
    formCpn: "FormSelect",
    options: {
      list: enumToList(StateEnum),
    },
    editConfig:{
      colInit:true
    }
  },

  /*Item1*/
  {
    prop: "Item5",
    label: "测量5",
    formCpn: "FormSelect",
    options: {
      list: enumToList(StateEnum),
    },
    editConfig:{
      colInit:true
    }
  },
  /*Item1*/
  {
    prop: "Item6",
    label: "测量6",
    formCpn: "FormSelect",
    options: {
      list: enumToList(StateEnum),
    },
    editConfig:{
      colInit:true
    }
  },

  /*结果*/
  {
    prop: "CheckResult",
    label: "结果",
    formCpn: "FormSelect",
    options: {
      list: enumToList(StateEnum),
    },
    editConfig:{
      colInit:true
    }
  },
  /*备注*/
  {
    prop: "Remarks",
    label: "备注",
    formCpn: "FormInput",
  },
];
export class EditTable2 extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig2,
      data: [],
      title: "",
      tableHeaderShow: false,
      chooseCol: false,
      height: 350,
      operationWidth: 80,
    });
  }
}

export const tableConfig2 = [
  /*Item1*/
  {
    prop: "TheoreticalValue",
    label: "理论值",
    formCpn: "FormInput",
    type: "number",
  },
  /*上公差*/
  {
    prop: "UpperTolerance",
    label: "上公差",
    formCpn: "FormInput",
    type: "number",
  },
  /*下公差*/
  {
    prop: "LowerTolerance",
    label: "下公差",
    formCpn: "FormInput",
    type: "number",
  },
  /*Item1*/
  {
    prop: "SizeItem1",
    label: "测量1",
    formCpn: "FormInput",
    type: "number",
    editConfig:{
      colInit:true
    }
  },
  /*Item2*/
  {
    prop: "SizeItem2",
    label: "测量2",
    formCpn: "FormInput",
    type: "number",
    editConfig:{
      colInit:true
    }
  },

  /*Item3*/
  {
    prop: "SizeItem3",
    label: "测量3",
    formCpn: "FormInput",
    type: "number",
    editConfig:{
      colInit:true
    }
  },

  /*Item4*/
  {
    prop: "SizeItem4",
    label: "测量4",
    formCpn: "FormInput",
    type: "number",
    editConfig:{
      colInit:true
    }
  },

  /*Item1*/
  {
    prop: "SizeItem5",
    label: "测量5",
    formCpn: "FormInput",
    type: "number",
    editConfig:{
      colInit:true
    }
  },
  /*Item1*/
  {
    prop: "SizeItem6",
    label: "测量6",
    formCpn: "FormInput",
    type: "number",
    editConfig:{
      colInit:true
    }
  },

  /*结果*/
  {
    prop: "SizeCheckResult",
    label: "结果",
    formCpn: "FormSelect",
    options: {
      list: enumToList(StateEnum),
    },
    editConfig:{
      colInit:true
    }
  },
  /*备注*/
  {
    prop: "SizeRemarks",
    label: "备注",
    formCpn: "FormInput",
  },
];
