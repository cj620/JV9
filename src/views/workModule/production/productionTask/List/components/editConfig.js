/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-11-30 15:34:44
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
              // 序号列
              sortCol: false,
              // 选择列
              chooseCol: false,
    });
  }
}

export const tableConfig = [
  /*原零件号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    editConfig: {
      disabled: true,
    },
  },
   /*目标零件号*/
  {
    prop: "NewPartNo",
    label: i18n.t("Generality.Ge_NewPartNo"),
    editConfig: {
      disabled: true,
    },
  },

  /*计划开始时间*/
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    formCpn: "SingleDateTime",
    filter: "time",
    editConfig:{
      rules:{
        required: true,
      },
      colInit:true
    }
  },
    /*计划结束时间*/
    {
      prop: "PlanEnd",
      label: i18n.t("Generality.Ge_PlanEnd"),
      formCpn: "SingleDateTime",
      filter: "time",
      editConfig:{
        rules:{
          required: true,
        },
        colInit:true
      }
    },
];
