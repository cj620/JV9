/*
 * @Author: your name
 * @Date: 2021-11-25 13:40:20
 * @LastEditTime: 2023-07-21 10:21:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\jv_doc\utils\system\detailPlugin.js
 */
import optionsBtnPlugin from "./optionsBtnPlugin";
import auditPlugin from "./auditPlugin";
import { stateEnum } from "@/enum/workModule";
import { printPlugin } from "./printPlugin";
import modal from "./modelPlugin";
import Remark from "@/components/WorkModule/Remark";
import router from "@/router";
import i18n from "@/i18n/i18n";
// 详情页按钮控制

export function detailPageModel($el, optionsState, API, callBack) {
  let { BillId, State } = optionsState;
  let btnMap = auditPlugin(optionsState);
  let stateMap = stateEnum[State];
  const optionsBtn = [
    // 提交
    {
      label: i18n.t("Generality.Ge_Submit"),
      disabled: !btnMap.submit,
      // confirm: API.api_submit.bind(null, BillId),
      confirm: doCallback(API.api_submit, { BillId }, callBack),
    },
    // 撤回
    {
      label: i18n.t("Generality.Ge_Withdraw"),
      disabled: !btnMap.withdraw,
      // doRemark
      confirm: doRemark(API.api_withdraw, { BillId }, callBack),
    },
    // 审核
    {
      label: i18n.t("Generality.Ge_Approve"),
      disabled: !btnMap.audit,
      confirm: doCallback(API.api_audit, { BillId }, callBack),
    },
    // 拒绝
    {
      label: i18n.t("Generality.Ge_Reject"),
      disabled: !btnMap.reject,
      confirm: doRemark(API.api_reject, { BillId }, callBack),
    },
    // 编辑
    {
      label: i18n.t("Generality.Ge_Edit"),
      disabled: !btnMap.edit,
      confirm: doEdit({ BillId }, $el),
    },
    // 删除
    {
      label: i18n.t("Generality.Ge_Delete"),
      disabled: !btnMap.delete,
      popConfirm: {
        title: i18n.t("Generality.Ge_DeleteConfirm"),
        // doDelete
        confirm: doDelete(API.api_delete, { BillIds: [BillId] }, $el),
      },
    },
    {
      label: "复制",
      // disabled: !$el.addRouteName,
      confirm: doCopy({ BillId }, $el),
    },
    // 打印
    {
      label: i18n.t("Generality.Ge_Print"),
      // 如果页面中有d_print方法，则优先执行
      confirm: () => {
        printPlugin({
          ids: [BillId],
          category: $el.printMod,
        });
      },
    },
  ];
  if (optionsBtnPlugin[$el.printMod] && optionsBtnPlugin[$el.printMod].IsVoid) {
    // 作废
    optionsBtn.push({
      label: i18n.t("Generality.Ge_Discard"),
      disabled: !stateMap.operation.discarded,
      // 如果页面中有d_print方法，
      popConfirm: {
        title: i18n.t("Generality.Ge_WhetherInvalid"),

        confirm: doCallback(API.api_discard, { BillId }, callBack),
      },
    });
  }

  return optionsBtn;
}
function doCallback(api, params, callBack) {
  return function () {
    console.log(api, params, callBack);
    api(params).then((_) => {
      callBack();
    });
  };
}
function doRemark(api, params, callBack) {
  return function () {
    let modelObj = modal({
      // 弹窗内嵌套组件传递属性
      componentProps: {},
      // 弹窗内嵌套组件
      component: Remark, //同步
      // 弹窗属性设置
      props: {
        title: i18n.t("Generality.Ge_AuditingRemarks"),
        width: "35%",
      },
      // 事件回调
      methods: {
        confirm: (e) => {
          api(Object.assign({ Remarks: e }, params)).then((res) => {
            modelObj.close();
            callBack();
          });
        },
        close() {
          modelObj.close();
        },
      },
    });
  };
}
function doDelete(api, params, $el) {
  return function () {
    api(params).then((_) => {
      $el.$store.dispatch("tagsView/delView", $el.$route);
      $el.$router.go(-1);
    });
  };
}
function doEdit(params, $el) {
  return function () {
    console.log($el.editRouteName);
    router.push({
      name: $el.editRouteName,
      query: Object.assign({ type: "edit" }, params),
    });
  };
}

function doCopy(params, $el) {
  return function () {
    // console.log($el.editRouteName);
    router.push({
      name: $el.addRouteName,
      query: Object.assign({ type: "copy" }, params),
    });
  };
}
