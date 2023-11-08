/*
 * @Author: your name
 * @Date: 2021-10-28 13:27:36
 * @LastEditTime: 2023-07-13 15:48:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\router\basicModule\system.js
 */
import i18n from "@/i18n/i18n.js";

// 设置模块
const system = [
  // 系统设置
  {
    key: "Se_Setup",
    Parent: null,
    name: "Setup",
    path: "setup",
    title: i18n.t("menu.Se_Setup"),
    icon: "set",
  },
  // 物料
  {
    key: "Se_Item",
    component: () => import("@/views/basicModule/setup/Items/List"),
    Parent: "Se_Setup",
    name: "Items",
    path: "items",
    title: i18n.t("menu.Se_Item"),
  },
  // 新增物料
  {
    key: "Se_Item_Add",
    component: () => import("@/views/basicModule/setup/Items/Add"),
    Parent: "Se_Setup",
    name: "Se_Item_Add",
    path: "se_Item_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.Se_Item"),
    hidden: true,
  },
  // 编辑物料
  {
    key: "Se_Item_Edit",
    component: () => import("@/views/basicModule/setup/Items/editMaterials"),
    Parent: "Se_Setup",
    name: "Se_Item_Edit",
    path: "se_Item_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.Se_Item"),
    hidden: true,
  },
  // 物料详情
  {
    key: "Se_Item_Detail",
    component: () => import("@/views/basicModule/setup/Items/materialsDetails"),
    Parent: "Se_Setup",
    name: "Se_Item_Detail",
    path: "se_Item_Detail",
    title: i18n.t("menu.Se_Item") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
    // 已删除物料列表
    {
      key: "Se_Item_deleteList",
      component: () => import("@/views/basicModule/setup/Items/deleteList"),
      Parent: "Se_Setup",
      name: "Se_Item_deleteList",
      path: "Se_Item_deleteList",
      title: i18n.t("menu.Se_DeleteItemList"),
      hidden: true,
    },
  // // 物料类别
  // {
  //   key: "Se_ItemType",
  //   component: () => import("@/views/basicModule/setup/ItemType"),
  //   Parent: "Se_Setup",
  //   name: "ItemType",
  //   path: "itemType",
  //   title: i18n.t("menu.Se_ItemType"),
  // },
  // 计量单位
  {
    key: "Se_Unit",
    component: () => import("@/views/basicModule/setup/unit"),
    Parent: "Se_Setup",
    name: "Unit",
    path: "unit",
    title: i18n.t("menu.Se_Unit"),
  },
  // 货币
  {
    key: "Se_Currency",
    component: () => import("@/views/basicModule/setup/currency"),
    Parent: "Se_Setup",
    name: "Currency",
    path: "currency",
    title: i18n.t("menu.Se_Currency"),
  },
  // 账号管理
  {
    key: "Se_Users",
    component: () => import("@/views/basicModule/setup/account/List"),
    Parent: "Se_Setup",
    name: "Se_Users",
    path: "se_Users",
    title: i18n.t("menu.Se_Users"),
  },
  // 编辑用户
  {
    key: "Se_Users_Edit",
    component: () => import("@/views/basicModule/setup/account/editUsers"),
    Parent: "Se_Setup",
    name: "Se_Users_Edit",
    path: "se_Users_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.Se_Users"),
    hidden: true,
  },
  // 新增用户
  {
    key: "Se_Users_Add",
    component: () => import("@/views/basicModule/setup/account/new"),
    Parent: "Se_Setup",
    name: "Se_Users_Add",
    path: "se_Users_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.Se_Users"),
    hidden: true,
  },
  // 用户详情
  {
    key: "Se_Users_Detail",
    component: () => import("@/views/basicModule/setup/account/Details"),
    Parent: "Se_Setup",
    name: "Se_Users_Detail",
    path: "se_Users_Detail",
    title: i18n.t("menu.Se_Users") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 用户详情
  {
    key: "Se_Users_Deleted",
    component: () => import("@/views/basicModule/setup/account/deleteUserList"),
    Parent: "Se_Setup",
    name: "Se_Users_Deleted",
    path: "se_Users_Deleted",
    title: i18n.t("setup.DeletedUsers"),
    hidden: true,
  },
  // 用户个人详情
  {
    key: "Se_UserInfo_Detail",
    name: "Se_UserInfo_Detail",
    path: "se_UserInfo_Detail",
    Parent: "Se_Setup",
    component: () => import("@/views/basicModule/setup/userInfo/details"),
    hidden: true,
    title: i18n.t("menu.Se_Users") + "  " + i18n.t("Generality.Ge_Details"),
  },
  // 编辑个人信息
  {
    key: "Se_UserInfo_Edit",
    name: "Se_UserInfo_Edit",
    path: "se_UserInfo_Edit",
    Parent: "Se_Setup",
    component: () => import("@/views/basicModule/setup/userInfo/edit"),
    hidden: true,
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.Se_Users"),
  },
  // 用户日志
  {
    key: "Se_UserLog",
    component: () => import("@/views/basicModule/setup/userLog/List"),
    Parent: "Se_Setup",
    name: "Se_UserLog",
    path: "Se_UserLog",
    title: i18n.t("menu.Se_UserLog"),
  },
  // 编号规则
  {
    key: "Se_CodeRule",
    component: () => import("@/views/basicModule/setup/numberRule/List"),
    Parent: "Se_Setup",
    name: "Se_CodeRule",
    path: "Se_CodeRule",
    title: i18n.t("menu.Se_CodeRule"),
  },
  // 角色管理
  {
    key: "Se_Role",
    component: () => import("@/views/basicModule/setup/roleManagement"),
    Parent: "Se_Setup",
    name: "Se_Role",
    path: "role",
    title: i18n.t("menu.Se_Role"),
  },
  // // 部门
  // {
  //   key: "Se_Department",
  //   component: () => import("@/views/basicModule/setup/Department"),
  //   Parent: "Se_Setup",
  //   name: "Department",
  //   path: "department",
  //   title: i18n.t("menu.Se_Department"),
  // },
  // 公司信息
  {
    key: "Se_CompanyInfo",
    component: () => import("@/views/basicModule/setup/companyInfo"),
    Parent: "Se_Setup",
    name: "Se_CompanyInfo",
    path: "se_CompanyInfo",
    title: i18n.t("menu.Se_CompanyInfo"),
  },
  // 系统设置
  {
    key: "Se_SystemSetup",
    component: () => import("@/views/basicModule/setup/systemSetup"),
    Parent: "Se_Setup",
    name: "Se_SystemSetup",
    path: "se_SystemSetup",
    title: i18n.t("menu.Se_SystemSetup"),
  },

  // 审核人配置
  {
    key: "Se_AuditFlowSetup",
    component: () => import("@/views/basicModule/setup/auditFlowSetup/List"),
    Parent: "Se_Setup",
    name: "Se_AuditFlowSetup",
    path: "se_AuditFlowSetup",
    title: i18n.t("Generality.Ge_Approve"),
  },
  // 工作台
  {
    key: "Se_Desk",
    component: () => import("@/views/basicModule/system/desk"),
    Parent: "Se_Setup",
    name: "Se_Desk",
    path: "se_Desk",
    title: i18n.t("dashboard.Da_Workbench"),
    hidden: true,
  },


  // 文件夹管理权限
  {
    key: "Se_FileManagementSetup",
    component: () => import("@/views/basicModule/setup/fileManagementSetup/List"),
    Parent: "Se_Setup",
    name: "Se_FileManagementSetup",
    path: "Se_FileManagementSetup",
    title: i18n.t("menu.Se_FileManagementSetup"),
  },
  {
    key: "Se_oadesign",
    path: "se_oadesign",
    name: "Se_oadesign",
    Parent: "Se_Setup",
    hidden: true,
    component: () => import("@/views/basicModule/OA"),
    title: i18n.t("menu.Se_AuditConfiguration"),
  },
    // 报错项
  // {
  //   key: "Se_ErrorPrompt",
  //   path: "Se_ErrorPrompt",
  //   name: "Se_ErrorPrompt",
  //   Parent: "Se_Setup",
  //   component: () => import("@/views/basicModule/setup/errorPrompt"),
  //   title: i18n.t("menu.Se_ErrorPrompt"),
  // },
  /*  // 模具进度看板
  {
    key: "Se_MoldProgressKanban",
    component: () => import("@/views/basicModule/KanBan/MoldProgressKanban"),
    Parent: "Se_Setup",
    name: "Se_MoldProgressKanban",
    path: "se_DSe_MoldProgressKanbanesk",
    title: "模具进度看板",
    hidden: true,
  },*/
];

export default system;
