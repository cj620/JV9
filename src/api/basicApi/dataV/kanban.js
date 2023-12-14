
import request from "@/utils/request";
import { exp } from "qrcode/lib/core/galois-field";
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
// 销售看板
export function sales_dashboard(){
    return request({
        url: "/data_report/sales_dashboard",
        method: "get",
    })
}

// 品质部门看板
export function quality_department_dashboard(){
    return request({
        url: "/data_report/quality_department_dashboard",
        method: "get",
    })
}

// 模具综合看板
export function comp_operations_dashboard(){
    return request({
        url: "/data_report/comp_operations_dashboard",
        method: "get",
    })
}


