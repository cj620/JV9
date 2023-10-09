var PlanEndRules = (rule, value, callback) => {
    if (value === '') {
        let str = i18n.t('Generality.Ge_PleaseEnter');
        callback(new Error(str));
    } else if(value ) {
        if (this.ruleForm.checkPass !== '') {
        }
        callback();
    }
};

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
                // message: i18n.t("Generality.Ge_PleaseEnter"),
                // trigger: ["change", "blur"],
                validator: (field,value,callback,form) => {
                    let start = new Date(value).getTime();
                    let end = new Date(form.PlanEnd).getTime();
                    console.log(value)
                    if(value === '' || value === null) {
                        let str = i18n.t('Generality.Ge_PleaseEnter');
                        callback(new Error(str));
                    } else if(end < start){
                        let str = i18n.t('backendMessage.P10100');
                        callback(new Error(str));
                    } else {
                        callback();
                    }
                }
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
