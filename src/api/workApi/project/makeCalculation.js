/*
 * @Author: H.
 * @Date: 2021-11-04 11:31:34
 * @LastEditTime: 2021-12-10 10:09:15
 * @Description:
 */
import { apiGenPlugin ,apiType} from "@/jv_doc/utils/system/apiGenPlugin";
// 项目任务
const API=apiGenPlugin('project_make_calculation',apiType.CURD)
export {
  API
}