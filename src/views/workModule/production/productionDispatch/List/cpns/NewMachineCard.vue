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
    <div class="machine-card-right" style="justify-content:space-evenly; padding-top: 5px; padding-right: 20px">
      <div class="machine-message">
        <i class="el-icon-setting"></i>
        {{ cdata.Device }}
      </div>
      <div class="machine-message">
        <i class="el-icon-finished"></i>
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
  //width: 250px;
  width: 210px;
  height: 115px;
  //height: 90%;
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
  //font-size: ;
}
</style>
