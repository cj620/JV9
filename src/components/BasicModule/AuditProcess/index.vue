<!--
 * @Author: your name
 * @Date: 2021-11-08 16:48:55
 * @LastEditTime: 2023-07-13 16:27:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\components\BasicModule\AuditProcess\index.vue
-->
<template>
  <div class="audit-process">
    <div class="top-descreption">
      <div class="state-tag"></div>
      <div
        class="state-tag"
        v-for="item in process"
        :key="item.Id"
        :style="{
          color: stateMap(item.ApproveState).fcolor,
          background: stateMap(item.ApproveState).color,
        }"
      >
        {{ stateMap(item.ApproveState).name }}
      </div>
      <div class="state-tag"></div>
    </div>
    <!-- {{ getActive }} -->
    <el-steps :active="getActive" finish-status="finish" align-center>
      <el-step icon="el-icon-edit">
        <i slot="icon" class="el-icon-s-promotion" style="font-size: 22px"></i>
        <span slot="title">
          <span class="title">{{ $t("Generality.Ge_Start") }}</span>
        </span>
      </el-step>

      <template v-for="(item, index) in process">
        <template>
          <el-step icon="el-icon-edit" :key="item.Id">
            <i
              slot="icon"
              :class="stateMap(item.ApproveState).icon"
              style="font-size: 22px"
            ></i>
            <span slot="title">
              <span class="title">{{ item.Name }} </span>
            </span>
            <div slot="description" class="description">
              <el-link type="primary" @click="showDetail(item)"
                >{{ $t("Generality.Ge_ShowDetail") }}</el-link
              >
            </div>
            <div slot="description" class="description" v-if="item.ApprovedAt">
              {{ datafilter("time", item.ApprovedAt) }}
            </div>
          </el-step>
        </template>

        <el-step
          icon="el-icon-edit"
          v-if="index == process.length - 1"
          :key="uuid()"
        >
          <i
            slot="icon"
            class="el-icon-switch-button"
            style="font-size: 22px"
          ></i>
          <span slot="title">
            <span class="title">{{ $t("Generality.Ge_End") }}</span>
          </span>
        </el-step>
      </template>

      <el-step icon="el-icon-edit" v-if="process.length == 0">
        <i slot="icon" class="el-icon-switch-button" style="font-size: 22px">
        </i>
        <span slot="title">
          <span class="title">{{ $t("Generality.Ge_End") }}</span>
        </span>
      </el-step>
    </el-steps>
    <el-drawer :visible.sync="drawerShow">
      <div slot="title">
        {{ currentNodeData.Name }}
        <span
          v-if="currentNodeData.ApproveType"
          class="approve-type"
          :style="{
            background: multiplayer[currentNodeData.ApproveType].color,
          }"
          >{{ multiplayer[currentNodeData.ApproveType].label }}
        </span>
      </div>
      <div class="auditor-process">
        <div
          v-for="AuditorItem in currentNodeData.ApproveNodeUsers"
          :key="AuditorItem.Id"
        >
          <Auditor
            :auditor="AuditorItem"
            :typeCheck="currentNodeData.ApproveType == 'OptionallySign'"
          />
          <!-- <div
            class="plus"
            v-if="AuditorIndex !== currentNodeData.ApproveNodeUsers.length - 1"
          >
            {{ currentNodeData.ApproveType == "JointlySign" ? "和" : "或" }}
          </div> -->
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import Auditor from "./cpns/Auditor.vue";
import { auditEnum } from "@/enum/baseModule/auditEnum";
import { datafilter } from "~/maps/filterMaps";
import { multiplayer } from "@/views/basicModule/OA/maps/auditMap";
import { uuid } from "~/utils/common";
export default {
  components: {
    Auditor,
  },
  props: {
    process: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      drawerShow: false,
      currentNodeData: {},
      multiplayer,
      stepShow: false,
    };
  },
  mounted() {
    this.stepShow = true;
  },
  methods: {
    uuid,
    datafilter,
    showDetail(e) {
      // alert("12123");
      this.drawerShow = true;
      this.currentNodeData = e;
    },
  },
  computed: {
    stateMap() {
      return (state) => {
        return auditEnum[state];
      };
    },
    getActive() {
      let index = this.process.findIndex((item, index) => {
        return item.ApproveState == "WaitToProcess";
      });
      // console.log(index, 9999999);
      if (index == -1) {
        if (this.process.length == 0) {
          index = 0;
        } else {
          index = this.process.length + 3;
        }
      }
      return index + 1;
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
    .state-tag {
      max-width: 100px;
      padding: 4px 5px;
      border-radius: 20px;
    }
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
  .auditor-process {
    width: 96%;
    padding: 5px 10px 200px 10px;
    background-color: #fff;
    .plus {
      width: 20px;
      height: 20px;
      background-color: #ccc;
      border-radius: 50%;
      padding: 5px;
    }
  }
  .el-drawer__header {
    margin-bottom: 0;
  }
  .approve-type {
    font-size: 12px;
    color: #fff;
    padding: 5px 10px;
    border-radius: 10px;
  }
}
</style>
