import { timeFormat } from "@/jv_doc/utils/time";
export class CreateGantt {
    constructor(options) {
        /** ============================此处来定义数据=========================== **/
        this.stepSize = 0.05; // 根据当前单位计算每分钟占多少像素

        this.cellWidth = 72;

        this.taskRadius = options.taskRadius;

        this.popoverShow = false;

        /** =============================此处用来定义默认值============================= **/
        this.tasksHeight = options.tasksHeight || 50; // 任务条高度
        this.tasksPadding = (options.tasksPadding || options.tasksPadding == 0) ? options.tasksPadding : 4; // 任务条padding值
        this.tasksRadius = options.tasksRadius || 8; // 任务条圆角
        this.unitOfTime = options.unitOfTime || 'week'; // 单位（甘特图以这个单位来显示）

        this.tableHeaderWidth = options.tableHeaderWidth; // 根据表头配置结果获取表头的宽度

        this.tasks = options.tasks || []; // 获取数据
    };
    // 获取长度
    setCellWidth(unit) {
        this.unitOfTime = unit;
        if (this.unitOfTime === "week" || this.unitOfTime === "day") {
            this.stepSize = 72 / 24 / 60
            this.cellWidth = 72
        } else if (this.unitOfTime === "hour") {
            this.stepSize = 48 / 60
            this.cellWidth = 48
        } else if (this.unitOfTime === "minute") {
            this.stepSize = 48 / 10
            this.cellWidth = 48
        }
    }
    getElementLeft(element) {
        var left = element.offsetLeft;// 当前元素左边距
        var top = element.offsetTop;// 当前元素上边距
        var parent = element.offsetParent;// 当前元素的父级元素
        while (parent !== null) {
            left += parent.offsetLeft;// 累加左边距
            top += parent.offsetTop;// 累加上边距
            parent = parent.offsetParent;// 依次获取父元素
        }
        return {
            left: left,
            top: top
        }
    }
    // 创建task
    createTask(parent) {
        let count = 0; // 用于计算高度累加
        const popover = document.createElement('div');
        popover.className = 'custom-popover';
        popover.style.opacity = 0;
        // popover.setAttribute("popover", "auto");
        // popover.popover = "auto";
        document.body.appendChild(popover);
        this.tasks.forEach((item, i) => {
            item.Data.forEach((jtem, j) => {
                let year = new Date().getFullYear();
                let month = new Date().getMonth();
                let day = new Date().getDate();
                let now = year + '-' + (month < 10 ? '0' + (month + 1) : month + 1) + '-' + (day < 10 ? '0' + day : day) + ' 00:00:00'
                let distance = parseInt(new Date(jtem.PlanStart).getTime() / 1000) - parseInt(new Date(now).getTime() / 1000)
                let startX = parseInt(distance / 60); // 距离(分钟)
                let width = parseInt(new Date(jtem.PlanEnd).getTime() / 1000) - parseInt(new Date(jtem.PlanStart).getTime() / 1000)
                let widthRes = parseInt(width / 60); // 长度/宽度
                let startY = count * this.tasksHeight;
                let height = this.tasksHeight - this.tasksPadding * 2;
                let taskRef = document.createElement('div');
                taskRef.innerText = jtem.Process + `(${jtem.PlanTime}H) ${jtem.PlanDevice}`;
                taskRef.id = 'custom-task-' + item.Id + '-' + j
                taskRef.className = 'custom-task custom-task-' + item.Id + '-' + j
                taskRef.style.left = startX * this.stepSize + 'px';
                taskRef.style.top = startY + 'px';
                taskRef.style.width = widthRes * this.stepSize + 'px';
                taskRef.style.height = height + 'px';
                taskRef.style.lineHeight = height + 'px';
                taskRef.style.background = '#2a9bf1';
                taskRef.style.position = 'absolute';
                taskRef.style.borderRadius = this.taskRadius + 'px';
                parent.appendChild(taskRef);

                taskRef.addEventListener('mouseenter', (e) => {
                    this.popoverShow = true;
                    popover.style.opacity = 1;
                    let left = e.clientX;
                    let top = e.clientY + 20;
                    // 获取鼠标位置，根据鼠标位置动; 判断位置是否超出视口
                    if(left+popover.clientWidth > document.body.clientWidth) {
                        popover.style.left = left-popover.clientWidth+'px'
                    } else {
                        popover.style.left = left+'px'
                    }

                    if(top+popover.clientHeight > document.body.clientHeight) {
                        popover.style.top = top-popover.clientHeight+'px'; 
                    } else {
                        popover.style.top = top+'px'; 
                    }
                    popover.innerHTML = `
                        <div>${i18n.t('Generality.Ge_ProcessName')}：${jtem.Process}</div>
                        <div>${i18n.t('Generality.Ge_PlanTime')}：${jtem.PlanTime}H</div>
                        <div>${i18n.t('production.Pr_PlanningDevices')}：${jtem.PlanDevice}</div>
                        <div>${i18n.t('Generality.Ge_PlanStart')}：${timeFormat(jtem.PlanStart, 'yyyy-MM-dd hh:mm:ss')}</div>
                        <div>${i18n.t('Generality.Ge_PlanEnd')}：${timeFormat(jtem.PlanEnd, 'yyyy-MM-dd hh:mm:ss')}</div>
                    `
                     
                    // popover.showPopover()
                })
                taskRef.addEventListener('click', () => {
                    this.setDialogVisible(jtem);
                })
                taskRef.addEventListener('mouseleave', () => {
                    this.popoverShow = false;
                    let timer = setTimeout(() => {
                        if(!this.popoverShow) popover.style.opacity = 0;
                        clearTimeout(timer)
                    },500);
                    // popover.hidePopover()
                })
            })
            count++;
        })
        // let taskHint = document.createElement('div'); // 用于鼠标悬浮任务条高亮
        // let height = this.tasksHeight;
        // taskHint.style.height = height+'px';
        // taskHint.className = 'task-hint';
        // parent.appendChild(taskHint);
    }
    // 删除task
    removeTask(parent) {
        if (parent.children.length) {
            let list = [...parent.children]
            // popover节点好像不会被删掉，后期出bug了在这里改
            list.forEach((item, i) => {
                if (i) parent.removeChild(item)
            })
        }
        // parent.innerHTML = ''
    }
}
