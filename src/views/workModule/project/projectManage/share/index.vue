<!--
 * @Author: C.
 * @Date: 2022-02-10 09:24:19
 * @LastEditTime: 2022-03-01 16:33:06
 * @Description: file content
-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <JvBlock :title="$t('project.Pro_Share')">
      <Action
        slot="extra"
        size="mini"
        :primary="[
          {
            label: $t('project.Pro_CreateLink'),
            confirm: createLink,
          },
        ]"
      ></Action>
      <JvForm :formObj="formObj" style="padding-left: 30px"> </JvForm>
      <div style="padding: 0 30px">
        <el-input v-model="link" v-if="link">
          <div slot="append" style="cursor: pointer" @click="copyLink">
            {{ $t("Generality.Ge_Copy") }}
          </div>
        </el-input>
      </div>
    </JvBlock>
  </PageWrapper>
</template>
<script>
// 引入接口
// import { API as ProjectTask } from "@/api/workApi/project/projectTask";
import { create_data_sharing } from "@/api/workApi/project/projectInfo";
import { Form } from "@/jv_doc/class/form";
import handleClipboard from "@/utils/clipboard";
export default {
  data() {
    return {
      formObj: {},
      link: "",
    };
  },
  created() {
    let dateTime = new Date();
    dateTime = dateTime.setDate(dateTime.getDate() + 1);
    dateTime = new Date(dateTime);
    this.formObj = new Form({
      formSchema: [
        {
          prop: "ExpirationTime",
          label: this.$t("project.Pro_ExpirationTime"),
          cpn: "SingleDateTime",
          default: dateTime,
          rules: [
            {
              required: true,
              message: this.$t("Generality.Ge_PleaseEnter"),
              trigger: ["change"],
            },
          ],
        },
        {
          prop: "Project",
          label: "",
          default: this.$route.query.Project,
          hidden: true,
        },
        {
          prop: "ToolingNos",
          label: "",
          default: this.$route.query.ToolingNos,
          hidden: true,
        },
      ],
      baseColProps: {
        span: 8,
      },
      gutter: 40,
      labelPosition: "top",
    });
  },
  methods: {
    createLink() {
      create_data_sharing(this.formObj.form).then((res) => {
        this.link =
          // window.global_config.ImgBase_Url
          window.global_config.Share_Url +
          "/#/ProjectManage_Share_Demo?key=" +
          res;
      });
    },
    copyLink(e) {
      // console.log(e);
      handleClipboard(this.link, e);
    },
  },
};
</script>
