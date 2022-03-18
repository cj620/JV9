<!--
 * @Author: H.
 * @Date: 2021-11-30 15:50:23
 * @LastEditTime: 2022-01-10 14:48:41
 * @Description:
-->
<template>
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj">
        <template #ToolingNo="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            :filter-method="filetrData"
            :placeholder="$t('Generality.Ge_PleaseSelect')"
          >
            <el-option
              v-for="item in itemList"
              :key="item.value"
              :label="item.ItemId"
              :value="item.ItemId"
            >
            </el-option>
          </el-select>
        </template>
        <template #PartNo="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            :placeholder="$t('Generality.Ge_PleaseSelect')"
            filterable
            @change="partChange"
            :filter-method="partFiletr"
          >
            <el-option
              v-for="item in partList"
              :key="item.value"
              :label="item.ItemId"
              :value="item.ItemId"
            >
            </el-option>
          </el-select>
        </template>
        <template #Worker="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            :placeholder="$t('Generality.Ge_PleaseSelect')"
            @change="userChange"
          >
            <el-option
              v-for="item in userList"
              :key="item.value"
              :label="item.UserName"
              :value="item.UserName"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvBlock>
    <!-- 备注 -->
    <JvBlock :title="$t('Generality.Ge_Remarks')">
      <el-input type="textarea" :rows="2" v-model="ruleForm.Remarks">
      </el-input>
    </JvBlock>
    <div slot="fixedFooter">
      <!-- 提交 -->
      <el-button type="primary" @click="save">{{
        $t("Generality.Ge_Submit")
      }}</el-button>
    </div>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import debounce from "@/utils/debounce";
import { saveCheckRecord } from "@/api/workApi/quality/checkRecord";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";

export default {
  data() {
    return {
      formObj: {},
      params: {
        ItemCategory: "Tooling",
        PageSize: 100,
        CurrentPage: 1,
        Keyword: "",
      },
      partParams: {
        ItemCategory: "Part",
        PageSize: 100,
        CurrentPage: 1,
        Keyword: "",
      },
      itemList: [],
      partList: [],
      userList: [],
      ruleForm: {
        Remarks: "",
      },
    };
  },

  methods: {
    async getData() {
      await this.getItemData(this.params);
      await this.getPartData(this.partParams);
      await getAllUserData().then((res) => {
        this.userList = res.Items;
      });
    },
    filetrData: debounce(
      function (e) {
        this.params.Keyword = e;
        this.getItemData(this.params);
      },
      1000,
      false
    ),
    partFiletr: debounce(
      function (e) {
        this.partParams.Keyword = e;
        this.getPartData(this.partParams);
      },
      1000,
      false
    ),
    getItemData(params) {
      itemList(params).then((res) => {
        this.params.Keyword = "";
        if (res.Items.length > 0) {
          this.itemList = res.Items;
        }
      });
    },
    getPartData(params) {
      itemList(params).then((res) => {
        if (res.Items.length > 0) {
          this.partParams.Keyword = "";
          this.partList = res.Items;
        }
      });
    },
    partChange(e) {
      this.formObj.form.PartName = this.partList.find(
        (item) => item.ItemId === e
      ).ItemName;
    },
    userChange(e) {
      this.formObj.form.Department = this.userList.find(
        (item) => item.UserName === e
      ).DepartmentName;
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.AttachmentList = fileData;
    },
    save() {
      this.formObj.validate((valid) => {
        if (valid) {
          let data = Object.assign({}, this.ruleForm, this.formObj.form);
          saveCheckRecord(data).then(() => {
            let TagName = {
              name: `QualityRecordDetails`,
              query: {
                data,
              },
            };
            closeTag(this.current, TagName);
          });
        }
      });
    },
  },
  created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 8,
      },
      gutter: 30,
      labelWidth: "80px",
    });

    this.getData();
  },
  mounted() {},
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  components: {
    JvUploadFile,
  },
};
</script>

<style lang="scss" scoped></style>
