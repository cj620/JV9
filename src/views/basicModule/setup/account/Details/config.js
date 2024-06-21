/*
 * @Author: H.
 * @Date: 2021-11-08 17:18:48
 * @LastEditTime: 2022-01-18 17:26:31
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
  }
];
