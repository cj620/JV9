/*
 * @Author: C.
 * @Date: 2021-09-16 09:03:38
 * @LastEditTime: 2023-07-11 17:02:24
 * @Description: file content
 */
import { setDefaultFormProps } from "../utils/setDefaultProp";
import {
  formCheck,
  setDefaultValue,
  setDefaultSchema,
  set_label,
} from "../utils/formHelp";
import { EventBus } from "../event/EventBus";
import { Message } from "element-ui";
import i18n from "@/i18n/i18n.js";
class Form {
  // 表单内容
  form = {};
  // 表单结构
  formSchema = null;
  // 表单参数
  props = null;
  // 校验规则
  rules = {};
  // 表单引用
  formRef = null;
  copyForm = null;
  useType = "form";
  changeCallback = () => {};
  constructor(props) {
    // 初始化props
    this.initProps(props);
    // 备份form
    this.copyForm = JSON.stringify(this.form);
    this.eventBus = new EventBus();
  }
  initProps = (props) => {
    // 填充默认参数
    const resultProps = setDefaultFormProps(props);
    this.useType = resultProps.useType;
    if (props.formSchema) {
      this.form = this.createForm(resultProps);
      // console.log(this.form, 22222);
      this.rules = this.createRules(props.formSchema);
      this.formSchema = setDefaultSchema(props.formSchema);
    }
    this.props = resultProps;
  };
  // 创建form实例e
  createForm = (props) => {
    // form判空
    if (!props.formSchema) return props.defaultForm;
    const form = {};
    props.formSchema.forEach((formItem) => {
      // form[formItem.prop] = formItem?.default ?? "";
      setDefaultValue(form, formItem);
    });
    return Object.assign({}, form, props.defaultForm);
  };
  // 创建校验规则实例e
  createRules = (formSchema) => {
    if (!formSchema) return {};
    const rules = {};
    formSchema.forEach((formItem) => {
      if (formItem.rules) {
        rules[formItem.prop] = formItem.rules.map((item) => {
          // console.log(item,2244);
          // 重新包装validator函数 抛出动态的form数据
          if (item?.validator) {
            return {
              ...item,
              validator: (a, b, c) => {
                item.validator(a, b, c, this.form);
              },
            };
          } else {
            return item;
          }
        });
      }
    });
    return rules;
  };
  // 校验
  validate = (func = () => {}) => {
    if (!this.formRef) return;
    this.formRef
      .validate()
      .then((res) => {
        console.log(true, 999);
        func(true);
      })
      .catch((err) => {
        func(false);
        console.error(err);
        Message({
          type: "warning",
          message: i18n.t("Generality.Ge_PleaseCompleteTheFormAsRequired"),
        });
      });
  };
  // 重置
  reset = () => {
    // console.log(this.form, JSON.parse(this.copyForm));
    this.form = JSON.parse(this.copyForm);
    // 重置_label
    if (this.useType == "table") {
      this.formSchema.forEach((formItem) => {
        // form[formItem.prop] = formItem?.default ?? "";
        if (formItem?.default) {
          if (!["SyncSelect", "AsyncSearch"].includes(formItem.cpn)) {
            let staticList = formItem?.options?.list ?? false;
            if (staticList && formItem.default) {
              let res = staticList.find(
                (item) => item.value == formItem.default
              );
              if (res) {
                formItem._label = res.label;
              }
              return;
            }
            formItem._label = formItem.default;
          }
        }
      });
    }
  };
  // 添加字段
  addField = (fieldObj) => {
    this.formSchema.push(fieldObj);
  };
  setForm = (form = {}) => {
    // console.log(form, 7777);
    // set_label
    if (!form) return;
    Object.keys(form).forEach((keyField) => {
      let schemaItem = this.formSchema.find((item) => item.prop == keyField);
      if (keyField && schemaItem) {
        setDefaultValue(this.form, schemaItem, form[keyField]);
      }
    });
  };
  // 全部提交校验
  submitAll = formCheck;
  // todo: 表单改变抓取 公共事件

  // todo: shcema 事件修改
  setSchema = (schemaItem = {}) => {
    if (!schemaItem.prop) {
      console.error("setSchema的入参错误");
      return;
    }
    this.formSchema.forEach((item) => {
      if (item.prop == schemaItem.prop) {
        Object.assign(item, schemaItem);
      }
    });
  };
  setFormChange = (cb) => {
    this.changeCallback = cb;
  };
}
export default Form;
