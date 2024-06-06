<template>
  <div class="machine-card">
    <div class="machine-card-left" style="justify-content: space-around">
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
    <div class="machine-card-right" style="justify-content:space-evenly; padding-top: 5px; padding-right: 15px">
      <div class="machine-message">
        <i class="el-icon-s-custom"></i>
        {{ cdata.UserName }}
      </div>
      <div class="machine-message">
        <i class="el-icon-finished"></i>
        {{ parseFloat(this.cdata.TaskProgress.toFixed(2)) }}%
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
  background-color: orange;
  box-shadow: 1px 1px 3px #888888;
  border-radius: 5px;
  margin: auto;
  display: flex;
  &-left,&-right {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.machine-message {
  color: white;
  font-weight: bold;
  height: 20%
}
.staff-avatar-Img-error {
  background-color: rgb(231, 231, 231);
  display: flex;
  align-items: center;
  justify-content: center;
  .image-slot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .error-icon {
      color: rgb(161, 161, 161);
      font-size: 19px;
    }
  }
}
</style>
