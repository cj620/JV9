<!--
 * @Author: C.
 * @Date: 2021-07-23 08:50:44
 * @LastEditTime: 2022-01-17 09:49:34
 * @Description: file content
-->
<template>
  <div class="page-set">
    <el-form>
      <el-form-item :label="$t('Generality.Ge_Direction')">
        <el-select v-model="paperStyle.direction"
                   :placeholder="$t('Generality.Ge_Direction')">
          <el-option :label="$t('Generality.Ge_Horizontal')"
                     value="landscape"></el-option>
          <el-option label="纵向"
                     value="portrait"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('Generality.Ge_Paper')">
        <el-select v-model="paperStyle.paperType"
                   :placeholder="$t('Generality.Ge_Paper')">
          <el-option v-for="item in pageType"
                     :key="item"
                     :label="item"
                     :value="item">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <div class="d"
         v-html="styleText"></div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { pageType } from "../../../../enums";
export default {
  data () {
    return {
      pageType
    }
  },
  computed: {
    ...mapState({
      paperStyle: state => state.print.paperStyle
    }),
    styleText () {
      return `<style type="text/css" media="print">  @page { size: ${this.paperStyle.paperType} ${this.paperStyle.direction}}; }</style>`
    }
  },
}
</script>

<style lang="scss">
.page-set {
  background-color: #f3f3f3;
  .el-form .el-form-item {
    .el-form-item__label {
      font-size: 12px;
    }
    .el-select .el-input input {
      height: 25px;
    }
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
// @page {
//   size: landscape;
// }
// @page {
//   size: portrait;
// }
</style>
