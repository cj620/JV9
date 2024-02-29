<!--
 * @Author: C.
 * @Date: 2024-02-28 09:28:13
-->
<template>
  <div class="arrow-left" @click="tagClick">
    <i class="el-icon-arrow-left icon"></i>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions("dashboard", ["SlideLeft"]),
    ...mapMutations("dashboard", ["startTimer", "endTimer"]),
    tagClick() {
      this.SlideLeft();
    },
  },
  created() {
    console.log("created");
    this.startTimer();
  },
  destroyed() {
    console.log("destroyed");
    this.endTimer();
  },
};
</script>
<style lang="scss" scoped>
.arrow-left {
  position: absolute;
  cursor: pointer;
  color: #fff;
  left: 10px;
  top: 40%;
  translate: transform(-50%, 0);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  .icon {
    font-size: 25px;
  }
}
</style>
