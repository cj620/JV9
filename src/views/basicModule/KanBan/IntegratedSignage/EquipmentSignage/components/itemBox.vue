<script>
export default {
  name: "itemBox",
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <dv-border-box-12>
    <div class="itemBox-title">
      <div>{{title}}</div>
    </div>
    <div class="itemBox-content">
      <slot></slot>
    </div>
  </dv-border-box-12>
</template>

<style scoped lang="scss">
.itemBox-content{
  height: calc(100% - 40px);
  padding: 0 6px;
}
.itemBox-title{
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  div{
    height: 100%;
    background: #181e40;
    color: #efefef;
    font-size: 16px;
    min-width: 180px;
    padding: 0 10px;
    text-align: center;
    line-height: 30px;
    margin-top: 6px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    border: 2px solid #2e6099;
    border-top: none;
  }
}
</style>
