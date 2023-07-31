// 判断平年闰年 true为闰年29 false为平年28
function isLeapYear (year) {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
}
export class CreateGantt {
    constructor(el, options) {
        /** @type {HTMLCanvasElement} */
        this.canvas = el;
        this.ctx = el.getContext('2d');

        this.scrollX = 0;
        this.scrollY = 0;

        this.columns = options.columns; // 表头配置

        this.cWidth = options.cWidth; // canvas宽度

        this.cHeight = options.cHeight; // canvas高度

        this.tableHeaderWidth = 0; // 根据表头配置结果获取表头的宽度

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
        this.ctx.clearRect(0,0,this.cWidth,this.cHeight);
        // 根据表头配置结果获取表头的宽度
        this.tableHeaderWidth = this.columns.map(item => item.width).reduce((a, b) => { return a + b });
        // 绘制表头
        this.drawTableHeader(); 
        // 获取日历数据
        this.getCalendarData();
        
    }
    // 添加canvas的一些事件。
    eventFunctions() {
        let ctx = this.canvas.getContext('2d');
        const canvasInfo = this.canvas.getBoundingClientRect();
        this.canvas.addEventListener('mousewheel', (e) => {
            if(e.deltaY > 0) {
                this.mouseDirection === "across" ? this.scrollX-=this.rollSpeed : this.scrollY-=this.rollSpeed;
            } else if(e.deltaY < 0) {
                this.mouseDirection === "across" ? this.scrollX+=this.rollSpeed : this.scrollY+=this.rollSpeed;
            }
            
            this.ctx.clearRect(this.tableHeaderWidth,0,this.cWidth - this.tableHeaderWidth,this.cHeight); // 清空整个画布
            // this.ctx.fillRect(500 + this.scrollX, this.scrollY, 100,100)
            
            ctx.beginPath();
            ctx.strokeStyle = '#fff';
            
            ctx.moveTo(500 + this.scrollX,this.scrollY);
            ctx.lineTo(500 + this.scrollX,this.scrollY + 100);
            ctx.lineTo(1600 + this.scrollX,this.scrollY + 100);
            ctx.lineTo(1600 + this.scrollX,this.scrollY);
            ctx.closePath();
            ctx.fill();
            this.drawTableHeader(); // 绘制表头
            
        })
        const isBetween = (e,callback) => {
            const x = e.clientX - canvasInfo.left;
            const y = e.clientY - canvasInfo.top;
            ctx.moveTo(500 + this.scrollX,this.scrollY);
            ctx.lineTo(500 + this.scrollX,this.scrollY + 100);
            ctx.lineTo(1600 + this.scrollX,this.scrollY + 100);
            ctx.lineTo(1600 + this.scrollX,this.scrollY);
            ctx.closePath();
            ctx.fill();
            const res = ctx.isPointInPath(x, y);
            if (res) {
                if(x > this.tableHeaderWidth) {
                    callback();
                } else {

                }
                
            }
        }
        this.canvas.addEventListener('click', (e) => {
            
            isBetween(e,() => {
                console.log(':嘻嘻:: ', );
            })
            this.drawTableHeader(); // 绘制表头
        })
        this.canvas.addEventListener('mousedown', (e) => {
            this.canvas.onmousemove = (e) => {
                // this.
            }
        })
        this.canvas.addEventListener('mouseup',(e) => {
            console.log(':鼠标松开:: ', );
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

        ctx.moveTo(this.tableHeaderWidth+1, 0);
        ctx.lineTo(this.tableHeaderWidth+1, this.cHeight);

        ctx.moveTo(this.scrollX,this.scrollY);
        ctx.lineTo(0,this.scrollY + 200);
        ctx.lineTo(this.scrollX+ 200,this.scrollY + 200);
        ctx.lineTo(this.scrollX + 200,this.scrollY);
        ctx.closePath();
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
    drawTask() {

    }
    // 设置滚动方向
    setMouseDirection(direction) { 
        this.mouseDirection = direction;
    }
    // 获取日历数据
    getCalendarData() {
        const date = new Date();
        const thisMonth = date.getMonth() + 1;
        const bigMonth = [1,3,5,7,8,10,12];
        const smallMonth = [2,4,6,9,11];
        
        // if(isLeapYear) {
            
        // }
        this.monthArr.push(thisMonth-1);
        for(let i = thisMonth; i < thisMonth + 5; i++) {
            this.monthArr.push(i);
        }
        this.monthArr.forEach(item => {
            if(bigMonth.indexOf(item) !== -1) {
                for(let i=1;i<32;i++){
                    this.dayArr.push(i);
                }
            } else if(smallMonth.indexOf(item) !== -1) {
                for(let i=1;i<31;i++){
                    this.dayArr.push(i);
                }
            }
        });
        this.dayArr.forEach(item => {
            for(let i=0;i<24;i++){
                if(i < 10) {
                    this.hourArr.push('0' + i);
                } else {
                    this.hourArr.push(i);
                }
            }
        })
        this.hourArr.forEach(item => {
            for(let i=0;i<60;i+=10){
                if(i === 0) {
                    this.minuteArr.push('00');
                } else {
                    this.minuteArr.push(i);
                }
                
            }
        });
        console.log('hourArr::: ',this.dayArr, this.hourArr);
    }
}
[10,10]