<!--
 * @Author: C.
 * @Date: 2024-02-28 09:28:13
-->
<template>
  <div class="arrow-right" @click="tagClick">
    <i class="el-icon-arrow-right icon"></i>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions("dashboard", ["SlideRight"]),
    tagClick() {
      this.SlideRight();
    },
  },
};
</script>
<style lang="scss" scoped>
.arrow-right {
  position: absolute;
  cursor: pointer;
  color: #fff;
  right: 10px;
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
