<template>
  <div class="dropzone-box">
    <div style="display: flex;justify-content: center;position:relative;">
      <div id="dropzone"
           @dragenter="dragEnter"
           @dragleave="dragLeave"
           @dragover="dragOver"
           @drop="dropFile"
           @click="chooseFile"
      >
        <div><i class="el-icon-upload"></i></div>
        <div>{{ $t('Generality.Ge_UploadFile') }}</div>
      </div>
      <parse-img
        @handlePasteData="handlePasteData"
        more
      >
        <div class="paste">
          {{$t('Generality.Ge_ClickPaste')}}</div>
      </parse-img>
      <div class="clear-img" v-show="files.length > 3">
        <el-button size="mini" type="danger" plain @click="allClear">{{
          $t('Generality.Ge_ClearAll')
          }}</el-button>
      </div>
    </div>
    <input v-show="false" id="custom_file" type="file" @change="selectFile" multiple />
    <div style="max-height: 290px;overflow-y: auto;">
      <div class="file-box">
        <div
          class="file-items"
          v-for="(file, i) in files" :key="i">
          <div class="file-items-clear" @click="clearFile(i)">
            <i class="el-icon-close"></i>
          </div>
          <el-image v-if="imageShow" :src="images[i]"
                    :preview-src-list="previewSrcList"
          ></el-image>
          <div class="file-items-name">
            {{ file.name }}
          </div>
        </div>
      </div>
    </div>
<!--    <div v-for="(file, i) in files" :key="i">-->
<!--      文件名：{{ file.name }}，大小：{{ file.size }}字节-->
<!--      <button @click="downloadFile(file)">下载</button>-->
<!--    </div>-->
  </div>
</template>

<script>
import ParseImg from "@/components/JVInternal/ParseImg";
export default {
  data() {
    return {
      files: [],
      images: [],
      previewSrcList: [],
      imageShow: false,
      dropzoneActive: false
    }
  },
  components: {ParseImg},
  methods: {
    /**
     * 处理拖拽区域的拖入事件
     * @param {Event} event - 拖入事件对象
     */
    dragEnter(event) {
      event.preventDefault();
      this.dropzoneActive = true;
    },
    /**
     * 处理拖拽区域的拖离事件
     * @param {Event} event - 拖离事件对象
     */
    dragLeave(event) {
      event.preventDefault();
      this.dropzoneActive = false;
    },
    /**
     * 处理拖拽区域的拖放事件
     * @param {Event} event - 拖放事件对象
     */
    dragOver(event) {
      event.preventDefault();
    },
    /**
     * 处理文件的拖放上传
     * @param {Event} event - 拖放事件对象
     */
    dropFile(event) {
      event.preventDefault();
      this.dropzoneActive = false;
      const files = event.dataTransfer.files;

      this.handleFiles(files);
    },
    /**
     * 处理选择文件按钮的上传事件
     * @param {Event} event - 选择文件事件对象
     */
    selectFile(event) {
      const files = event.target.files;
      this.handleFiles(files);
      console.log(files);
    },
    /**
     * 处理上传的文件列表
     * @param {FileList} files - 文件列表
     */
    handleFiles(files) {
      this.imageShow = false;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.files.unshift(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const src = reader.result;
          this.images.unshift(src);
          this.previewSrcList.unshift(src);
        };
      }
    },
    /**
     * 下载文件
     * @param {File} file - 文件对象
     */
    downloadFile(file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(url);
    },
    // 点击选择文件
    chooseFile() {
      const fileInput = document.getElementById('custom_file');
      fileInput.click();
    },
    // 删除
    clearFile(i) {
      this.images.splice(i, 1);
      this.files.splice(i, 1);
    },
    // 全部清除
    allClear() {
      this.images = [];
      this.files = [];
      this.previewSrcList = [];
    },
    // 粘贴事件
    handlePasteData(files) {
      this.handleFiles(files);
    },
  },

  watch: {
    images() {
      setTimeout(() => {
        this.imageShow = true;
      },10)
    }
  }
}

</script>

<style lang="scss" scoped>
#dropzone:hover{
  border: 1px dashed #409eff;
}
.paste:hover{
  border: 1px dashed #409eff;
}
.paste:active{
  background: #f1f1f1;
}
//.paste:before{
//  content: var(--content);
//}
.paste{
  width: 300px;
  height: 200px;
  border: 1px dashed #d9d9d9;
  text-align: center;
  line-height: 200px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}
#dropzone {
  border-radius: 8px;
  width: 300px;
  height: 200px;
  border: 1px dashed #d9d9d9;
  font-size: 16px;
  color: #555;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 20px;
  i{
    margin-bottom: 20px;
    font-size: 50px;
    color: #c0c4cc;
  }
}
.clear-img{
  position: absolute;
  right: 24px;
  bottom: 0;
}
.dropzone-box{
  //display: flex;
  //align-items: center;
  .file-box{
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    .file-items:hover .file-items-clear{
      display: block;
      cursor: pointer;
    }
    .file-items{
      margin-left: 5px;
      margin-right: 5px;
      margin-bottom: 10px;
      border-radius: 8px;
      border: 1px solid #ccc;
      height: 60px;
      width: 290px;
      box-sizing: border-box;
      padding: 5px;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      &-name{
        width: 230px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &-clear{
        display: none;
        position: absolute;
        right: -23px;
        top: -23px;
        height: 46px;
        width: 46px;
        //text-align: center;
        line-height: 66px;
        font-size: 12px;
        color: #fff;
        border-radius: 50%;
        background: rgba(0,0,0,.5);
        i{
          margin-left: 6px;
        }
      }
    }
    .el-image{
      height: 50px;
      width: 50px;
      border-radius: 4px;
      margin-right: 20px;
    }
  }
}
</style>
