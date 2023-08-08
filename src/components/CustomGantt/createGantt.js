// 判断平年闰年 true为闰年29 false为平年28
function isLeapYear(year) {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
}
export class CreateGantt {
    constructor(options) {
        /** ============================此处来定义数据=========================== **/
        this.maxMonthNumber = 3; // 最大显示月份
        this.monthArr = []; // 月份数组

        this.weekDetails = []; // 周数组
        this.weekCellArr = []; // 周占的格子的数组，例如7.1是星期六，那么周六周日两天就得为1格，后面7天为1格，如果最后一个月是星期3，那么周一周二周三 三天为一格

        this.dayArr = []; // 天份数据
        this.dayCellArr = []; // 天占的格子数组

        this.hourArr = []; // 小时数据
        this.hourCellArr = [] // 小时占的格子数组
        
        this.minuteArr = []; // 分钟数据
        // this.minuteCellArr = [];
        this.stepSize = 0.05; // 根据当前单位计算每分钟占多少像素
        this.cellWidth = 72;

        this.taskRadius = options.taskRadius;
        this.MaximumTime = new Date(); // 最前面的时间 （起）
        this.MinimumTime = new Date(); // 最后面的时间 （止）
        
        // this.getCalendarData(); // 获取日历数据

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
    init() {
        // this.setCellWidth(); // 根据当前单位设置一格宽度
        // 根据表头配置结果获取表头的宽度
        this.tableHeaderWidth = this.columns.map(item => item.width).reduce((a, b) => { return a + b });
    }
    // 获取日历数据
    setCellWidth(unit) {
        this.unitOfTime = unit;
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
    initTaskDate(parent) {
        if(!this.tasks.length) return
        this.createTask(parent);
    }
    createTask(parent) {
        let count = 0; // 用于计算高度累加
        this.tasks.forEach((item, i) => {
            item.Data.forEach((jtem, j) => {
                let year = new Date().getFullYear();
                let month = new Date().getMonth();
                let day = new Date().getDate();
                let now = year +'-'+ (month < 10 ? '0'+(month+1) : month+1) +'-'+ (day<10?'0'+day:day) + ' 00:00:00'
                let distance = parseInt(new Date(jtem.PlanStart).getTime() / 1000) - parseInt(new Date(now).getTime() / 1000)
                let startX = parseInt(distance / 60); // 距离(分钟)
                let width = parseInt(new Date(jtem.PlanEnd).getTime() / 1000) - parseInt(new Date(jtem.PlanStart).getTime() / 1000)
                let widthRes = parseInt(width / 60); // 长度/宽度
                let startY = count * this.tasksHeight;
                let height = this.tasksHeight - this.tasksPadding * 2;
                let taskRef = document.createElement('div');
                taskRef.id = 'custom-task-'+item.Id+'-'+j
                taskRef.className = 'custom-task custom-task-'+item.Id+'-'+j
                taskRef.style.left = startX*this.stepSize+'px';
                taskRef.style.top = startY+'px';
                taskRef.style.width = widthRes*this.stepSize+'px';
                taskRef.style.height = height+'px';
                taskRef.style.background = '#2a9bf1';
                taskRef.style.position = 'absolute';
                taskRef.style.borderRadius = this.taskRadius+'px';
                parent.appendChild(taskRef);
            })
            count++;
        })
        // let taskHint = document.createElement('div'); // 用于鼠标悬浮任务条高亮
        // let height = this.tasksHeight;
        // taskHint.style.height = height+'px';
        // taskHint.className = 'task-hint';
        // parent.appendChild(taskHint);
    }
    removeTask(parent) {
        if(parent.children.length) {
            let list = [...parent.children]
            list.forEach((item, i) => {
                if(i) parent.removeChild(item)
            })
        }
        // parent.innerHTML = ''
    }
















    
}
