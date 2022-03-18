/*
 * @Author: your name
 * @Date: 2021-11-19 09:32:48
 * @LastEditTime: 2022-01-25 16:17:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\jv_doc\utils\system\apiGenPlugin.js
 */
import request from "@/utils/request";
import { apiEnum,apiFuncModule } from "@/enum/baseModule/apiEnum";
 function apiGenPlugin(moduleName='project_task',code=511){
    let apiMap={}
    for(let key in apiEnum){
      if((key&code)==key){
        let obj=apiEnum[key]
        let apiName='api_'+obj.name
        apiMap[apiName]=(data)=>{
          return request({
            url: `/${moduleName}/${obj.name}`,
            method: obj.type,
            [obj.type=='get'?'params':'data']:data,
            loading:obj.loading
          });
        }
      }

    }
    return apiMap
  }
  export {
    apiGenPlugin,
    apiFuncModule as apiType
  }
