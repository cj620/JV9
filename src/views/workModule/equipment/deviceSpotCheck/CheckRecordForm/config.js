/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2024-08-08 11:54:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */
import { getAll } from "@/api/basicApi/systemSettings/currency";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
export const formSchema = [
  {
    prop: "PlanName",
    cpn: "FormInput",
    label: "模板名称",
  },

  {
    // 销售员
    prop: "SalesReps",
    cpn: "SyncSelect",
    label: i18n.t("sale.Sa_SalesReps"),
    api: getAllUserData,
    apiOptions: {
      immediate: true,
      keyName: "UserName",
      valueName: "UserName",
    },
  },
];
