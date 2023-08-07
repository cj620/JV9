<template>
    <PageWrapper :footer="false">
        <CustomGantt
        :columns="columns"
        taskRadius="6"
        :result="result"
        :loading="loading"
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
    </PageWrapper>
</template>

<script>
import columns from './columns';
import {simulation_scheduling_list} from '@/api/workApi/production/productionSchedule';
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
                    label: '经典算法',
                    value: 'ClassicalAlgorithm',
                },
                {
                    label: '最短工期',
                    value: 'MinimumWorkingPeriod',
                },
                {
                    label: '最早交货期',
                    value: 'EarliestDeliveryDate',
                },
                {
                    label: 'CR值排程',
                    value: 'CR',
                },
            ],
            loading: false,
        }
    },
    created() {
        this.setAlgorithmType();
    },
    mounted() {
        
    },
    methods: {
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
        }
    }
}
</script>

<style scoped lang="scss">

</style>