/*
 * @Author: your name
 * @Date: 2021-11-25 17:20:07
 * @LastEditTime: 2021-12-28 13:53:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleQuote\Detail\table.config.js
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { m_tableConfig,p_tableConfig,c_tableConfig } from "../Add/editConfig";
import { single2Double } from "../utils";
import { deepClone } from '@/jv_doc/utils/object';
export class M_Table extends BaseTable {
  constructor() {
    super({
      tableSchema: changeAmountShow(m_tableConfig),
      pagination: false,
      // sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      height: "",
      tableHeaderShow: false,
      operationCol: false,
      showSummary:true,
    });
  }
}

export class P_Table extends BaseTable {
  constructor() {
    super({
      tableSchema: single2Double(changeAmountShow(p_tableConfig)),
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      height: "",
      tableHeaderShow: false,
      operationCol: false,
      showSummary:true,
    });
  }
}
export class C_Table extends BaseTable {
  constructor() {
    super({
      tableSchema: changeAmountShow(c_tableConfig),
      pagination: false,
      // sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      height: "",
      tableHeaderShow: false,
      operationCol: false,
      showSummary:true,
    });
  }
}
function changeAmountShow(config){
  let configCopy=deepClone(config)
  configCopy.forEach((item,index) => {
      if(item.prop=='Amount'){
        configCopy[index].custom=false
      }
  });
  return configCopy
}