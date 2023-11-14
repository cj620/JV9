<!--
 * @Author: C.
 * @Date: 2021-07-23 09:14:01
 * @LastEditTime: 2022-01-17 10:39:42
 * @Description: file content
-->
<template>
  <div class="header-set">
    <div class="btn-group">
      <div class="btn" @click="addText">{{$t('Generality.Ge_NewText')}}</div>
      <div class="btn" @click="addFieldShow = true">{{$t('Generality.Ge_AddField')}}</div>
      <div class="btn" @click="delField">{{$t('Generality.Ge_RemoveElement')}}</div>
      <div class="btn" @click="uploadImgShow = true">{{$t('Generality.Ge_InsertPicture')}}</div>
    </div>
    <!-- insertImg -->
    <div class="header-field">
      <el-checkbox
        border
        v-model="item.show"
        v-for="item in block.nodes.filter(
          (item) =>
            item.role == 'value' ||
            item.role == 'qrcode' ||
            item.role == 'image' ||
            item.role == 'insertImg'
        )"
        :key="item.prop"
      >
        {{ item.label }}
      </el-checkbox>
    </div>
    <el-dialog
      :append-to-body="true"
      :title="$t('Generality.Ge_AddField')"
      :visible.sync="addFieldShow"
      width="30%"
      class="add-field-style"
    >
      <el-form label-width="100px" :model="form" :rules="rules" ref="ruleForm">
        <el-form-item :label="$t('Generality.Ge_Type')" prop="role">
          <el-select
            v-model="form.role"
            :placeholder="$t('Generality.Ge_ChooseType')"
            @change="roleTypeChange"
          >
            <el-option :label="$t('Generality.Ge_DataField')" value="value"></el-option>
            <el-option :label="$t('Generality.Ge_QRCode')" value="qrcode"></el-option>
            <el-option
              :label="$t('Generality.Ge_PhotoUrl')"
              value="image"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Generality.Ge_Prefix')" v-if="['qrcode'].includes(form.role)">
          <el-input v-model="form.options.prefix" style="width: 75%"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Generality.Ge_Format')" prop="role">
          <el-select
            v-model="form.filter"
            :placeholder="$t('Generality.Ge_ChooseFormatType')"
            :disabled="form.role != 'value'"
          >
            <el-option
              v-for="item in filterEnums"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('Generality.Ge_BindField')" prop="prop">
          <el-input v-model="form.prop" style="width: 75%"></el-input>
        </el-form-item>

        <el-form-item :label="$t('Generality.Ge_FieldDescription')" prop="label">
          <el-input v-model="form.label" style="width: 75%"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="confirm" size="mini">
          {{ $t('Generality.Ge_OK') }}
        </el-button>
        <el-button @click="addFieldShow = false" size="mini">
          {{ $t('Generality.Ge_Cancel') }}
        </el-button>
      </div>
    </el-dialog>

    <jv-dialog
      :title="$t('Generality.Ge_InsertPicture')"
      width="35%"
      :visible.sync="uploadImgShow"
      v-if="uploadImgShow"
      @confirm="insetImgConfirm"
    >
      <JvUploadList v-model="ImgList" :listType="false"></JvUploadList>
    </jv-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { FieldConstructor } from "../../../../utils";
import { filterEnums } from "../../../../enums";
import { uploadImage } from "@/api/workApi/materials/fileUpload";
import { imgUrlPlugin } from "@/jv_doc/utils/system";
import JvUploadList from "@/components/JVInternal/JvUpload/List";
export default {
  components: {
    JvUploadList,
  },
  data() {
    return {
      filterEnums,
      addFieldShow: false,
      uploadImgShow: false,
      ImgList: [],
      form: {},
      rules: {
        prop: [
          { required: true, message: this.$t('Generality.Ge_PleaseInputFieldsToBeBound'), trigger: "blur" },
        ],
        label: [{ required: true, message:this.$t('Generality.Ge_PleaseInputFieldDescription'), trigger: "blur" }],
      },
    };
  },
  created() {
    this.form = FieldConstructor({ role: "value", label: "" });
  },
  props: {
    name: {
      type: String,
      default: "header",
    },
  },
  methods: {
    addText() {
      this.block.nodes.push(FieldConstructor());
    },
    httpRequest(params) {
      // 本地插图方式
      // this.block.nodes.push(FieldConstructor({
      //   role: 'insertImg',
      //   label: '插图',
      //   url: URL.createObjectURL(params.file)
      // }))

      // 服务端存图
      var formData = new FormData();
      formData.append("file", params.file);
      uploadImage(formData).then((res) => {
        console.log(imgUrlPlugin(res), 45654564845465);
        this.block.nodes.push(
          FieldConstructor({
            role: "insertImg",
            label: this.$t('Generality.Ge_InsertImg'),
            url: imgUrlPlugin(res),
          })
        );
      });
    },
    insetImgConfirm() {
      this.block.nodes.push(
        FieldConstructor({
          role: "insertImg",
          label: this.$t('Generality.Ge_InsertImg'),
          url: imgUrlPlugin(this.ImgList[0]),
        })
      );
      this.uploadImgShow = false;
      this.ImgList = [];
    },
    delField() {
      this.$emit("delField");
    },
    confirm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.block.nodes.push(JSON.parse(JSON.stringify(this.form)));
          this.form = FieldConstructor({ role: "value", label: "" });
          this.addFieldShow = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    roleTypeChange(e) {
      this.form = FieldConstructor({
        role: e,
        label: this.form.label,
      });
    },
  },
  mounted() {},
  computed: {
    ...mapState({
      header: (state) => state.print.header,
      body: (state) => state.print.body,
      footer: (state) => state.print.footer,
    }),
    block() {
      if (this.name == "body") {
        return this.body;
      } else if (this.name == "header") {
        return this.header;
      } else if (this.name == "footer") {
        return this.footer;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../../style/print-edit.scss";
</style>
