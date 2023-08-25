<template>
  <div>
    <div class="upload-img">
      <div
        v-if="imageList"
        v-for="(item, index) in imageList"
        :key="index"
        class="upload-img-list"
      >
        <img :src="imgUrlPlugin(item)" class="avatar" />
        <div class="upload-img-list-operate">
          <span @click="viewImg(item, index)">
            <i class="el-icon-zoom-in"></i
          ></span>
          <span @click="delImg(item, index)" style="margin-left: 10px">
            <i class="el-icon-delete"></i
          ></span>
        </div>
      </div>
    </div>
    <div class="custom-upload-img">
      <el-upload
        drag
        class="JvUpload-demo"
        :on-success="handleImageSuccess"
        :http-request="changeHandle"
        action="#"
        :show-file-list="false"
        multiple
        :limit="limit"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">{{$t('Generality.Ge_UploadPicture')}}</div>
      </el-upload>

      <ParseImg
        class="custom-upload-img-uploadIcons"
        @handlePasteData="handlePasteData"
      >
        {{$t('Generality.Ge_ClickPaste')}}
      </ParseImg>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :title="$t('Generality.Ge_PhotoUrl')"
      width="40%"
      append-to-body
    >
      <img width="100%" :src="imgUrlPlugin(dialogImageUrl)" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { uploadFiles, getBillFile } from "@/api/basicApi/systemSettings/upload";
import { uploadImage } from "@/api/workApi/materials/fileUpload";
import ParseImg from "../../JVInternal/ParseImg";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
export default {
  name: "List",
  data() {
    return {
      imageList: [],
      dialogVisible: false,
      dialogImageUrl: "",
      imageId: "",
    };
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    listType: {
      type: Boolean,
      default: true,
    },
    file: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 99,
    },
  },
  created() {
    this.imageList = this.value;
  },
  components: {
    ParseImg,
  },
  methods: {
    imgUrlPlugin,


    handleImageSuccess(file) {},

    changeHandle(file) {


		 var formData = new FormData();
     formData.append("file", file.file);
		formData.append("BillId", '123');

		console.log(formData)
     uploadFiles(formData).then((res) => {
       if (this.listType) {
         this.imageList.push(res[0].FileUrl);
       } else {
         this.imageList = [res[0].FileUrl];
       }
       this.$emit("input", this.imageList);
     });
    },
    viewImg(e, index) {
      this.dialogVisible = true;
      this.dialogImageUrl = e;
    },
    delImg(e, index) {
      this.imageList.splice(index, 1);
    },
    // /复制粘贴图片
    handlePasteData(e) {
      this.changeHandle({ file: e });
    },
  },
};
</script>

<style lang="scss" scoped>
.JvUpload-demo {
  width: 100%;
  ::v-deep .el-upload {
    width: 100%;
    .el-upload-dragger {
      width: 100% !important;
    }
  }
}
.custom-upload-img {
  display: flex;
  .custom-upload-img-uploadIcons {
    margin-left: 15px;
    width: 30%;
    min-width: 140px;
    text-align: center;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    height: 180px;
    line-height: 180px;
  }
}
.upload-img {
  display: flex;
  margin-top: 10px;
  .upload-img-list {
    width: 100px;
    height: 100px;
    position: relative;
    margin: 5px;
    border-radius: 5px;
    &:hover .upload-img-list-operate {
      opacity: 1;
      transition: all 1s;
      display: block;
      color: #fff;
    }
    .avatar {
      width: 100px;
      height: 100px;
    }
    .upload-img-list-operate {
      position: absolute;
      text-align: center;
      width: 100px;
      height: 100px;
      line-height: 100px;
      top: 0;
      left: 0;
      background-color: rgba(127, 127, 127, 0.6);
      opacity: 0.1;
      transition: all 1s;
      display: none;
    }
  }
}
</style>
