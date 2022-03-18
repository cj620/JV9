/*
 * @Author: C.
 * @Date: 2021-08-04 16:34:36
 * @LastEditTime: 2022-01-17 11:33:22
 * @Description: file content
 */
// 字体对齐反枚举

import i18n from "@/i18n/i18n";
export const fontLayout = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

// 字体对齐
export const alignArr = [
  {
    label: i18n.t("setup.Left"),
    value: "left",
  },
  {
    label: i18n.t("setup.Middle"),
    value: "center",
  },
  {
    label: i18n.t("setup.Right"),
    value: "right",
  },
];
// 加粗
export const boldArr = [
  {
    label: i18n.t("setup.Bold"),
    value: "bold",
  },
  {
    label: i18n.t("Generality.Ge_Default"),
    value: "normal",
  },
];

export const defaultSize = {
  // 二维码
  qrcode: [80, 80],
  // 值
  value: [100, 30],
  // 标签
  label: [100, 30],
  // 图片
  image: [100, 100],
  // 插图
  insertImg: [100, 100],
};
