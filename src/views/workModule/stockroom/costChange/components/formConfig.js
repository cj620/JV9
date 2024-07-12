/*
 * @Author: your name
 * @Date: 2021-11-12 15:34:15
 * @LastEditTime: 2021-11-12 15:48:51
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\stockroom\otherIn\components\formConfig.js
 */
import  {getStockroomList} from "@/api/workApi/stockroom/stockroomInfo"
export const formSchema = [

  {
    // 仓库
    prop: 'Stockroom',
    cpn: "SyncSelect",
    label: i18n.t("setup.Stockroom"),
    api: getStockroomList,
    apiOptions: {
      immediate: true,
      keyName: "Stockroom",
      valueName: "Stockroom"
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ['change', 'blur']
      }
    ]
  },
  {
    // 调整人
    prop: "Adjuster",
    cpn: "SyncSelect",
    label: "调整人",
    custom: true,
    apiOptions: {
      immediate: true,
      keyName: "UserName",
      valueName: "UserName",
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 调整部门
    prop: "AdjustDepartment",
    label: "调整部门",
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
  },
];
