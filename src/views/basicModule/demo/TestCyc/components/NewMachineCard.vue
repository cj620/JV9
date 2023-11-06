<template>
  <div class="machine-card">
    <div class="machine-card-left" style="justify-content:space-evenly">
      <div class="machine-message">
        <i class="el-icon-alarm-clock"></i>
        {{ message.TimeSpan }}
      </div>
      <div class="machine-message">
        <i class="el-icon-finished"></i>
        {{ message.Efficiency }}
      </div>
    </div>
    <div class="machine-card-right">
      <div style="margin-top: 5px">
        <el-image
          style="width: 67px; height: 71px; border-radius: 5px;"
          :src="imgUrlPlugin(message.PhotoUrl)"
          :preview-src-list="[imgUrlPlugin(message.PhotoUrl)]"
          class="staff-avatar-Img-error"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline error-icon"></i>
          </div>
        </el-image>
      </div>
      <div class="machine-message">
        {{ message.DeviceNo }}
      </div>
    </div>
  </div>
</template>
<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system";
export default {
  data() {
    return {
      message: {
        PhotoUrl: "\\Files\\1478905072459972610.png",
        DeviceNo: "C2",
        TimeSpan: "8:00-20:00",
        Efficiency: "0.00%",
      }
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
};
</script>
<style lang="scss">
.machine-card {
  width: 250px;
  height: 90%;
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
