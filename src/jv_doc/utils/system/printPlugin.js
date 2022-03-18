/*
 * @Author: your name
 * @Date: 2021-11-12 08:46:20
 * @LastEditTime: 2022-02-18 14:42:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\jv_doc\utils\system\printPlugin.js
 */
import store from "@/store";
export function printPlugin(printMod){
  // console.log(printMod);
  if(printMod.ids&&printMod.category){
    store.dispatch('print/printInit',{
      Ids:printMod.ids,
      Category:'v9-'+printMod.category,
      BillKey:printMod.category,
      fast:printMod.fast,
      isTag:printMod.isTag,
      // Default Query Print
       Mode: printMod.Mode?printMod.Mode:'Default',
       Mode:'Print'
    })
  }else{

    console.error('ids和category为必填项！请确认！')
  }
}
