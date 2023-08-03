// 判断平年闰年 true为闰年29 false为平年28
function isLeapYear(year) {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
}
export class CreateGantt {
    constructor(options) {
        /** ============================此处来定义数据=========================== **/
        this.maxMonthNumber = 3; // 最大显示月份
        this.monthArr = []; // 月份数组
        this.weekArr = []; // 周数组
        this.weekCellArr = []; // 周占的格子的数组，例如7.1是星期六，那么周六周日两天就得为1格，后面7天为1格，如果最后一个月是星期3，那么周一周二周三 三天为一格
        this.dayArr = []; // 天份数据
        this.dayBelongToMonthArr = []; // 每天属于哪个月
        this.hourArr = []; // 小时数据
        this.hourCellArr = []; // 小时占的格子数组
        this.minuteArr = []; // 分钟数据
        this.stepSize = 0.05; // 根据当前单位计算每分钟占多少像素
        this.cellWidth = 72;
        this.setCellWidth(); // 根据当前单位设置一格宽度
        this.getCalendarData(); // 获取日历数据
        

        /** =============================此处用来定义默认值============================= **/
        this.tasksHeight = options.tasksHeight || 50; // 任务条高度
        this.tasksPadding = (options.tasksPadding || options.tasksPadding == 0) ? options.tasksPadding : 4; // 任务条padding值
        this.tasksRadius = options.tasksRadius || 8; // 任务条圆角
        this.rollSpeed = options.rollSpeed || 20; // 鼠标滚动速度
        this.headerHeight = options.headerHeight || 50; // 设置表头高度
        this.unitOfTime = options.unitOfTime || 'week'; // 单位（甘特图以这个单位来显示）

        this.columns = options.columns; // 表头配置

        this.tableHeaderWidth = 0; // 根据表头配置结果获取表头的宽度

        this.tasks = options.tasks || []; // 获取数据

        this.displayPriority = 0; // 计数器，用来延迟渲染

        // this.init(); // 初始化
        
    };
    // 初始化
    init(parentNode) {
        this.setCellWidth(); // 根据当前单位设置一格宽度
        let canvas = document.createElement('canvas')
        canvas.width = this.minuteArr.length * this.setCellWidth();
        canvas.height = 800;
        canvas.innerHTML = "您的浏览器不支持 canvas，请升级您的浏览器。"
        canvas = parentNode.appendChild(canvas);
        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        // 获取父元素宽度
        this.canvas.width = this.canvas.parentNode.clientWidth;
        // 根据表头配置结果获取表头的宽度
        this.tableHeaderWidth = this.columns.map(item => item.width).reduce((a, b) => { return a + b });
        // 初始化任务条数据，计算位置和宽度 => 绘制任务条
        this.initTaskDate(this.ctx); 
        this.eventFunctions(); // 添加canvas的一些事件。
    }
    // 添加canvas的一些事件。
    eventFunctions() {
        // let ctx = this.canvas.getContext('2d');
        // this.canvas.addEventListener('mousewheel', (e) => {

        // })

        // this.canvas.addEventListener('click', (e) => {
        //     this.isBetween(e, (item) => {
        //         console.log('item::: ', item);
        //     })

        // })

        // this.canvas.addEventListener('mousemove', (e) => {
        //     this.isBetween(e, (item) => {
        //         console.log('item::: ', item.name);
        //     })
        // })
        // this.canvas.addEventListener('mousedown', (e) => {
        //     this.canvas.onmousemove = (e) => {
        //         // this.
        //     }
        // })
        // this.canvas.addEventListener('mouseup', (e) => {
        //     // console.log(':鼠标松开:: ', );
        //     this.canvas.onmousemove = null;
        // })
    }
    // 绘制任务条
    drawTask(ctx, startX, StartY, width, height) {
        ctx.beginPath();
        ctx.fillStyle = '#2a9bf1';
        ctx.roundRect(startX,StartY, width, height, this.tasksRadius);
        // ctx.stroke();
        ctx.fill();
    }
    // 判断鼠标在tasks内的事件（点击或者移动等）
    isBetween(e, callback) {
        const x = e.offsetX;
        const y = e.offsetY;
        this.canvas.style.cursor = "default";
        if(!this.tasks.length) return
        this.tasks.forEach((item, i) => {
            item.Data.forEach((jtem, j) => {
                if (
                    (
                        x > jtem.start
                        &&
                        x < jtem.end
                    )
                    &&
                    (
                        y > item.top
                        &&
                        y < item.top + this.tasksHeight
                    )) {
                    this.canvas.style.cursor = "pointer";
                    callback(jtem);
                }
            })
        })
    }
    // 获取日历数据
    getCalendarData() {
        const date = new Date();
        const year = date.getFullYear();
        const thisMonth = date.getMonth() ? date.getMonth() + 1 : 1;
        const bigMonth = [1, 3, 5, 7, 8, 10, 12];
        const smallMonth = [2, 4, 6, 9, 11];
        let monthDaysList = [];

        for (let i = thisMonth; i < thisMonth + this.maxMonthNumber; i++) {
            i > 12 ? this.monthArr.push(i - 12) : this.monthArr.push(i);
        }
        // 周的数据
        this.monthArr.forEach((item, i) => {
            let days = 0;
            // 判断是不是大月31天
            if (bigMonth.indexOf(item) !== -1) {
                days = 31;
                // 判断是不是2月份
                if (item == 2) {
                    // 判断是平年闰年
                    if (isLeapYear(this.monthArr[i] < this.monthArr[0] ? year + 1 : year)) {
                        days = 29
                    } else {
                        days = 28
                    }
                }
                for (let i = 1; i <= days; i++) {
                    let wk = new Date(`${item < this.monthArr[0] ? year + 1 : year}-${item >= 10 ? item : '0' + item}-${i < 10 ? '0' + i : i}`).getUTCDay();
                    this.weekArr.push(wk ? wk : 7);
                }
            } else if (smallMonth.indexOf(item) !== -1) {
                days = 30;
                if (item == 2) {
                    if (isLeapYear(this.monthArr[i] < this.monthArr[0] ? year + 1 : year)) {
                        days = 29
                    } else {
                        days = 28
                    }
                }
                for (let i = 1; i <= days; i++) {
                    let wk = new Date(`${item < this.monthArr[0] ? year + 1 : year}-${item >= 10 ? item : '0' + item}-${i < 10 ? '0' + i : i}`).getUTCDay();
                    this.weekArr.push(wk ? wk : 7);
                }
            }
            if (i) {
                monthDaysList.push({
                    total: days + monthDaysList[i - 1].total,
                    day: days,
                })
            } else {
                monthDaysList.push({
                    total: days,
                    day: days,
                })
            }
        })
        // 天的数据
        this.monthArr.forEach(item => {
            let days = 0;
            // 判断是不是大月31天
            if (bigMonth.indexOf(item) !== -1) {
                days = 31;
                // 判断是不是2月份
                if (item == 2) {
                    // 判断是平年闰年
                    if (isLeapYear(date.getFullYear())) {
                        days = 29
                    } else {
                        days = 28
                    }
                }
                for (let i = 1; i <= days; i++) {
                    // this.dayBelongToMonthArr.push({
                    //     parent: item + '月',
                    // })
                    this.hourCellArr.push({
                        text:item+'月' + ( i < 10 ? '0'+i : i),
                        cell: 24
                    })
                    this.dayArr.push(i);
                }
            } else if (smallMonth.indexOf(item) !== -1) {
                days = 30;
                if (item == 2) {
                    if (isLeapYear(date.getFullYear())) {
                        days = 29
                    } else {
                        days = 28
                    }
                }
                for (let i = 1; i <= days; i++) {
                    // this.dayBelongToMonthArr.push({
                    //     parent: item + '月',
                    // })
                    this.hourCellArr.push({
                        text: item+'月' + ( i < 10 ? '0'+i : i),
                        cell: 24
                    })
                    this.dayArr.push(i);
                }
            }
        });
        // 小时的数据
        this.dayArr.forEach(item => {
            for (let i = 0; i < 24; i++) {
                // if (i < 10) {
                //     this.hourArr.push('0' + i);
                // } else {
                //     this.hourArr.push(i);
                // }
                this.hourArr.push(i);
            }
        })
        // 分钟的数据
        this.hourArr.forEach(item => {
            for (let i = 0; i < 60; i += 10) {
                if (i === 0) {
                    this.minuteArr.push('00');
                } else {
                    this.minuteArr.push(i);
                }

            }
        });
        this.setWeekDayCell(monthDaysList);

    }
    setWeekDayCell(days) {
        const date = new Date();
        const year = date.getFullYear();

        days.forEach((item, i) => {
            let utcDay = new Date(`${this.monthArr[i] < this.monthArr[0] ? year + 1 : year}-${this.monthArr[i] >= 10 ? this.monthArr[i] : '0' + this.monthArr[i]}-01`).getUTCDay();
            let res = utcDay !== 1 ? (7 - (utcDay ? utcDay : 7) + 1) : 0
            let arr = this.dayArr.slice(days[i - 1] ? days[i - 1].total + res : res, item.total);
            let newArr = arr.slice(0, arr.length - arr.length % 7);
            let count = 0;
            if (i === 0) {
                this.weekCellArr.push({
                    cell: res,
                    text: `${this.monthArr[i] >= 10 ? this.monthArr[i] : '0' + this.monthArr[i]}月 01日 - ${this.monthArr[i] >= 10 ? this.monthArr[i] : '0' + this.monthArr[i]}月 ${res < 10 ? '0' + res : res}日`
                })
            }
            newArr.forEach((item, j) => {
                if (newArr[count]) {
                    this.weekCellArr.push({
                        cell: 7,
                        text: `${this.monthArr[i] >= 10 ? this.monthArr[i] : '0' + this.monthArr[i]}月 ${newArr[count] < 10 ? '0' + newArr[count] : newArr[count]}日- ${this.monthArr[i] >= 10 ? this.monthArr[i] : '0' + this.monthArr[i]}月 ${newArr[count + 6] < 10 ? '0' + newArr[count + 6] : newArr[count + 6]}日`
                    })
                }
                count += 7;
            })
            if (arr.length % 7 !== 0) {
                this.weekCellArr.push({
                    cell: 7,
                    text: `${this.monthArr[i] >= 10 ? this.monthArr[i] : '0' + this.monthArr[i]}月 ` +
                        `${arr[arr.length - arr.length % 7]}日` + ' - ' +
                        `${this.monthArr[i] + 1 >= 10 ? (this.monthArr[i] + 1 > 12 ? '01' : this.monthArr[i] + 1) : '0' + (this.monthArr[i] + 1)}月 ` +
                        `${(arr[arr.length - arr.length % 7] + 6 - item.day) < 10 ? '0' + (arr[arr.length - arr.length % 7] + 6 - item.day) : (arr[arr.length - arr.length % 7] + 6 - item.day)}日`
                })
            }
        })
    }
    setCellWidth() {
        if (this.unitOfTime === "week" || this.unitOfTime === "day") {
            this.stepSize = 72/24/60
            this.cellWidth = 72
        } else if (this.unitOfTime === "hour") {
            this.stepSize = 48/60
            this.cellWidth = 48
        } else if(this.unitOfTime === "minute") {
            this.stepSize = 48/10
            this.cellWidth = 48
        }
    }
    // 初始化task数据
    initTaskDate(ctx) {
        if(!this.tasks.length) return
        let year = new Date().getFullYear();
        let month = new Date().getMonth();
        let now = year +'-'+ (month < 10 ? '0'+(month+1) : month+1) +'-'+ '01 ' + '00:00:00'
        this.tasks.forEach((item, i) => {
            item.Data.forEach((jtem, j) => {
                let distance = parseInt(new Date(jtem.PlanStart).getTime() / 1000) - parseInt(new Date(now).getTime() / 1000)
                let startX = parseInt(distance / 60); // 距离
                let width = parseInt(new Date(jtem.PlanEnd).getTime() / 1000) - parseInt(new Date(jtem.PlanStart).getTime() / 1000)
                let widthRes = parseInt(width / 60); // 长度/宽度
                let startY = (Number(item.Id)-1) * this.tasksHeight;
                let height = this.tasksHeight - this.tasksPadding * 2;
                this.drawTask(ctx,
                    startX*this.stepSize,
                    startY,
                    widthRes*this.stepSize,
                    height);
            })
        })
    }
}
