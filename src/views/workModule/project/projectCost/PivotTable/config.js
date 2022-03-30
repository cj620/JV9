/*
 * @Author: your name
 * @Date: 2022-03-18 15:28:41
 * @LastEditTime: 2022-03-30 18:04:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /jv-mms-v9-front/src/views/workModule/project/projectCost/PivotTable/config.js
 */
import i18n from "@/i18n/i18n.js";
import { amountFormat } from "@/jv_doc/utils/handleData/index";


export const config = [ {
  caption:i18n.t("Generality.Ge_Tooling"),
    dataField: 'ToolingNo',
    width: 150,
    area: 'row',
},
  {
    caption:i18n.t("project.Pro_TaskSheetNo"),
    dataField: 'BillId',
    width: 150,
    area: 'row',
  },
  {
    caption:i18n.t("Generality.Ge_TaskType"),
    dataField: 'TaskType',
    width: 150,
    area: 'row',
  },
  {
    caption:i18n.t("Generality.Ge_CostType"),
    dataField: 'CostType',
    width: 150,
    area: 'row',
  },
  {
    caption:i18n.t("Generality.Ge_Quantity"),
    dataField: 'Quantity',
    width: 150,
  },
  {
    caption:i18n.t("Generality.Ge_ToolingName"),
    dataField: 'ToolingName',
    width: 150,
  },
  {
    caption:i18n.t("Generality.Ge_Process"),
    dataField: 'Process',
    width: 150,
    area: 'column',
  },
  {
    caption:i18n.t("Generality.Ge_Amount"),
    dataField: 'Amount',
    dataType: 'number',
    summaryType: 'sum',
    area: 'data',
    
    customizeText: function (cellInfo) {
      console.log(cellInfo);
      // Your code goes here
      return amountFormat(cellInfo.value?cellInfo.value:0)
  }
}
]
