/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2022-06-03 17:54:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */
import { ScrapCategoryEnum, enumToList } from "@/enum/workModule";

export const formSchema = [
  //设备编号
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  //设备名称
  {
    prop: "DeviceName",
    label: i18n.t("production.Pr_DeviceName"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  //报废日期

  {
    prop: "ScrapDate",
    label: i18n.t("device.De_ScrapDate"),
    cpn: "SingleDateTime",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  //报废类别
  {
    prop: "ScrapCategory",
    label: i18n.t("device.De_ScrapCategory"),
    cpn: "FormSelect",
    options: {
      list: enumToList(ScrapCategoryEnum),
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },


];
