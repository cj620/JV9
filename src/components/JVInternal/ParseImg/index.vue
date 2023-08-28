<!--
 * @Author: H.
 * @Date: 2021-12-01 11:38:42
 * @LastEditTime: 2022-01-13 09:52:56
 * @Description:
-->
<!--图片粘贴-->
<template>
  <div @paste="handlePaste">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    more: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    //粘贴图片
    async handlePaste(event) {
   /*   console.log(window,window.navigator,window.navigator,54321)
      const clipboardItems = await window.navigator.clipboard.read();
      console.log(11,clipboardItems[0])
      for (const clipboardItem of clipboardItems) {
                   for (const type of clipboardItem.types) {
                           const item = await clipboardItem.getType(type);
                     console.log(type)
                     if(type==='image/png'){
                       this.$emit("handlePasteData", new File([item], 'image.png', {type: 'image/png'}))

                     }else {
                       this.$message.error(this.$t("Generality.Ge_NeedPicture"));
                     }

                   }
           }*/
            const items = (event.clipboardData || window.clipboardData).items;
      console.log(items.length)
      let file = null;
      let files = [];
            if (!items || items.length === 0) {
              this.$message.error(this.$t("Generality.Ge_NoSupportPaste"));
              return;
            }
            // 搜索剪切板items
            for (let i = 0; i < items.length; i++) {
              if (items[i].type.indexOf("image") !== -1) {
                file = items[i].getAsFile();
                files.push(items[i].getAsFile());
                // break;
              }
            }
            if (!file) {
              this.$message.error(this.$t("Generality.Ge_NeedPicture"));
              return;
            }

            this.$emit("handlePasteData", this.more ? files : file);
    },
  },
};
</script>

<style scoped></style>
