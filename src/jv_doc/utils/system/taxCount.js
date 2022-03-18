/*
 * @Author: C.
 * @Date: 2022-02-19 14:46:59
 * @LastEditTime: 2022-02-21 09:57:11
 * @Description: file content
 */
import { amountFormat } from "@/jv_doc/utils/handleData/index";
// import { deepClone } from "@/jv_doc/utils/object";
// 获取未税金额 TDA
export function getTaxAmount(row, key){
  // let count=row.Quantity.value*row.NoTaxPrice.value
  
  let flag=getTaxMode()
  let count

  if(flag){
    
    if (useAuxiliary(row)) {
      count = row.Amount.value/(Number(row.Tax.value) + 1)
      // row.Price.value = count / row.Quantity.value; 
      row.NoTaxPrice.value=count / row.Quantity.value; 
    } else {
      count = row.Quantity.value*row.NoTaxPrice.value
    }


  }else{
    count = row.Amount.value / (Number(row.Tax.value) + 1);
  }
  row[key].value=count
  return amountFormat(count)
}
// 获取单价 Price
export function getPrice(row, key){
  // NoTaxPrice
  let count=row.Amount.value/row.Quantity.value
  row[key].value=count
  return amountFormat(count)
}
// 获取含税金额 Amount
export function getAmount(row, key){
  let flag=getTaxMode()
  let count

  if(flag){

    if (useAuxiliary(row)) {
      count = row.AuxiliaryPrice.value * row.AuxiliaryQty.value;
    } else {
      count =row.TDA.value*(Number(row.Tax.value) + 1)
    }

  }else{
    if (useAuxiliary(row)) {
      count = row.AuxiliaryPrice.value * row.AuxiliaryQty.value;
      row.Price.value = count / row.Quantity.value;
    } else {
      count = row.Quantity.value * row.Price.value;
    }
  }

  row[key].value=count
  return amountFormat(count);
}
// 获取当前税率计算模式
export function getTaxMode(){
  console.log(window.global_config.ETaxMode,987897);
  return window.global_config.ETaxMode
}
// 是否使用辅助单价和数量
function useAuxiliary(row){
  return row?.AuxiliaryPrice?.value && row?.AuxiliaryQty?.value
}
export function getTaxPrice(row, key){
  let flag=getTaxMode()
  let count
  if(flag){
    count=row.TDA.value/row.Quantity.value
  }else{
    return 0
  }
  row[key].value=count
  return amountFormat(count)
}
// 根据税率计算方式决定 表格的表现形式 (去掉未税单价，)
export function tableConfigWrapper(tableConfig){
  
  let flag=getTaxMode()
  if(flag){
    return tableConfig.map(item=>{
      if(item.prop=='Price'){
        return Object.assign(item,{
          custom: true,
          editConfig: {
            disabled: true,
          },
        })
      }else{
        return item
      }
    })
  }else{
    return tableConfig.filter(item=>{
      return item.prop!=='NoTaxPrice'
    })
  }
  

  

}