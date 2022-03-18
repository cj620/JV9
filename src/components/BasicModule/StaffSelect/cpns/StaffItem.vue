<!--
 * @Author: C.
 * @Date: 2021-10-12 15:50:59
 * @LastEditTime: 2021-11-05 14:15:15
 * @Description: file content
-->
<template>
  <div class="staff-item" @click="$emit('click', data)">
    <div class="avatar">
      {{ data.UserName.slice(data.UserName.length - 2) }}
    </div>
    {{ data.UserName }}
    <i
      class="el-icon-circle-close del-icon"
      @click="$emit('del', data.UserId)"
      v-if="type == 'del'"
    ></i>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: "show",
    },
  },
};
</script>

<style lang="scss">
@mixin flexBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.staff-item {
  width: 100%;
  padding: 5px;
  font-size: 14px;
  // background-color: pink;
  @include flexBox;
  justify-content: flex-start;
  position: relative;
  .del-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 18px;
  }
  &:hover {
    background-color: #e7eaef;
  }
  .avatar {
    @include flexBox;
    height: 30px;
    width: 30px;
    border-radius: 100%;
    background-color: #409eff;
    color: #fff;
    font-size: 13px;
    margin-right: 7px;
  }
}
</style>
