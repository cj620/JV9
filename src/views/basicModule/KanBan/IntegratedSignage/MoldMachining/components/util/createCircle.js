class CreateCircle {
  constructor(el, width, height, radius, borderWidth, total) {
    this.el = document.getElementById(el)
    console.log(this.el);
    this.ctx = this.el.getContext("2d");
    this.radius = radius; // 半径
    this.borderWidth = borderWidth; // 边框宽度
    this.width = this.el.width = width;
    this.height = this.el.height = height;
    this.total = total
    this.circleList = [];
  }
  drowCircle(list) {
    console.log(list,7788);

    this.ctx.clearRect(0,0,this.width,this.height); // 清除画布重新渲染
    let arr = []
    list.forEach((item, i) => {
      // 计算当前板块是总数的百分比
      item.percent = item.num / this.total
      // 假设当前板块占40%,那么计算出当前板块占2π的40%是多少
      item.proportion = Math.PI * 2 * item.percent;
      arr.push(item.proportion)
      // 每一度占2π的多少
      item.piLimit = Math.PI * 2 / 360

      if (i > 0) {
        let sum = arr.reduce((pre, curr) => {
          return pre + curr;
        });
        item.startP = list[i - 1].stopP
        item.stopP = sum
        item.degree = (sum - Math.PI) / item.piLimit
        item.startX = list[i - 1].x;
        item.startY = list[i - 1].y;
      } else {
        item.startP = 0
        item.stopP = item.proportion
        item.degree = (item.proportion - Math.PI) / item.piLimit
        item.startX = 400;
        item.startY = 200;
      }
      item.x = this.width / 2 + (Math.cos(Math.PI * 2 / 360 * (item.degree + 180)) * this.radius) +
        10;
      item.y = this.width / 2 + (Math.sin(Math.PI * 2 / 360 * (item.degree + 180)) * this.radius) +
        10;
      this.judge(item)
    })
    console.log(list);


    let proportionList = []
    list.forEach((item, i) => {
      proportionList.push(item.proportion)
      if (i > 0) {
        // 获取小圆每次相加上次的π值
        let sum = proportionList.reduce((pre, curr) => {
          return pre + curr;
        });
        this.drowMinCircle((sum - Math.PI) / item.piLimit + 180, item.c2); // 画小圆
      } else {
        this.drowMinCircle((item.proportion - Math.PI) / item.piLimit + 180, item.c2);
      }
    })
  }
  judge(item) {
    this.ctx.beginPath();
    // 判断如果数据超过半圆的情况
    if (item.proportion > Math.PI) {
      let w = this.getCircle(item.degree + 180)
      let w2 = this.getCircle(item.degree)
      let colorObj = this.GetCavansHex(item.c1, item.c2, w, w2);
      // 算后半圈的差值度数,然后算坐标

      let x = this.width / 2 + Math.cos(Math.PI * 2 / 360 * ((item.startP + Math.PI) / item.piLimit)) * this
          .radius,
        y = this.width / 2 + Math.sin(Math.PI * 2 / 360 * ((item.startP + Math.PI) / item.piLimit)) * this
          .radius;
      console.log(x, y);
      console.log(colorObj);
      const grd = this.ctx.createLinearGradient(item.startX, item.startY, x, y);
      grd.addColorStop(0, item.c1);
      grd.addColorStop(1, colorObj.color2);
      this.ctx.strokeStyle = grd;
      this.ctx.lineWidth = this.borderWidth
      let n = item.stopP - item.startP;
      console.log(item.startP, item.stopP - item.startP);
      this.ctx.arc(this.width / 2, this.width / 2, this.radius, item.startP, item.startP + n, false);
      this.ctx.stroke();
      // 画后半圈的圆


      this.ctx.beginPath();
      const grd2 = this.ctx.createLinearGradient(x, y, item.x, item.y);
      grd2.addColorStop(0, colorObj.color2);
      grd2.addColorStop(1, colorObj.color1);
      this.ctx.strokeStyle = grd2;
      this.ctx.lineWidth = this.borderWidth;
      this.ctx.arc(this.width / 2, this.width / 2, this.radius, item.startP + n, item.stopP, false);
      this.ctx.stroke();
    } else {
      const grd = this.ctx.createLinearGradient(item.startX, item.startY, item.x, item.y);
      grd.addColorStop(0, item.c1);
      grd.addColorStop(1, item.c2);
      this.ctx.strokeStyle = grd;
      this.ctx.lineWidth = this.borderWidth;
      this.ctx.arc(this.width / 2, this.width / 2, this.radius, item.startP, item.stopP, false);
      this.ctx.stroke();
    }
  }
  // 根据角度画小圆
  drowMinCircle(i, color) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1
    this.ctx.strokeStyle = color;
    let x = Math.cos(Math.PI * 2 / 360 * i) * this.radius,
      y = Math.sin(Math.PI * 2 / 360 * i) * this.radius;
    this.ctx.arc(this.width / 2 + x, this.height / 2 + y, this.borderWidth / 2 - 0.5, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }
  GetCavansHex(startColor, stopColor, width, halfWidth) {
    console.log(width);
    let hex = {
      color1: '',
      color2: ''
    }
    let canvas = {
      init() {
        this.ele = document.createElement('canvas');
        document.body.appendChild(this.ele);
        this.ctx = this.ele.getContext('2d');
        this.width = this.ele.width = window.innerWidth;
        this.height = this.ele.height = window.innerHeight;
        return this;
      },

      draw() {
        const grd1 = this.ctx.createLinearGradient(0, 0, width, 0);
        grd1.addColorStop(0, startColor);
        grd1.addColorStop(1, stopColor);
        this.ctx.strokeStyle = grd1;
        this.ctx.lineWidth = 20
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(width, 0);
        this.ctx.stroke();

        let data = this.ctx.getImageData(width - 1, 0, 1, 1)
        let data2 = this.ctx.getImageData(width - halfWidth, 0, 1, 1)

        function colorRGB2Hex(r, g, b) {
          let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
          return hex;
        }
        hex.color1 = colorRGB2Hex(data.data[0], data.data[1], data.data[2])
        hex.color2 = colorRGB2Hex(data2.data[0], data2.data[1], data2.data[2])
        this.ele.remove()
      }
    };
    canvas.init().draw();
    return hex
  }
  getCircle(degrees) { // 获取当前环的周长
    let width = this.radius * 2 * Math.PI;
    // 360度等于总长,获取每一个像素等于多少度
    let dwidth = 360 / width;
    // console.log(dwidth,width);
    // 获得总长有多少个像素
    return degrees / dwidth
    // console.log(degrees / dwidth);
  }
  creteText(...t) {
    this.ctx.beginPath();
    // this.ctx.fillRect(this.width/4,this.height/4,this.radius+28,this.radius);
    this.ctx.arc(this.radius+20,this.radius+20,this.radius-40,0,2*Math.PI)
    this.ctx.fillStyle="#242947";//设置填充颜色
    this.ctx.fill();//开始填充
    // this.ctx.clearRect(this.width/4,this.height/4,this.radius + 28,this.radius)
    t.forEach((item, i) => {
      this.ctx.beginPath();
      this.ctx.fillStyle = item.color;
      this.ctx.font=`${item.px} ${item.fontFamliy}`;
      let txt = item.txt;
      let txtWidth = this.ctx.measureText(txt).width;
      this.ctx.fillText(txt,this.width/2-txtWidth/2,item.offsetTop);
    })
  }
}
export default CreateCircle
