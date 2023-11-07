import i18n from "@/i18n/i18n.js";
/*工序状态枚举*/
export default {
    /// <summary>
    /// 运行中
    /// </summary>
    Running: {
        name: '运行中',
        value: "Running",
        color: "#2ee438",
    },
    /// <summary>
    /// 待机中
    /// </summary>
    Standby: {
        name: '待机中',
        value: "Standby",
        color: "#faad14",
    },
    /// <summary>
    /// 离线中
    /// </summary>
    OffLine: {
        name: '离线中',
        value: "OffLine",
        color: "#cccccc",
    },
}
