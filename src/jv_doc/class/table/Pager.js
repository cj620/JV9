/*
 * @Author: C.
 * @Date: 2021-06-04 08:56:01
 * @LastEditTime: 2023-08-18 10:13:42
 * @Description: file content
 */
class pager {
  // 分页参数
  pageSize = 20;
  // 当前页
  page = 1;
  // 数据总量
  Total = 1;
  // 尺寸选项
  Sizes = [5, 10, 15, 20, 30, 50];
  // 显示模式
  Layout = "total, sizes, prev, pager, next, jumper";
  // 回调函数
  _callBackFunc = null;

  constructor(callBack) {
    this._callBackFunc = callBack;
  }
  // 改变当前页大小
  sizeChange = (size) => {
    this.pageSize = size;
    this.emitPageForm();
    // console.log(size, 'size')
  };
  // 改变当前页数
  currentChange = (options) => {
    if (typeof options === "boolean") {
      options ? (this.page += 1) : (this.page += 1);
    } else if (typeof options === "number") {
      this.page = options;
    } else {
      console.error(
        "changeCurrentPage 接收的参数无效,参数可以为boolean、number，number为题跳转的页数，boolean为true为上一页，否则下一页"
      );
    }
    this.emitPageForm();
    // console.log(options,'options');
  };
  // 抛出分页事件
  emitPageForm = () => {
    const form = {
      PageSize: this.pageSize,
      CurrentPage: this.page,
    };
    this._callBackFunc(form, "count-page");
    // console.log(this,'form');
  };
  pageReset = () => {
    // 分页参数
    this.pageSize = 20;
    // 当前页
    this.page = 1;
    // 数据总量
    this.Total = 1;
    this.emitPageForm();
  };
  isLast = () => {
    return this.page * this.pageSize >= this.Total;
  };
}
export default pager;
