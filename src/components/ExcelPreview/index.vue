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
        :options="options"
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
      options:{
        xls: false,       //预览xlsx文件设为false；预览xls文件设为true
        minColLength: 0,  // excel最少渲染多少列，如果想实现xlsx文件内容有几列，就渲染几列，可以将此值设置为0.
        minRowLength: 0,  // excel最少渲染多少行，如果想实现根据xlsx实际函数渲染，可以将此值设置为0.
        widthOffset: 10,  //如果渲染出来的结果感觉单元格宽度不够，可以在默认渲染的列表宽度上再加 Npx宽
        heightOffset: 10, //在默认渲染的列表高度上再加 Npx高
        beforeTransformData: (workbookData) => {return workbookData}, //底层通过exceljs获取excel文件内容，通过该钩子函数，可以对获取的excel文件内容进行修改，比如某个单元格的数据显示不正确，可以在此自行修改每个单元格的value值。
        transformData: (workbookData) => {return workbookData}, //将获取到的excel数据进行处理之后且渲染到页面之前，可通过transformData对即将渲染的数据及样式进行修改，此时每个单元格的text值就是即将渲染到页面上的内容
      },
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
        console.log(this.fileUrl,68)
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
