/*
 * @Author: C.
 * @Date: 2021-09-13 13:05:28
 * @LastEditTime: 2023-07-21 08:57:16
 * @Description: file content
 */
/*
 * @Author: C.
 * @Date: 2021-06-03 14:56:06
 * @LastEditTime: 2021-09-22 14:39:47
 * @Description: file content
 */
// import Pager from "./Pager";
import { getTableSummaries } from "../utils/dataFormat";
import { Message } from "element-ui";
import { tablePropInit } from "../utils/tableHelp";
import { debounce } from "~/utils/optimization";
class Table {
  formObj = null;
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
  selectData = {
    keys: [],
    datas: [],
  };
  tableShow = true;
  tableRef = null;
  loadedCallback = null;
  constructor(props) {
    // 保存props
    this.initProps(props);
    if (props.api) {
      // 接口
      // this.api = new props.api(this.getData);
      if (typeof props.api == "function") {
        this.api = new props.api(this.getData);
      } else {
        this.api = props.api;
      }
      // 类型检测
      this.typeCheck();
    } else {
      this.tableData = props.data;
    }
  }
  // 初始化参数
  initProps = (props) => {
    tablePropInit(this, props);
  };
  /**
   * @description:
   * @param {*} pageForm 携带的参数
   * @param {*} sign 事件签名 区分事件类型
   * @return {*}
   */
  getData = (pageForm = {}, sign = "") => {
    if (this.loading) return;

    let startTimeStamp = new Date().getTime();
    this.loading = true;
    // 是否保持分页状态
    if (this.props.pagination) {
      if (sign == "count-page") {
        Object.assign(this.formObj.form, pageForm);
      } else {
        this.tableRef?.clearSelection?.();
        Object.assign(this.formObj.form, pageForm, { CurrentPage: 1 });
        this.pager.currentChange(1);
      }
    }

    this.api
      .getData(this.formObj.form)
      .then((res) => {
        // this.tableRef.clearSelection();
        const { Items, Count } = res;
        this.tableData = Items;
        if (this.loadedCallback) {
          this.loadedCallback(res, this.formObj.form);
        }
        if (this.pager) {
          this.pager.Total = Number(Count);
        }

        // 请求平滑处理
        let endTimeStamp = new Date().getTime();
        if (startTimeStamp + 500 > endTimeStamp) {
          setTimeout(() => {
            this.loading = false;
          }, startTimeStamp + 500 - endTimeStamp);
        } else {
          this.loading = false;
        }
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  };
  // 数据加载完毕回调
  setCallBack = (fn) => {
    this.loadedCallback = fn;
  };
  // 填入数据
  setData = (data) => {
    this.tableData = data;
  };
  // 参数校验 接口必须实现getData方法
  typeCheck() {
    if (this.api.getData) return;
    console.error("在API类中必须实现getData方法，并且返回值为promise对象");
  }
  reset = () => {
    // 重置表单
    // this.form = JSON.parse(this.copyForm);
    this.formObj.reset();
    // this.formObj.form = JSON.parse(this.copyForm);
    // 重置分页参数 并重新查询
    this.pager.pageReset();
  };
  reRender = () => {
    this.tableShow = false;
    setTimeout(() => {
      this.tableShow = true;
    });
  };
  doLayout = () => {
    // this.tableRef?.doLayout?.()
    debounce(() => {
      this.tableRef && this.tableRef.doLayout();
    });
  };
  setPropMap = (props) => {
    let row_summary_props_map = [];
    let filterForm = {};
    props.tableSchema.forEach((item, index) => {
      if (item?.commonConfig?.summary) {
        row_summary_props_map.push({
          prop: item.prop,
          unit: item.commonConfig?.unit ?? "",
        });
      }
      filterForm[item.prop] = "";
    });
    this.filterForm = filterForm;
    this.row_summary_props_map = row_summary_props_map;
  };
  // 向后插入
  push = (dataList) => {
    this.tableData = [...this.tableData, ...dataList];
  };
  // 获取表格数据
  getTableData = () => {
    return this.tableData;
  };
  // 非空校验 选中数据
  hasSelectData = (showTip = false, tip = "请选择数据") => {
    if (showTip && this.selectData.datas.length == 0) {
      Message.warning(tip);
    }
    return this.selectData.datas.length !== 0;
  };
  // 删除
  delItem = (index) => {
    this.tableData.splice(index, 1);
  };
  // 合计方式
  getTableSummaries = (params) => {
    return getTableSummaries(params, this.row_summary_props_map);
  };
  selectable = (row, index) => {
    return true;
  };
}

export default Table;
