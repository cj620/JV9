/*
 * @Author: C.
 * @Date: 2021-09-22 16:39:07
 * @LastEditTime: 2022-10-19 16:31:42
 * @Description: file content
 */
export const formCheck = async (checkList = [], callBack = () => {}) => {
  let promiseList = [];
  checkList.forEach((item) => {
    promiseList.push(
      new Promise((r, e) => {
        item((valid) => {
          r(valid);
        });
      })
    );
  });
  const resultList = await Promise.all(promiseList);
  callBack(!resultList.includes(false));
};
// SingleTime  SingleDateTime  DateRange TimePicker
let timeCpn = ["SingleTime", "SingleDateTime", "TimePicker"];

export const setDefaultValue = (form, formItem, value = undefined) => {
  let realVal = value || (formItem?.default ?? "");
  // console.log(realVal, 12333);
  form[formItem.prop] = realVal;
  if (!["SyncSelect", "AsyncSearch"].includes(formItem.cpn)) {
    let staticList = formItem?.options?.list ?? false;
    if (staticList && realVal) {
      let res = staticList.find((item) => item.value == realVal);
      if (res) {
        formItem._label = res.label;
      }
      return;
    }

    formItem._label = realVal;
  } else {
    formItem._label = realVal;
  }
};

const defaultSchemaItem = {
  _label: "",
};
export const setDefaultSchema = (schema) => {
  return schema.map((item) => {
    return Object.assign({}, defaultSchemaItem, item);
  });
};
