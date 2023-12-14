import i18n from "@/i18n/i18n.js";
/*工序状态枚举*/
export default {
    /// <summary>
    /// 运行中
    /// </summary>
    Running: {
        name: i18n.t('production.Pr_Running'),
        value: "Running",
        color: "#2ee438",
    },
    /// <summary>
    /// 待机中
    /// </summary>
    Standby: {
        name: i18n.t('production.Pr_Standby'),
        value: "Standby",
        color: "#faad14",
    },
    /// <summary>
    /// 离线中
    /// </summary>
    OffLine: {
        name: i18n.t('production.Pr_Offline'),
        value: "OffLine",
        color: "#cccccc",
    },
}
