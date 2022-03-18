/*
 * @Author: C.
 * @Date: 2022-02-10 13:03:34
 * @LastEditTime: 2022-02-10 14:20:16
 * @Description: file content
 */
import { TableAPI,Table as BaseTable } from "@/jv_doc/class/table";
import { tableConfig,formSchema} from "../List/config";
import { project_data_sharing_list } from "@/api/workApi/project/projectManage";
import {
  getLocalStorage,
} from "@/jv_doc/utils/handleData/localCache";
// 获取列表接口
import {
  list_part_by_tooling_no,
} from "@/api/workApi/project/projectManage";
export class api extends TableAPI {
  // 获取列表
  getData = project_data_sharing_list;
  // 删除单据
  // del = deleteSalesBill;
}
export class ShareTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("menu.Pm_ProjectManagement"),
      printBar: false,
      fullScreenBar: true,
      // 序号列
      sortCol: false,
      // 选择列
      chooseCol: false,
      operationCol:false,
      defaultExpandAll:true,
      pagination:false, 
      searchBar:false,
      api,
      lazy: true,
      load: (tree, treeNode, resolve) => {
        console.log(tree, treeNode);
        list_part_by_tooling_no({ ToolingNo: tree.Id,dataSharingKey: getLocalStorage('dataSharingKey')}).then((res) => {
          resolve(res);
        });
      },
    });
  }
}