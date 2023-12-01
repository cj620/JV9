import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
import { API } from "@/api/workApi/equipment/accessoryCheckout";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { getStockroomList } from "@/api/workApi/stockroom/stockroomInfo"
import { enumToList, PickingTypeEnum1, stateEnum } from "@/enum/workModule";

let {api_list,api_delete}=API

export class api extends TableAPI {
  // 获取列表
  getData = api_list;
  // 删除单据
  del = api_delete
}

export class Table extends BaseTable {
  constructor() {
    super( {
      // 表格配置
      tableSchema: tableConfig,
      // 表单配置
      formSchema: formConfig,
      // 行标识
      rowId: 'BillId',
      // 表格标题
      title: i18n.t('menu.As_AccessoryCheckOut'),
      // 接口类
      api,
      // 操作列宽度
      operationWidth: 160,
      // 打印模块标识
      printMod:'As_AccessoryCheckOut',
    })
  }
}
export const tableConfig = [
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",
    width: '200px',
    cpnProps: {
      routeName: "As_AccessoryCheckOutDetail",
      methods: "query",
      parameterKey: "BillId",
    }
  },
  {
    // 状态
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    cpn: "BillStateTags",
    width: "115px",
  },
  {
    // 提交人
    prop: "Submitter",
    label: i18n.t("stockroom.St_Submitter"),
  },
  {
    // 仓库
    prop: "Stockroom",
    label: i18n.t("menu.St_Stockroom"),
  },
  {
    // 领料类别
    prop: "PickingType",
    label: i18n.t("stockroom.St_PickingType"),
    customFilter: (value) => {
      if (!value) return "";
      return PickingTypeEnum1[value].name;
    },
  },
  {
    // 设备编号
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo")
  },
  {
    // 制单人
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  {
    // 备注
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks")
  }
]

const formConfig = [
  {
    // 单据编号
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    cpn: "FormInput",
  },
  {
    // 状态
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    options: {
      list: enumToList(stateEnum)
    }
  },
  {
    // 提交人
    prop: "Submitter",
    label: i18n.t("stockroom.St_Submitter"),
    cpn: "SyncSelect",
    api: getAllUserData,
    apiOptions: {
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  {
    // 仓库
    prop: "Stockroom",
    label: i18n.t("menu.St_Stockroom"),
    cpn: "SyncSelect",
    api: getStockroomList,
    apiOptions: {
        immediate: true,
        keyName: "Stockroom",
        valueName: "Stockroom"
    },
  },
  {
    // 领料类别
    prop: "PickingType",
    label: i18n.t("stockroom.St_PickingType"),
    cpn: "FormSelect",
    options: {
      list: enumToList(PickingTypeEnum1)
    },
  },
  {
    // 计划开始
    prop: "StartDate",
    cpn: "SingleTime",
    label: i18n.t("Generality.Ge_StartTime"),
  },
  {
    // 计划结束
    prop: "EndDate",
    cpn: "SingleTime",
    label: i18n.t("Generality.Ge_EndTime"),
  },
]
