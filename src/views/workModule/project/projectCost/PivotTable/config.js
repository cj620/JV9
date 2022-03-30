/*
 * @Author: your name
 * @Date: 2022-03-18 15:28:41
 * @LastEditTime: 2022-03-30 13:55:12
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
    caption: '任务类别',
    dataField: 'TaskType',
    width: 150,
    area: 'row',
  },
  {
    caption: '成本类别',
    dataField: 'CostType',
    width: 150,
    area: 'row',
  },
  {
    caption: '数量',
    dataField: 'Quantity',
    width: 150,
  },
  {
    caption: '模具名称',
    dataField: 'ToolingName',
    width: 150,
  },
  {
    caption: '工序',
    dataField: 'Process',
    width: 150,
    area: 'column',
  },
  {
  caption: '金额',
    dataField: 'Amount',
    dataType: 'number',
    summaryType: 'sum',
    area: 'data',
    
    customizeText: function (cellInfo) {
      // Your code goes here
      return amountFormat(cellInfo.valueText)
  }
}
]
