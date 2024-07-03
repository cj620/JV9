/*
 * @Author: H.
 * @Date: 2021-11-03 15:00:30
 * @LastEditTime: 2024-07-03 09:53:18
 * @Description:
 */
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { getAllRole } from "@/api/basicApi/systemSettings/role";
import { checkPhone } from "@/utils/validate";
export const formSchema = [
  {
    prop: "UserId",
    label: i18n.t("setup.UserId"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
    custom: true,
  },
  {
    prop: "UserName",
    label: i18n.t("setup.UserName"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
    custom: true,
  },
  {
    prop: "DepartmentName",
    label: i18n.t("menu.Se_Department"),
    cpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      tree: true,
      treeProps: {
        children: "Children",
        keyName: "Department",
        valueName: "Department",
      },
    },
  },
  {
    prop: "Sex",
    label: i18n.t("setup.Sex"),
    cpn: "FormRadio",
    default: "Male",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
    options: {
      list: [
        {
          value: "Male",
          label: i18n.t("setup.Male"),
        },
        {
          value: "Female",
          label: i18n.t("setup.Female"),
        },
      ],
    },
  },
  {
    prop: "Activate",
    label: i18n.t("Generality.Ge_WhetherToActivate"),
    cpn: "FormRadio",
    default: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
    options: {
      list: [
        {
          value: true,
          label: i18n.t("Generality.Ge_Yes"),
        },
        {
          value: false,
          label: i18n.t("Generality.Ge_No"),
        },
      ],
    },
  },
  {
    prop: "DefaultDepot",
    label: "操作仓库",
    cpn: "FormInput",
  },
  // {
  //   prop: "LoginDate",
  //   label: "最近登录时间",
  //   cpn: "SingleTime",
  // },
  {
    prop: "Fax",
    label: "传真",
    cpn: "FormInput",
  },
];

export const formSchema1 = [
  {
    prop: "Birthday",
    label: i18n.t("setup.Birthday"),
    cpn: "SingleTime",
  },
  {
    prop: "Mail",
    label: i18n.t("setup.Mail"),
    cpn: "FormInput",
    rules: [
      {
        type: "email",
        message: i18n.t(
          "Generality.Ge_PleaseInputEmailAddressWithCorrectFormat"
        ),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Tel",
    label: i18n.t("setup.Tel"),
    cpn: "FormInput",
  },
  {
    prop: "Phone",
    label: i18n.t("setup.Phone"),
    cpn: "FormInput",
    rules: [
      {
        validator: checkPhone,
        trigger: ["change", "blur"],
      },
    ],
  },

  {
    prop: "FamilyAddress",
    label: i18n.t("setup.FamilyAddress"),
    cpn: "FormInput",
  },

  {
    prop: "UseWeixin",
    label: "微信邮件",
    cpn: "FormRadio",
    options: {
      list: [
        {
          value: true,
          label: i18n.t("Generality.Ge_Yes"),
        },
        {
          value: false,
          label: i18n.t("Generality.Ge_No"),
        },
      ],
    },
  },
  {
    prop: "UseMsn",
    label: "Msn邮件",
    cpn: "FormRadio",
    options: {
      list: [
        {
          value: true,
          label: i18n.t("Generality.Ge_Yes"),
        },
        {
          value: false,
          label: i18n.t("Generality.Ge_No"),
        },
      ],
    },
  },
];
