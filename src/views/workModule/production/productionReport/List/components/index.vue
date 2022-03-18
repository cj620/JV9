<template>
  <div>
    <div class="report-content">
      <div class="report-content-header">
        <div class="report-content-header-staff"></div>
        <div>
          <el-button @click="test">测试</el-button>
        </div>
        <div>
          <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
          >
            <div
              ref="ball"
              class="report-content-header-baseInfo"
              v-show="IsShow"
            ></div>
          </transition>
        </div>
      </div>

      <div class="report-content-state">
        {{ $t("production.Pr_AlreadyInStation") }}
      </div>
      <div class="report-card">
        <div
          v-for="(item, index) in DataList"
          class="report-card-list"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      DataList: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    test() {
      this.IsShow = !this.IsShow;
    },
    beforeEnter(el) {
      el.style.transform = "translate(250px, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      //enter表示动画开始之后的样式这里可以设置小球完成动画之后的结束状态
      el.style.transform = "translate(-180px,215px)";
      el.style.transition = "all 1.3s ease";

      done();
      console.log(1);
    },
    afterEnter(el) {
      this.IsShow = !this.IsShow;
      setTimeout(() => {
        console.log(2);
        this.DataList.unshift(6);
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.report-content {
  .report-content-header {
    // height: 150px;
    display: flex;
    .report-content-header-staff {
      width: 110px;
      height: 120px;
      border: 1px solid #000;
    }
    .report-content-header-baseInfo {
      width: 165px;
      height: 85px;
      margin-right: 20px;
      border: 1px solid #000;
    }
  }
  .report-content-state {
    padding: 15px 0px;
    border-bottom: 1px #cccccc solid;
    border-top: 1px #cccccc solid;
    margin-bottom: 15px;
  }

  .report-card {
    display: flex;
    flex-wrap: wrap;

    .report-card-list {
      width: 165px;
      height: 85px;
      margin-right: 20px;
      border: 1px solid #000;
    }
  }
}
</style>
