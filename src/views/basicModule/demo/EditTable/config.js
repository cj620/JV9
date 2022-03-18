
/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-12-10 11:34:14
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
// import { Data } from "./data";
import { data } from "./data";

export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      data:data,
      title:'编辑表格',
      showSummary:true
      // chooseCol:false,
      // sortCol:false
    });
  }
}

export const tableConfig = [
  {
    prop: "name",
    label: "名字",
    formCpn: "FormInput",
    // editConfig:{
    //   disabled:true,
    // }
  },
  {
    prop: "date",
    label: "日期",
    formCpn: "SingleTime",
    filter:'date',
    editConfig:{
      colInit:true
    }
  },
  {
    prop: "age",
    label: "年龄",
    formCpn: "FormInput",
    editConfig:{
      rules:{
        required: true,
      },
      colInit:true
    }
  },
  {
    prop: "sex",
    label: "性别",
    formCpn: "FormSelect",
    options: {
      list: [
        {
          value: "男",
          label: "男"
        },
        {
          value: "女",
          label: "女"
        }
      ]
    }
  },
  {
    prop: "customSex",
    label: "自定义下拉框性别",
    formCpn: "customFormSelect",
    width:150,
    options: {

    }
  },
  {
    prop: "num",
    label: "数量",
    formCpn: "FormInput",
    type:'number',
    filter:'amount',
    align:'right',
    editConfig:{
      rules:{
        // 是否必填项
        required: true,
        // 提示信息
        message: '数量不能小于3',
        // 自定义校验 返回bool值
        validate:(val)=>{
          return val>1
        },
      },
    },
    commonConfig:{
      summary:true,
      unit:'个'
    }
  },
  {
    prop: "unit",
    label: "单价",
    type:'number',
    formCpn: "FormInput",
    filter:'amount',
    align:'right',
    editConfig:{
      rules:{
        required: true,
        message: '提示',
      },
      colInit:true
    },
    commonConfig:{
      summary:true,
      unit:'元'
    }
  },
  {
    prop: "summary",
    label: "金额",
    align:'right',
    filter:'amount',
    custom:true,
    editConfig:{
      disabled:true,
    },
    commonConfig:{
      summary:true,
      unit:'元'
    }
  },
  {
    prop: "remark",
    label: "自定义展示",
    formCpn: "FormSelect",
    options: {
      list: [
        {
          label:'托儿索',
          value:1
        },
        {
          label:'儿童劫',
          value:2
        },
        {
          label:'小鱼人',
          value:3
        }
      ]
    },
    customFilter:(value,row)=>{
      if(!value) return ''
      if(value==1){
        return '我是亚索'
      }else if(value==2){
        return `${row.name.value}的劫`
      }else if(value==3){
        return '我是小鱼人'
      }
    }
  },
];

