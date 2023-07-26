export default {
    levels: [
        {
            name: "minute",
            scale_height: 50,
            min_column_width: 45,
            scales: [
                { unit: "hour", format: "%H" },
                { unit: "minute", format: "%H:%i", step: 10 },
            ],
        },
        {
            name: "hour",
            scale_height: 50,
            min_column_width: 45,
            scales: [
                { unit: "day", format: "%d" },
                { unit: "hour", format: "%H" },
            ],
        },
        {
            name: "day",
            scale_height: 50,
            min_column_width: 80,
            scales: [{ unit: "day", step: 1, format: "%M" + "%d " }],
        },
        {
            name: "week",
            scale_height: 50,
            min_column_width: 80,
            scales: [
                {
                    unit: "week",
                    step: 1,
                    format: function (date) {
                        var dateToStr = gantt.date.date_to_str("%M %d ");
                        var endDate = gantt.date.add(date, +6, "day");
                        var weekNum = gantt.date.date_to_str("%W")(date);
                        return (
                            "#" +
                            weekNum +
                            ", " +
                            dateToStr(date) +
                            " - " +
                            dateToStr(endDate)
                        );
                    },
                },
                { unit: "day", step: 1, format: "%D" + " %j " },
            ],
        },
        {
            name: "month",
            scale_height: 50,
            min_column_width: 120,
            scales: [
                { unit: "month", format: "%F, %Y" },
                { unit: "week", format: "%W" + i18n.t("Generality.Ge_Week") },
            ],
        },
        {
            name: "quarter",
            height: 50,
            min_column_width: 90,
            scales: [
                {
                    unit: "quarter",
                    step: 1,
                    format: function (date) {
                        var dateToStr = gantt.date.date_to_str("%M");
                        var endDate = gantt.date.add(
                            gantt.date.add(date, 3, "month"),
                            -1,
                            "day"
                        );
                        return dateToStr(date) + " - " + dateToStr(endDate);
                    },
                },
                { unit: "month", step: 1, format: "%M" },
            ],
        },
        {
            name: "year",
            scale_height: 50,
            min_column_width: 30,
            scales: [
                {
                    unit: "year",
                    step: 1,
                    format: "%Y" + i18n.t("Generality.Ge_Year"),
                },
            ],
        },
    ],
    useKey: "ctrlKey",
    trigger: "wheel",
    element: function () {
        return gantt.$root.querySelector(".gantt_task");
    },
};