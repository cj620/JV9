/*
 * @Author: C.
 * @Date: 2021-09-13 13:05:28
 * @LastEditTime: 2022-01-17 17:18:47
 * @Description: file content
 */
/*
 * @Author: C.
 * @Date: 2021-06-03 14:56:06
 * @LastEditTime: 2021-09-22 14:39:47
 * @Description: file content
 */
import Pager from "./Pager";
import { getTableSummaries } from "../utils/dataFormat";
import {
  setDefaultTableSchema,
  setDefaultTableProps
} from "../utils/setDefaultProp";
import { tablePropInit } from "../utils/tableHelp";
import { Form } from "../form";
class Table {
  formObj=null
  tableData = [];
  // 分页器
  pager = null;
  // 接口
  api = null;
  // 查询loading
  loading = false;
  // 备份的Form表单 以便重置
  copyForm = "";
  props = {};
  selectData={
    keys:[],
    datas:[]
  }
  tableShow = true;
  tableRef=null
  loadedCallback=null
  constructor(props) {
    // 保存props
    this.initProps(props);
    if(props.api){
          // 接口
    this.api = new props.api(this.getData);
    // 类型检测
    this.typeCheck();
    }else{
      this.tableData=props.data
    }
  }
    // 初始化参数
    initProps = props => {
      tablePropInit(this,props)
    };
  /**
   * @description:
   * @param {*} pageForm 携带的参数
   * @param {*} sign 事件签名 区分事件类型
   * @return {*}
   */
  getData = (pageForm, sign = "") => {
    if(this.loading) return


    let startTimeStamp=new Date().getTime()
    this.loading = true;

    // console.log(pageForm,5544545);
    // 是否保持分页状态
    if (sign !== "hold-pager"&&this.props.pagination) {
      this.pager.page = 1;
      // this.form.page = 1;
      this.formObj.form.CurrentPage = 1;
    }
    if (pageForm&&this.props.pagination ) {
      Object.assign(this.formObj.form, pageForm);
    }
    


    this.api
      .getData(this.formObj.form)
      .then(res => {
        const { Items, Count } = res;
        this.tableData = Items;
        if(this.loadedCallback){
          this.loadedCallback(res,this.formObj.form)
        }
        if(this.pager){
          this.pager.Total = Number(Count)
        }

        // 请求平滑处理
        let endTimeStamp=new Date().getTime()
        if((startTimeStamp+500)>endTimeStamp){
          setTimeout(()=>{
            this.loading = false;
          },startTimeStamp+500-endTimeStamp)
        }else{
          this.loading = false;
        }


            


      })
      .catch(err => {
        console.log(err);
        this.loading = false;
      });


  };
  // 数据加载完毕回调
  setCallBack=(fn)=>{
    this.loadedCallback=fn
  }
  // 填入数据
  setData=(data)=>{
    this.tableData=data
  }
  // 参数校验 接口必须实现getData方法
  typeCheck() {
    if (this.api.getData) return;
    console.error("在API类中必须实现getData方法，并且返回值为promise对象");
  }
  reset = () => {
    // 重置表单
    // this.form = JSON.parse(this.copyForm);
    this.formObj.form = JSON.parse(this.copyForm);
    // 重置分页参数 并重新查询
    this.pager.pageReset();
  };
  reRender = () => {
    this.tableShow = false;
    setTimeout(() => {
      this.tableShow = true;
    });
  };
  doLayout	=()=>{
    // this.tableRef?.doLayout?.()
    this.tableRef&&this.tableRef.doLayout()
  }
  setPropMap=(props)=>{
    let row_summary_props_map=[]
    props.tableSchema.forEach((item,index)=>{
      if(item?.commonConfig?.summary){
        row_summary_props_map.push({
         prop:item.prop,
         unit:item.commonConfig?.unit??''
        })
      }
    })
    this.row_summary_props_map=row_summary_props_map
  }
  // 向后插入
  push=(dataList)=>{
    this.tableData=[...this.tableData,...dataList]
  }
  // 获取表格数据
  getTableData=()=>{
    return this.tableData
  }
  // 删除
  delItem=(index)=>{
    this.tableData.splice(index,1)
  }
   // 合计方式
   getTableSummaries=(params)=>{
    return getTableSummaries(params,this.row_summary_props_map)
  }
}

export default Table;
