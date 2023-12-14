/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-09-22 14:22:27
 * @Description: file content
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
export class Table1 extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      rowId: "id",
      height: "400",
      data: [],
      exportBar: false,
      tableHeaderShow: false,
      pagination: false,
      searchBar: false,
      stripe: false,
      sortCol: false,
      chooseCol: false,
      operationCol: false,
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
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  // 标签
  {
    prop: "ItemType",
    label: i18n.t("Generality.Ge_ItemType"),
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
    width: "80px",
  },
  // 数量
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    custom: true,
    width: "150px",
  },
  // 备注
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    width: "150px",
    custom: true,
  }
];
