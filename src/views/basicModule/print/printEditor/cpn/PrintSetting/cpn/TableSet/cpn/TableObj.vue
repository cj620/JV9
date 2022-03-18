<!--
 * @Author: C.
 * @Date: 2021-08-02 11:42:46
 * @LastEditTime: 2022-01-17 10:34:19
 * @Description: file content
-->
<template>
  <div class="table-obj">
    <!-- 表格标题 -->
    <div class="table-title">
      <el-checkbox v-model="cdata.show"></el-checkbox>{{ cdata.title.label }}

      <i class="el-icon-delete" @click="delTable"></i>
    </div>
    <div class="btn-group">
      <div class="btn" @click="addFieldShow = true">
        {{ $t("Generality.Ge_AddTableColumn") }}
      </div>
      <div class="btn" @click="DEL_CURRENT_NODE">
        {{ $t("Generality.Ge_DelTableColumn") }}
      </div>
      <div
        class="btn"
        @click="cdata.title.show = !cdata.title.show"
        :class="cdata.title.show ? 'hidd-title' : ''"
      >
        {{
          cdata.title.show
            ? $t("Generality.Ge_HideTableTitle")
            : $t("Generality.Ge_ShowTableTitle")
        }}
      </div>
      <div
        class="btn"
        @click="cdata.showSum = !cdata.showSum"
        :class="cdata.showSum ? 'hidd-title' : ''"
      >
        {{
          cdata.showSum
            ? $t("Generality.Ge_HideSum")
            : $t("Generality.Ge_ShowSum")
        }}
      </div>
      <div class="btn" @click="showTableForm">
        {{ $t("Generality.Ge_ChangeBoundField") }}
      </div>
    </div>

    <div :class="cdata.id">
      <el-checkbox
        border
        v-model="item[0].show"
        v-for="item in cdata.fields"
        :key="item[0].prop"
      >
        {{ item[0].label }}
      </el-checkbox>
    </div>
    <!-- 添加列表 -->
    <el-dialog
      :append-to-body="true"
      :title="$t('Generality.Ge_AddTableColumn')"
      :visible.sync="addFieldShow"
      width="30%"
      class="add-field-style"
    >
      <el-form
        label-width="100px"
        :model="form"
        :rules="rules"
        ref="tableField"
      >
        <el-form-item :label="$t('Generality.Ge_BindField')" prop="prop">
          <el-input v-model="form.prop" style="width: 75%"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Generality.Ge_Format')" prop="role">
          <el-select
            v-model="form.filter"
            :placeholder="$t('Generality.Ge_ChooseFormatType')"
          >
            <el-option
              v-for="item in filterEnums"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          :label="$t('Generality.Ge_FieldDescription')"
          prop="label"
        >
          <el-input v-model="form.label" style="width: 75%"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="confirm" size="mini">确定</el-button>
        <el-button @click="addFieldShow = false" size="mini">取消</el-button>
      </div>
    </el-dialog>
    <!-- 表格字段 -->
    <el-dialog
      :append-to-body="true"
      title="修改绑定"
      :visible.sync="changBind"
      width="30%"
      class="add-field-style"
    >
      <el-form
        label-width="100px"
        ref="ruleForm"
        :model="tableForm"
        :rules="tableRules"
      >
        <el-form-item :label="$t('Generality.Ge_BindField')" prop="tableProp">
          <el-input v-model="tableForm.tableProp" style="width: 75%"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="confirmBind" size="mini"
          >确定</el-button
        >
        <el-button @click="changBind = false" size="mini">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import Sortable from "sortablejs";
import { FieldConstructor } from "../../../../../../utils";
import { filterEnums } from "../../../../../../enums";
export default {
  data() {
    return {
      // 过滤器内聚
      filterEnums,
      // 修改绑定弹框
      changBind: false,
      // 添加列表
      addFieldShow: false,
      // 列
      // form: {},
      form: {
        prop: "",
        label: "",
        filter: "default",
      },
      copyForm: "",
      tableForm: {
        tableProp: "",
      },
      tableRules: {
        tableProp: [
          {
            required: true,
            message: this.$t("Generality.Ge_PleaseInputFieldsToBeBound"),
            trigger: "blur",
          },
        ],
      },
      rules: {
        prop: [
          {
            required: true,
            message: this.$t("Generality.Ge_PleaseInputFieldsToBeBound"),
            trigger: "blur",
          },
        ],
        label: [
          {
            required: true,
            message: this.$t("Generality.Ge_PleaseInputFieldDescription"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.copyForm = JSON.stringify(this.form);
  },
  mounted() {
    this.rowDrop();
  },
  methods: {
    ...mapMutations("print", ["DEL_CURRENT_NODE", "DEL_TABLE"]),
    confirm() {
      this.$refs["tableField"].validate((valid) => {
        if (valid) {
          let colLabel = FieldConstructor({
            role: "label",
            label: this.form.label,
          });
          let colValue = FieldConstructor({
            role: "value",
            label: this.form.label,
            prop: this.form.prop,
            filter: this.form.filter,
          });
          this.cdata.fields.push([colLabel, colValue]);
          this.form = JSON.parse(this.copyForm);
          this.addFieldShow = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 行拖拽
    rowDrop() {
      let className = "." + this.cdata.id;
      console.log(className);
      // 此时找到的元素是要拖拽元素的父容器
      const fields = document.querySelector(className);
      const _this = this;
      Sortable.create(fields, {
        //  指定父元素下可被拖拽的子元素
        draggable: ".el-checkbox",
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.cdata.fields.splice(oldIndex, 1)[0];
          _this.cdata.fields.splice(newIndex, 0, currRow);
        },
      });
    },
    delTable() {
      this.DEL_TABLE(this.cdata.id);
    },
    showTableForm() {
      this.tableForm.tableProp = JSON.parse(JSON.stringify(this.cdata.prop));
      this.changBind = true;
    },
    confirmBind() {
      this.cdata.prop = JSON.parse(JSON.stringify(this.tableForm.tableProp));
      this.tableForm.tableProp = "";
      this.changBind = false;
    },
  },
  watch: {
    "cdata.fields.length": {
      handler(n, o) {
        console.log(n, o);
        this.rowDrop();
      },
    },
  },
};
</script>

<style lang="scss">
@import "../../../../../../style/print-edit.scss";
</style>
