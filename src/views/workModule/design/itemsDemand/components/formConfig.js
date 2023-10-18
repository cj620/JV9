/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2021-11-12 10:51:35
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */
export const formSchema = [

  {
    // 模具编号
    prop: 'ToolingNo',
    cpn: "FormInput",
    label:i18n.t("Generality.Ge_ToolingNo"),
    cpnProps: {
      disabled: true,
    },
  },
  {
    // 模具编号
    prop: 'PmTaskBillId',
    cpn: "FormInput",
    label:i18n.t("project.Pro_TaskSheetNo"),
    cpnProps: {
      disabled: true,
    },
  },
];
export const mergeFormSchema = [
  //   物料编号
  {
    prop: 'ItemId',
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_ItemId"),
    cpnProps: {
      disabled: true,
    },
  },
  //   名称
  {
    prop: 'ItemName',
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_ItemName"),
  },
  //   描述
  {
    prop: 'Description',
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Describe"),
  },
  //   描述2
  {
    prop: 'Description2',
    cpn: "FormInput",
    label: i18n.t("design.De_Description2"),
    cpnProps: {
      disabled: true,
    },
  },
  //   数量
  {
    prop: 'Quantity',
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Quantity"),
    type: "number",
  },
  //   需求日期
  {
    prop: 'DemandDate',
    cpn: "SingleTime",
    label: i18n.t("Generality.Ge_DemandDate"),
  },
]
