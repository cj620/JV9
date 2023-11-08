/*
 * @Author: C.
 * @Date: 2022-06-20 15:00:58
 * @LastEditTime: 2022-08-24 19:16:51
 * @Description: file content
 */
import { decimal2hundred } from "~/utils/handleData";
// 生成柱状图
function createOption(name='柱状图',x=[],y=[]){
  return {
    title: {
      text: name,
      left: "center",
      top:15
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: x,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        barWidth: "60%",
        data: y,
        label:{ // 展示具体柱状图的数值
          show:true
        },
        markLine:{
          data:[
             {
               type:"average",
               name:"平均值"
             }
            ]
          }
      },
    ],
  }
}
// 生成饼图
function createPieOption(name='饼图',data=[]){
  return {
    title: {
      text: name,
      // subtext: "Fake Data",
      left: "center",
      top:20,
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      // orient: "vertical",
      left: "center",
      top: 50,
    },
    series: [
      {
        name: "没有匹配的数据",
        type: "pie",
        radius: "50%",
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        //图形样式
        itemStyle: {
          normal: {
              //label（图形文本标签）设置
              label: {
                  //是否显示
                  show:true,
                  //文本标签内容设置，支持 字符串 | 可回调函数
                  formatter:function(val){
                      //val是回调函数返回值，是个json数据
                      // return  val.name+val.percent + '%'
                      return  `${val.percent}%(${val.name})`
                  },
              }
          }
      },
      },
    ],
  };
}

// 生成自定义图

function renderItem(params, api) {

  var categoryIndex = api.value(0);
  console.log(categoryIndex,88888);
  var start = api.coord([api.value(1), categoryIndex]);
  var end = api.coord([api.value(2), categoryIndex]);
  console.log(start,end,88888);
  var height = api.size([0, 1])[1] * 0.6;
  var rectShape = echarts.graphic.clipRectByRect(
    {
      x: start[0],
      y: start[1] - height / 2,
      width: end[0] - start[0],
      height: height
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height
    }
  );
  return (
    rectShape && {
      type: 'rect',
      transition: ['shape'],
      shape: rectShape,
      style: api.style()
    }
  );
}
function createCustom(name='自定义图',data=[]){
  return {
    tooltip: {
      formatter: function (params) {
        return params.marker + params.name + ': ' + params.value[3] + ' ms';
      }
    },
    title: {
      text: 'Profile',
      left: 'center'
    },
    dataZoom: [
      {
        type: 'slider',
        filterMode: 'weakFilter',
        showDataShadow: false,
        minSpan: 5,
        top: 400,
        labelFormatter: ''
      },
      {
        type: 'inside',
        filterMode: 'weakFilter'
      }
    ],
    grid: {
      height: 300
    },
    xAxis: {
      type: 'time',
      min: function (value) {
        return value.min - 10000;
      },
      position: 'top',
      splitLine: {
        lineStyle: {
          color: ['#E9EDFF']
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        lineStyle: {
          color: '#929ABA'
        }
      },
      axisLabel: {
        color: '#929ABA',
        inside: false,
        align: 'center'
      }

    },
    yAxis: {
      data:  data.categories
    },
    series: [
      {
        type: 'custom',
        renderItem: renderItem,
        itemStyle: {
          opacity: 0.8
        },
        encode: {
          x: [1, 2],
          y: 0
        },
        data: data.data
      }
    ]
  };
}





// 生成单个柱状图
export function createLineOption(data){
    return createOption(data.Name,data.Date,data.Data.map(item=>{
      // Number(item)*100
      return item
    }))
}

// 生成多个柱状图
export function createLineOptionList(data=[]){
  if(data.length==0) return
return data.map(item=>{
  return createLineOption(item)
})
}

// 生成多个饼图
export function createPieOptionList(data=[]){
  if(data.length==0) return
return data.map(item=>{
  return createPieOption(item.Name,item.Data)
})
}


// 生成甘特图
export function createCustomOption(data){
  return createCustom(data.Name,data.Date)
}
