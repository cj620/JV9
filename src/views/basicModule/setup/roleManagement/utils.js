/*
 * @Author: H.
 * @Date: 2021-11-22 18:06:49
 * @LastEditTime: 2022-01-20 18:39:47
 * @Description:
 */

import i18n from "@/i18n/i18n";
// 平铺数据
export function fn(source, value) {
  let res = [];
  source.forEach((el) => {
    if (value) {
      el.PermissionValue = value;
    }
    res.push(el);
    el.Children && res.push(...fn(el.Children, value));
  });
  return res;
}

// 中英文切换
export function translation(data) {
  function toggle(data) {
    const List = data.map((item, index) => {
      return {
        BillKey: i18n.t("menu." + item.PermissionId),
        PermissionValue: 1,
        PermissionId: item.PermissionId,
        Children: toggle(item.Children),
      };
    });
    return List;
  }
  return toggle(data);
}

export function getPermission(source, rolePermission) {
  source.forEach((item) => {
    if (rolePermission.length > 0) {
      rolePermission.forEach((p) => {
        if (p.PermissionId === item.PermissionId) {
          item.PermissionValue = p.PermissionValue;
        }
      });
      item.Children && getPermission(item.Children, rolePermission);
    }
  });
}
