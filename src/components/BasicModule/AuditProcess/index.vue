<!--
 * @Author: your name
 * @Date: 2021-11-08 16:48:55
 * @LastEditTime: 2022-01-14 11:27:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\components\BasicModule\AuditProcess\index.vue
-->
<template>
  <div class="audit-process">
    <div class="top-descreption">
      <div>{{ "" }}</div>
      <div
        v-for="item in getAuditLine"
        :key="item.Id"
        :style="{ color: stateMap(item.AuditState).color }"
      >
        {{ stateMap(item.AuditState).name }}
      </div>
      <div>{{ "" }}</div>
    </div>
    <el-steps :active="getActive" finish-status="finish" align-center>
      <el-step icon="el-icon-edit">
        <i slot="icon" class="el-icon-s-promotion" style="font-size: 22px"></i>
        <span slot="title">
          <span class="title">{{ $t("Generality.Ge_Start") }}</span>
        </span>
      </el-step>

      <el-step icon="el-icon-edit" v-for="item in getAuditLine" :key="item.Id">
        <i
          slot="icon"
          :class="stateMap(item.AuditState).icon"
          style="font-size: 22px"
        ></i>
        <span slot="title">
          <span class="title">{{ item.UserName }}</span>
        </span>
        <div slot="description" class="description">
          {{ item.AuditRemarks | IsEmpty("") }}
        </div>
        <div slot="description" class="description">
          {{ item.AuditedAt | timeFrom("") }}
        </div>
      </el-step>
      <el-step icon="el-icon-edit">
        <i
          slot="icon"
          class="el-icon-switch-button"
          style="font-size: 22px"
        ></i>
        <span slot="title">
          <span class="title">{{ $t("Generality.Ge_End") }}</span>
        </span>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
import ProcessItem from "./cpns/ProcessItem.vue";
import { auditEnum } from "@/enum/baseModule/auditEnum";
export default {
  components: {
    ProcessItem,
  },
  props: {
    process: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    stateMap() {
      return (state) => {
        return auditEnum[state];
      };
    },
    getAuditLine() {
      // item.AuditState == "WaitToProcess" && item.NodeState == -1
      return this.process.filter((item) => {
        return !(item.AuditState == "WaitToProcess" && item.NodeState == -1);
      });
    },
    getActive() {
      if (this.getAuditLine.length == 0) return 1;
      let index = this.getAuditLine.findIndex((item) => {
        return item.AuditState == "WaitToProcess" && item.NodeState != -1;
      });
      if (index == -1) {
        // console.log(index, this.getAuditLine.length + 2, 7777777777777777);
        return this.getAuditLine.length + 2;
      }

      return index + 3;
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.audit-process {
  .top-descreption {
    width: 100%;
    padding: 5px 0;
    font-size: 14px;

    // background-color: pink;
    @include flexBox($jc: space-around);
    div {
      // width: 100%;
      flex: 1;
      @include flexBox;
    }
  }
  padding: 5px 10px;
  .title {
    color: rgb(121, 121, 121);
  }
  .description {
    // @include ellipsis;
    color: rgb(121, 121, 121);
  }
}
</style>
