<template>
    <PageWrapper :footer="false">
        <span style="font-size: 14px;">单位：</span>
                <el-select style="width: 66px;" @change="setGanttZoom" v-model="unitOfTime" placeholder="请选择单位">
                    <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
        <CustomGantt
            :columns="columns"
            taskRadius="6"
            :result="result"
            :loading="loading"
            :ganttContainerHeight="ganttContainerHeight"
            ref="CustomGantt"
            >
            <template #pagination>
                <div class="custom-unfold" @click="setFold">
                    <i :class="unfold_icon"></i>
                </div>
            </template>
        </CustomGantt>


        <div class="overdueOrObsolete">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="陈旧工单" name="overdue">
                    <div :style="{height: ganttContainerHeight+40+'px'}">
                        <div class="padding-value"></div>
                        <JvTable ref="BillTable" :table-obj="oldTableObj">
                        <!-- <Action size="mini" slot="btn-list" :actions="getListTableBtnModel"></Action> -->
                        </JvTable>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="超期工单" name="obsolete">
                    <div :style="{height: ganttContainerHeight+40+'px'}">
                        <div class="padding-value"></div>
                        <JvTable ref="BillTable" :table-obj="ObsoleteTableObj">
                            <template #operation="{ row }">
                                <TableAction :actions="[
                                    {
                                        label: '编辑',
                                        confirm: obsoleteEdit.bind(null,row)
                                    }]" />

                            </template>
                        </JvTable>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

    </PageWrapper>
</template>

<script>
import columns from './columns';
import { timeFormat } from "@/jv_doc/utils/time";
import {Bus} from '@/jv_doc/class/event/EventBus';
// 引入表格类
import { Table, Table1 } from "./config";
import {simulation_scheduling_list} from '@/api/workApi/production/productionSchedule';
import  CustomGantt  from '@/components/CustomGantt/index.vue'
export default {
    components: { CustomGantt },
    data() {
        return {
            columns: columns,
            result: {},
            AlgorithmType: 'ClassicalAlgorithm',
            // overdueOrObsoleteType: 'Normal',
            loading: false,
            timeout: null,
            activeName: 'overdue',
            oldTableObj: { }, // 陈旧表格
            ObsoleteTableObj: {  }, // 超期表格
            isFold: false, // 是否展开
            ganttContainerHeight: 800, //甘特图盒子的高度
            unfold_icon: 'el-icon-arrow-down',
            eventBus: null,
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
            unitOfTime: 'hour',
        }
    },
    created() {
        this.eventBus = Bus;
        // 创建表格实例
        this.oldTableObj = new Table();
        this.oldTableObj.getData({SelectType: 'Normal'});
        this.ObsoleteTableObj = new Table1();
        this.ObsoleteTableObj.getData({SelectType: 'ObsoleteWorkOrder'});

        this.setAlgorithmType();
        // this.getOverdueAndObsoleteList();
    },
    mounted() {
        this.setGanttContainer();
        this.eventBus.$on('handleSizeChange', (pageSize, current) => {
            this.setAlgorithmType(pageSize, current);
        })
        this.eventBus.$on('handleCurrentChange', (pageSize, current) => {
            this.setAlgorithmType(pageSize, current);
        })
    },
    methods: {
        // 切换时间
        setGanttZoom(val) {
            this.$refs.CustomGantt.setGanttZoom(val);
        },
        // 获取排程结果
        setAlgorithmType(size = 10, page = 1 ) {
            this.loading = true;
            simulation_scheduling_list({
                AlgorithmType: this.AlgorithmType,
                CurrentPage: page,
                PageSize: size
            }).then(res => {
                res.Items = res.Items.map(item => {
                    return {
                        ...item,
                        Data: item.Data.map(jtem => {
                            return {
                                ...jtem,
                                _PlanStart: timeFormat(jtem.PlanStart, 'yyyy-MM-dd hh:mm:ss'),
                                _PlanEnd: timeFormat(jtem.PlanEnd, 'yyyy-MM-dd hh:mm:ss'),
                            }
                        })

                    }
                })
                this.result = res;
                this.loading = false;
            })
        },
        // 获取陈旧超期加工任务单
        // getOverdueAndObsoleteList() {
        //     overdue_and_obsolete_list({
        //         SelectType: this.overdueOrObsoleteType,
        //         CurrentPage: 1,
        //         PageSize: 10
        //     }).then(res => {
        //         console.log('res::: ', res);

        //     })
        // },
        setGanttContainer() {
            let mainContent = document.querySelector('.main-content');
            this.ganttContainerHeight = this.isFold ? mainContent.clientHeight-110 : mainContent.clientHeight/2 -110; // 甘特图盒子的高度
            window.onresize = (e) => {
                this.debounce(() => {
                    this.ganttContainerHeight = this.isFold ? mainContent.clientHeight-110 : mainContent.clientHeight/2 -110; // 甘特图盒子的高度
                },100)
            }
        },
        // 展开表格
        setFold() {
            this.isFold = !this.isFold;
            this.unfold_icon = this.isFold ? "el-icon-arrow-up" : "el-icon-arrow-down"
            this.setGanttContainer();
        },
        debounce(func, wait) {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			this.timeout = setTimeout(func, wait);
		},
        handleClick(tab) {
            if(tab.index == "0") {
                this.oldTableObj.reset();
            } else {
                this.ObsoleteTableObj.reset();
            }
        },
        obsoleteEdit(val) {
            console.log('val::: ', val);
        },
    },
    beforeDestroy(){
        this.eventBus.$off("handleSizeChange");
        this.eventBus.$off("handleCurrentChange");
    }
}
</script>

<style scoped lang="scss">
.overdueOrObsolete{
    background-color: #fff;
    margin-top: 10px;
    ::v-deep .el-tabs__header{
        margin: 0;
    }
}
.custom-unfold{
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
}
.padding-value{
    height: 10px;
}
</style>
