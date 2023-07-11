/*
 * @Author: C.
 * @Date: 2022-01-17 09:18:51
 * @LastEditTime: 2023-07-11 16:53:29
 * @Description: file content
 */
import { Form } from "../form";
import Pager from "../table/Pager";
import {
  setDefaultTableSchema,
  setDefaultTableProps,
  defaultTableSchemProp,
} from "./setDefaultProp";
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from "../../utils/handleData/localCache";
import { debounce, throttle } from "../../utils/optimization";
import { deepClone } from "../../utils/object";
import { Message } from "element-ui";
const cachePrefix = "tableCache-";
import i18n from "@/i18n/i18n.js";
// localStorage.getItem("lang");
// window.global_config.IsSaveTableSchema
export function tablePropInit(tableObj, props) {
  let cacheKey = getCacheId(props.printMod);
  let tableCache = getLocalStorage(cacheKey);
  if (window.global_config.IsSaveTableSchema) {
    removeLocalStorage(cacheKey);
  }
  // console.log(tableCache,1213232);
  //    // 将props补充默认值
  const resultProps = setDefaultTableProps(deepClone(props));
  tableObj.setPropMap(resultProps);
  if (resultProps.pagination) {
    tableObj.pager = new Pager(tableObj.getData);
    tableObj.pager.pageSize = tableCache?.pageSize || tableObj.pager.pageSize;
  }
  // console.log(tableCache,66666666666666);
  if (props.printMod && tableCache) {
    // 合并schema
    if (resultProps.tableSchema)
      resultProps.tableSchema = mergeSchema(
        resultProps.tableSchema,
        tableCache.tableSchema
      );
    // resultProps.tableSchema &&
    //   mergeSchema(resultProps.tableSchema, tableCache.tableSchema);
  } else {
    resultProps.tableSchema && setDefaultTableSchema(resultProps.tableSchema);
  }

  // 创建Form对象
  if (resultProps.formSchema) {
    // 创建form对象
    tableObj.formObj = new Form({
      defaultForm: resultProps.pagination
        ? {
            // 分页参数
            PageSize: tableObj.pager.pageSize,
            // 当前页
            CurrentPage: tableObj.pager.page,
          }
        : {},
      formSchema: resultProps.formSchema,
      baseColProps: {
        span: 24,
      },
      gutter: 40,
      labelPosition: "top",
      // 区分使用类型 表格 编辑表格 普通表单
      useType: "table",
    });

    // 备份表单
    tableObj.copyForm = JSON.stringify(tableObj.formObj.form);
  }
  if (resultProps.selectable) {
    tableObj.selectable = resultProps.selectable;
  }
  // 补充完毕 赋值给对象实例
  tableObj.props = resultProps;
}

export function setTableSchema(tableId, schema) {
  if (!tableId) return;
  _setTableSchema(tableId, schema);
  // debounce(
  //   () => {
  //     _setTableSchema(tableId, schema);
  //     Message("表格已经缓存！");
  //   },
  //   1000,
  //   false
  // );
  // console.log(tableId);
}
function _setTableSchema(tableId, schema) {
  console.log(schema);
  let cacheKey = getCacheId(tableId);
  let tableCache = getLocalStorage(cacheKey);
  // let tableSchemaCache=tableCache.tableSchema
  setLocalStorage(cacheKey, {
    pageSize: tableCache?.pageSize || 20,
    tableSchema: schema,
  });
  throttle(
    () => {
      Message("表格已经缓存！");
    },
    2000,
    true
  );
}
export function setPageSize(tableId, size) {
  let cacheKey = getCacheId(tableId);
  let tableCache = getLocalStorage(cacheKey);
  setLocalStorage(cacheKey, {
    pageSize: size,
    tableSchema: tableCache.tableSchema,
  });
}
export function resetCache(tableId) {
  let cacheKey = getCacheId(tableId);
  removeLocalStorage(cacheKey);
}

function getCacheId(tableId) {
  return `${i18n.locale}-tableCache-${tableId}`;
}

const isSameNode = (n, o) => {
  return n.prop === o.prop;
};

/**
 * @description: 静态schema 和本地schema 合并    本地优先
 * @param {*} n 静态
 * @param {*} c 本地
 * @return {*}
 */
function mergeSchema(n = [], c = []) {
  //todo:列表对比可以试试使用diff算法去优化
  // for (let key in n) {
  //   for (let key2 in c) {
  //     if (n[key].prop == c[key2].prop) {
  //       console.log(n[key].prop, c[key2].prop, 999);
  //       // 补充默认的参数
  //       n[key] = Object.assign({}, defaultTableSchemProp, n[key], c[key]);
  //     }
  //   }
  // }
  let result = [];
  for (let cKey in c) {
    for (let nKey in n) {
      if (isSameNode(n[nKey], c[cKey])) {
        result.push(Object.assign({}, defaultTableSchemProp, n[nKey], c[cKey]));
      }
    }
  }
  return result;
}
