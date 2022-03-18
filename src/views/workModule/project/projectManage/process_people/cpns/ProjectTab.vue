<!--
 * @Author: your name
 * @Date: 2021-11-23 09:19:30
 * @LastEditTime: 2021-11-23 13:02:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\process_people\cpns\ProjectCard.vue
-->
<template>
  <div class="project-tab">
    <el-row>
      <el-col :span="2">
        <ProjectMsg :cdata="cdata.ToolingInfo"></ProjectMsg>
      </el-col>
      <el-col :span="22">
        <div class="people-box">
          <!-- cdata.WorkerList -->
          <PeopleMsg
            style="display: inline-block"
            :cdata="item"
            v-for="(item, index) in cdata.WorkerList"
            :key="index"
          ></PeopleMsg>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProjectMsg from "./ProjectMsg.vue";
import PeopleMsg from "./PeopleMsg.vue";
export default {
  components: {
    ProjectMsg,
    PeopleMsg,
  },
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ll() {
      console.log(this.cdata);
    },
  },
};
</script>

<style lang="scss">
.project-tab {
  @import "~@/jv_doc/style/mixin.scss";
  padding: 5px 10px;
  .people-box {
    // width: 100%;
    // overflow-x: auto;
  }
}
</style>
