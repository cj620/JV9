<!--
 * @Author: your name
 * @Date: 2021-08-05 16:51:37
 * @LastEditTime: 2022-01-14 11:00:42
 * @LastEditors: Please set LastEditors
 * @Description: 甘特图
 * @FilePath: \vue-element-admin-master\src\views\clipboard\components\Gantt.vue
-->
<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-button size="mini" onclick="gantt.ext.zoom.zoomIn()">{{
        $t("Generality.Ge_ZoomOut")
      }}</el-button>
      <el-button size="mini" onclick="gantt.ext.zoom.zoomOut()">{{
        $t("Generality.Ge_ZoomIn")
      }}</el-button>
    </div>

    <div ref="gantt" style="height: 630px" />
  </div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";

export default {
  name: "index",
  props: {
    tasks: {
      type: Object,
      default() {
        return { data: [], links: [] };
      },
    },
  },

  methods: {
    GetData() {
      // 日期列显示
      // gantt.config.min_column_width = 60
      var that = this;
      if (localStorage.lang === "cn") {
        gantt.i18n.setLocale("cn");
      } else if (localStorage.lang === "en") {
        gantt.i18n.setLocale("en");
      } else {
        gantt.i18n.setLocale("ja");
      }
      // 时间轴图表中，甘特图的高度
      gantt.config.row_height = 35;
      // 时间轴图表中，任务条形图的高度
      gantt.config.bar_height = 28;
      // 时间轴图表中，甘特图左边的宽度
      gantt.config.grid_width = 520;

      // duration  计算值默认是1分钟
      gantt.config.duration_step = 1;
      //按照分钟计算的
      gantt.config.duration_unit = "minute";
      // 表头配置显示列   //name:绑定数据的名称  align：对其方式  label显示在表头的名称
      gantt.config.columns = [
        {
          name: "text",
          tree: true,
          width: "180",
          align: "left",
          label: this.$t("menu.Pm_Project"),
          resize: true,
        },
        {
          name: "start_date",
          align: "center",
          label: this.$t("Generality.Ge_StartDate"),
          width: "180",
          resize: true,
        },
        {
          name: "cap_plan_end",
          align: "center",
          label: this.$t("Generality.Ge_EndDate"),
          width: "180",
          resize: true,
          template: function (task) {
            return task.cap_plan_end ? task.cap_plan_end.substring(0, 10) : "";
          },
        },
      ];

      // task 任务条文本
      gantt.templates.task_text = function (start, end, task) {
        if (task.start_date !== undefined) {
          return (
            "<b><!--名称:--></b> " +
            task.text +
            "：" +
            task.progress * 100 +
            "%" /*+ ' (' + task.progress * 100 + '%)'*/
          );
        } else {
          return "<b>" + task.text + task.progress + "</b> ";
        }
      };

      // task 任务条鼠标悬浮上去数据
      gantt.templates.tooltip_text = function (start, end, task) {
        if (task.start_date !== undefined) {
          return (
            "名称" +
            "：" +
            task.text +
            "<br/>" +
            "计划开始时间1" +
            "：" +
            task.start_date +
            "<br/>" +
            "计划结束时间" +
            "：" +
            task.cap_plan_end
          );
        } else {
          return "品名" + "：" + task.text;
        }
      };
      gantt.templates.timeline_cell_class = function (item, date) {
        if (date.getDay() === 0 || date.getDay() === 6) {
          return "weekend";
        }
      };
      //gantt自动扩展时间刻度以适应所有显示的任务
      gantt.config.fit_tasks = true;
      //鼠标悬浮提示隐藏之前的时间长度
      gantt.config.tooltip_hide_timeout = 2000;
      //本地格式化
      //gantt.i18n.setLocale('cn')
      //文件的字符串被转换为符合此模板的日期对象
      gantt.config.xml_date = "%Y-%m-%d %H:%i";
      /*激活指定的扩展,
            tooltip:鼠标悬停的，
            marker:标记线
            */
      gantt.plugins({
        tooltip: true,
        marker: true,
      });
      // 设置时间刻度的高度和网格的标题
      gantt.config.scale_height = 50;
      // 可以通过标题拖动编辑弹窗
      gantt.config.drag_lightbox = false;
      // 可以通过拖放创建依赖链接
      gantt.config.drag_links = false;
      // 可以通过拖动进度旋钮来更改任务进度
      gantt.config.drag_progress = false;
      // 可以通过拖放移动任务
      gantt.config.drag_move = false;
      // 设置false ，无法拖动任务
      gantt.config.touch_drag = false;
      // 可以通过拖放来调整任务大小
      gantt.config.drag_resize = false;
      // 可读模式，不许编辑
      gantt.config.readonly = true;
      this.addTodayLine();
      gantt.init(this.$refs.gantt);
      /* 缩放配置
       * levels：缩放级别
       * useKey：使用键盘
       * trigger ：缩放触发器  wheel 滚轮
       * */
      var zoomConfig = {
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
              { unit: "week", format: "%W" + this.$t("Generality.Ge_Week") },
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
                format: "%Y" + this.$t("Generality.Ge_Year"),
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

      //设置甘特图可以缩放的
      gantt.ext.zoom.init(zoomConfig);
      // 时间轴图表中，甘特图左边的宽度
      //切换到指定的缩放级别
      gantt.ext.zoom.setLevel("week");

      //gantt.ext.zoom.zoomIn()
      //容器内初始化 dhtmlxGantt

      gantt.render();
      //加载数据
      gantt.parse(this.$props.tasks);
    },
    reload() {
      gantt.clearAll();
      this.addTodayLine();
      gantt.parse(this.$props.tasks);
      gantt.render();
    },
    addTodayLine() {
      // 时间线
      //要将 Date 对象转换为字符串
      var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
      var today = new Date();
      gantt.addMarker({
        start_date: today,
        css: "today",
        text: this.$t("Generality.Ge_Today"),
        title: this.$t("Generality.Ge_Today") + ":" + date_to_str(today),
      });
    },
  },
};
</script>

<style lang="scss">
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
.weekend {
  //background:#f4f7f4!important;
  color: red !important;
}

.gantt_selected .weekend {
  background: #f7eb91 !important;
}
</style>
