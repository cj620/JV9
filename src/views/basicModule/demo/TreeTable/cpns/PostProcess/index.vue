<!--
 * @Author: C.
 * @Date: 2021-11-10 15:14:01
 * @LastEditTime: 2022-01-13 09:58:58
 * @Description: file content
-->
<template>
  <div class="production-report-page">
    <div class="progress-bar">
      <div class="top-descreption">
        <!-- <UserImg :UserData="UserData" v-for="i in 3" :key="i"></UserImg> -->

        <PUser></PUser>
        <div>
          <!-- <el-avatar src="circleUrl" :size="50"></el-avatar> -->
          张三
        </div>
        <div>
          <!-- <el-avatar src="circleUrl" :size="50"></el-avatar> -->
          张三
        </div>
      </div>

      <div class="step-bar">
        <el-steps :active="stepActive" align-center finish-status="success">
          <el-step title="员工录入"> </el-step>

          <el-step title="工单录入"></el-step>
          <el-step :title="$t('production.Pr_EnterStation')"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="pro-input">
      <el-input
        v-model="formData"
        ref="refFocus"
        :placeholder="$t('production.Pr_PleaseEnterEmployeeNoAndWorkSheetNo')"
        @keyup.enter.native="inputStep"
      >
        <template slot="prepend">H!_</template>
      </el-input>
    </div>
  </div>
</template>

<script>
import PUser from "./cnps/PUser.vue";
export default {
  components: {
    PUser,
  },
  data() {
    return {
      stepActive: 0,
    };
  },
  methods: {
    inputStep() {
      this.stepActive += 1;
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.production-report-page {
  background-color: #fff;
  .top-descreption {
    width: 100%;
    padding: 5px 0;
    font-size: 14px;

    // background-color: pink;
    @include flexBox($jc: space-around);
    div {
      // width: 100%;
      flex: 1;
      // @include flexBox;
    }
  }
  .progress-bar {
    padding: 10px 20px;
    .step-bar {
      // padding: 0 15px;
    }
  }
  .pro-input {
    padding: 0 100px;
  }
}
</style>
