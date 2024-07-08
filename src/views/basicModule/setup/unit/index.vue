<!--单位-->
<template>
  <PageWrapper :footer="false">
    <div class="unit-query">
      <el-input
        v-model="form.Keyword"
        :placeholder="$t('Generality.Ge_SearchUnitName')"
        @keyup.enter.native="GetData()"
        style="width: 180px"
      ></el-input>
    </div>

    <div class="unit-list">
      <div
        v-for="(item, index) in getAllUnit"
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
              <div>{{ item.Unit }}</div>
              <div class="desc">
                <div>转换率：{{ item.UnitConvert }}</div>
                <div>MPR运算增量：{{ item.MinAmount }}</div>
              </div>
            </div>
            <div>
              <div class="unit-list-item-content-operate">
                <!--  <div @click="edit(item)">编辑</div>-->
                <div @click="del(item.Unit)">
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
      @confirm="confirmAddUnit"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </jv-dialog>
  </PageWrapper>
</template>

<script>
import JvDialog from "../../../../jv_doc/cpn/JvDialog/index";
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import {
  getAllUnit,
  saveUnit,
  deleteUnit,
} from "@/api/basicApi/systemSettings/unit";
export default {
  name: "index",
  components: { JvDialog },
  data() {
    return {
      input: "",
      formObj: {},
      dialogFormVisible: false,
      getAllUnit: [],
      form: {
        Keyword: "",
      },
    };
  },
  created() {
    this.GetData();
    this.formObj = new Form({
      formSchema,
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
  },
  methods: {
    //获取单位的数据
    GetData() {
      getAllUnit({ Keyword: this.form.Keyword })
        .then((res) => {
          this.getAllUnit = res.Items;
          this.getAllUnit.unshift("z");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //点击新增按钮
    add() {
      this.dialogFormVisible = true;
    },
    //点击编辑按钮
    edit(e) {
      this.dialogFormVisible = true;
    },
    //新增单位确认保存
    confirmAddUnit() {
      this.formObj.validate((valid) => {
        if (valid) {
          saveUnit(this.formObj.form)
            .then((res) => {
              this.formObj.reset();
              this.GetData();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    //删除单位
    del(id) {
      this.$confirm(
        this.$t("Generality.Ge_DeleteConfirm"),
        this.$t("Generality.Ge_Delete"),
        {
          confirmButtonText: this.$t("Generality.Ge_OK"),
          cancelButtonText: this.$t("Generality.Ge_Cancel"),
          type: "warning",
        }
      ).then(() => {
        deleteUnit([id]).then((res) => {
          console.log(res);
          this.GetData();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.unit-query {
  padding: 15px;
  background: #fff;
}
.unit-list {
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  .desc {
    font-size: 15px;
    color: #888;

    div {
      height: 18px !important;
      padding: 5px 0;
    }
  }
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
