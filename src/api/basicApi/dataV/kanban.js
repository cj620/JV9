
import request from "@/utils/request";
// 设备综合看板
export function equipment_comprehensive_dashboard() {
    return request({
        url: "/data_report/equipment_comprehensive_dashboard",
        method: "get",
    });
}
// 部门综合看板
export function department_comprehensive_dashboard(){
    return request({
      url: "/data_report/department_comprehensive_dashboard",
      method: "get",
    })
}
