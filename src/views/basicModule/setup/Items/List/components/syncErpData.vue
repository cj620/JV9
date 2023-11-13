<!--设备运行表-->
<template>
    <div>
      <jv-dialog
        :title="$t('setup.SynchronizeERPData')"
        width="90%"
        :close-on-click-modal="true"
        :modal-append-to-body="false"
        :append-to-body="false"
        v-bind="$attrs"
        v-on="$listeners"
        @confirm="confirmItem"
        :IsShowFooterBtn="false"
      >
        <el-form
          ref="form"
         style="display: flex"
          size="mini"
          :model="form"
          label-width="120px"
          :rules="rules"
        >
          <el-form-item :label="$t('setup.MaterialCodeSegment')" prop="MaterialCodeSegment">
            <el-select v-model="form.MaterialCodeSegment" style="width: 300px" multiple>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" label-width="20px">
            <el-button type="primary" size="mini" @click="searchForm('form')">同步</el-button>
          </el-form-item>
        </el-form>
        <JvTable ref="BillTable" :table-obj="tableObj">
          <template #State="{ row }">
            {{ stateEnum[row.State] && stateEnum[row.State].name }}
          </template>
        </JvTable>
      </jv-dialog>
    </div>
</template>

<script>
// 引入表格类
import { Table } from "./syncErpTableConfig";
import { adaptor_synchronize_erp_material } from "@/api/workApi/adaptor";
import { getConfigKey } from "@/api/basicApi/systemSettings/sysSettings";
import { stateEnum } from "@/enum/baseModule";
export default {
    name: "deviceRunTable",
  data(){
      return{
        stateEnum,
        tableObj:{},
        DeviceData:[],
        options:[],
        form:{
          MaterialCodeSegment:'',
        },
        rules: {
          MaterialCodeSegment: [
            {required: true, message: this.$t('Generality.Ge_PleaseSelect'), trigger: 'blur'},
          ],
        }
      }
  },
  props:{
    transferData:{
      type:Object,
      default:()=>{}
    }
  },
  created(){
    // 创建表格实例
    this.tableObj = new Table();
   this.GetConfigData()
  },
  methods:{

      //查询系统配置
    GetConfigData(){
      getConfigKey({ConfigKey:'ERPInventoryCategoryConfiguration'}).then(res=>{
        console.log(typeof res.ConfigValue,JSON.parse(res.ConfigValue));
        let arr=[]
        JSON.parse(res.ConfigValue).forEach(item=>{
          arr.push({
            value:item.InventoryTypeCode,
            label:item.InventoryTypeName,

          })
        })
        console.log(arr);
        this.options = arr
      })
    },

    //搜索表格
    searchForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

      adaptor_synchronize_erp_material({
        Types:this.form.MaterialCodeSegment,
        CurrentPage: 1,
        PageSize: 10,
      }).then(res=>{
        console.log(res,5656);
        this.tableObj.setData(res.Items);
      })
        } else {
          console.log('error submit!!');
          return false;
        }
        })
    },
    confirmItem(){}
  }
}
</script>

<style scoped>

</style>
