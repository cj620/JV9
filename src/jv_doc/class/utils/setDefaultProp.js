/*
 * @Author: C.
 * @Date: 2021-09-14 15:43:31
 * @LastEditTime: 2022-09-01 10:41:29
 * @Description: file content
 */
// 默认schema 配置值
export const defaultTableSchemProp = {
  fixed: false,
  align: "left",
  filter: "default",
  show: true,
  custom: false,
};
// 默认编辑表格参数
export const defaultEditTableSchemProp = {
  // 导出按钮
  exportBar: true,
  // 导入按钮
  importBar: true,
  printBar: false,
  freshBar: false,
  // 是否高亮行
  highlightCurrentRow: false,
  // 搜索按钮
  searchBar: false,
  colBar: false,
  // 斑马线
  stripe: false,
  size: "medium",
  operationWidth: "170",
};
// 默认表格参数
export const defaultTableSchemProps = {
  // 加载动画
  elementLoadingText: "拼命加载中",
  elementLoadingSpinner: "el-icon-loading",
  elementLoadingBackground: "rgba(225, 225, 225, 0.4)",
  // 是否高亮行
  highlightCurrentRow: true,
  // 密度
  size: "mini",
  // 边框
  border: true,
  // 斑马线
  stripe: false,
  // 序号列
  sortCol: true,
  // 选择列
  chooseCol: true,
  // 分页
  pagination: true,
  // 高度
  height: "100%",
  // 表格头部展示
  tableHeaderShow: true,
  // 设置按钮
  settingBar: true,
  // 刷新按钮
  freshBar: true,
  // 密度按钮
  densityBar: true,
  // 列设置按钮
  colBar: true,
  // 导出按钮
  exportBar: true,
  // 搜索按钮
  searchBar: true,
  // 导入按钮
  importBar: false,
  // 打印按钮
  printBar: true,
  // 选择类型 单选 多选 radio 和 checkBox
  selectType: "checkBox",
  // 全屏
  fullScreenBar: false,
  // 操作列
  operationCol: true,
  // 操作列宽度
  operationWidth: "200",
  // 子节点
  treeProps: { children: "Children", hasChildren: "HasChildren" },
  // 最大高度
  maxHeight: 3000,
};
// 默认表格的表单参数
const defaultFormProp = {
  baseColProps: {
    span: 24,
  },
  gutter: 0,
  labelPosition: "top",
  defaultForm: {},
  autoFocus:false
};
// 排除表格配置的空值 并设置默认值（保证正常运行）
export function setDefaultTableSchema(tableSchema) {
  // const defaultKeys = Object.keys(defaultTableSchemProp);
  // tableSchema.map((item) => {
  //   defaultKeys.forEach((key) => {
  //     if (!item[key]) {
  //       item[key] = defaultTableSchemProp[key];
  //     }
  //   });
  // });
  for(let key in tableSchema){
    console.log(key,66655888);
    tableSchema[key]=Object.assign({},defaultTableSchemProp,tableSchema[key])
  }
}
// 处理默认值
export function setDefaultTableProps(props) {
  return Object.assign({}, defaultTableSchemProps, props);
}
// 设置编辑表格的参数
export function setDefaultEditTableProps(props) {
  return Object.assign(
    {},
    defaultTableSchemProps,
    defaultEditTableSchemProp,
    props
  );
}

// 设置表单默认值
export function setDefaultFormProps(props) {
  // console.log(props.form,11111111111);
  return Object.assign({}, defaultFormProp, props);
}
