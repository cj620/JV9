<template>
  <div class="machine-card">
    <div class="machine-card-left" style="justify-content: space-around;">
      <div>
        <el-image
          style="width: 67px; height: 71px; border-radius: 5px;"
          :src="imgUrlPlugin(cdata.PhotoUrl)"
          :preview-src-list="[imgUrlPlugin(cdata.PhotoUrl)]"
          class="staff-avatar-Img-error"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline error-icon"></i>
          </div>
        </el-image>
      </div>
    </div>
    <div class="machine-card-right machine-card-right-box">
      <div class="machine-message">
        <i class="el-icon-setting" style="margin-right: 5px"></i>
        <div style="text-indent: 1.4em">
          {{ cdata.Device }}
        </div>
      </div>
      <div class="machine-message">
        <i class="el-icon-finished" style="margin-right: 5px"></i>
        {{ parseFloat(this.cdata.Efficency.toFixed(2)) }}%
      </div>
    </div>

  </div>
</template>
<script>
import { imgUrlPlugin } from "~/utils/system";
export default {
  data() {
    return {

    }
  },
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    imgUrlPlugin,
  },
  created() {
  }
};
</script>
<style lang="scss" scoped>
.machine-card {
  width: 235px;
  height: 115px;
  padding: 5px 10px;
  background-color: orange;
  box-shadow: 1px 1px 3px #888888;
  border-radius: 5px;
  margin: auto;
  display: flex;
  &-left,&-right {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &-right-box{
    justify-content:space-around;
    width: calc(100% - 67px);
    box-sizing: border-box;
    padding: 10px 0;
    position: relative;
    .el-icon-setting{
      position: absolute;
    }
  }
}
.machine-message {
  color: white;
  font-weight: bold;
  min-height: 21px;
  width: 150px;
  padding-left: 15px;
  white-space: normal;
  word-break: break-word;

  display: -webkit-box; /* 将元素的子元素排列成一个垂直的盒子 */
  -webkit-box-orient: vertical; /* 设置盒子方向为垂直 */
  -webkit-line-clamp: 3; /* 限制显示的行数 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 在末尾显示省略号 */
  height: auto; /* 可选：设置高度，确保高度根据内容自动调整 */
}
.staff-avatar-Img-error {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(231, 231, 231);
  color: rgb(161, 161, 161);
}
</style>
