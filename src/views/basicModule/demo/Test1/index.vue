<template>
    <div class="customize-visualization">
      <el-row>
        <el-col :span="5">
          <div class="customize-visualization-left">
            <left-content></left-content>
            <DxButton
              text="Click me"
            />

          </div>
        </el-col>
        <el-col :span="14">
          <div class="customize-visualization-main">
            <main-content></main-content>

          </div>
        </el-col>
        <el-col :span="5">
          <div class="customize-visualization-right">

            <right-content></right-content>
          </div>
        </el-col>
      </el-row>

    </div>
</template>

<script>
import LeftContent from './components/left-content'
import MainContent from './components/main-content'
import RightContent from './components/right-content'
import DxButton from 'devextreme-vue/button';

export default {
  name: 'index',
  components:{
    LeftContent,
    MainContent,
    RightContent,
    DxButton
  }
}
</script>

<style lang="scss" scoped>

  .customize-visualization{
    height: 100vh;
    background: #fff;
    .customize-visualization-left{
      border: 1px solid #eee;
      height: 100vh
    }
    .customize-visualization-main{
      border: 1px solid #eee;
      height: 100vh;
    }
    .customize-visualization-right{
      border: 1px solid #eee;
      height: 100vh;
    }
  }
</style>
