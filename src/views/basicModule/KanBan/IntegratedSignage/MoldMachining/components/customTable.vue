<template>
  <div  style="height: 100%">
    <div  :style="{height: height}">
    <div class="box">
      <ul class="header">
        <li class="cell">{{ $t('Generality.Ge_BillId') }}</li><!-- 单号 -->
        <li class="cell">{{ $t('production.Pr_ToolingNo') }}</li><!-- 产品号 -->
        <li class="cell">{{ $t('design.De_ToolingNo') }}</li><!-- 零件号 -->
        <li class="cell">{{ $t('Generality.Ge_PartName') }}</li><!-- 零件名称 -->
        <li class="cell">{{ $t('Generality.Ge_State') }}</li><!-- 状态 -->
      </ul>
      <div class="body">
        <ul class="list">
           <HelloWord>
            <li
            v-for="(item, index) in this.data"
            :key="index"
            class="row"
          >
            <span class="cell">{{ item.BillId }}</span>
            <span class="cell">{{ item.ToolingNo }}</span>
            <span class="cell">{{  item.PartNo }}</span>
            <span class="cell">{{  item.PartName }}</span>
            <span class="cell">{{  item.State }}</span>
          </li>
           </HelloWord>

        </ul>
      </div>
    </div>
    </div>
    </div>
</template>

<script>
import HelloWord from "./HelloWord.vue";
export default {
  data() {
    return {
      arr: [],
      timer: null,
      speed: null,
    }
  },
    components: {

    HelloWord
  },
  props:{
    data:{
      type:Array,
      default: () => [],
    },
    step: {
      type: Number,
      default: 50
    },
    num: {
      type: Number,
      default: 6
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  created() {
    // 表格显示5行数据，此处复制开头的5条数据实现无缝

  /*   this.data=this.copyArr(this.data,50)
    console.log(this.data,95959);
    this.$nextTick(() => {
      this.start();
    }) */
  },

  methods:{

  },
/*   beforeDestroy() {
    //清除定时器
    clearTimeout(this.timer);
  },
  destroyed() {
    //清除定时器
    clearTimeout(this.timer);
  } */
}
</script>

<style lang="scss" scoped>
$cellHeight: 75px;
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.box {
  width: 100%;
  margin: auto;
  font-size: 32px;
  font-weight: 400;
}
.header {
  display: flex;
  background: #303959;
  li:nth-child(5) {
    flex:0.5;
  }
}
.body {
  height: 4 * $cellHeight;
  overflow: hidden;
  // padding-bottom: 10px;
  li {
    display: flex;
    height: $cellHeight;

    span:nth-child(5) {
      flex:0.5;
    }
  }
}
.cell {
  flex: 1;
  height: $cellHeight;
  line-height: $cellHeight;
  box-sizing: border-box;
  margin-left: 15px;
}
.list {


    li:nth-of-type(odd){
      background:  #242947;
    }

    /* 偶数行 */
  li:nth-of-type(even){
      background: #303959;
    }

}


</style>
