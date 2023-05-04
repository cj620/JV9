<!--
 * @Author: your name
 * @Date: 2021-12-02 08:56:20
 * @LastEditTime: 2023-05-04 15:40:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\mouldDetail\cpns\DynamicList.vue
-->
<template>
  <el-timeline>
    <el-timeline-item
      :timestamp="item.CreationDate | time"
      placement="top"
      v-for="item in cdata"
      :key="item.GUI"
    >
      <div style="font-weight: bold; font-size: 20px; margin: 10px 0">
        {{ item.AssociatedInfo }}
      </div>
      <el-card :body-style="{ padding: '15px 0 5px 15px' }">
        <div>{{ item.Remarks }}</div>
        <el-image
          style="width: 100px; height: 100px; margin: 5px 10px 15px 0"
          :src="imgUrlPlugin(imgItem.ImageUrl)"
          v-for="imgItem in item.Images"
          :key="imgItem.Id"
          :preview-src-list="
            item.Images.map((preUrl) => imgUrlPlugin(preUrl.ImageUrl))
          "
        ></el-image>
        <TableAction
          :actions="[
            {
              label: item.Creator,
              disabled: true,
              confirm: () => {},
            },
            {
              icon: 'el-icon-delete',
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: delDynamic.bind(null, item.GUI),
              },
            },
          ]"
        />
      </el-card>
    </el-timeline-item>
    <el-empty :image-size="50" v-if="cdata.length == 0"></el-empty>
  </el-timeline>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system";
import { delete_project_dynamic } from "@/api/workApi/project/projectInfo";
export default {
  props: {
    cdata: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    imgUrlPlugin,
    // 删除动态
    delDynamic(id) {
      delete_project_dynamic({ Ids: [id] }).then((res) => {
        // console.log();
        this.$emit("fresh");
      });
    },
  },
};
</script>

<style></style>
