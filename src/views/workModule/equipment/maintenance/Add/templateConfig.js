/*
 * @Author: your name
 * @Date: 2021-11-12 15:34:15
 * @LastEditTime: 2022-03-25 13:46:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\stockroom\otherIn\List\config.js
 */
/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-11-09 09:28:46
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'

import { API } from "@/api/workApi/equipment/maintenance_tpl";
let {api_list}=API
export class api extends TableAPI {
  getData = api_list;
}

export class Table extends BaseTable {
  constructor() {
    super( {
      tableSchema: tableConfig,
      formSchema,
      rowId: 'Id',
      title: i18n.t("menu.Pm_Estimate"),
      api,
      tableHeaderShow: false,
      height: "400",
      selectType: "radio",
      exportBar: false,
      searchBar: true,
      stripe: false,
      operationCol: false,
      sortCol: false,
    })
  }
}

export const tableConfig = [


  /*名称*/
  {
    prop: "TemplateName",
    label: i18n.t("Generality.Ge_TemplateName"),
  },

  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
]
export const formSchema = [


]
