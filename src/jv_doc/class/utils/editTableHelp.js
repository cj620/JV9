/*
 * @Author: your name
 * @Date: 2021-10-31 12:02:38
 * @LastEditTime: 2022-02-21 11:06:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \copy-demo\src\jv_doc\class\utils\findNextStep.js
 */
import { Message } from "element-ui";
export function find_right_col(arr, col) {
  let target = -1,
    cur_col = col;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > cur_col) {
      if (arr[i] == cur_col + 1) {
        cur_col = arr[i];
      } else {
        target = cur_col + 1;
      }
    }
  }
  if (target == -1) {
    return cur_col + 1;
  } else {
    return target;
  }
}
export function find_left_col(arr, col) {
  let target = -1,
    cur_col = col;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] < cur_col) {
      if (arr[i] == cur_col - 1) {
        cur_col = arr[i];
      } else {
        target = cur_col - 1;
      }
    }
  }
  return target;
}
// 插入时校验 插入的数据是否合法
export function insertValidate(schema, source) {
  // console.log(schema,source);
  if (source.length == 0) return true;
  let propsMap = schema.map((item) => {
    return item.prop;
  });
  let keys = Object.keys(source[0]);
  let errorMsg = "";
  let valid = propsMap.some((item) => {
    if (!keys.includes(item)) {
      errorMsg = item;
    }
    return !keys.includes(item);
  });
  if (valid) {
    Message({
      type: "error",
      message:
        errorMsg +
        i18n.t(
          "setup.SaveDataFailedAsMissingSomeFiledPleaseCheckTheDataYouSubmitted"
        ),
    });
  }
  return !valid;
}

// 整体表格做必填校验 记录dom信息

// export function checkEditTable(requiredArr,source,schema ){
//   // console.log(requiredArr,source ,schema);
//   let checkState=true
// const map={}
//   source.forEach((A,index) => {
//     requiredArr.forEach((key,keyIndex)=>{
//       if(typeof(A[key].value)=='number' ||['true','false'].includes(String(A[key].value) )  || A[key].value){
//             // 通过
//       }else{
//         // 不通过+
//         if(map[key]){
//           map[key].push(index)
//         }else{
//           map[key]=[index]
//         }
//       }

//     })
//   });
//   checkState=JSON.stringify(map)=='{}'
//   return [checkState,map]
// }

export function checkEditTable(requiredArr, source) {
  console.log(requiredArr, source);
  let checkState = true;
  const map = {};
  let msg = "";
  source.forEach((A, index) => {
    requiredArr.forEach((B, keyIndex) => {
      let key = B.prop;
      let value = A[B.prop].value;

      if (
        B.rules.required &&
        (typeof value == "number" ||
          ["true", "false"].includes(String(value)) ||
          value)
      ) {
        // 非空判断成功
        if (B.rules.validate) {
          if (B.rules.validate(value, A)) {
            // 自定义校验 通过
          } else {
            setRuleMap(map, key, index);
            msg = setMsg(B.rules, msg);
          }
        }
      } else if (B.rules.validate) {
        if (B.rules.validate(value, A)) {
          // 自定义校验 通过
        } else {
          setRuleMap(map, key, index);
          msg = setMsg(B.rules, msg);
        }
      } else {
        setRuleMap(map, key, index);
        msg = setMsg(B.rules, msg);
      }
    });
  });
  checkState = JSON.stringify(map) == "{}";
  // console.log(msg,1111111111111111);
  return [checkState, map, msg];
}
function setRuleMap(map, key, value) {
  if (map[key]) {
    map[key].push(value);
  } else {
    map[key] = [value];
  }
}
function setMsg(rules, msg) {
  if (msg) return msg;
  return rules?.message ?? "请输入必填项";
}
