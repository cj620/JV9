<!--
 * @Author: your name
 * @Date: 2021-10-27 09:45:11
 * @LastEditTime: 2022-01-05 14:36:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\layout\components\Sidebar\Logo.vue
-->
<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img src="@/assets/image/logo.png" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="@/assets/image/logo.png" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: "MTMMS V9",
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
