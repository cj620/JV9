/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2023-07-14 08:59:47
 * @LastEditors: 勿忘 208760845@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */
import { getAll } from "@/api/basicApi/systemSettings/currency";
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
import {
  getProjectQuery,
} from "@/api/workApi/project/projectManage";
export const formSchema = [
  // {
  //   // 报价编号
  //   prop: 'BillId',
  //   label: '报价编号',
  //   cpn: "FormInput",
  //   hidden:true,
  //   rules: [
  //     {
  //       required: true,
  //       message: i18n.t("Generality.Ge_PleaseEnter"),
  //       trigger: ['change', 'blur']
  //     }
  //   ]
  // },

  {
    // 客户
    prop: "CustomerName",
    cpn: "SyncSelect",
    label: i18n.t("menu.Sa_Customer"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
    api: getAllSalesCustomer,
    apiOptions: {
      immediate: true,
      keyName: "ShortName",
      valueName: "ShortName",
    },
  },
  {
    // 项目
    prop: "Project",
    cpn: "FormInput",
    label: i18n.t("menu.Pm_Project"),
    custom: true,
  },
  {
    // 名称
    prop: "ToolingName",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_ToolingName"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 预计交期
    prop: "DeliveryDate",
    cpn: "SingleTime",
    label: i18n.t("Generality.Ge_DeliveryDate"),
  },
  {
    // 报价有效期
    prop: "QuotationExpiredAt",
    cpn: "SingleTime",
    label: i18n.t("sale.Sa_ValidityPeriodOfQuotationExpiredAt"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },

  {
    // 币种
    prop: "Currency",
    cpn: "SyncSelect",
    label: i18n.t("Generality.Ge_Currency"),
    api: getAll,
    apiOptions: {
      immediate: true,
      keyName: "Currency",
      valueName: "Currency",
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
     // 描述
    prop: "Description",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Describe"),
    cpnProps: {
      type: "textarea",
    },
  },
];
