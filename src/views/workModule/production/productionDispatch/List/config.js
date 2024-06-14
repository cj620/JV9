/*
 * @Author: H.
 * @Date: 2021-11-18 15:08:18
 * @LastEditTime: 2022-01-21 15:46:26
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { production_device_list } from "@/api/workApi/production/baseData";
import { production_dispatching_list } from "@/api/workApi/production/productionDispatch";
import {
  getAllResource,
  getAllProcess,
} from "@/api/workApi/production/baseData";
export class M_api extends TableAPI {
  getData = production_device_list;
}
export class M_Table extends BaseTable {
  constructor() {
    super({
      tableSchema: [],
      formSchema,
      printBar: false,
      exportBar: false,
      colBar: false,
      // 设置按钮
      settingBar: false,
      // 密度按钮
      densityBar: false,
      title: i18n.t("menu.Pr_ProductionDispatch"),
      api: M_api,
    });
  }
}
//  搜索表单配置
const formSchema = [
  {
    prop: "ResourceId",
    label: i18n.t("menu.Pr_Resources"),
    cpn: "SyncSelect",
    api: getAllResource,
    apiOptions: {
      keyName: "ResourceGroup",
      valueName: "ResourceId",
    },
  },
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    cpn: "SyncSelect",
    api: getAllProcess,
    apiOptions: {
      keyName: "Process",
      valueName: "Process",
    },
  },
  {
    prop: "ShowInProdSchedule",
    default: true,
    hidden: true,
  },
  {
    prop: "SortOrder",
    default: 1,
    hidden: true,
  },
];

export class P_api extends TableAPI {
  getData = production_dispatching_list;
}
export class P_Table extends BaseTable {
  constructor() {
    super({
      tableSchema: [],
      formSchema,
      title: "",
      api: P_api,
    });
  }
}

