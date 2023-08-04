<template>
    <PageWrapper :footer="false">
        <div style="
		margin-bottom: 10px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		padding: 6px 10px;
		border-radius: 4px;
		align-items: center;">
            <div style="display: flex; align-items: center;">
                <span style="font-size: 14px;">单位：</span>
                <el-select style="width: 66px;" @change="setGanttZoom" v-model="unitOfTime" placeholder="请选择单位">
					<el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
                <slot name="gatHeaderLeft"></slot>
            </div>
            <div style="display: flex; align-items: center;">
                <slot name="gntHeaderRight"></slot>
            </div>
        </div>

        <div class="ganttContainer" v-loading="loading">
            <div class="date-header" :style="{
                width: cWidth + 'px',
                height: tableHeaderHeight+'px',
                marginLeft: tableHeaderWidth+46+'px',
            }">
                <div class="date-header-item" :style="{height: tableHeaderHeight/2+'px'}">
                    <div class="date-header-cell" v-for="(item, i) in TableDateTopList" :key="i"
                    :style="{width: gantt.cellWidth * item.number+'px'}"
                    >
                        <span> {{ item.text }}</span>
                    </div>
                </div>
                <div class="date-header-item" :style="{height: tableHeaderHeight/2+'px'}">
                     <!-- <div v-for="index in Object.keys(deferList).length" style="display:flex" v-if="defer(index)">
                        <div class="date-header-cell"
                        v-for="(item, i) in TableDateBottomList.slice(deferList[index], deferList[index+1])" :key="i"
                            :style="{width: gantt.cellWidth+'px'}"
                            >
                            {{ item < 10 ? '0'+item : item }}
                        </div>
                    </div> -->

                    <div class="date-header-cell"
                        v-for="(item, i) in TableDateBottomList" :key="i"
                            :style="{width: gantt.cellWidth+'px'}"
                            >
                            {{ item < 10 ? '0'+item : item }}
                    </div>

                </div>
            </div>

            <div class="header-table-top"
            :style="{
                height: tableHeaderHeight+'px',
                width: tableHeaderWidth + 40 +'px',
                marginTop: -tableHeaderHeight+'px',
            }">
                <div v-for="(item, i) in columns" :key="item.name"
                :style="{width: item.width+'px'}"
                >
                    {{ item.label }}
                </div>
            </div>
            <div class="header-table" :style="{ height: '2000px',width: tableHeaderWidth + 40 +'px' }">
                <div v-for="(item, i) in list" :key="item.Id"
                class="header-table-item"
                :style="{width: '100%', height: tasksHeight+'px'}"
                >
                    <div class="header-table-item-box"
                    :style="{height: tasksHeight - tasksPadding*2+'px'}"
                    >
                        <div v-for="(jtem, j) in columns" :key="jtem.name"
                        :style="{
                            width: jtem.width+'px',
                            height:tasksHeight - tasksPadding*2+'px'
                        }"
                        >
                            <span v-if="jtem.name === 'ImageUrl'">
                                <el-image
                                :style="{height:tasksHeight - tasksPadding*2 - 4+'px'}"
                                :preview-src-list="[item[jtem.name]]"
                                :src="item[jtem.name]" lazy></el-image>
                            </span>
                            <span v-else-if="isNaN(item[jtem.name]) && !isNaN(Date.parse(item[jtem.name]))">{{ timeFormat(item[jtem.name]) }}</span>
                            <span v-else>{{ item[jtem.name] }}</span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div id="canvas_parent" :style="{ width: cWidth + 'px',left: tableHeaderWidth + 40 +'px', top: tableHeaderHeight+tasksPadding+'px' }">
                <!-- <canvas></canvas> -->
            </div>
        </div>
    </PageWrapper>
</template>

<script>
import { timeFormat } from "@/jv_doc/utils/time";
import { getTimeRangeList } from "@/jv_doc/utils/time/getTimeRangeList";
import { CreateGantt } from './createGantt';
export default {
    props: {
        result: {
            type: Object,
            default: {}
        },
        columns: {
            type: Array,
            default: []
        },
        tableHeaderHeight: { // 表格头部的高度
            type: Number,
            default: 50,
        },
        tasksHeight: { // 任务条高度
            type: Number,
            default: 54,
        },
        tasksPadding: { // 任务条padding值
            type: Number,
            default: 8,
        },
        taskRadius: {
            type: Number | String,
            default: null,
        },
        loading: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            cWidth: 2000,
            cHeight: '82vh',
            gantt: null,
            displayPriority: 0,
            tableHeaderWidth: 0, // 表格头部的宽度
            TableDateTopList: [], // 时间表头列表
            TableDateBottomList: [],
            cellWidth: 0,
            list: [],
            unitOptions: [{
				value: 'week',
				label: '周'
			}, {
				value: 'hour',
				label: '时'
			}, {
				value: 'minute',
				label: '分'
			}],
            unitOfTime: 'week',
            deferList: {},
            TimeRangeList: [],
        }
    },
    created() {
        let radius = this.taskRadius !== null ? this.taskRadius : (this.tasksHeight - this.tasksPadding)/2

        const options = {
            columns: this.columns,
            cHeight: this.cHeight,
            tasksHeight: this.tasksHeight,
            tasksPadding: this.tasksPadding,
            unitOfTime: this.unitOfTime,
            taskRadius: radius,
        }
        this.gantt = new CreateGantt(options);
        
        this.gantt.init();
        // this.cellWidth = this.gantt.cellWidth * 7;
        this.tableHeaderWidth = this.columns.map(item => item.width).reduce((a, b) => { return a + b });
        this.setDeferList();
    },
    mounted() {
        
    },
    methods: {
        timeFormat,
        runDisplayPriority(index) {
            const step = () => {
                requestAnimationFrame(() => {
                    this.displayPriority++
                    if (this.displayPriority < Object.keys(this.deferList).length) {
                        step()
                    }
                })
            }
            step()
        },

        defer(index) {
            return this.displayPriority > index
        },
        setTableDateList() {
            if (this.unitOfTime === "week") {
                this.cWidth = this.TimeRangeList.weekDetails * this.gantt.cellWidth * 7;
                this.TableDateTopList = this.TimeRangeList.weekDetails;
                this.TableDateBottomList = this.TimeRangeList.dayArr;
            } else if (this.unitOfTime === "hour") {
                this.cWidth = this.TimeRangeList.hourArr.length * 48;
                this.TableDateTopList = this.TimeRangeList.dayDetails;
                this.TableDateBottomList = this.TimeRangeList.hourArr;
            } else if (this.unitOfTime === "minute") {
                this.cWidth = this.TimeRangeList.minuteArr.length * 48;
                console.log('this.TimeRangeList.minuteArr.length::: ', this.TimeRangeList.minuteArr.length);
                console.log('this.cWidth::: ', this.cWidth);
                this.TableDateTopList = this.TimeRangeList.hourDetails;
                this.TableDateBottomList = this.TimeRangeList.minuteArr;
            }
            this.displayPriority = 0;
           
            // this.runDisplayPriority(); 白屏优化
        },
        setGanttZoom(val) {
            this.gantt.setCellWidth(val); // 先计算cell多长
            this.setTableDateList(); // 再计算datetable长度
            let canvasParent = document.getElementById('canvas_parent');
            this.gantt.removeTask(canvasParent);
            this.gantt.createTask(canvasParent);
        },
        setDeferList() {
            let len = this.TableDateBottomList.length;
            let count = 0
            for(let i = 0; i < len / 1000; i++) {
                this.deferList[i] = count
                count+=1000
            }
            let length = (len / 1000).toFixed(0) -0 + 1
            this.deferList[length] = len % 1000 + this.deferList[length - 1]
        }
    },
    watch: {
        result(val) {
            this.gantt.MaximumTime = timeFormat(val.MaximumTime, 'yyyy-MM-dd hh:mm:ss'); // 赋值 最前面的时间 （起）
            this.gantt.MinimumTime = timeFormat(val.MinimumTime, 'yyyy-MM-dd hh:mm:ss'); // 赋值 最后面的时间 （止）
            this.gantt.getCalendarData(); // 获取日历数据

            this.TimeRangeList = getTimeRangeList(val.MinimumTime, val.MaximumTime);

            this.setTableDateList(); // 赋值日期列表和每一格的长度 用来渲染
            this.list = val.Items; // 赋值表头列表
            this.gantt.tasks = this.list; // 赋值task列表
            this.$nextTick(() => {
                let canvasParent = document.getElementById('canvas_parent')
                this.gantt.initTaskDate(canvasParent);
                this.setGanttZoom(this.unitOfTime);
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import './custom-gantt.css';
.c-page-wrapper {
    overflow: hidden;
}

.ganttContainer {
    width: 85vw;
    height: 80vh;
    background-color: #fff;
    border-radius: 4px;
    overflow-y: auto;
    position: relative;
    font-size: 14px;

    .header-table {
        height: 1050px;
        position: sticky;
        left: 0;
        // border-right: 1px solid #ddd;
        z-index: 10;
        box-shadow: 2px 6px 6px 1px #e0e0e0;
        background-color: #fff;
        &-item{
            display: flex;
            justify-content: center;
            align-items: center;
            // box-sizing: border-box;
            padding-left: 20px;
            padding-right: 20px;
            &-box{
                width: 100%;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 2px 5px 8px 0px #ececec;
                text-align: center;
                cursor: pointer;
                display: flex;
                transition: .3s;
                div{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
    }
    .header-table-item-box:hover{
        transform: scale(1.05);
    }
    .header-table-top{
        // border-right: 1px solid #ddd;
        box-shadow: 4px 0px 6px 1px #e0e0e0;
        background-color: #fff;
        position: sticky;
        left: 0;
        top: 0;
        height: 50px;
        border-bottom: 1px solid #ccc;
        display: flex;
        z-index: 20;
        padding-right: 20px;
        padding-left: 20px;
        div{
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
        }
    }

    .date-header {
        position: sticky;
        top: 0px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        &-item {
            border-bottom: 1px solid #ccc;
            display: flex;
        }
        .date-header-cell{
            border-right: 1px solid #ccc;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    #canvas_parent {
        position: absolute;
       
    }
 }
</style>