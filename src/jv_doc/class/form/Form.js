/*
 * @Author: C.
 * @Date: 2021-09-16 09:03:38
 * @LastEditTime: 2022-03-07 14:31:22
 * @Description: file content
 */
import { setDefaultFormProps } from "../utils/setDefaultProp";
import { formCheck } from "../utils/formCheck";
import { Message } from "element-ui";
import { i18n } from "element-ui/lib/locale";
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
  constructor(props) {
    // 初始化props
    this.initProps(props);
    // 备份form
    this.copyForm = JSON.stringify(this.form);
  }
  initProps = (props) => {
    // 填充默认参数
    const resultProps = setDefaultFormProps(props);
    if (props.formSchema) {
      this.form = this.createForm(resultProps);
      this.rules = this.createRules(props.formSchema);
      this.formSchema = props.formSchema;
    }
    this.props = resultProps;
  };
  // 创建form实例e
  createForm = (props) => {
    // form判空
    if (!props.formSchema) return props.defaultForm;
    const form = {};
    props.formSchema.forEach((formItem) => {
      form[formItem.prop] = formItem?.default ?? "";
    });
    return Object.assign({},  form,props.defaultForm);
  };
  // 创建校验规则实例e
  createRules = (formSchema) => {
    if (!formSchema) return {};
    const rules = {};
    formSchema.forEach((formItem) => {
      if (formItem.rules) {
        rules[formItem.prop] = formItem.rules;
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
        // console.log(res);
        func(true);
      })
      .catch((err) => {
        func(false);
        Message({
          type: "warning",
          message: i18n.t("Generality.Ge_PleaseCompleteTheFormAsRequired"),
        });
      });
  };
  // 重置
  reset = () => {
    //  this.formRef.resetFields()
    if (this.formRef) {
      this.formRef.resetFields();
    } else {
      this.form = JSON.parse(this.copyForm);
    }
  };
  // 添加字段
  addField = (fieldObj) => {
    this.formSchema.push(fieldObj);
  };
  // 全部提交校验
  submitAll = formCheck;
}
export default Form;
