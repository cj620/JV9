/*
 * @Author: C.
 * @Date: 2021-11-15 15:09:28
 * @LastEditTime: 2022-03-25 13:18:27
 * @Description: file content
 */

import auditPlugin from "./auditPlugin";
import { stateEnum } from "@/enum/workModule";
import { printPlugin } from "./printPlugin";

import { editLock } from "@/api/basicApi/systemSettings/billEditLock";

// 详情页按钮控制

export function detailBtnModel($el, options) {
  let { BillId, State } = options;
  let btnMap = auditPlugin(options);
  let stateMap = stateEnum[State];
  return [
    {
      label: i18n.t("Generality.Ge_Submit"),
      disabled: !btnMap.submit,
      confirm: $el.d_submit.bind(null, BillId),
    },
    {
      label: i18n.t("Generality.Ge_Withdraw"),
      disabled: !btnMap.withdraw,
      confirm: $el.d_revoke.bind(null, BillId),
    },
    {
      label: i18n.t("Generality.Ge_Approve"),
      disabled: !btnMap.audit,
      confirm: $el.d_audit.bind(null, BillId),
    },

    {
      label: i18n.t("Generality.Ge_Reject"),
      disabled: !btnMap.reject,
      confirm: $el.d_reject.bind(null, BillId),
    },
    {
      label: i18n.t("Generality.Ge_Edit"),
      disabled:!btnMap.edit,
      confirm: d_edit.bind($el, BillId),
    },
    {
      label: i18n.t("Generality.Ge_Delete"),
      disabled: !btnMap.delete,
      popConfirm: {
        title: i18n.t("Generality.Ge_DeleteConfirm"),
        confirm: $el.d_delete.bind(null, BillId),
      },
    },
    {
      label: i18n.t("Generality.Ge_Print"),
      // 如果页面中有d_print方法，则优先执行
      confirm: $el.d_print
        ? $el.d_print.bind(null, BillId)
        : () => {
            printPlugin({
              ids: [BillId],
              category: $el.printMod,
            });
          },
    },
  ];
}
// 编辑
function d_edit(BillId) {
  console.log(this, "33333");
  editLock({ BillId }).then((res) => {
    this.$router.push({
      name: this.EditRoute,
      query: { BillId },
    });
  });
}
