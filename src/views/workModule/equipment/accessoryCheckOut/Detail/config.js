import { PickingTypeEnum1 } from "@/enum/workModule";

export const detailConfig = [
  {
    // 设备编号
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
  },
  {
    // 仓库
    prop: "Stockroom",
    label: i18n.t("menu.St_Stockroom"),
  },
  {
    // 提交人
    prop: "Submitter",
    label: i18n.t("stockroom.St_Submitter"),
  },
  {
    // 领料类别
    prop: "PickingType",
    label: i18n.t("stockroom.St_PickingType"),
    customFilter: (value) => {
      if (!value) return "";
      return PickingTypeEnum1[value].name;
    },
  },
  {
    // 制单人
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator")
  },
  {
    // 制单日期
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
  },
]
export const tableConfig = [
  {
    // 物料编号
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
  },
  {
    // 物料名称
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemsName"),
  },
  {
    // 描述
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  {
    // 单位
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
  },
  {
    // 数量
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
  {
    // 备注
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
]
