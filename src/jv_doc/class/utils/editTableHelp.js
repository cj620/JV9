/*
 * @Author: your name
 * @Date: 2021-10-31 12:02:38
 * @LastEditTime: 2022-09-01 11:00:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \copy-demo\src\jv_doc\class\utils\findNextStep.js
 */
import { setLocalStorage, getLocalStorage,removeLocalStorage} from "../../utils/handleData/localCache";
  import { debounce } from "../../utils/optimization";
  import { deepClone } from "../../utils/object";
  import { Message } from 'element-ui';
  const cachePrefix='tableCache-'
  import i18n from "@/i18n/i18n.js";
  import { setDefaultTableSchema,
    setDefaultTableProps,defaultTableSchemProp } from "./setDefaultProp";
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


export function cacheInit(prop){
  let cacheKey=getCacheId(prop.tid)
  let tableCache=getLocalStorage(cacheKey)
  if(prop.tid&&tableCache){
    prop.tableSchema&&mergeSchema(prop.tableSchema,tableCache.tableSchema)
  }else{
    prop.tableSchema&&setDefaultTableSchema(prop.tableSchema)
  }
}



export function setTableSchema(tableId,schema){
  if(!tableId) return
  debounce(()=>{
    _setTableSchema(tableId,schema)
    Message('Form is already cached')
  },1000,false)
}
function _setTableSchema(tableId,schema){
  let cacheKey=getCacheId(tableId)
  let tableCache=getLocalStorage(cacheKey)
  // let tableSchemaCache=tableCache.tableSchema
  setLocalStorage(cacheKey,{
    tableSchema:schema
   })
}

export function resetCache(tableId){
  let cacheKey=getCacheId(tableId)
  removeLocalStorage(cacheKey)
}

function getCacheId(tableId){
  return `${i18n.locale}-editTableCache-${tableId}`
}
function mergeSchema(n=[],c=[]){
  for(let key in n){
    for(let key2 in c){
      if(n[key].prop==c[key2].prop){
        n[key]=Object.assign({},defaultTableSchemProp,n[key],c[key])
      }
    }
}
}
