/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-12-09 15:34:48
 * @Description: file content
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { Data } from "./data";
// import BillState from '../../../components/Jv_cpn/JvColBillState'

export class api {
  getData = () => {
    return new Promise((r, e) => {
      // console.log(Data, 99999999);
      r(Data);
    });
  };
}
// 表格配置
//   tableSchema,
// 表单配置
//   formSchema,
// 绑定Id
//   rowId,
// 标题
//   title,
// 数据
//   data,
// 斑马线
//   stripe,
// 边框
//   border,
// 加载文字
//   elementLoadingText,
// 加载图标
//   elementLoadingSpinner,
// 加载背景色
//   elementLoadingBackground,
// 是否高亮行
//   highlightCurrentRow,
// 表格密度
//   size,
// 开启序列行
//   sortCol,
// 开启选择行
//   chooseCol,
// 表格头组件
// tableHeaderShow
// 分页
// pagination
  // 操作列
// operationCol
// 操作列宽度  默认表格200  编辑表格170
// operationWidth
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "id",
      title: "表格标题1",
      importBar:true,
      selectType:'checkBox',
      printMod:'sales',
      fullScreenBar:true,
      showSummary:true,
      // operationCol:false,
      api,
    });
  }
}

export const tableConfig = [
  {
    prop: "image",
    label: "图片",
    cpn:'Image',
    width:'90px',
    cpnProps:{
      //Image的props与element的el-image一直 按需配置
      lazy:true,
      // fit:'scale-down'
      // 宽高默认 38px
      // width:'50px',
      // height:'50px',
      // 自定义前缀 不填为默认路径
      preUrl:'https://fuss10.elemecdn.com/'
    },
    // 导出配置
    exportConfig:{
      // 禁用这个字段的导出功能
      disabled:true
    }
  },
  {
    id: "665487545",
    prop: "id",
    label: "编号",
    cpn: "Link",
    cpnProps: {
      // 路由名称
      routeName: "detail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
      // 补充动态参数
      moreDynamicParameters:[
        {
          keyName:'resId',
         valueName:'name'
        },
        {
          keyName:'BillId',
         valueName:'id'
        }
      ],
      // 补充静态参数
      moreStaticParameters: {
        type: 1
      }
    }
  },
  {
    id: "665487545",
    prop: "name",
    label: "名字",
    custom:true,
    innerSearch: {
      prop: "Keyword",
      cpn: "FormSelect",
      label: "名字",
      options: {
        list: [
          {
            value: "请假",
            label: "请假"
          },
          {
            value: "调休",
            label: "调休"
          }
        ]
      }
    },
  },
  {
    id: "6654875455",
    prop: "age",
    label: "年龄",
    custom:true,
    innerSearch: {
      prop: "Keyword",
      cpn: "FormInput",
      label: "年龄"
    }
  },
  {
    prop: "process",
    label: "进度",
    custom:true,
  },
  {
    prop: "amount",
    label: "金额（元）",
    align:'right',
    filter: "amount",
    commonConfig:{
      summary:true,
      unit:'元'
    }
  },
  {
    prop: "quantity",
    label: "数量",
    align:'right',
    filter: "amount",
    commonConfig:{
      summary:true,
      unit:'个'
    }
  },

  {
    prop: "date",
    label: "时间",
    filter: "date",
    innerSearch: {
      prop: "Date",
      cpn: "DateRange",
      label: "时间范围"
    }
  },
];
export const formSchema = [
  {
    prop: "Keyword",
    label: "请假类型",
    cpn: "FormSelect",
    default: "请假",
    options: {
      list: [
        {
          value: "请假",
          label: "请假"
        },
        {
          value: "调休",
          label: "调休"
        }
      ]
    }
  },
  {
    prop: "Keyword1",
    label: "请假类型3",
    cpn: "FormSelect",
    hidden: true,
    options: {
      list: [
        {
          value: "请假",
          label: "请假"
        },
        {
          value: "调休",
          label: "调休"
        }
      ]
    }
  },
  {
    prop: "Date",
    label: "日期范围",
    cpn: "DateRange"
  },
];
