import i18n from "@/i18n/i18n";
import { AlgorithmTypeEnum } from "@/enum/workModule/production/AlgorithmTypeEnum";

export const formSchema = [
  {
    prop: "StartDate",
    label: i18n.t("production.Pr_StartScheduleTime"),
    cpn: "SingleTime",
    rules: [
      {
        required: true,
        message: i18n.t("production.Pr_PleaseSelectStartScheduleTime"),
        trigger: ["change", "blur"],
      },
    ],
  },
  // 算法类型
  {
    prop: "SchedulingType",
    label: i18n.t("production.Pr_SchedulingAlgorithmSelection"),
    // 算法描述
    toolTip: AlgorithmTypeEnum.getEnums().map(obj => obj.description),
    // toolTip: [
    //   i18n.t("production.Pr_ClassicalAlgorithmDes"),
    //   i18n.t("production.Pr_MinimumWorkingPeriodDes"),
    //   i18n.t("production.Pr_EarliestDeliveryDateDes"),
    //   i18n.t("production.Pr_CRDes"),
    // ],
    cpn: "FormRadio",
    default: 0,
    options: {
      list: AlgorithmTypeEnum.getEnums(),
    },
  },
];
