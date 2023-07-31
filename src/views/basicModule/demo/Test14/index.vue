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
				<!-- <el-select style="width: 66px;" @change="setGanttZoom" v-model="unitValue" placeholder="请选择单位">
					<el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select> -->
               
			</div>
            <div style="height: 30px;line-height: 30px;">
                <span style="font-size: 14px;">滚动方向：</span>
                <el-radio-group v-model="mouseDirection" @change="mouseDirectionChange">
                    <el-radio label="across">横向</el-radio>
                    <el-radio label="vertical">竖向</el-radio>
                </el-radio-group>
            </div>
		</div>
        <div class="ganttContainer">
            <canvas id="custom-gantt" :width="cWidth" :height="cHeight">你的浏览器不支持 canvas，请升级你的浏览器。</canvas>
        </div>
    </PageWrapper>
    
</template>

<script>
import columns from './columns';
import { CreateGantt } from './createGantt';
export default {
    data() {
        return {
            cWidth: 1200,
            cHeight: 780,
            mouseDirection: 'vertical',
            gannt: null
        }
    },
    created() {
        
    },
    mounted() {
        var canvas = document.getElementById('custom-gantt');
        const options = {
            columns: columns,
            cWidth: this.cWidth,
            cHeight: this.cHeight,
            tasks: [{id: 1, }]
        }
         this.gannt = new CreateGantt(canvas, options);
        
    },
    methods: {
        mouseDirectionChange(val) {
            this.gannt.setMouseDirection(val); // 设置滚动方向
        }
    }
}
</script>

<style scoped lang="scss">
.ganttContainer{
    background-color: #fff;
    border-radius: 4px;
    width: 100%;
    #custom-gantt{
    }
}
</style>