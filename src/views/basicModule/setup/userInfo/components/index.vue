<!--
 * @Author: H.
 * @Date: 2021-11-08 16:24:01
 * @LastEditTime: 2022-01-14 09:12:57
 * @Description:
-->
<template>
  <PageWrapper>
    <JvBlock :title="$t('Generality.Ge_BasicInformation')">
      <div class="edit-users-form">
        <div
          class="edit-users-content-header-img"
          @click="dialogFormVisible = true"
        >
          <div
            v-if="
              formObj1.form.PhotoUrl &&
              formObj1.form.PhotoUrl !== '' &&
              formObj1.form.PhotoUrl !== null
            "
          >
            <img
              :src="imgUrlPlugin(formObj1.form.PhotoUrl)"
              :onerror="errorDefaultImg"
              alt=""
              class="avatr"
            />
          </div>
          <div v-else>
            <img
              src="https://static.xinheyun.net/2458972eb1db3e7fcce23c53a27319dd.png"
              alt=""
            />
            <div class="edit-users-content-header-title">{{$t('Generality.Ge_ClickUploadPicture')}}</div>
          </div>
        </div>
        <div class="edit-users-form-items">
          <JvForm :formObj="formObj"> </JvForm>
        </div>
        <div class="edit-users-form-items">
          <JvForm :formObj="formObj1"> </JvForm>
        </div>
      </div>
    </JvBlock>
    <div slot="fixedFooter">
      <el-button type="primary" @click="save">{{
        $t("Generality.Ge_Submit")
      }}</el-button>
    </div>
    <jv-dialog
       :title="$t('Generality.Ge_AddNewPicture')"
      width="35%"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="false"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      @confirm="confirmImg"
    >
      <JvUploadList
        v-model="ImgDataList"
        :listType="false"
        @change="changeImg"
      ></JvUploadList>
    </jv-dialog>
  </PageWrapper>
</template>

<script>
import { editUserInfo, getUser } from "@/api/basicApi/systemSettings/user";
import { Form } from "@/jv_doc/class/form";
import { formSchema, formSchema1 } from "./config";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import JvUploadList from "@/components/JVInternal/JvUpload/List";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
export default {
  data() {
    return {
      formObj: {},
      formObj1: {},
      ImgDataList: [],
      dialogFormVisible: false,
      errorDefaultImg:
        'this.src="' + require("@/assets/errorImg/error.png") + '"',
      defaultImgUrl: window.global_config.ImgBase_Url,
    };
  },
  props: {
    type: {
      type: String,
      default: "add",
    },
    UserId: {
      type: String,
    },
  },
  created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
      labelPosition: "top",
    });
    this.formObj1 = new Form({
      formSchema: formSchema1,
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
      labelPosition: "top",
    });
    if (this.type === "edit") {
      this.getUser();
    }
  },
  methods: {
    imgUrlPlugin,
    save() {
      this.formObj.submitAll(
        [this.formObj.validate, this.formObj1.validate],
        (valid) => {
          if (valid) {
            let obj = Object.assign({}, this.formObj.form, this.formObj1.form);
            this.type === "edit"
              ? (obj.DataState = "Modify")
              : (obj.DataState = "Add");
            editUserInfo(obj).then((res) => {
              let TagName = {
                name: `Se_UserInfo_Detail`,
                meta: { cache: true, title: "用户" },
                query: { UserId: res },
              };
              closeTag(this.current, TagName);
            });
          }
        }
      );
    },
    //图片点击确认事件
    confirmImg() {
      this.dialogFormVisible = false;
      this.formObj1.form.PhotoUrl = this.ImgDataList.toString();
    },
    changeImg(e) {
      console.log(e, "changeImg");
    },
    getUser() {
      getUser({ UserId: this.UserId }).then((res) => {
        let { UserId, UserName, Sex, DepartmentName, Activate } = res;
        let { Birthday, FamilyAddress, Mail, Phone, PhotoUrl, Tel } = res;
        this.formObj.form = {
          UserId,
          UserName,
          Sex,
          DepartmentName,
          Activate,
        };
        this.formObj1.form = {
          Birthday,
          FamilyAddress,
          Mail,
          Phone,
          PhotoUrl,
          Tel,
        };
      });
    },
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  mounted() {},
  components: {
    JvUploadList,
  },
};
</script>

<style lang="scss" scoped>
.edit-users-details {
  width: 100%;
  display: flex;
}
.edit-users-content-header-img {
  margin-top: 20px;
  margin-left: 60px;
  position: relative;
  width: 131px;
  height: 131px;
  border: 1px rgba(0, 0, 0, 0.25) dashed;
  background: whitesmoke;
  border-radius: 5px;
  .avatr {
    width: 126px;
    height: 126px;
  }
  .edit-users-content-header-title {
    display: block;
    position: absolute;
    width: 100%;
    bottom: 10px;
    text-align: center;
    color: rgba(0, 0, 0, 0.25);
  }
}
.edit-users-form {
  display: flex;
  &-items {
    padding: 0 60px;
    flex: 1;
  }
}
</style>
