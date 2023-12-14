<template>
<div>
  <JvDialog
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="confirmData">
    <el-select v-model="value" :placeholder="$t('Generality.Ge_PleaseSelect')">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </JvDialog>
</div>
</template>

<script>
import {
  getAllRole,

} from "@/api/basicApi/systemSettings/role";
export default {
  name: "selectForm",
  data(){
    return{
      options: [],
      value: ''
    }
  },
  props: {

    formData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    console.log(this.formData);
    this.GetData()

  },
  methods:{
    GetData(){
      let arr = []
      getAllRole().then(res=>{
        console.log(res);
        res.Items.forEach(item=>{
          arr.push({
            value:item.RoleId,
            label:item.RoleName,
          })
        })
        this.options=arr
      })
      this.value=Number(this.formData.ConfigValue)

    },
    confirmData(){
      this.$emit('StringSelectConfirm',JSON.stringify(this.value))
    }
  }
}
</script>

<style scoped>

</style>
