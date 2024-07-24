import {apiGenPlugin, apiType} from "~/utils/system/apiGenPlugin";
import request from "@/utils/request";
const API = apiGenPlugin("trial_tooling_task", apiType.COMMON);
export { API };

// 完成试模任务
export function trial_tooling_task_completed(data) {
  return request({
    url: "/trial_tooling_task/completed",
    method: "post",
    data,
  });
}
