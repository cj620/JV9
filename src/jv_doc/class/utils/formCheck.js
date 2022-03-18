/*
 * @Author: C.
 * @Date: 2021-09-22 16:39:07
 * @LastEditTime: 2021-09-22 17:38:11
 * @Description: file content
 */
export const formCheck=async (checkList=[],callBack=()=>{})=>{
let promiseList=[]
checkList.forEach(item=>{
  promiseList.push(
    new Promise(
      (r,e)=>{
        item(valid=>{
          r(valid)
        })
      }
    )
  )
})
const resultList = await Promise.all(promiseList)
  callBack(!resultList.includes(false))
}
