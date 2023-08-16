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
    name: "PhotoUrl",
    align: "center",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    width: "100",
    resize: true,
    template: (task) => {
      return `<div id="preview${task.id}" style="display: flex;justify-content: center">
                ${
                  task.PhotoUrl
                    ? `<img alt=""
                style="width: 40px;height: 40px; margin-top: 5px;"
                src="${task.PhotoUrl}" />`
                    : `<div style="width: 40px;height: 40px; margin-top: 5px;background: #e7e7e7;line-height: 40px;color: #a1a1a1">
                            <i class="el-icon-picture-outline"></i>
                       </div>`
                }
                
            </div>`;
    },
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
