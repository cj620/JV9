<!--
 * @Author: C.
 * @Date: 2021-07-14 14:03:22
 * @LastEditTime: 2022-06-29 16:53:38
 * @Description: file content
-->
<template>
  <div>
    <div class="auditor">
      <!-- 头像 -->
      <div
        class="auditor-abb"
        :style="{
          background: checkStyle.background,
        }"
      >
        {{ auditor.UserName.slice(auditor.UserName.length - 2) }}
        <div
          class="auditor-state"
          :style="{ background: stateMap.color }"
        ></div>
      </div>
      <!-- 全名 -->
      <div class="auditor-name">
        <div
          class="auditor-name_word"
          :style="{
            color: checkStyle.color,
          }"
        >
          {{ auditor.UserName }}
        </div>
        <div class="auditor-name_state" :style="{ color: stateMap.color }">
          <span>{{ stateMap.name }}</span>
          <span
            v-if="auditor.ApprovedAt"
            style="color: #000; margin-left: 20px"
            >{{ datafilter("time", auditor.ApprovedAt) }}</span
          >
        </div>
      </div>
    </div>
    <div class="auditor-remark" v-if="auditor.Remarks">
      {{ auditor.Remarks | IsEmpty("") }}
      <div class="triangle"></div>
    </div>
  </div>
</template>

<script>
// import { formTypeEnum, bizStateEnum } from "@/enums";
import { auditEnum } from "@/enum/baseModule/auditEnum";
import { datafilter } from "~/maps/filterMaps";
export default {
  props: {
    auditor: {
      type: Object,
      default: () => {},
    },
    typeCheck: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkStyle: {
        background:
          this.typeCheck && this.auditor.ApproveState == "Skipped"
            ? "#ccc"
            : "#2979ff",
        color:
          this.typeCheck && this.auditor.ApproveState == "Skipped"
            ? "#ccc"
            : "#000",
      },
    };
  },
  methods: {
    datafilter,
  },
  computed: {
    stateMap() {
      return auditEnum[this.auditor.ApproveState];
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.auditor {
  width: 300px;
  margin: 7px;
  // background-color: #f3f3f3;
  @include flexBox(flex-start);
  .auditor-abb {
    width: 40px;
    height: 40px;
    background-color: #2979ff;
    @include flexBox;
    color: #fff;
    border-radius: 5px;

    position: relative;

    .auditor-state {
      // background-color: red;
      border-radius: 100%;
      width: 13px;
      height: 13px;
      position: absolute;
      right: -3px;
      bottom: -3px;
      border: 3px solid #fff;
    }
  }
  &-name {
    height: 40px;
    font-size: 13px;
    margin-left: 4px;
    @include flexBox($ff: column, $ai: flex-start, $jc: space-between);
    &_word {
      height: 50%;
      font-size: 15px;
      // font-weight: 600;
    }
    &_state {
      font-size: 15px;
    }
  }
}
.auditor-remark {
  margin-top: 15px;
  margin-left: 50px;
  padding: 5px;
  background-color: #f3f3f3;
  font-size: 15px;
  position: relative;
  border-radius: 5px;
  .triangle {
    width: 0;
    height: 0;
    border-color: transparent transparent #f3f3f3 transparent; /*1、下边框有颜色 对应着上边框没有宽度,是正三角形；2、上边框有颜色 对应着下边框没宽度，是倒三角形*/
    border-style: solid;
    border-width: 0 7px 10px 7px;
    position: absolute;
    top: -10px;
    left: 7px;
  }
}
</style>
