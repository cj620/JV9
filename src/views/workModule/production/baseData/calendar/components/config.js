/*
 * @Author: H.
 * @Date: 2021-11-30 09:52:12
 * @LastEditTime: 2022-01-12 14:28:46
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getAllDevice } from "@/api/workApi/production/baseData";

export class api extends TableAPI {
  getData = getAllDevice;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: "",
      api,
      operationWidth: 110,
      pagination: false,
      tableHeaderShow: false,
      // 设置按钮
      settingBar: false,
      // 刷新按钮
      freshBar: false,
      // 密度按钮
      densityBar: false,
      // 列设置按钮
      colBar: false,
      // 导出按钮
      exportBar: false,
      // 搜索按钮
      searchBar: false,

      // 打印按钮
      printBar: false,
      operationCol: false,
      height: 500,
    });
  }
}

export const tableConfig = [
  /*设备名称*/
  {
    prop: "Device",
    label: i18n.t("production.Pr_DeviceName"),
  },
];

export const formSchema = [];
