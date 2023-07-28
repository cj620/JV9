<template>
  <PageWrapper ref="page" :footer="false">
    <div>
      <el-form>
        <el-form-item label="排程算法选择">
          <el-select
            v-model="value"
            multiple
            placeholder="请选择排程算法"
            size="small"
            style="width: 400px"
          >
            <el-option label="经典算法" value="经典算法"></el-option>
            <el-option label="CR值排程" value="CR值排程"></el-option>
            <el-option label="最短工期" value="最短工期"></el-option>
            <el-option label="最短交货期" value="最短交货期"></el-option>
          </el-select>
          <el-button plain size="small" style="margin-left: 10px"
            >模拟计算</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </PageWrapper>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      value: [],
    };
  },
};
</script>

<style scoped></style>
