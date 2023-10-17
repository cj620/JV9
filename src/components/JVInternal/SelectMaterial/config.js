/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-11-02 10:25:05
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import { getAllItemType } from "@/api/basicApi/systemSettings/ItemType";

export class api extends TableAPI {
  getData = itemList;
}

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "ItemId",
      api,
      tableHeaderShow: false,
      height: "400",
      exportBar: false,
      searchBar: true,
      stripe: false,
      operationCol: false,
      sortCol: false,
    });
  }
}

export const tableConfig = [
  /*图片*/
  {
    prop: "PhotoUrl",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    cpn: "Image",
    width: "90px",
    cpnProps: {
      //Image的props与element的el-image一直 按需配置
      lazy: true,
      // fit:'scale-down'
      // 宽高默认 38px
    },
  },
  /*编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ID"),
    align: "center",
    cpn: "Link",
    innerSearch: {
      prop: "Keyword",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_ID"),
    },
    cpnProps: {
      // 路由名称
      routeName: "Se_Item_Detail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "ItemId",
      // 补充动态参数
      moreDynamicParameters: [
        {
          keyName: "ItemId",
          valueName: "ItemId",
        },
      ],
    },
  },
  /*名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
    innerSearch: {
      prop: "Keyword",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_ItemName"),
    },
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  /*描述2*/
  {
    prop: "Description2",
    label: i18n.t("design.De_Description2"),
  },
  /*物料类别*/
  {
    prop: "ItemType",
    label: i18n.t("Generality.Ge_ItemType"),
    innerSearch: {
      prop: "ItemType",
      cpn: "SyncSelect",
      api: getAllItemType,
      label: i18n.t("Generality.Ge_ItemType"),
      apiOptions: {
        immediate: true,
        keyName: "ItemType",
        valueName: "ItemType",
      },
    },
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
    width: "80px",
  },
/*  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    custom: true,
    width: "200px",
  },*/
];
export const formSchema = [
  {
    prop: "Keyword",
    label: "部搜索",
  },
  {
    prop: "ItemType",
    label: "部搜索",
  },
];
