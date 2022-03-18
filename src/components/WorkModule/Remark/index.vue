<!--
 * @Author: your name
 * @Date: 2021-11-25 15:53:59
 * @LastEditTime: 2021-11-25 16:23:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\components\WorkModule\Remark\index.vue
-->
<template>
  <div class="remark-plugin">
    <el-input type="textarea" v-model="content"></el-input>
    <div class="btn-group">
      <el-button type="primary" size="mini" @click="confirm">确 定</el-button>
      <el-button size="mini" @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    confirm() {
      this.$emit("confirm", this.content);
      this.content = "";
    },
    cancel() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.btn-group {
  margin-top: 10px;
  text-align: end;
}
</style>
