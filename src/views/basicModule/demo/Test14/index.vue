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
            <div>
                单位：
                <el-select style="width: 66px;" @change="setGanttZoom" v-model="unitOfTime" placeholder="请选择单位">
					<el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
            </div>
        </div>

        <div class="ganttContainer">
            <div class="date-header" :style="{
                width: cWidth + 'px',
                height: '50px',
                marginLeft: tableHeaderWidth+46+'px',
            }">
                <div class="date-header-item">
                    <div class="date-header-cell" v-for="(item, i) in TableDateTopList" :key="i"
                    :style="{width: gannt.cellWidth * item.cell+'px'}"
                    >
                        {{ item.text }}
                    </div>
                </div>
                <div class="date-header-item">
                    <div class="date-header-cell" v-for="(item, i) in TableDateBottomList" :key="i"
                    :style="{width: gannt.cellWidth+'px'}"
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
                        :style="{width: jtem.width+'px',height:tasksHeight - tasksPadding*2+'px'}"
                        >
                            <span v-if="jtem.name === 'ImageUrl'">
                                <el-image
                                :style="{height:tasksHeight - tasksPadding*2 - 4+'px'}"
                                :src="item[jtem.name]" lazy></el-image>
                            </span>
                            <span v-else>{{ item[jtem.name] }}</span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div id="canvas_parent" :style="{ width: cWidth + 'px' }">
                <!-- <canvas></canvas> -->
            </div>
        </div>
    </PageWrapper>
</template>

<script>
import columns from './columns';
import data from './data';
import { CreateGantt } from './createGantt';
export default {
    data() {
        return {
            cWidth: 2000,
            cHeight: '82vh',
            gannt: null,
            displayPriority: 0,
            columns: columns,
            tableHeaderHeight: 50, // 表格头部的高度
            tableHeaderWidth: 0, // 表格头部的宽度
            tasksHeight: 60,  // 任务条高度
            tasksPadding: 8, // 任务条padding值
            TableDateTopList: [], // 时间表头列表
            TableDateBottomList: [],
            cellWidth: 0,
            list: [],
            unitOptions: [{
				value: 'week',
				label: '周'
			}, {
				value: 'day',
				label: '日'
			}, {
				value: 'hour',
				label: '时'
			}, {
				value: 'minute',
				label: '分'
			}],
            unitOfTime: 'week',
            // dateList
        }
    },
    created() {
        
        const options = {
            columns: columns,
            cWidth: this.cWidth,
            cHeight: this.cHeight,
            tasksHeight: this.tasksHeight,
            tasksPadding: this.tasksPadding,
            unitOfTime: this.unitOfTime,
        }
        this.gannt = new CreateGantt(options);
        this.setTableDateList();
        // this.cellWidth = this.gannt.cellWidth * 7;
        this.tableHeaderWidth = this.columns.map(item => item.width).reduce((a, b) => { return a + b });
        
    },
    mounted() {
        this.runDisplayPriority(); // 白屏优化 开启defer
        let canvas_parent = document.getElementById('canvas_parent');
        setTimeout(() => {
            this.list = data.data.list;
            this.gannt.tasks = this.list;
            this.gannt.init(canvas_parent);
        }, 1000);
        
        if (this.unitOfTime === "week") {
            this.cWidth = this.gannt.weekCellArr.length * this.gannt.cellWidth * 7;
        } else if (this.unitOfTime === "day") {
            this.cWidth = this.gannt.dayArr.length * this.gannt.cellWidth;
        } else if (this.unitOfTime === "hour") {
            this.cWidth = this.gannt.hourArr.length * this.gannt.cellWidth;
        } else if (this.unitOfTime === "minute") {
            this.cWidth = this.gannt.minuteArr.length * this.gannt.cellWidth;
        }
    },
    methods: {
        mouseDirectionChange(val) {
            this.gannt.setMouseDirection(val); // 设置滚动方向
        },
        runDisplayPriority() {
            const step = () => {
                requestAnimationFrame(() => {
                    this.displayPriority++
                    if (this.displayPriority < 50000) {
                        step()
                    }
                })
            }
            step()
        },

        defer(priority) {
            return this.displayPriority >= priority
        },
        setTableDateList() {
            this.TableDateTopList = this.gannt.weekCellArr;
            this.TableDateBottomList = this.gannt.dayArr;
        },
        setGanttZoom() {

        }
    }
}
</script>

<style scoped lang="scss">
.c-page-wrapper {
    overflow: hidden;
}

.ganttContainer {
    width: 88vw;
    height: 82vh;
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
        &-item {
            border-bottom: 1px solid #ccc;
            height: 25px;
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
        height: 1000px;
        position: absolute;
        top: 60px;
        left: 210px;
    }
}</style>