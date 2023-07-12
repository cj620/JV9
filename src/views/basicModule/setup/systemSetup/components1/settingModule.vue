<!--
 * @Author: H.
 * @Date: 2021-11-25 16:07:21
 * @LastEditTime: 2021-12-06 11:19:19
 * @Description: 系统设置模块
-->

<template>
  <div class="configModule">
    <ul>
      <li
        v-for="(item, index) in data"
        :key="item.Category"
        @click="roleClick(item, index)"
        class="configModule-item"
        :class="{ actived: index === isIndex }"
      >
        <span>{{ item.Category }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isIndex: 0,
    };
  },
  props: {
    configData: {
      type: Array,
      require: true,
    },
  },
  methods: {
    roleClick(item, index) {
      this.isIndex = index;
      this.$emit("roleClick", item);
    },
  },
  mounted() {},
  computed: {
    data() {
      if (this.configData.length > 0) {
        this.roleClick(this.configData[this.isIndex], this.isIndex);
      }
      return this.configData;
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
  padding: 0;
}

.configModule {
  background: #fff;
  height: calc(100vh - 125px);
  padding: 6px 0;

  border-right: 20px solid #f0f2f5;
  ul > li {
    font-size: 14px;
    padding: 6px 12px;
    line-height: 1.5;
    overflow: hidden;
    border-bottom: none;
    color: #000000d9;
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        display: none;
        font-size: 1rem;
        i {
          margin: 0 3px;
        }
      }
    }
    &:hover {
      background-color: whitesmoke;
      cursor: pointer;
      .configModule-item {
        span {
          color: #006fff;
          display: inline;
        }
      }
    }
    &.actived {
      color: #006fff;
      background-color: whitesmoke;
    }
  }
}
</style>
