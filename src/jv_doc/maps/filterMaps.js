/*
 * @Author: C.
 * @Date: 2021-08-13 10:37:49
 * @LastEditTime: 2024-05-22 14:16:56
 * @Description: file content
 */
import i18n from "@/i18n/i18n";
import { timeFormat } from "../utils/time";
import { amountFormat, thousandthFormat } from "../utils/handleData";
import { any2rate } from "../utils/handleData";
import { enumFilter } from "@/enum/workModule";
import { imgUrlsPlugin } from "../utils/system/imgUrlPlugin";
export const filterMaps = {
  default: {
    type: "default",
    name: i18n.t("Generality.Ge_Default"),
    func: (e) => e,
  },
  date: {
    type: "date",
    name: i18n.t("Generality.Ge_DateFormat"),
    // 适配自定义日期格式
    func: timeFormat,
  },
  amount: {
    type: "amount",
    name: i18n.t("setup.ThousandSeparatorAndKeepTwoDecimalPlaces"),
    func: amountFormat,
  },
  time: {
    type: "time",
    name: i18n.t("setup.Time"),
    func: (e) => {
      return timeFormat(e, "yyyy-MM-dd hh:mm");
    },
  },
  rate: {
    type: "rate",
    name: i18n.t("setup.Percentage"),
    func: any2rate,
  },
  thousandth: {
    type: "thousandth",
    name: i18n.t("setup.Thousands"),
    func: thousandthFormat,
  },
  bizMap: {
    type: "bizMap",
    name: "枚举",
    func: enumFilter,
  },
  image: {
    type: "image",
    name: "图片",
    func: imgUrlsPlugin,
  },
};
export const datafilter = (type, data) => {
  return filterMaps[type].func(data);
};
