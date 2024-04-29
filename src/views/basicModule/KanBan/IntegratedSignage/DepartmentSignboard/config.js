/*
 * @Author: H.
 * @Date: 2021-11-03 15:00:30
 * @LastEditTime: 2022-01-18 17:26:24
 * @Description:
 */
import { department_tile_get_all } from '@/api/basicApi/systemSettings/department'
export const formSchema = [
  {
    prop: "DepartmentNames",
    label: i18n.t("menu.Se_Department"),
    cpn: "SyncSelect",
    type: "multiple",
    api: department_tile_get_all,
    apiOptions: {
      keyName: "Department",
      valueName: "Department",
    },
  },
];
