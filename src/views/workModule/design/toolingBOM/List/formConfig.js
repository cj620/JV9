export const createTaskFormSchema = [
    {
        // 任务单号
        prop: "PmTaskBillId",
        cpn: "SyncSelect",
        label: i18n.t("project.Pro_TaskSheetNo"),

        custom: true,
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseEnter"),
                trigger: ["change", "blur"],
            },
        ],
    },
    {
        // 计划开始
        prop: "PlanStart",
        cpn: "SingleTime",
        label: i18n.t("Generality.Ge_PlanStart"),
        custom: true,
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseEnter"),
                trigger: ["change", "blur"],
            },
        ],
    },
    {
        // 计划结束
        prop: "PlanEnd",
        cpn: "SingleTime",
        label: i18n.t("Generality.Ge_PlanEnd"),
        custom: true,
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseEnter"),
                trigger: ["change", "blur"],
            },
        ],
    },
    {
        // 级别
        prop: "Level",
        label: i18n.t("Generality.Ge_Level"),
        cpn: "FormSelect",
        options: {
            list: [
                {
                    value: "Ordinary",
                    label: i18n.t("Generality.Ge_Ordinary"),
                },
                {
                    value: "Urgent",
                    label: i18n.t("Generality.Ge_Urgent"),
                },
                {
                    value: "ExtraUrgent",
                    label: i18n.t("Generality.Ge_ExtraUrgent"),
                },
            ],
        },
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseEnter"),
                trigger: ["change", "blur"],
            },
        ],
    },
]
