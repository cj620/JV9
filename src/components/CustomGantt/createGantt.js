import Vue from "vue";
import i18n from "@/i18n/i18n";
import router from "@/router";
import store from "@/store";
import App from "@/App.vue";
export class CreateGantt {
  constructor(options) {
    /** ============================此处来定义数据=========================== **/
    this.isTaskHover = options.isTaskHover;

    this.taskRadius = options.taskRadius;

    this.popoverShow = false;

    this.setDialogVisible = null;

    this.taskInnerHtml = options.taskInnerHtml;

    this.Components = options.Component;

    this.popoverInnerHtml = options.popoverInnerHtml;

    this.popoverShow = options.popoverShow;

    this.taskColor = options.taskColor || '#2a9bf1';

    this.MinimumTime = null;

    this.Vue = null;

    /** =============================此处用来定义默认值============================= **/
    this.stepSize = 0.05; // 根据当前单位计算每分钟占多少像素

    this.cellWidth = 120;

    this.tableItemHeight = options.tableItemHeight || 50; // table每一项的高度

    this.taskHeight = options.taskHeight || 50; // table每一项的高度

    this.tableItemPadding =
      options.tableItemPadding || options.tableItemPadding === 0
        ? options.tableItemPadding
        : 4; // 任务条padding值

    this.tasksRadius = options.tasksRadius || 8; // 任务条圆角
    this.unitOfTime = options.unitOfTime || "week"; // 单位（甘特图以这个单位来显示）

    this.tableHeaderWidth = options.tableHeaderWidth; // 根据表头配置结果获取表头的宽度

    this.tasks = options.tasks || []; // 获取数据
  }
  // 获取长度
  setCellWidth(unit) {
    this.unitOfTime = unit;
    if (this.unitOfTime === "week" || this.unitOfTime === "day") {
      this.cellWidth = 120;
      this.stepSize = this.cellWidth / 24 / 60;
    } else if (this.unitOfTime === "hour") {
      this.cellWidth = 72;
      this.stepSize = this.cellWidth / 60;
    } else if (this.unitOfTime === "minute") {
      this.cellWidth = 48;
      this.stepSize = this.cellWidth / 10;
    }
  }
  getElementLeft(element) {
    var left = element.offsetLeft; // 当前元素左边距
    var top = element.offsetTop; // 当前元素上边距
    var parent = element.offsetParent; // 当前元素的父级元素
    while (parent !== null) {
      left += parent.offsetLeft; // 累加左边距
      top += parent.offsetTop; // 累加上边距
      parent = parent.offsetParent; // 依次获取父元素
    }
    return {
      left: left,
      top: top,
    };
  }
  // 创建task
  createTask(parent) {
    let count = 0; // 用于计算高度累加
    const popover = document.createElement("div");
    popover.className = "custom-popover";
    popover.style.opacity = 0;
    // popover.setAttribute("popover", "auto");
    // popover.popover = "auto";

    this.tasks.forEach((item, i) => {
      item.Data.forEach((jtem, j) => {
        let year = new Date(this.MinimumTime).getFullYear();
        let month = new Date(this.MinimumTime).getMonth();
        let day = new Date(this.MinimumTime).getDate();
        let now =
          year +
          "-" +
          (month < 10 ? "0" + (month + 1) : month + 1) +
          "-" +
          (day < 10 ? "0" + day : day) +
          " 00:00:00";
        let distance =
          parseInt(new Date(jtem.PlanStart).getTime() / 1000) -
          parseInt(new Date(now).getTime() / 1000);
        let startX = parseInt(distance / 60); // 距离(分钟)
        let width =
          parseInt(new Date(jtem.PlanEnd).getTime() / 1000) -
          parseInt(new Date(jtem.PlanStart).getTime() / 1000);
        let widthRes = parseInt(width / 60); // 长度/宽度
        let startY = count * this.tableItemHeight + (this.tableItemHeight - this.tableItemPadding*2 - this.taskHeight) / 2;
        let height = this.taskHeight;
        let taskRef = document.createElement("div");
        taskRef.innerHTML = this.taskInnerHtml ? this.taskInnerHtml(jtem) : "";
        taskRef.id = "custom-task-" + item.Id + "-" + j;
        taskRef.className = "custom-task custom-task-" + item.Id + "-" + j;
        taskRef.style.left = startX * this.stepSize + "px";
        taskRef.style.top = startY + "px";
        taskRef.style.width = widthRes * this.stepSize + "px";
        taskRef.style.height = height + "px";
        taskRef.style.lineHeight = height + "px";
        taskRef.style.background = this.taskColor;
        taskRef.style.position = "absolute";
        taskRef.style.borderRadius = this.taskRadius + "px";
        parent.appendChild(taskRef);

        taskRef.addEventListener("mouseenter", (e) => {
          if(!this.isTaskHover) return
          // if (!this.popoverShow) return;
          if (this.Components && !this.popoverInnerHtml) {
            this.Vue.$children[0].item = jtem;
          }
          this.popoverShow = true;
          popover.style.opacity = 1;
          let left = e.clientX;
          let top = e.clientY + 20;
          // 获取鼠标位置，根据鼠标位置动; 判断位置是否超出视口
          if (left + popover.clientWidth > document.body.clientWidth) {
            popover.style.left = left - popover.clientWidth + "px";
          } else {
            popover.style.left = left + "px";
          }

          if (top + popover.clientHeight > document.body.clientHeight) {
            popover.style.top = top - popover.clientHeight + "px";
          } else {
            popover.style.top = top + "px";
          }
          if (this.popoverInnerHtml && !this.Components) {
            popover.innerHTML = this.popoverInnerHtml(jtem);
          }

          // popover.showPopover()
        });
        taskRef.addEventListener("click", () => {
          this.setDialogVisible(jtem);
        });
        taskRef.addEventListener("mouseleave", () => {
          this.popoverShow = false;
          let timer = setTimeout(() => {
            if (!this.popoverShow) popover.style.opacity = 0;
            clearTimeout(timer);
          }, 500);
          // popover.hidePopover()
        });
      });
      count++;
    });

    parent.appendChild(popover);
    if (this.Components && !this.popoverInnerHtml) {
      const popoverChildren = document.createElement("div");
      popoverChildren.id = "custom-popover";
      popover.appendChild(popoverChildren);
      this.Vue = new Vue({
        el: "#custom-popover",
        render: (h) => h(this.Components),
      });
    }

    // let taskHint = document.createElement('div'); // 用于鼠标悬浮任务条高亮
    // let height = this.tableItemHeight;
    // taskHint.style.height = height+'px';
    // taskHint.className = 'task-hint';
    // parent.appendChild(taskHint);
  }
  // 删除task
  removeTask(parent) {
    if (parent.children.length) {
      let list = [...parent.children];
      // popover节点好像不会被删掉，后期出bug了在这里改
      list.forEach((item, i) => {
        if (i > 1) parent.removeChild(item);
      });
    }
    // parent.innerHTML = ''
  }
  // getTaskDetail(item) {}
}
