export default [
    {
        name: "text",
        tree: true,
        width: "180",
        align: "left",
        label: i18n.t("menu.Pm_Project"),
        resize: true,
    },
    {
        name: "EmployeeName",
        align: "center",
        label: i18n.t("Generality.Ge_StartDate"),
        width: "100",
        resize: true,
        
        template: (task) => {
            return `<div id="preview${task.id}">
                <img
                style="width: 40px;height: 40px; margin-top: 5px;"
                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2Fd6641ba4-66f8-4294-b271-c7ea02e443c6%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1693026969&t=89a6183ea2623780d4976b4ee73013ea" />
            </div>`
        }
    },
    {
        name: "start_date",
        align: "center",
        label: i18n.t("Generality.Ge_StartDate"),
        width: "100",
        resize: true,
    },
    // {
    //     name: "cap_plan_end",
    //     align: "center",
    //     label: i18n.t("Generality.Ge_EndDate"),
    //     width: "100",
    //     resize: true,
    //     template: function (task) {
    //         return task.cap_plan_end ? task.cap_plan_end.substring(0, 10) : "";
    //     },
    // },
    {
        name: "end_date",
        align: "center",
        label: i18n.t("Generality.Ge_EndDate"),
        width: "100",
        resize: true,
    },
];
