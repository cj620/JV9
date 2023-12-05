<!--
 * @Author: H.
 * @Date: 2021-11-09 13:25:06
 * @LastEditTime: 2022-01-20 17:21:41
 * @Description: 仓库
-->

<template>
  <PageWrapper :padding="0" :footer="false">
    <div class="unit-list">
      <div
        v-for="(item, index) in getStockroomList"
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
              <div>{{ item.Stockroom }}</div>
              <div>_</div>
            </div>
            <div>
              <div class="unit-list-item-content-operate">
                <div @click="del(item.Stockroom)">
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
      @confirm="confirmAddUnit"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </jv-dialog>
  </PageWrapper>
</template>

<script>
import JvDialog from "@/jv_doc/cpn/JvDialog/index";
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import {
  getStockroomList,
  addStockroom,
  deleteStockroom,
} from "@/api/workApi/stockroom/stockroomInfo";
export default {
  name: "index",
  components: { JvDialog },
  data() {
    return {
      input: "",
      formObj: {},
      dialogFormVisible: false,
      getStockroomList: [],
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
      getStockroomList()
        .then((res) => {
          this.getStockroomList = res.Items;
          this.getStockroomList.unshift("z");
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
          addStockroom(this.formObj.form)
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
      this.dialogFormVisible = false;
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
        deleteStockroom([id]).then((res) => {
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
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #e8e8e8;
        background: #f5f5f5;

        text-align: center;
        &:hover {
          color: blue;
        }
      }
    }
  }
}
</style>
