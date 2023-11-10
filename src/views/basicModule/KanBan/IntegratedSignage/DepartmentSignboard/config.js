/*
 * @Author: H.
 * @Date: 2021-11-03 15:00:30
 * @LastEditTime: 2022-01-18 17:26:24
 * @Description:
 */
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
export const formSchema = [
  {
    prop: "DepartmentName",
    label: i18n.t("menu.Se_Department"),
    cpn: "SyncSelect",
    api: getDepartmentList,
    cpnProps:{
      clearable: false
    },
    apiOptions: {
      tree: true,
      treeProps: {
        children: "Children",
        keyName: "Department",
        valueName: "Department",
      },
    },
  },
];
