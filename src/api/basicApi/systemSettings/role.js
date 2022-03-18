/*
 * @Author: H.
 * @Date: 2021-10-29 08:37:23
 * @LastEditTime: 2021-11-23 17:21:56
 * @Description:
 */
import request from "@/utils/request";

// 删除角色
export function deleteRole(data) {
  return request({
    url: "/role/delete",
    method: "post",
    data,
  });
}

//获取所有角色信息
export function getAllRole() {
  return request({
    url: "/role/get_all",
    method: "get",
  });
}

//获取所有角色成员
export function getAllRoleMember(query) {
  return request({
    url: "/role/get_role_member",
    method: "get",
    params: query,
  });
}

// 编辑角色成员
export function editRoleMember(data) {
  return request({
    url: "/role/save_role_member",
    method: "post",
    data,
  });
}

// 获取菜单功能集合
export function getAllKey() {
  return request({
    url: "/sys/menu_funtion_list",
    method: "get",
  });
}

//获取所有角色信息列表
export function getAllRoleList(data) {
  return request({
    url: "/ba_role_info/list",
    method: "post",
    data,
  });
}

//根据角色编号获取角色关联的方法信息
export function getRoleAuthority(query) {
  return request({
    url: "/role/get_role_permission",
    method: "get",
    params: query,
  });
}

//编辑角色
export function editRole(data) {
  return request({
    url: "/role/save",
    method: "post",
    data,
  });
}

// 编辑角色权限
export function editRoleAuthority(data) {
  return request({
    url: "/role/save_role_permission",
    method: "post",
    data,
  });
}
