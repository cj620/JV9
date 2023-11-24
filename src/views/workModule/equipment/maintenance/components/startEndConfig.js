export const startFormConfig = [
    {
        prop: "MaintenanceStartDate",
        label: i18n.t('device.De_MaintenanceStartDate'),
        cpn: "SingleDateTime",
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseEnter"),
                trigger: ["change", "blur"],
            },
        ],
    }
]
export const endFormConfig = [
    {
        prop: "MaintenanceStartDate",
        label: i18n.t('device.De_MaintenanceStartDate'),
        cpn: "SingleDateTime",
    },
    {
        prop: "MaintenanceEndDate",
        label: i18n.t('device.De_MaintenanceEndDate'),
        cpn: "SingleDateTime",
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseEnter"),
                trigger: ["change", "blur"],
            },
        ],
    },
    {
        prop: "MaintenanceTime",
        label: i18n.t('device.De_MaintenanceTime'),
        cpn: "FormInput",
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseEnter"),
                trigger: ["change", "blur"],
            },
        ],
    },
    {
        prop: "Remarks",
        label: i18n.t("Generality.Ge_Remarks"),
        cpn: "FormInput",
    }
]
