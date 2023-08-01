// 判断平年闰年 true为闰年29 false为平年28
function isLeapYear(year) {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
}
export class CreateGantt {
    constructor(el, options) {
        /** @type {HTMLCanvasElement} */
        this.canvas = el;
        this.ctx = el.getContext('2d');
        this.proxyScroll = this.watchScroll();
        this.scrollX = 0;
        this.scrollY = 0;

        this.columns = options.columns; // 表头配置

        this.cWidth = options.cWidth; // canvas宽度

        this.cHeight = options.cHeight; // canvas高度

        this.tableHeaderWidth = 0; // 根据表头配置结果获取表头的宽度

        this.tasks = options.tasks; // 获取数据

        this.monthArr = []; // 月份数组
        this.dayArr = []; // 天份数据
        this.hourArr = []; // 小时数据
        this.minuteArr = []; // 分钟数据

        this.rollSpeed = 20; // 鼠标滚动速度

        this.mouseDirection = 'vertical' // across 鼠标横向滚动  vertical 鼠标竖向滚动

        this.init(); // 初始化
        this.eventFunctions(); // 添加canvas的一些事件。
    };
    // 初始化
    init() {
        // 获取父元素宽度
        this.canvas.width = this.canvas.parentNode.clientWidth;
        this.cWidth = this.canvas.parentNode.clientWidth;
        // 清空整个画布
        this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
        // 根据表头配置结果获取表头的宽度
        this.tableHeaderWidth = this.columns.map(item => item.width).reduce((a, b) => { return a + b });
        // 绘制表头
        this.drawTableHeader();
        // 获取日历数据
        this.getCalendarData();
        // 绘制任务条
        this.drawTask(this.ctx);
    }
    watchScroll() {
        return new Proxy(this, {
            get: (target, propKey) => {
                if (propKey in target) {
                    return target[propKey];
                } else {
                    throw new ReferenceError("Prop name \"" + propKey + "\" does not exist.");
                }
            },
            set: (obj, prop, value) => {
                // console.log('::: ', obj, prop, value);
                return true;
            }
        })
    }
    // 添加canvas的一些事件。
    eventFunctions() {
        let ctx = this.canvas.getContext('2d');
        // const canvasInfo = this.canvas.getBoundingClientRect();
        this.canvas.addEventListener('mousewheel', (e) => {
            if (e.deltaY > 0) {
                this.mouseDirection === "across" ? this.scrollX -= this.rollSpeed : this.scrollY -= this.rollSpeed;
            } else if (e.deltaY < 0) {
                this.mouseDirection === "across" ? this.scrollX += this.rollSpeed : this.scrollY += this.rollSpeed;
            }

            // this.proxyScroll.scrollX = this.scrollX; // 监听scrollX
            // this.proxyScroll.scrollY = this.scrollY; // 监听scrollY

            this.ctx.clearRect(this.tableHeaderWidth, 0, this.cWidth - this.tableHeaderWidth, this.cHeight); // 清空整个画布
            // this.ctx.fillRect(500 + this.scrollX, this.scrollY, 100,100)

            ctx.beginPath();
            ctx.strokeStyle = '#fff';

            this.drawTask(ctx)
            this.drawTableHeader(); // 绘制表头

        })

        // 确认是否点击到元素了
        // const isBetween = (e,callback) => {
        //     // const x = e.clientX - canvasInfo.left;
        //     // const x = e.clientX - canvasInfo.left;
        //     const x = e.offsetX;
        //     const y = e.offsetY;
        //     this.drawTask(ctx);
        //     const res = ctx.isPointInPath(x, y);
        //     if (res) {
        //         if(x > this.tableHeaderWidth) {
        //             callback(x, y);
        //         } else {

        //         }

        //     }
        // }

        this.canvas.addEventListener('click', (e) => {
            this.isBetween(e, (item) => {
                console.log('item::: ', item);
            })
            /*
                this.drawTask(ctx);
                isBetween(e,(x, y) => {
                    this.tasks.forEach((item, i) => {
                        item.data.forEach((jtem, j) => {
                            if(jtem.name == 'a') {
                                // console.log('::: ',  x + this.scrollX , jtem.start + this.scrollX);
                                // console.log('::: ', x + this.scrollX , jtem.end + this.scrollX);
                                console.log('::: ',x, jtem.end, this.scrollX);
                            }
                            if(
                                (
                                    x > jtem.start + this.scrollX
                                    &&
                                    x < jtem.end + this.scrollX
                                )
                                && 
                                (
                                    y > item.top + this.scrollY
                                    &&
                                    y < item.top + 50  + this.scrollY
                                ))
                            {
                                console.log('这个数据在内::: ', jtem.name);
                            }
                        })
                    })
                })
                this.drawTableHeader(); // 绘制表头
            */

        })
        this.canvas.addEventListener('mousemove', (e) => {
            this.isBetween(e, (item) => {
                console.log('item::: ', item.name);
            })
        })
        this.canvas.addEventListener('mousedown', (e) => {
            this.canvas.onmousemove = (e) => {
                // this.
            }
        })
        this.canvas.addEventListener('mouseup', (e) => {
            // console.log(':鼠标松开:: ', );
            this.canvas.onmousemove = null;
        })
    }
    // 绘制表头
    drawTableHeader() {
        let ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        // ctx.shadowColor = '#eee';
        // ctx.shadowBlur = 10;
        // ctx.shadowOffsetY = -5;
        ctx.fillStyle = "#ffffff"

        ctx.fillRect(0, 0, this.tableHeaderWidth, this.cHeight);
        // ctx.restore(); // 还原初始，避免污染下面

        ctx.strokeStyle = '#ddd';
        ctx.moveTo(0, 50);
        ctx.lineTo(this.tableHeaderWidth, 50);

        ctx.moveTo(this.tableHeaderWidth + 1, 0);
        ctx.lineTo(this.tableHeaderWidth + 1, this.cHeight);

        ctx.fill();
        ctx.stroke();
        this.columns.forEach((item, i) => {
            ctx.fillStyle = '#ffffff'
            ctx.font = '14px UNKNOW';
            ctx.textAlign = 'center';
            if (i > 0) {
                const startPosition = this.columns.slice(0, i).map(item => item.width).reduce((a, b) => { return a + b })
                ctx.fillRect(startPosition, 0, item.width, 50);
                ctx.fillStyle = "#000000"
                ctx.fillText(item.label, item.width / 2 + startPosition, 30);
            } else {
                ctx.fillRect(0, 0, item.width, 50);
                ctx.fillStyle = "#000000"
                ctx.fillText(item.label, item.width / 2, 30);
            }
        });


    }
    // 绘制任务条
    drawTask(ctx) {
        this.tasks.forEach((item, i) => {
            let height = this.tasks.slice(0, i + 1).map(item => item.h = 50).reduce((a, b) => { return a + b });
            this.tasks.map((jtem, j) => {
                if (j == i) {
                    jtem.top = height
                }
            });
            item.data.forEach(jtem => {
                // ctx.beginPath();
                ctx.moveTo(jtem.start + this.scrollX, this.scrollY + height);
                ctx.lineTo(jtem.start + this.scrollX, this.scrollY + height + 50);
                ctx.lineTo(jtem.end + this.scrollX, this.scrollY + height + 50);
                ctx.lineTo(jtem.end + this.scrollX, this.scrollY + height);
                ctx.closePath();
                ctx.fill();
            })
        })

    }
    // 判断鼠标在tasks内的事件（点击或者移动等）
    isBetween(e, callback) {
        const x = e.offsetX;
        const y = e.offsetY;
        this.tasks.forEach((item, i) => {
            item.data.forEach((jtem, j) => {
                if (
                    (
                        x > jtem.start + this.scrollX
                        &&
                        x < jtem.end + this.scrollX
                    )
                    &&
                    (
                        y > item.top + this.scrollY
                        &&
                        y < item.top + 50 + this.scrollY
                    )) {
                    callback(jtem);
                }
            })
        })
    }
    // 设置滚动方向
    setMouseDirection(direction) {
        this.mouseDirection = direction;
    }
    // 绘制时间表头
    drawDateHeader() {
        
    }
    // 获取日历数据
    getCalendarData() {
        const date = new Date();

        const thisMonth = date.getMonth() + 1;
        const bigMonth = [1, 3, 5, 7, 8, 10, 12];
        const smallMonth = [2, 4, 6, 9, 11];

        this.monthArr.push(thisMonth - 1);
        for (let i = thisMonth; i < thisMonth + 5; i++) {
            this.monthArr.push(i);
        }
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
                    this.dayArr.push(i);
                }
            }
        });
        this.dayArr.forEach(item => {
            for (let i = 0; i < 24; i++) {
                if (i < 10) {
                    this.hourArr.push('0' + i);
                } else {
                    this.hourArr.push(i);
                }
            }
        })
        this.hourArr.forEach(item => {
            for (let i = 0; i < 60; i += 10) {
                if (i === 0) {
                    this.minuteArr.push('00');
                } else {
                    this.minuteArr.push(i);
                }

            }
        });
    }
}
[10, 10]