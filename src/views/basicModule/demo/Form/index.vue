<!--
 * @Author: C.
 * @Date: 2021-09-13 16:59:03
 * @LastEditTime: 2022-03-24 10:43:58
 * @Description: file content
-->
<template>
  <PageWrapper ref="page" title="表单页">
    <div slot="sticky-top" class="header">
      <div>新增页</div>
      <Action
        :primary="[
          {
            label: '主要按钮',
            icon: 'el-icon-delete',
            confirm: handleOpen,
          },
        ]"
        :actions="[
          {
            label: '删除',
            icon: 'el-icon-delete',
            popConfirm: {
              title: '是否删除？',
              confirm: handleOpen,
            },
          },
          {
            label: '锚点定位',
            confirm: scroll.bind(null, 400),
          },
        ]"
        :dropDownActions="[
          {
            label: '启用',
            popConfirm: {
              title: '是否启用？',
              confirm: handleOpen.bind(null),
            },
          },
        ]"
      ></Action>
    </div>
    <JvBlock title="表单输入">
      <div slot="extra">
        <el-button size="mini" @click="printForm">打印表单</el-button>
        <el-button size="mini" @click="addField">添加字段</el-button>
        <el-button size="mini" @click="check">校验</el-button>
        <el-button size="mini" type="primary" @click="reset">reset</el-button>
      </div>
      <JvForm :formObj="formObj" style="padding-left: 30px">
        <template #slotTest="{ prop }">
          <el-input v-model="formObj.form[prop]"></el-input>
        </template>
      </JvForm>
    </JvBlock>
    <JvBlock title="分批表单">
      <JvForm :formObj="formObj3" style="padding-left: 30px"> </JvForm>
    </JvBlock>
    <!-- 附件 -->
    <JvBlock :title="$t('Generality.Ge_Annex')">
      <div slot="extra">
        <el-button size="mini" @click="(_) => $refs.upLoad.upload()"
          >上传</el-button
        >
      </div>

      <JvUploadFile :BillId="'56465456'" ref="upLoad"></JvUploadFile>
    </JvBlock>
    <JvBlock title="流程">
      <Action
        slot="extra"
        size="mini"
        :primary="[
          {
            label: '主要按钮',
            icon: 'el-icon-delete',
            confirm: handleOpen,
          },
        ]"
        :actions="[
          {
            label: '删除',
            icon: 'el-icon-delete',
            popConfirm: {
              title: '是否删除？',
              confirm: handleOpen,
            },
          },
          {
            icon: 'el-icon-delete',
            popConfirm: {
              title: '是否删除？',
              confirm: handleOpen,
            },
          },
        ]"
        :dropDownActions="[
          {
            label: '启用',
            popConfirm: {
              title: '是否启用？',
              confirm: handleOpen.bind(null),
            },
          },
        ]"
      ></Action>

      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/2" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/2 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </JvBlock>
    <JvBlock title="物料明细">
      <el-empty description="描述文字"></el-empty>
    </JvBlock>
    <JvDialog
      title="表单弹框"
      :visible.sync="dialogVisible"
      width="30%"
      @confirm="dialogVisible = false"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj2"> </JvForm>
    </JvDialog>
    <!-- 导入数据 -->
    <Import
      :visible.sync="importShow"
      width="28%"
      title="导入数据"
      @complete="complete"
    ></Import>
    <div slot="fixedFooter">
      <el-button type="info" @click="createAudit">创建审核流</el-button>
      <el-button type="info" @click="dialogVisible = true">弹框表单</el-button>
      <el-button type="warning" @click="importShow = true">导入数据</el-button>
      <el-button type="primary" @click="allSubmit">整体提交</el-button>
    </div>
  </PageWrapper>
</template>

<script>
import { formSchema, formSchema2 } from "./config";
import { Form } from "@/jv_doc/class/form";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
export default {
  name: "form" + new Date().getTime(),
  components: {
    JvUploadFile,
  },
  data() {
    return {
      formObj: {},
      formObj2: {},
      formObj3: {},
      dialogVisible: false,
      aa: "",
      importShow: false,
    };
  },
  created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 8,
      },
      gutter: 40,
      labelPosition: "top",
      // 是否自动聚焦
      autoFocus: true,
    });
    this.formObj2 = new Form({
      formSchema,
      baseColProps: {
        span: 24,
      },
    });
    this.formObj3 = new Form({
      formSchema: formSchema2,
      baseColProps: {
        span: 8,
      },
      gutter: 40,
      labelPosition: "top",
    });
    
    console.log(this.formObj.form);
    this.formObj.form.Date44545=1
    this.formObj.form.Keyword111=2
    // formSchema2
    // console.log(this.formObj3, 777777);
  },
  mounted() {
    console.log("mounted", 856449887);
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  beforeRouteUpdate() {
    console.log("beforeRouteUpdate");
  },
  methods: {
    scroll(e) {
      // console.log(e, 54789765);
      this.$refs.page.scroll(e);
    },
    reset() {
      this.formObj.reset();
    },
    check() {
      this.formObj.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addField() {
      this.formObj.addField({
        prop: "Keywordddd",
        label: "请假类型",
        cpn: "FormSelect",
        default: "请假",
        options: {
          list: [
            {
              value: "请假",
              label: "请假",
            },
            {
              value: "调休",
              label: "调休",
            },
          ],
        },
      });
    },
    handleOpen() {
      console.log("ok");
    },
    printForm() {
      console.log(this.formObj.form, 55454545);
    },
    allSubmit() {
      this.formObj.submitAll(
        [this.formObj.validate, this.formObj3.validate],
        (valid) => {
          console.log(valid, 77777777777777);
        }
      );
    },
    complete(e) {
      if (e.length == 0) {
        this.$message({
          type: "error",
          message: "请选择文件",
        });
      } else {
        this.importShow = false;
        this.$message({
          type: "success",
          message: "导入数据已经打印到控制台，请打开查看",
        });
        // console.log(e);
      }
    },
    createAudit() {
      this.$router.push({
        path: "/oaDesigner",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/jv_doc/style/mixin.scss";
.header {
  font-size: 18px;
  font-weight: bold;
  @include flexBox($jc: space-between);
  padding-bottom: 10px;
  border-bottom: 1px solid #d9d9d9;
  box-shadow: 0 6px -16px 8px #00000014;
}
</style>
