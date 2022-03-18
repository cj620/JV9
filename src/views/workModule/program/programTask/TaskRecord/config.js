/*
 * @Author: your name
 * @Date: 2021-11-29 16:19:01
 * @LastEditTime: 2022-01-14 11:31:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\design\designTask\TaskRecord\config.js
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { deepClone } from "@/jv_doc/utils/object";
import { tableObjTemp } from "@/views/workModule/project/projectTask/TaskRecord/config";
let tableInstance = deepClone(tableObjTemp);

// 将任务类型和工序类别设为默认且隐藏
tableInstance.formSchema.forEach((item, index) => {
  if (item.prop == "TaskType") {
    Object.assign(tableInstance.formSchema[index], {
      hidden: true,
      default: "NewTooling",
    });
  }
  if (item.prop == "ProcessType") {
    Object.assign(tableInstance.formSchema[index], {
      hidden: true,
      default: "Program",
    });
  }
});

export class Table extends BaseTable {
  constructor() {
    super(
      Object.assign(tableInstance, {
        title: i18n.t("program.Pr_CAMTaskRecord"),
      })
    );
  }
}
