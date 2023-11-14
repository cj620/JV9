export const detailConfig = [
    {
        // 设备编号
        prop: "DeviceNo",
        label: i18n.t("production.Pr_DeviceNo"),
    },
    {
        // 设备名称
        prop: "DeviceName",
        label: i18n.t('DataV.Da_DeviceName'),
    },
    {
        // 点检日期
        prop: "MaintenanceDate",
        label: i18n.t('device.De_MaintenanceDate1'),
        filter: "date",
    },
    {
        // 点检人
        prop: "Operator",
        label: i18n.t('device.De_Operator'),
    },
    {
        // 备注
        prop: "Remarks",
        label: i18n.t("Generality.Ge_Remarks"),
    },
    {
        // 制单人
        prop: "Creator",
        label: i18n.t("Generality.Ge_Creator"),
    },
    {
        // 制单日期
        prop: "CreationDate",
        label: i18n.t("Generality.Ge_CreationDate"),
        filter: "date",
    },
]
