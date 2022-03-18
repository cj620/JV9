import request from "@/utils/request";

export function getMenuFunction() {
  return request({
    url: "/ba_menu_function/list",
    method: "get"
  });
}
