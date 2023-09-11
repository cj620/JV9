
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

// 加工（NC）部门看板
export function processing_department_kanban(data){
    return request({
        url: "/data_report/processing_department_kanban",
        method: "post",
        data
    })
}


