<!--
 * @Author: C.
 * @Date: 2021-12-09 10:33:56
 * @LastEditTime: 2022-01-11 16:45:49
 * @Description: file content
-->
<template>
  <div class="j-user-img">
    <el-card :body-style="{ padding: '0px', width: '120px', height: '135px;' }">
      <el-image :src="imgUrlPlugin(UserData.PhotoUrl)" class="image">
        <div slot="error" class="image-slot">
          <img src="@/assets/errorImg/error.png" height="120px" alt="" />
        </div>
      </el-image>
      <div class="user-name">
        <i class="el-icon-user"></i>
        <span>{{ UserData.UserName | IsEmpty }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
export default {
  props: {
    UserData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      currentDate: new Date(),
    };
  },
  methods: {
    imgUrlPlugin,
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.j-user-img {
  .time {
    font-size: 13px;
    color: #999;
  }
  .user-name {
    @include ellipsis;
    padding: 14px;
    font-size: 14px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 120px;
    display: block;
    height: 120px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }
}
</style>
