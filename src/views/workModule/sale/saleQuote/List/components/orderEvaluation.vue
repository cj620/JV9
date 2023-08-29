<template>
  <PageWrapper :footer="false">
    <div class="order-evaluation">
      <div class="order-evaluation-header">
        <span>评估时间</span>
        <div>
          <el-date-picker
            v-model="dateRange"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script>
export default {
  name: "Sa_OrderEvaluation",
  data() {
    return {
      dateRange: '',
    };
  },
  created() {},
  methods() {},
};
</script>

<style scoped lang="scss">
.order-evaluation{
  background: #fff;
  width: 100%;
  height: 100%;
  &-header{
    display: flex;
    height: 40px;
    align-items: center;
    padding-left: 10px;
    span:first-child{
      font-size: 14px;
      margin-right: 10px;
    }
  }
}
</style>
