/*
 * @Author: H.
 * @Date: 2021-11-08 17:18:48
 * @LastEditTime: 2024-07-01 15:22:26
 * @Description:
 */

export const detailConfig = [
  {
    prop: "UserId",
    label: i18n.t("setup.UserId"),
  },
  {
    prop: "UserName",
    label: i18n.t("setup.UserName"),
  },
  {
    prop: "DepartmentName",
    label: i18n.t("Generality.Ge_Department"),
  },
  {
    prop: "Sex",
    label: i18n.t("setup.Sex"),
    custom: true,
  },
  {
    prop: "Activate",
    label: i18n.t("Generality.Ge_WhetherToActivate"),
    custom: true,
  },
  {
    prop: "Birthday",
    label: i18n.t("setup.Birthday"),
    filter: "date",
  },
  {
    prop: "FamilyAddress",
    label: i18n.t("setup.FamilyAddress"),
  },
  {
    prop: "Mail",
    label: i18n.t("setup.Mail"),
  },
  {
    prop: "Tel",
    label: i18n.t("setup.Tel"),
  },
  {
    prop: "Phone",
    label: i18n.t("setup.Phone"),
  },
  {
    prop: "Roles",
    label: i18n.t("setup.Role"),
    custom: true,
  },
  {
    prop: "Fax",
    label: "传真",
  },
  {
    prop: "UseWeixin",
    label: "微信邮件",
    customFilter: (value) => {
      return value == "False" ? "否" : "是";
    },
  },
  {
    prop: "UseMsn",
    label: "Msn邮件",
    customFilter: (value) => {
      return value == "False" ? "否" : "是";
    },
  },
  {
    prop: "DefaultDepot",
    label: "操作仓库",
  },
  {
    prop: "LoginDate",
    label: "操作仓库",
  },
  {
    prop: "FoundDate",
    label: "创建时间",
  },
];
// Role,FoundDate,LoginDate,DefaultDepot,IsEditPwd,UseMsn,UseWeixin,SendMail
