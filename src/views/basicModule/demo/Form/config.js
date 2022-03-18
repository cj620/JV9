/*
 * @Author: C.
 * @Date: 2021-09-13 16:59:03
 * @LastEditTime: 2022-01-21 17:15:21
 * @Description: file content
 */
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { getAllRole } from "@/api/basicApi/systemSettings/role";

export const formSchema = [
  {
    prop: "Date44545",
    label: "基础输入框",
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Date4458845",
    label: "基础输入框(带图标)",
    cpn: "FormInput",
    options: {
      // 前置图标
      prefixIcon: "el-icon-date",
      // 后置图标
      // suffixIcon:'el-icon-search'
    },
  },
  {
    prop: "Date87874458845",
    label: "输入框(前后置插槽)",
    cpn: "FormInput",
    options: {
      prefixSlot: {
        label: "Http://",
      },
      suffixSlot: {
        label: ".com",
      },
    },
  },
  {
    prop: "Date4454hjj5",
    label: "文本框",
    cpn: "FormInput",
    type: "textarea",
    options: {
      // 是否展示文字长度限制
      showWordLimit: true,
      // 长度限制
      maxlength: 30,
    },
  },
  {
    prop: "slotTest",
    label: "自定义插槽",
    custom: true,
    rules: [
      {
        required: true,
        message: i18n.t(""),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Keyword1",
    label: "异步树形下拉框",
    cpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      tree: true,
      treeProps: {
        children: "children",
        keyName: "departmentName",
        valueName: "id",
      },
    },
    rules: [
      {
        required: true,
        message: "请选择请假类型",
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Keywor2881",
    label: "异步下拉框",
    cpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      keyName: "departmentName",
      valueName: "id",
    },
  },
  {
    prop: "dsdfhhf",
    label: "多选下拉框",
    cpn: "SyncSelect",
    api: getAllRole,
    type: "multiple",
    apiOptions: {
      keyName: "roleName",
      valueName: "id",
    },
  },
  {
    prop: "Keywor288188",
    label: "同步下拉框",
    cpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      // 立即调接口
      immediate: true,
      keyName: "departmentName",
      valueName: "id",
      // 是否清空缓存请求数据 默认false
      clearCache:false
    },
  },
  {
    prop: "Keyword999",
    label: "静态下拉框",
    cpn: "FormSelect",
    hidden: true,
    options: {
      list: [
        {
          value: "请假",
          label: "请假",
        },
        {
          value: "调休",
          label: "调休",
        },
      ],
    },
  },
  {
    prop: "Date7844545",
    label: "时间选择",
    cpn: "SingleTime",
    rules: [
      {
        required: true,
        message: i18n.t(""),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Progress",
    label: "进度",
    cpn: "Slider",
    default: 0,
  },
  {
    prop: "Date784478545",
    label: "时间范围",
    cpn: "DateRange",
    rules: [
      {
        required: true,
        message: i18n.t(""),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Date7844785457",
    cpn: "TimePicker",
    label: "时间范围",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
    cpnProps: {
      isRange: true,
      valueFormat: "HH:dd:ss",
    },
  },
  {
    prop: "Date44545we",
    label: "单选框",
    cpn: "FormRadio",
    default: "0",
    rules: [
      {
        required: true,
        message: i18n.t(""),
        trigger: ["change", "blur"],
      },
    ],
    options: {
      list: [
        {
          value: "0",
          label: "请假",
        },
        {
          value: "1",
          label: "调休",
        },
      ],
    },
  },
  {
    prop: "Date4458845we",
    label: "单选框(按钮形)",
    cpn: "FormRadio",
    type: "button",
    default: 1,
    rules: [
      {
        required: true,
        message: i18n.t(""),
        trigger: ["change", "blur"],
      },
    ],
    options: {
      list: [
        {
          value: 0,
          label: "请假",
        },
        {
          value: 1,
          label: "调休",
        },
      ],
    },
  },
  {
    prop: "Date4458845445we",
    label: "复选框(带默认值)",
    cpn: "FormCheckBox",
    default: [0, 1],
    rules: [
      {
        required: true,
        message: i18n.t(""),
        trigger: ["change", "blur"],
      },
    ],
    options: {
      list: [
        {
          value: 0,
          label: "请假",
        },
        {
          value: 1,
          label: "调休",
        },
      ],
    },
  },
  {
    prop: "Date445844845445we",
    label: "复选框（按钮形）",
    cpn: "FormCheckBox",
    type: "button",
    rules: [
      {
        required: true,
        message: i18n.t(""),
        trigger: ["change", "blur"],
      },
    ],
    options: {
      list: [
        {
          value: 0,
          label: "请假",
        },
        {
          value: 1,
          label: "调休",
        },
      ],
    },
  },
];
export const formSchema2 = [
  {
    prop: "input11",
    label: "基础输入框1",
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t(""),
        trigger: ["change", "blur"],
      },
    ],
    cpnProps: {
      disabled: true,
    },
  },
  {
    prop: "input7811",
    label: "基础输入框2",
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t(""),
        trigger: ["change", "blur"],
      },
    ],
  },
];
