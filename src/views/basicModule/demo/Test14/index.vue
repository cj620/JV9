<template>
    <PageWrapper :footer="false">
        <CustomGantt
            :columns="columns"
            taskRadius="6"
            :result="result"
            :loading="loading"
            :ganttContainerHeight="ganttContainerHeight"
            >
            <template #gntHeaderRight>
                <span>
                    <span style="font-size: 14px;">算法类型：</span>
                    <el-select style="width: 120px;" @change="setAlgorithmType" v-model="AlgorithmType" placeholder="请选择类型">
                        <el-option v-for="item in selectTypes" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select></span>
            </template>
        </CustomGantt>
        <button @click="setFold">展开/收起</button>

        <!-- <JvTable ref="BillTable" :table-obj="oldTableObj">
            <Action size="mini" slot="btn-list" :actions="getListTableBtnModel"></Action>
        </JvTable> -->
        
    </PageWrapper>
</template>

<script>
import columns from './columns';
// 引入表格类
// import { Table } from "./config";
import {simulation_scheduling_list, overdue_and_obsolete_list} from '@/api/workApi/production/productionSchedule';
import  CustomGantt  from '@/components/CustomGantt/index.vue'
export default {
    components: { CustomGantt },
    data() {
        return {
            columns: columns,
            result: {},
            AlgorithmType: 'ClassicalAlgorithm',
            selectTypes: [
                {
                    label: i18n.t('production.Pr_ConventionalAlgorithm'),
                    value: 'ClassicalAlgorithm',
                },
                {
                    label: i18n.t('production.Pr_ShortestDurationAlgorithm'),
                    value: 'MinimumWorkingPeriod',
                },
                {
                    label: i18n.t('production.Pr_AlgorithmForEarliestDeliveryTime'),
                    value: 'EarliestDeliveryDate',
                },
                {
                    label: i18n.t('production.Pr_CRValueScheduling'),
                    value: 'CR',
                },
            ],
            overdueOrObsoleteType: 'ObsoleteWorkOrder',
            loading: false,
            timeout: null,
            oldTableObj: { type:"", data:"" }, // 陈旧表格
            ObsoleteTableObj: { type:"", data:"" }, // 超期表格
            isFold: false, // 是否展开
            ganttContainerHeight: 800, //甘特图盒子的高度
        }
    },
    created() {
        this.setAlgorithmType();
        this.getOverdueAndObsoleteList();
    },
    mounted() {
        this.setGanttContainer();
    },
    methods: {
        // 获取排程结果
        setAlgorithmType(val) {
            this.loading = true;
            simulation_scheduling_list({
                AlgorithmType: this.AlgorithmType,
                CurrentPage: 1,
                PageSize: 10
            }).then(res => {
                this.result = res
                this.loading = false;
            })
        },
        // 获取陈旧超期加工任务单
        getOverdueAndObsoleteList() {
            overdue_and_obsolete_list({
                SelectType: this.overdueOrObsoleteType,
                CurrentPage: 1,
                PageSize: 10
            }).then(res => {
                console.log('res::: ', res);

            })
        },
        setGanttContainer() {
            let mainContent = document.querySelector('.main-content');
            this.ganttContainerHeight = this.isFold ? mainContent.clientHeight-80 : mainContent.clientHeight/2 -80; // 甘特图盒子的高度
            window.onresize = (e) => {
                this.debounce(() => {
                    this.ganttContainerHeight = this.isFold ? mainContent.clientHeight-80 : mainContent.clientHeight/2 -80; // 甘特图盒子的高度
                },100)
            }
        },
        // 展开表格
        setFold() {
            this.isFold = !this.isFold;
            this.setGanttContainer();
        },
        debounce(func, wait) {
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
			this.timeout = setTimeout(func, wait);
		},
    }
}
</script>

<style scoped lang="scss">

</style>