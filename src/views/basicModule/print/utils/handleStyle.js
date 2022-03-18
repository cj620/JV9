/*
 * @Author: C.
 * @Date: 2021-08-04 17:06:41
 * @LastEditTime: 2021-08-05 10:16:29
 * @Description: file content
 */
import { fontLayout } from "../enums";


/**
 * @description:  处理样式信息
 * @param {*} e 元素的位置和样式信息
 * @param {*} type 处理方式
 * @return {*}
 */
export function handleStyle(e,type=''){
  // console.log(e);
  let typeCheck=type=='only-style'
  let result={}
  Object.keys(e).forEach(item=>{
let currentVlaue=e[item]
    switch (item) {
      case 'x':
        if(typeCheck)break;
        result['left']=currentVlaue+'px'
        break;
        case 'y':
          if(typeCheck)break;
        result['top']=currentVlaue+'px'
        break;
        case 'width':
          if(typeCheck)break;
        result['width']=currentVlaue+'px'
        break;
        case 'height':
          if(typeCheck)break;
        result['height']=currentVlaue+'px'
        break;
        case 'fontSize':
        result['fontSize']=currentVlaue+'px'
        break;
        case 'fontWeight':
        result['fontWeight']=currentVlaue
        break;
        case 'fontFamily':
        result['fontFamily']=currentVlaue
        break;
        case 'textAlign':
        result['justifyContent']=fontLayout[currentVlaue]
        break;
      default:
        break;
    }
  })
// console.log(result);
return result
}
