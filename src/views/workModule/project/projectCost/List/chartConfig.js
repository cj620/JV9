/*
 * @Author: C.
 * @Date: 2021-12-21 11:36:50
 * @LastEditTime: 2022-01-25 11:10:05
 * @Description: file content
 */

import i18n from "@/i18n/i18n";
export const getBarChartOption = (res) => {
  let { ActualCost, PlanCost } = res;
  let source = [
    [
      "product",
      i18n.t("project.Pro_PlannedCost"),
      i18n.t("project.Pro_ActualCost"),
    ],
    //
    [i18n.t("Generality.Ge_Items"), PlanCost.Material, ActualCost.Material],
    [
      i18n.t("project.Pro_Production"),
      PlanCost.Production,
      ActualCost.Production,
    ],
    [
      i18n.t("project.Pro_Outsource"),
      PlanCost.Outsourcing,
      ActualCost.Outsourcing,
    ],
    [
      i18n.t("stockroom.St_TrialMold"),
      PlanCost.TrialTooling,
      ActualCost.TrialTooling,
    ],
  ];

  return {
    legend: {
      bottom: 10,
    },
    tooltip: {},
    dataset: {
      source: source,
    },
    xAxis: { type: "category" },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: "bar" }, { type: "bar" }],
  };
};

export const getPieChartOption = (res, type) => {
  let { Material, Outsourcing, Production, TrialTooling } = res;
  return {
    title: {
      text:
        type == "PlanCost"
          ? i18n.t("project.Pro_PlannedCost")
          : i18n.t("project.Pro_ActualCost"),
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: 20,
    },
    series: [
      {
        // name: '计划成本',
        type: "pie",
        radius: "50%",
        data: [
          { value: Material, name: i18n.t("Generality.Ge_Items") },
          { value: Production, name: i18n.t("project.Pro_Production") },
          { value: Outsourcing, name: i18n.t("project.Pro_Outsource") },
          { value: TrialTooling, name: i18n.t("stockroom.St_TrialMold") },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
};
