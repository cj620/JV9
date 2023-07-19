<!--保养报废类别-->

<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <div class="unit-list">
      <div
        v-for="(item, index) in getAllType"
        :key="index"
        class="unit-list-item"
      >
        <div v-if="index === 0">
          <div class="unit-list-item-add" @click="add">
            <i class="el-icon-plus"></i> {{ $t("Generality.Ge_New") }}
          </div>
        </div>
        <div v-else>
          <div class="unit-list-item-content">
            <div class="unit-list-item-content-info">
              <div>{{ item.Value }}</div>
              <div>_</div>
            </div>
            <div>
              <div class="unit-list-item-content-operate">
                 <!-- <div @click="edit(item)">编辑</div>-->
                <div @click="del(item)">
                  {{ $t("Generality.Ge_Delete") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <jv-dialog
      :title="$t('Generality.Ge_New')"
      width="35%"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      @confirm="confirmAddType"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </jv-dialog>

  </PageWrapper>
</template>

<script>
import { assets_device_managetype_add,assets_device_managetype_get_by_type,assets_device_managetype_del } from  "@/api/workApi/equipment/maintenance";
import { Form } from "@/jv_doc/class/form";
export default {
    name: "index",
  data(){
      return{
        tableObj:{},
        getAllType:[],
        type:'MaintainType',
        formObj: {},
        dialogFormVisible: false,
      }
  },
  created() {

    if(this.$route.query.type){
      this.type=this.$route.query.type
    }
    this.getData(this.type)
    this.formObj = new Form({
      formSchema:[
        {
          // 字段名
          prop: 'Value',
          cpn: "FormInput",
          label: '类别',
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseFillIn"),
              trigger: ['change', 'blur']
            }
          ]
        },
      ],
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
  },
  methods:{
    getData(e){
      console.log(e);
      assets_device_managetype_get_by_type({ManageType:e}).then(res=>{
        console.log(res);
        this.getAllType = res;
        this.getAllType.unshift("z");
      })
    },
    //新增类别
    add(){
      this.dialogFormVisible = true
    },
    //编辑类别
    edit(e){
      console.log(e);
      this.dialogFormVisible = true
      this.formObj.form=JSON.parse(JSON.stringify(e))
    },
    //保存类别
    confirmAddType(){
      this.formObj.validate((valid) => {

        if (valid) {
          let str = {
            ManageType:this.type,
            Value:this.formObj.form.Value,
          }
          assets_device_managetype_add(str)
            .then((res) => {
              this.formObj.reset();
              this.dialogFormVisible = false
              this.getData(this.type)
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    //删除类别
    del(e){
      assets_device_managetype_del({Id:e.Id}).then(res=>{
        console.log(res);
        this.getData(this.type)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .unit-list {
    padding: 15px;
    display: flex;
    flex-wrap: wrap;

    .unit-list-item {
      width: 15.5%;
      height: 140px;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      margin: 0.55%;
      background: #fff;

      &:nth-child(6n + 1) {
        margin-left: 0 !important;
      }
      &:hover {
        box-shadow: 2px 2px 5px #e8e8e8;
        cursor: pointer;
      }
      .unit-list-item-add {
        line-height: 140px;
        text-align: center;
      }
      .unit-list-item-content {
        .unit-list-item-content-info {
          font-size: 20px;
          font-weight: bold;
          padding: 19px 24px;
          div {
            height: 30px;
          }
        }
        .unit-list-item-content-operate {
          display: flex;
          align-items: center;
          height: 40px;
          border-top: 1px solid #e8e8e8;
          background: #f5f5f5;
          div {
            width: 100%;
            text-align: center;
            &:hover {
              color: blue;
            }
          }
        }
      }
    }
  }
</style>
