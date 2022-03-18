/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-12-03 08:54:57
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
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "id",
      title: "树形表格",
      importBar:true,
      printMod:'sales',
      fullScreenBar:true,
        // 序号列
  sortCol:false,
  // 选择列
  chooseCol:false,
      operationCol:false,
      api,
    });
  }
}
// console.log(getDay(16),444444444444);
 function get_Cur_Mon_Days(){
   let cur_date=new Date()
  //  当月天数
   let count=new Date(cur_date.getFullYear(),cur_date.getMonth()+1,0).getDate() 
   let fields=[]
  for (let i=1;i<=count;i++) {
        fields.push({
      prop:'d'+i,
      label:String(i),
      cpn:'ColProgress',
      width:46,
      align:'center'
    })
  }
  return fields
 }

export const tableConfig = [
  {
    prop: "name",
    label: "名称",
    width:200,
    fixed:'left',
    custom:true
  },
  ...get_Cur_Mon_Days()
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


// 本月天数
// new Date(2021,7,0).getDate() 

// 判断周末

