<!--
 * @Author: your name
 * @Date: 2021-11-30 11:30:00
 * @LastEditTime: 2022-01-25 10:25:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\components\WorkModule\ImgBox\c-menu.vue
-->
<template>
  <div>
    <div class="img-box" v-bind="getBind" @click="boxClick">
      <el-image
        v-if="getImgUrl"
        style="width: 100%; height: 100%"
        :src="getImgUrl"
      ></el-image>
      <div v-else class="empty-box">
        <i class="el-icon-plus"></i>
      </div>
      <div class="btn-shadow" v-if="getImgUrl">
        <i class="el-icon-delete" @click.stop="delImg"></i>
      </div>
    </div>
    <jv-dialog
       :title="$t('Generality.Ge_AddNewPicture')"
      width="35%"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="false"
      :visible.sync="uploadImgShow"
      v-if="uploadImgShow"
      @confirm="confirm"
    >
      <JvUploadList v-model="ImgList" :listType="false"></JvUploadList>
    </jv-dialog>
  </div>
</template>

<script>
import JvUploadList from "@/components/JVInternal/JvUpload/List";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
export default {
  components: {
    JvUploadList,
  },
  props: {
    width: {
      type: String,
      default: "120px",
    },
    height: {
      type: String,
      default: "120px",
    },
    srcUrl: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      uploadImgShow: false,
      ImgList: [],
      imgSrc: null,
    };
  },
  computed: {
    getBind() {
      let { width, height } = this.$props;
      return {
        style: {
          width,
          height,
        },
      };
    },
    getImgUrl() {
      let imgUrl = this.imgSrc || this.srcUrl;
      if (!imgUrl) return false;
      return imgUrlPlugin(imgUrl);
    },
  },
  methods: {
    confirm() {
      this.imgSrc = this.ImgList[0];
      this.$emit("confirm", this.imgSrc);
      this.uploadImgShow = false;
    },
    boxClick() {
      this.uploadImgShow = true;
    },
    delImg() {
      this.ImgList = [];
      this.imgSrc = "";
      this.srcUrl = "";
      this.confirm();
    },
    imgUrlPlugin,
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.img-box {
  // width: ;
  // background-color: pink;
  border-radius: 10px;
  overflow: hidden;
  @include shadow;
  border: 1px solid #cecece;
  cursor: pointer;
  position: relative;
  &:hover {
    .btn-shadow {
      @include flexBox;
    }
  }
  .empty-box {
    @include flexBox;
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    i {
      font-size: 40px;
      color: rgb(161, 161, 161);
    }
  }
  .btn-shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    background-color: rgb(0, 0, 0, 0.5);
    z-index: 9;
    i {
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>
