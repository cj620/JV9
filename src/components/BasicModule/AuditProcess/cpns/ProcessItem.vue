<!--
 * @Author: your name
 * @Date: 2021-11-09 10:44:10
 * @LastEditTime: 2021-11-09 15:31:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\components\BasicModule\AuditProcess\cpns\ProcessItem.vue
-->
<template>
  <div class="process-item-style">
    <div :class="getClassName">
      <!-- {{ stateMap.name }} -->
      <!-- 描述 -->
      <div class="down-block">
        <div class="remark col-item">
          {{ cdata.AuditRemarks | IsEmpty }}
        </div>
      </div>
      <!-- 点 -->
      <div class="step-line">
        <div class="left-dot" :style="leftStyle"></div>
        <div class="dot"></div>
        <div class="right-dot" :style="rightStyle"></div>
      </div>
      <div class="down-block">
        <div class="description col-item">{{ stateMap.name }}</div>
        <div class="people col-item">{{ cdata.UserName }}</div>
        <div class="time col-item">2020-12-01</div>
      </div>
    </div>
  </div>
</template>

<script>
import { auditEnum } from "@/enum/baseModule/auditEnum";
export default {
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
    positon: {
      type: String,
      default: "iscenter",
    },
  },
  computed: {
    stateMap() {
      // console.log(this.cdata, 555555555);
      return auditEnum[this.cdata.AuditState];
    },
    getClassName() {
      return this.positon + "-process-item";
    },
    leftStyle() {
      // positon width: 23%;
      return {
        background: this.positon == "isleft" ? "#fff" : "",
      };
    },
    rightStyle() {
      return {
        background: this.positon == "isright" ? "#fff" : "",
      };
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.process-item-style {
  .step-line {
    width: 100%;
    height: 5px;
    @include flexBox(space-between);
    .dot {
      border-radius: 50%;
      background-color: #0960bd;
      width: 9px;
      height: 9px;
    }
    .left-dot {
      height: 3px;
      background-color: #0960bd;
    }
    .right-dot {
      height: 3px;
      background-color: #0960bd;
    }
    .col-item {
      @include flexBox();
      margin: 5px 5px;
    }
  }

  .iscenter-process-item {
    .left-dot {
      width: 48%;
    }
    .right-dot {
      width: 48%;
    }
    .col-item {
      @include flexBox();
      width: 100%;
      margin: 5px 5px;
    }
  }

  .isleft-process-item {
    .step-line {
      .left-dot {
        width: 23%;
      }
      .right-dot {
        width: 73%;
      }
    }
    .col-item {
      @include flexBox();
      width: 45%;
      margin: 5px 5px;
    }
  }
  .isright-process-item {
    .step-line {
      .left-dot {
        width: 73%;
      }
      .right-dot {
        width: 23%;
      }
    }
    .down-block {
      width: 100%;
      @include flexBox($ff: column, $ai: flex-end);
    }
    .col-item {
      @include flexBox();
      width: 45%;
      margin: 5px 5px;
    }
  }
}
</style>
