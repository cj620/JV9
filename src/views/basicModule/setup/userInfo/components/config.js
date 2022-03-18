/*
 * @Author: H.
 * @Date: 2021-11-03 15:00:30
 * @LastEditTime: 2022-01-18 17:26:34
 * @Description:
 */
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { getAllRole } from "@/api/basicApi/systemSettings/role";

export const formSchema = [
  {
    prop: "UserId",
    label: i18n.t("setup.UserId"),
    cpnProps: {
      disabled: true,
    },
    cpn: "FormInput",
  },
  {
    prop: "UserName",
    label: i18n.t("setup.UserName"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
  },
  {
    prop: "DepartmentName",
    label: i18n.t("menu.Se_Department"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
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
    cpnProps: {
      disabled: true,
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

    cpnProps: {
      disabled: true,
    },
  },
];
var checkPhone = (rule, value, callback) => {
  const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
  if (!value) return callback();
  setTimeout(() => {
    if (!Number.isInteger(+value)) {
      callback(new Error(i18n.t("setup.PleaseInputNumbers")));
    } else {
      if (phoneReg.test(value)) {
        callback();
      } else {
        callback(
          new Error(i18n.t("setup.PleaseInputPhoneNumblerWithCorrectFormat"))
        );
      }
    }
  }, 100);
};
export const formSchema1 = [
  {
    prop: "Birthday",
    label: i18n.t("setup.Birthday"),
    cpn: "SingleTime",
    cpnProps: {
      disabled: true,
    },
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
];
