/*
 * @Author: C.
 * @Date: 2021-12-28 08:33:52
 * @LastEditTime: 2022-02-28 14:41:33
 * @Description: file content
 */
export const detailConfig=[
  {
    // 物料编号
    prop:'ItemId',
    label: i18n.t("Generality.Ge_ItemId"),
  },
  {
    // 物料名称
    prop:'ItemName',
    label: i18n.t("Generality.Ge_ItemName"),
  },
  {
    // 描述
    prop:'Description',
    label: i18n.t("Generality.Ge_Describe"),
  },
  {
    // 单位
    prop:'Unit',
    label: i18n.t("Generality.Ge_Unit"),
  },
  {
    // 标签
    prop:'ItemType',
    label: i18n.t("Generality.Ge_ItemLabel"),
  },
  {
    // 最小库存
    prop:'SafetyStock',
    label: i18n.t("setup.SafetyStock"),
  },
  {
    // 最大库存
    prop:'MaxStock',
    label: i18n.t("setup.MaxStock"),
  },
  {
    // 物料类别
    prop:'ItemCategory',
    label: i18n.t("Generality.Ge_ItemCategory"),
    custom: true,
  },
  {
    // 所属项目
    prop:'Project',
    label: i18n.t("Generality.Ge_BelongTo"),
  },
  ]
//库位信息
export const InventoryConfig=[
  {
    // 仓库
    prop:'Stockroom',
    label: i18n.t("setup.Stockroom"),
  },
  {
    // 数量
    prop:'Quantity',
    label: i18n.t("Generality.Ge_Quantity"),
  },
   /*单价*/
   {
    prop: "Price",
    label:i18n.t("Generality.Ge_Price"),
    type:'number',
    align:'right',
    filter: "amount",
  },
   /*金额*/
   {
    prop: "Amount",
    label:i18n.t("Generality.Ge_Amount"),
    type:'number',
    align:'right',
    filter: "amount",
  },

]
//结存换汇
export const stockSummaryConfig=[
  /*记账日期*/
  {
    prop: "AccountedDate",
    label: i18n.t("Generality.Ge_AccountingDate"),
    filter: "date",
  },
  /*记账类别*/
  {
    prop: "AccountedType",
    label: i18n.t("Generality.Ge_AccountingCategory"),
    custom: true,
  },
  /*借方数量*/
  {
    prop: "DebitQuantity",
    label: i18n.t("Generality.Ge_DebitsQuantity"),
    align: "right",
  },
  /*借方金额*/
  {
    prop: "DebitAmount",
    label: i18n.t("Generality.Ge_DebitAmount"),
    align: "right",
    filter: "amount",
  },
  /*贷方数量*/
  {
    prop: "CreditQuantity",
    label: i18n.t("Generality.Ge_CreditsQuantity"),
    align: "right",
  },
  /*贷方金额*/
  {
    prop: "CreditAmount",
    label: i18n.t("Generality.Ge_CreditsAmount"),
    align: "right",
    filter: "amount",
  },
  /*仓库*/
  {
    prop: "Stockroom",
    label: i18n.t("setup.Stockroom"),
  },
  /*单据编号*/
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
  },
  /*单据明细编号*/
  {
    prop: "BillItemId",
    label: i18n.t("Generality.Ge_DocumentDetailNo"),
  },
  /*摘要*/
  {
    prop: "Summary",
    label: i18n.t("Generality.Ge_Summary"),
  },
  /*物料来源*/
  {
    prop: "ItemSource",
    label: i18n.t("Generality.Ge_ItemsSource"),
  },
  {
    prop: "AuxiliaryQty",
    label: i18n.t("Generality.Ge_AuxiliaryQty"),
    align: "right",
    filter: "amount",
  },
  {
    prop: "AuxiliaryPrice",
    label: i18n.t("Generality.Ge_AuxiliaryPrice"),
    align: "right",
    filter: "amount",
  },

]
