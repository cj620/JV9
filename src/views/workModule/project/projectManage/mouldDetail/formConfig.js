/*
 * @Author: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @Date: 2022-06-20 12:56:50
 * @LastEditors: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @LastEditTime: 2022-08-29 09:27:52
 * @FilePath: \jvmmsv9-1front\src\views\workModule\project\projectManage\mouldDetail\formConfig.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 获取列表接口
import { getProjectQuery } from "@/api/workApi/project/projectManage";
export const formSchema = [
  {
    // 版本编号
    prop: "VersionCode",
    cpn: "FormInput",
    label: i18n.t("project.Pro_VersionCode"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
  },

  // {
  //   // 版本编号
  //   prop: 'VersionName',
  //   cpn: "FormInput",
  //   label: i18n.t("project.Pro_VersionName"),
  //   rules: [
  //     {
  //       required: true,
  //       message: i18n.t("Generality.Ge_PleaseFillIn"),
  //       trigger: ['change', 'blur']
  //     }
  //   ]
  // },
];
export const formSchema1 = [
  /*模具编号*/
  // {
  //   prop: "ToolingNo",
  //   cpn: "FormInput",
  //   label: i18n.t("Generality.Ge_ToolingNo"),
  // },
  /*模具名称*/
  {
    prop: "ToolingName",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_ToolingName"),
  },
  /*描述*/
  {
    prop: "Description",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Describe"),
  },
  {
    // 交货日期
    prop: "TDeliveryDate",
    cpn: "SingleTime",
    label: i18n.t("Generality.Ge_DeliveryDate"),
  },
  {
    // 首样日期
    prop: "TSampleDate",
    cpn: "SingleTime",
    label: i18n.t("Generality.Ge_SampleDate"),
  },
  {
    // 材质
    prop: "TMaterial",
    cpn: "FormInput",
    label: i18n.t("project.Pro_TMaterial"),
  },
  {
    // 模具规格
    prop: "TSpec",
    cpn: "FormInput",
    label: i18n.t("project.Pro_TSpec"),
  },
  {
    // 收缩率
    prop: "TShrinkage",
    cpn: "FormInput",
    label: i18n.t("project.Pro_TShrinkage"),
  },
  {
    // 客户模号
    prop: "TCustomerToolingNo",
    cpn: "FormInput",
    label: i18n.t("project.Pro_TCustomerToolingNo"),
  },
  {
    // 重量
    prop: "TWeight",
    cpn: "FormInput",
    label: i18n.t("project.Pro_TWeight"),
  },
 /*客户*/
//  {
//   prop: "CustomerName",
//   cpn: "FormInput",
//   label: i18n.t("menu.Sa_Customer"),
// },
];
