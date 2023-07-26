export default [
    {
        name: "text",
        tree: true,
        width: "180",
        align: "left",
        label: i18n.$t("menu.Pm_Project"),
        resize: true,
    },
    {
        name: "start_date",
        align: "center",
        label: i18n.$t("Generality.Ge_StartDate"),
        width: "100",
        resize: true,
    },
    {
        name: "cap_plan_end",
        align: "center",
        label: i18n.t("Generality.Ge_EndDate"),
        width: "100",
        resize: true,
        template: function (task) {
            return task.cap_plan_end ? task.cap_plan_end.substring(0, 10) : "";
        },
    },
];