<!--
 * @Author: H.
 * @Date: 2021-11-23 16:20:51
 * @LastEditTime: 2021-11-23 17:19:48
 * @Description: 编辑角色成员
-->
<template>
  <el-transfer
    style="text-align: left; display: inline-block"
    v-model="selectedValue"
    filterable
    :titles="['所有成员', '已有成员']"
    :format="{
      noChecked: '${total}',
      hasChecked: '${checked}/${total}',
    }"
    @change="handleChange"
    :data="sourceData"
  >
    <span slot-scope="{ option }">{{ option.label }}</span>
  </el-transfer>
</template>

<script>
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { getAllRoleMember } from "@/api/basicApi/systemSettings/role";

export default {
  data() {
    return {
      sourceData: [],
      selectedValue: [],
    };
  },
  props: {
    RoleId: {
      type: [String, Number],
      require: true,
    },
  },
  methods: {
    handleChange(value, direction, movedKeys) {
      this.$emit("updateUser", value);
    },
    getAllUser() {
      getAllUserData().then((res) => {
        this.sourceData = res.Items.map((item) => {
          return {
            label: item.UserName,
            key: item.UserId,
          };
        });
      });
    },
    getSelectedValue() {
      getAllRoleMember({ RoleId: this.RoleId }).then((res) => {
        if (res.Items.length > 0) {
          this.selectedValue = res.Items.map((item) => item.UserId);
        }
      });
    },
  },
  created() {
    this.getAllUser();
    this.getSelectedValue();
  },
  mounted() {},
  computed: {},
  components: {},
};
</script>

<style lang="scss" scoped></style>
