/*
 * @Author: your name
 * @Date: 2021-11-17 09:05:32
 * @LastEditTime: 2022-01-25 10:00:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\jv_doc\utils\system\pagePlugin.js
 */
// 引入单据状态的枚举
import { stateEnum } from "@/enum/workModule";
import { printPlugin } from "./printPlugin";
// 表格页表格操作行按钮控制
export function listTableBtnModel($el){
  let { datas,keys } = $el.tableObj.selectData;

  return [
    // 新增按钮
    {
      label: i18n.t('Generality.Ge_New'),
      confirm: l_add.bind($el),
    },
    // 删除按钮
    {
      label: i18n.t('Generality.Ge_Delete'),
      disabled: canIsDel(datas),
      popConfirm: {
        title: i18n.t('Generality.Ge_DeleteConfirm'),
        confirm: l_delete.bind($el,keys),
      },
    },
    // 快速打印
    // 新增按钮
    // {
    //   label: '快速打印',
    //   confirm: l_fastPrint.bind($el,keys),
    // },
  ]
}
// 表格页表格操作列按钮控制
export function listTableColBtnModel($el,row){
    return [
      // 编辑按钮
      {
        label: i18n.t('Generality.Ge_Edit'),
        confirm: l_edit.bind($el, row.BillId),
        disabled: getActionState(row.State, 'edit'),
      },
      // 删除按钮
      {
        label: i18n.t('Generality.Ge_Delete'),
        disabled: getActionState(row.State, 'del'),
        popConfirm: {
          title: i18n.t('Generality.Ge_DeleteConfirm'),
          confirm: l_delete.bind($el, [row.BillId]),
        },
      },
    ]
}
// 是否可以被批量删除
function canIsDel(datas) {
  if (datas.length === 0) return true;
  return datas.some((item) => {
    return !["Rejected", "Unsubmitted"].includes(item.State);
  });
}
// 删除单据
function l_delete(ids) {
  this.tableObj.api.del({ BillIds: ids }).then((_) => {
    this.tableObj.getData();
  });
}
// 编辑
function l_edit(BillId) {
  this.tableObj.api.editLock({ BillId }).then((res) => {
    this.$router.push({
      name: this.EditRoute,
      query: { BillId,type:'edit' },
    });
  });
}
 //新增
function l_add() {
  console.log(this.AddRoute,888888888888888);
  this.$router.push({
    name: this.AddRoute,
    params: { type: "add", title: this.AddRoute },
  });
}
// 获取按钮状态
function getActionState(state, type) {
  return !stateEnum[state]?.operation?.[type]
}

function l_fastPrint(keys){
  if(!this.EditRoute) return
  // 这一步有系统性风险 (可在页面里)
  printPlugin({
          ids: keys,
          category:this.tableObj.props.printMod ,
          fast:true
        });

}