/*
 * @Author: your name
 * @Date: 2021-10-28 11:15:29
 * @LastEditTime: 2021-12-02 15:46:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \V9_Dev\src\jv_doc\class\table\EditTable.js
 */
import {
  setDefaultTableSchema,
  setDefaultTableProps,
  setDefaultEditTableProps
} from "../utils/setDefaultProp";
import { source2format,format2source,insertCol,getTableSummaries } from "../utils/dataFormat";
import {insertValidate,checkEditTable} from "../utils/editTableHelp";
import { uuid } from "@/jv_doc/utils/common";
import { Message } from 'element-ui';
class EditTable{
  // row_disabled_map
  // row_edit_props_map
  // row_map
  selectData={
    keys:[],
    datas:[]
  }
  tableRef=null
  tableData = []
  props={}
  summaryRowResult=0
  constructor(props){
    this.id='editTable'+uuid(5)
    this.initProps(props)
  }
  getTableData=()=>{
    return format2source(this.tableData)
  }
  // 初始化参数
  initProps = props => {
    this.initData(props)
    // 将props补充默认值
    const resultProps = setDefaultEditTableProps(props);
    if (resultProps.tableSchema) {
      // 给tableSchema项补充默认值
      setDefaultTableSchema(resultProps.tableSchema);
    }
    Object.assign(this.props,resultProps,props)
    this.getRowMap(props)
  }
  // 初始化数据
  initData=props=>{
    this.tableData=source2format(props.data)
  }
  // 获取行的键值列表
  getRowMap=props=>{
    // 字段表
    let row_map=[]
    // 禁用表
    let row_disabled_map=[]
    // 可编辑表
    let row_edit_props_map=[]
    // 校验表
    let row_required_props_map=[]
    // 合计表
    let row_summary_props_map=[]
    props.tableSchema.forEach((item,index)=>{
      row_map.push(item.prop)
      if(item?.editConfig?.disabled){
        row_disabled_map.push(index)
      }else{
        row_edit_props_map.push(item.prop)
      }
      if(item?.editConfig?.rules){
        row_required_props_map.push({
         prop: item.prop,
         rules:item.editConfig.rules
        })
      }
      if(item?.commonConfig?.summary){
        row_summary_props_map.push({
         prop:item.prop,
         unit:item.commonConfig?.unit??''
        })
      }

    })
    this.props.row_map=row_map

    this.row_summary_props_map=row_summary_props_map
    
    this.props.row_edit_props_map=row_edit_props_map
    this.row_required_props_map=row_required_props_map
    // 混入选择列和序号列
    let disabledCol=0
    if(this.props.sortCol&&this.props.chooseCol){
      disabledCol= 2
    }else if(this.props.sortCol||this.props.chooseCol){
      disabledCol= 1
    }else{
      disabledCol= 0
    }
    this.props.offSet=disabledCol
    this.props.row_disabled_map=insertCol(row_disabled_map,disabledCol)
  }
  // 设置数据
  setData=(dataList)=>{
    if(!insertValidate(this.props.tableSchema,dataList))return
    this.tableData= source2format(dataList)
  }
  // 通过index 插入数据
  
  insert=(index,dataList)=>{
    if(!insertValidate(this.props.tableSchema,dataList))return
      this.tableData.splice(index+1,0,...source2format(dataList))
  }
  // 向后添加数据
  push=(dataList)=>{
    if(!insertValidate(this.props.tableSchema,dataList))return
      this.tableData=[...this.tableData,...source2format(dataList)]
  }
  // 重排表格
  doLayout	=()=>{
    this.tableRef?.doLayout?.()
  }
  // 重置表格
  reset=()=>{
    this.tableData=[]
  }
  // 通过index删除表格行
  delItem=(index)=>{
    this.tableData.splice(index,1)
  }
  // 校验表格数据
  validate=(callBack)=>{
    // 获取校验结果 校验失败的map 第一个错误校验的备注
   let [valid,failMap,msg]= checkEditTable(this.row_required_props_map,this.tableData)
  //  执行回调
   callBack&&callBack(valid)
  if(valid)return
  Message({
    type:'warning',
    message:msg
  })
  this.handleValidate(failMap)
  // debounce(this.borderBlur,1000,false)
  }
  // 处理校验错误的单元格
  handleValidate=(failMap)=>{
    let rowDoms=document.getElementById(this.id).getElementsByClassName('el-table__row')
    Object.keys(failMap).forEach(key=>{
      let targetCol=this.props.row_map.findIndex(el=>{
        return el==key
      })
      let targetRows=failMap[key]
      // console.log(targetCol,targetRows);
      this.borderFocus(targetCol,targetRows,rowDoms)

    })


  }
  // 将校验失败的单元格聚焦
  borderFocus=(col,Rows,rowDoms)=>{
    Rows.forEach(item=>{
      // console.log(rowDoms[item].children);
      // rowDoms[item].children 当前行子节点
      let rowChildrens=rowDoms[item].children
      // 高亮当前的单元格
      rowChildrens[col+this.props.offSet].style = "box-shadow: inset 0 0 0 1px red;"

    })
  }
  // 失去焦点
  borderBlur=()=>{
    let cellDoms=document.getElementById(this.id).getElementsByClassName('jv-edit-table-cell')
    cellDoms.forEach(dom => {
       if(dom){
      dom.style = ""
    }else{
      return -1
    }
    });
  }
  // 给表格列设置默认值
  setDefaultColData=(colMsg)=>{
    // console.log(colMsg,this.tableData);
    this.tableData.forEach((item,index)=>{
      this.tableData[index][colMsg.prop].value=colMsg.value
    })
  }
  // 合计方式
  getTableSummaries=(params)=>{
    // console.log(1111);
   let result=getTableSummaries(params,this.row_summary_props_map)
   this.summaryRowResult=result
  //  console.log(result);
    return result
  }
  // 添加空行
  addEmptyRow=()=>{
    let cur_row=this.getEmptyRow()
      this.insert(-1,[cur_row]);
  }
  getEmptyRow=()=>{
    let target = {};
      this.props.row_map.forEach((key) => {
        target[key] = "";
      });
      return target
  }
}
export default EditTable
