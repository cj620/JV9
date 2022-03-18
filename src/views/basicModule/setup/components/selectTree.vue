<!--
 * @Author: H.
 * @Date: 2021-10-29 11:30:59
 * @LastEditTime: 2022-01-10 14:44:51
 * @Description:
-->
<template>
  <el-select
    style="width: 100%"
    ref="select"
    v-model="selectData"
    :placeholder="$t('Generality.Ge_PleaseSelect')"
  >
    <el-option
      class="addDepartmentSelect"
      :value="selectItemData"
      style="height: auto"
    >
      <el-tree
        class="filter-tree"
        :data="realTreeData"
        style="height: 100%"
        :props="defaultProps"
        node-key="id"
        @node-click="handelCheckChange"
        ref="tree"
      >
      </el-tree>
    </el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label",
      },
      selectItemData: [],
    };
  },
  props: {
    treeData: {
      type: Array,
      default: () => [],
      require: true,
    },
    selectData: {
      type: String,
      default: "",
    },
  },
  computed: {
    realTreeData() {
      if (this.treeData.find((item) => item.departmentName)) {
        function childrenList(data) {
          let list = [];
          data?.map((item) => {
            list.push({
              id: item.id,
              label: item.departmentName,
              children: childrenList(item.children),
            });
          });
          return list;
        }
        let arr = [];
        this.treeData.map((item) => {
          childrenList(item.children);
          const DepartmentList = {
            id: item.id,
            label: item.departmentName,
            children: childrenList(item.children),
          };
          arr.push(DepartmentList);
        });
        return arr;
      } else {
        return this.treeData;
      }
    },
  },
  methods: {
    handelCheckChange(data) {
      this.$emit("update:selectData", data.label);
      this.$emit("currentNode", data);
      this.$refs.select.blur();
    },
  },
};
</script>
<style lang="scss" scoped>
.addDepartmentSelect {
  padding: 0 !important;
}
</style>
