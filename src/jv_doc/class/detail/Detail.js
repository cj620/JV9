/*
 * @Author: your name
 * @Date: 2021-11-04 12:58:11
 * @LastEditTime: 2021-11-04 15:53:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \V9_Dev\src\jv_doc\class\detail\Detail.js
 */
import { setDefaultProps } from "../utils/detailHelp";
class Detail{
  detailData={}
  constructor(props){
    this.detailData=props.data
    this.props=setDefaultProps(props)
  }
  setData=(data)=>{
    this.detailData=data
  }
}
export default Detail