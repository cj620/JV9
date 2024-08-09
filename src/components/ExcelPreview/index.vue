<template>

<!--    <button @click="FilePreviewDialogHandle('docx')">测试doc文件预览</button>-->
<!--    <button @click="FilePreviewDialogHandle('pdf')">测试pdf文件预览</button>-->
<!--    <button @click="FilePreviewDialogHandle('xlxs')">测试xlsx文件预览</button>-->
  <div>
    <div v-if="getFileType(fileUrl) == 'docx'">
      <vue-office-docx
        :src="fileUrl"
        style="height: 70vh;overflow: auto"
        @rendered="rendered"
        @error="errorHandler"
      />
    </div>
    <div v-if="getFileType(fileUrl) == 'xlsx'">
      <vue-office-excel
        :src="fileUrl"
        style="height: 70vh;overflow: auto"
        @rendered="rendered"
        @error="errorHandler"
      />
    </div>
    <div v-if="getFileType(fileUrl) == 'pdf'">
      <vue-office-pdf
        :src="fileUrl"
        style="height: 70vh;overflow: auto"
        @rendered="rendered"
        @error="errorHandler"
        :options="{
                  width: '100%',
                  overflow: 'auto'
                }"
      />
    </div>
  </div>

</template>
<script>
// 引入VueOffice组件
import VueOfficeDocx from '@vue-office/docx';
import VueOfficeExcel from '@vue-office/excel';
import VueOfficePdf from '@vue-office/pdf';
// 引入相关样式
import '@vue-office/docx/lib/index.css';
import '@vue-office/excel/lib/index.css';
export default {
  components: {
    VueOfficeDocx,
    VueOfficeExcel,
    VueOfficePdf
  },
  data(){
    return {
      fileUrl:'', // 文件url

    }
  },
  methods:{
    // 控制文件预览Dialog显示
    FilePreviewDialogHandle (type, fileUrl='') {
      console.log(type);
      if (type === 'docx') {
        this.fileUrl = ref('../file/test.docx'); // 本地预览
      } else if (type === 'pdf') {
        this.fileUrl = 'http://static.shanhuxueyuan.com/test.pdf'; // 线上获取
      } else if (type === 'xlxs') {
        this.fileUrl = fileUrl;
      } else if (type == null) {
        this.fileUrl = null;
      } else {
        this.fileUrl = null;
      }
      this.getFileType(this.fileUrl);
    },
    // 获取文件类型
    getFileType (fileUrl) {
      if (fileUrl !== '' && fileUrl != null && fileUrl !== undefined) {
        const fileType = fileUrl.split('.').pop().toLowerCase(); // 文件的扩展名（格式）
        console.log('type:', fileType);
        return fileType;
      } else {
        return 'docx';
      }
    },
    // 渲染结果
    rendered () {
      console.log('渲染完成');
    },

    errorHandler () {
      this.$notify.error('加载失败');
    },

  }
}
</script>
