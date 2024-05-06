<template>
  <JvDialog
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="confirmData">
    <el-form
      class="setting-form"
      ref="form"
      :model="form"
      label-width="60px"
      style="width: 100%"
      label-position="top"
    >
      <el-form-item :label="$t('Generality.Ge_ConfigurationValue')">
        <el-select
          style="width: 100%"
          v-model="form.ConfigValue"
          :multiple="true"
          filterable
          :placeholder="$t('Generality.Ge_PleaseSelect')"
        >
          <el-option
            v-for="item in asyncRoutes()"
            :key="item.Id"
            :label="item.title"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </JvDialog>
</template>
<script>
import { asyncRoutes } from "@/router";
export default {
  name: "selectMenuRoute",
  data() {
    return {
      form: {
        ConfigValue: "",
      },
    }
  },
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    const arr = JSON.parse(JSON.parse(JSON.stringify(this.formData)).ConfigValue)
    this.form.ConfigValue = arr.map(item => {
      return Object.keys(item)[0];
    });
  },
  methods: {
    asyncRoutes() {
      return asyncRoutes.filter(route => 'key' in route)
    },
    transformArray(e) {
      const transformedArray1 = e;
      const arr = asyncRoutes.filter(route => 'key' in route)
      const transformedArray2 = transformedArray1.map(keyName => {
        const foundObj = arr.find(obj => obj.key === keyName);
        if (foundObj) {
          const transformedObj = {};
          transformedObj[keyName] = foundObj.title;
          return transformedObj;
        }
        return null;
      });
      return transformedArray2.filter(item => item !== null);
    },
    confirmData() {
      const result = this.transformArray(JSON.parse(JSON.stringify(this.form.ConfigValue)))
      this.$emit('menuConfirm',JSON.stringify(result))
    }
  }
}
</script>
