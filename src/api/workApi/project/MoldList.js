import request from "@/utils/request";

export function getProject_tooling_list(data) {
    return request({
        url: "/project_info/tooling_list",
        method: "post",
        data,
    });
}
