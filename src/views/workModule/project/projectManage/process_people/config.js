export const tableConfig = [
    // 实际开始
    {
        prop: "ActualStart",
        label: i18n.t("Generality.Ge_ActualStart"),
        filter: 'time',
        width: '140px'
    },
    // 实际结束
    {
        prop: "ActualEnd",
        label: i18n.t("Generality.Ge_ActualEnd"),
        filter: 'time',
        width: '140px'
    },
    // 实际工时
    {
        prop: "ActualTime",
        label: i18n.t("Generality.Ge_ActualTime"),
    },
    // 负责人
    {
        prop: "Worker",
        label: i18n.t("project.Pro_Worker"),
        width: '100px'
    },
    // 报工日期
    {
        prop: "CreationDate",
        label: i18n.t("production.Pr_ReportedDate"),
        filter: 'time',
        width: '140px'
    },
    // 备注
    {
        prop: "Remarks",
        label: i18n.t("Generality.Ge_Remarks"),
    },
]

