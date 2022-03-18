<!--
 * @Author: C.
 * @Date: 2021-07-22 16:53:10
 * @LastEditTime: 2022-01-17 09:48:04
 * @Description: file content
-->
<template>
  <div class="print-setting">
    <div class="mode-title">
      <i class="el-icon-back quit-icon" @click="$emit('quit')"></i> {{$t('Generality.Ge_EditorMode')}}
    </div>
    <div class="cur-tmp">
      {{ CurTmp.name }}
    </div>

    <el-collapse v-model="toggleBlock.activeNames">
      <el-collapse-item :title="$t('Generality.Ge_PaperSettings')" name="page">
        <PageSet></PageSet>
      </el-collapse-item>
      <el-collapse-item :title="$t('Generality.Ge_FontStyle')" name="font">
        <FontSet></FontSet>
      </el-collapse-item>
      <el-collapse-item :title="$t('Generality.Ge_Header')" name="header">
        <HeaderSet name="header" @delField="delField"></HeaderSet>
      </el-collapse-item>
      <!-- <el-collapse-item title="打印体" name="body">
        <HeaderSet name="body" @delField="delField"></HeaderSet>
      </el-collapse-item> -->
      <el-collapse-item :title="$t('Generality.Ge_Table')" name="table">
        <TableSet></TableSet>
      </el-collapse-item>
      <el-collapse-item :title="$t('Generality.Ge_Footer')" name="footer">
        <HeaderSet name="footer" @delField="delField"></HeaderSet>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import PageSet from "./cpn/PageSet";
import TableSet from "./cpn/TableSet";
import HeaderSet from "./cpn/HeaderSet";
import FontSet from "./cpn/FontSet";
export default {
  components: {
    PageSet,
    TableSet,
    HeaderSet,
    FontSet,
  },
  data() {
    return {};
  },
  created() {
    this.keyupSubmit();
  },
  methods: {
    ...mapMutations("print", ["DEL_CURRENT_NODE"]),
    delField(e) {
      this.DEL_CURRENT_NODE();
    },
    // 键盘事件监听 17 8
    keyupSubmit() {
      let KeyState = false;
      document.onkeydown = (e) => {
        let _key = window.event.keyCode;
        if (_key == 17) {
          KeyState = true;
        } else if (_key == 8) {
          // console.log(KeyState);
        } else {
          KeyState = false;
        }
      };
      document.onkeyup = (e) => {
        let _key = window.event.keyCode;
        // console.log(_key, KeyState);
        if (KeyState) {
          if (_key == 8) {
            this.DEL_CURRENT_NODE();
            // alert(KeyState);
            KeyState = false;
          } else {
            KeyState = false;
          }
        }
      };
    },
  },
  computed: {
    ...mapState({
      toggleBlock: (state) => state.print.toggleBlock,
      CurTmp: (state) => state.print.CurTmp,
    }),
  },
};
</script>

<style lang="scss">
.print-setting {
  width: 100%;
  height: 100%;
  // padding: 10px 15px;
  padding: 10px 0 100px 15px;
  .mode-title {
    height: 90px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 20px;
    font-size: 20px;
    // font-weight: bold;
    .quit-icon {
      margin-right: 20px;
    }
  }
  // background-color: #fff;
  .el-collapse-item__header,
  .el-collapse-item__content {
    background-color: #f3f3f3;
  }
  .cur-tmp {
    margin: 0 auto;
    font-size: 17px;
    height: 30px;
  }
}
</style>
