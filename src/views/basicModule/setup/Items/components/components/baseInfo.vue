<!--
 * @Author: C.
 * @Date: 2021-09-15 11:35:07
 * @LastEditTime: 2022-02-28 14:53:47
 * @Description: file content
-->
<template>
  <div>
    <div class="edit-materials-content-header">
      <div class="edit-materials-content-header-img" @click="uploadImg">
        <div v-if="value.PhotoUrl !== '' && value.PhotoUrl !== null">
          <img
            :src="imgUrlPlugin(value.PhotoUrl)"
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
          <span class="edit-materials-content-header-title">{{
            $t("Generality.Ge_ClickUploadPicture")
          }}</span>
        </div>
      </div>
      <div class="edit-materials-content-header-attar">
        <el-form
          :model="value"
          :rules="rules"
          size="mini"
          ref="ruleForm"
          label-width="100px"
          label-position="top"
          class="edit-materials-content-header-attar-form"
        >
          <el-row :gutter="30">
            <el-col :span="8">
              <!--编号-->
              <el-form-item :label="$t('Generality.Ge_ID')" prop="ItemId">
                <el-input
                  v-model="value.ItemId"
                  :disabled="value.type === 'edit'"
                ></el-input>
              </el-form-item>
              <!--名称-->
              <el-form-item
                :label="$t('Generality.Ge_ItemName')"
                prop="ItemName"
              >
                <el-input v-model="value.ItemName"></el-input>
              </el-form-item>
              <!--单位-->
              <el-form-item :label="$t('Generality.Ge_Unit')" prop="Unit">
                <el-select v-model="value.Unit" clearable style="width: 100%">
                  <el-option
                    v-for="(item, index) in basicUnitListData"
                    :key="index"
                    :label="item.Unit"
                    :value="item.Unit"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!--物料类别-->
              <el-form-item
                :label="$t('Generality.Ge_ItemCategory')"
                prop="ItemCategory"
              >
                <el-select
                  v-model="value.ItemCategory"
                  clearable
                  style="width: 100%"
                >
                  <el-option
                    v-for="(item, index) in ItemCategoryListData"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--描述-->
              <el-form-item
                :label="$t('Generality.Ge_Describe')"
                prop="Description"
              >
                <el-input v-model="value.Description"></el-input>
              </el-form-item>
              <!--标签-->
              <el-form-item
                :label="$t('Generality.Ge_ItemType')"
                prop="ItemType"
              >
                <el-select
                  v-model="value.ItemType"
                  clearable
                  style="width: 100%"
                >
                  <el-option
                    v-for="(item, index) in materialCategoryListData"
                    :key="index"
                    :label="item.ItemType"
                    :value="item.ItemType"
                  ></el-option>
                </el-select>
              </el-form-item>

              <!--安全库存-->
              <el-form-item :label="$t('setup.SafetyStock')" prop="SafetyStock">
                <el-input type="number" v-model="value.SafetyStock"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <!--最大库存-->
              <el-form-item :label="$t('setup.MaxStock')" prop="MaxStock">
                <el-input type="number" v-model="value.MaxStock"></el-input>
              </el-form-item>
              <!--状态-->
              <el-form-item :label="$t('Generality.Ge_State')" prop="State">
                <el-radio v-model="value.State" label="Disable">{{
                  $t("Generality.Ge_Disable")
                }}</el-radio>
                <el-radio v-model="value.State" label="Enable">{{
                  $t("Generality.Ge_Enable")
                }}</el-radio>
              </el-form-item>
              <!--项目-->
              <el-form-item :label="$t('Generality.Ge_BelongTo')" prop="State">
                <el-select
                  v-model="value.Project"
                  filterable
                  remote
                  style="width: 90%"
                  reserve-keyword
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in projectDataList"
                    :key="item.Project"
                    :label="item.Project"
                    :value="item.Project"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
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
      <JvUploadList v-model="ImgDataList" :listType="false"></JvUploadList>
    </jv-dialog>
  </div>
</template>

<script>
import JvUploadList from "@/components/JVInternal/JvUpload/List";
import { getAllItemType } from "@/api/basicApi/systemSettings/ItemType";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import {
  getProjectQuery
} from "@/api/workApi/project/projectManage";
export default {
  name: "baseInfo",
  components: {
    JvUploadList,
  },
  data() {
    return {
      ImgDataList: [],
      materialAttributeListData: [],
      materialCategoryListData: [],
      projectDataList: [],
      loading: false,
      ItemCategoryListData:[
        {value: 'Tooling',label: i18n.t("Generality.Ge_Tooling")},
        {value: 'Part',label:i18n.t("Generality.Ge_Part")},
        {value: 'Electrode',label: i18n.t("Generality.Ge_Electrode")},
        {value: 'Material',label: i18n.t("Generality.Ge_Items")},
        {value: 'Standard',label: i18n.t("Generality.Ge_Standard")},
      ],
      formObj: {},
      defaultImgUrl: window.global_config.ImgBase_Url,
      errorDefaultImg:
        'this.src="' + require("@/assets/errorImg/error.png") + '"',
      ruleFormData: {},
      dialogFormVisible: false,
      rules: {
        ItemId: [
          {
            required: true,
            message: i18n.t("Generality.Ge_PleaseFillIn"),
            trigger: ["blur"],
          },
        ],
        ItemName: [
          {
            required: true,
            message: i18n.t("Generality.Ge_PleaseFillIn"),
            trigger: ["blur"],
          },
        ],
        Unit: [
          {
            required: true,
            message: i18n.t("Generality.Ge_PleaseFillIn"),
            trigger: ["blur"],
          },
        ],
        ItemCategory:[
          {
            required: true,
            message: i18n.t("Generality.Ge_PleaseFillIn"),
            trigger: ["blur"],
          },
        ]
      },
    };
  },
  created() {
    this.ConfigurationData();
    this.GetProjectData();
    if (this.value.PhotoUrl !== "") {
      /* this.ImgDataList =  [ this.value.mainPictureUrl]*/
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    basicUnitListData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    imgUrlPlugin,
    ConfigurationData() {
      getAllItemType().then((res) => {
        this.materialCategoryListData = res.Items;
      });
    },
    //获取项目
    async GetProjectData() {
      await getProjectQuery({ Keyword: "" }).then((res) => {
        console.log(res.Items);
        this.projectDataList = res.Items;
      });
    },
    //点击上传图片
    uploadImg() {
      this.dialogFormVisible = true;
    },
    //搜索项目
    remoteMethod(query) {
      getProjectQuery({ Keyword: query }).then((res) => {
        console.log(res.Items,555)
        if (query !== "") {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.projectDataList = res.Items;
          });
        } else {
          this.GetProjectData();
        }
      });
    },
    //图片点击确认事件
    confirmImg() {
      this.dialogFormVisible = false;
      this.value.PhotoUrl = this.ImgDataList.toString();
    },
  },
  watch: {
    value(newName, oldName) {
      this.formObj.form = newName;
      if (newName.PhotoUrl !== "") {
        // this.ImgDataList= JSON.parse(JSON.stringify([newName.mainPictureUrl]))
      }
    },
    /*      ImgDataList(newName,oldName){
          console.log(565665)
          this.value.PhotoUrl=newName.toString()
        }*/
  },
};
</script>

<style lang="scss" scoped>
.edit-materials-content-header {
  display: flex;
  background: #fff;
  .edit-materials-content-header-img {
    position: relative;
    width: 131px;
    height: 131px;
    border: 1px rgba(0, 0, 0, 0.25) dashed;
    background: whitesmoke;
    border-radius: 5px;
    .avatr {
      width: 128px;
      height: 128px;
    }
    .edit-materials-content-header-title {
      display: block;
      position: absolute;
      width: 100%;
      bottom: 10px;
      text-align: center;
      color: rgba(0, 0, 0, 0.25);
    }
  }

  .edit-materials-content-header-attar {
    margin-left: 15px;
    width: 100%;
  }
}
</style>
