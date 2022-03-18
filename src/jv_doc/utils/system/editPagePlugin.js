/*
 * @Author: your name
 * @Date: 2021-12-10 13:57:25
 * @LastEditTime: 2021-12-10 14:41:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\jv_doc\utils\system\editPagePlugin.js
 */
export function billTransform($el,key='orderData',mergeProps){
  // ToolingNo
  $el.ruleForm = Object.assign(
    {},
    $el.ruleForm,
    $el.$route.params[key]
  );
  $el.formObj.form = $el.ruleForm;
  $el.ruleForm.BillId = "";
  // console.log($el,key,mergeProps,6669998877);
  $el.eTableObj.setData(
    $el.$route.params[key].BillItems.map((item) => {
      let newObj = {
        ...item,
        AssociatedNo: item.Id,
      };
      if(mergeProps){
        Object.assign(newObj,mergeProps)
      }
      delete newObj.Id;
      return newObj;
    })
  );
}

// 单据转换逻辑
// import { billTransform } from "~/utils/system/editPagePlugin";
// billTransform(this, "orderData");