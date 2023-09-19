<template>
  <PageWrapper :footer="false">
    <div class="ErrorPrompt-box">
      <div class="ErrorPromp-search">
        <el-input
          style="width: 140px"
          :placeholder="`${$t('Generality.Ge_PleaseEnter')}...`"
          clearable
        size="mini"
        v-model="ErrorValue"
        @input="ErrorValueChange"
        ></el-input>
        <el-button size="mini" type="primary" style="margin-left: 10px">搜索</el-button>
      </div>
      <div class="ErrorPrompt-content">
        <el-descriptions
          direction="vertical"
          :column="5"
          border
        >
          <el-descriptions-item :label="item"
                                v-for="item in list" :key="item"
          >{{$t(`backendMessage.${item}`)}}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <el-backtop target=".ErrorPrompt-content"></el-backtop>
  </PageWrapper>
</template>

<script>
import errorList from "@/i18n/lang/cn";
export default {
  name: "Se_ErrorPrompt",
  data() {
    return {
      list: [],
      ErrorValue: '',
    };
  },
  created() {
    Object.keys(errorList.backendMessage).forEach(item => {
      this.list.push(item);
    })
  },
  methods: {
    ErrorValueChange(val) {
      this.list = Object.keys(errorList.backendMessage).filter(item => {
        return item.indexOf(val) !== -1
      })
    }
  }
};
</script>

<style scoped lang="scss">
.ErrorPrompt-box{
  background: #fff;
  width: 100%;
  height: 100%;
}
.ErrorPromp-search{
  padding: 10px;
  width: 100%;
  display: flex;
  height: 40px;
  align-items: center;
  position: relative;
  z-index: 10;
  box-shadow: 0 0 6px 2px #f6f6f6;
}
.ErrorPrompt-content{
  padding: 10px 10px 0 10px;
  height: calc(100% - 50px);
  overflow-y: auto;
}
</style>
