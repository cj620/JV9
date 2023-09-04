<!--
 * @Author: H.
 * @Date: 2021-12-15 08:56:39
 * @LastEditTime: 2022-01-17 10:28:45
 * @Description:
-->
<template>
  <jv-dialog
    :title="$t('Generality.Ge_SelectTheDetails')"
    width="90%"
    :close-on-click-modal="true"
    :modal-append-to-body="false"
    :append-to-body="false"
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="confirmItem"
  >
    <div class="select-document-details">
      <div class="document-table">
        <JvTable ref="BillTable" :table-obj="tableObj">
          <template #titleBar>
            <el-form ref="form" size="mini" :model="detailsSearchForm" inline>
              <el-form-item>
                <el-input
                  v-model="detailsSearchForm.Keyword"
                  placeholder="请输入物料编号、名称"
                ></el-input>
              </el-form-item>
              <el-form-item label-width="20px">
                <el-button type="primary" size="mini" @click="searchForm">{{
                  $t("Generality.Ge_Search")
                }}</el-button>
                <slot name="slot-btn" :form="tableObj.formObj.form"></slot>
              </el-form-item>
            </el-form>
          </template>

          <!-- JvTable插槽 父组件使用时需传slotData -->
          <template v-for="item in slotData" #[item]="scope">
            <template v-if="item">
              <slot :name="item" :row="scope.row" />
            </template>
          </template>
        </JvTable>
      </div>
    </div>
  </jv-dialog>
</template>

<script>
export default {
  props: {
    tableConfig: {
      type: Function,
      required: true,
    },
    detailedData: {
      type: Array,
      required: true,
      default: () => [],
    },
    detailName: {
      type: String,
      default: "",
    },
    slotData: {
      type: Array,
      default: () => [],
    },
    CustomerName: {
      type: String,
      default: () => [],
    }
  },
  data() {
    return {
      tableObj: {},
      detailsSearchForm: {
        Keyword: "",
      },
    };
  },
  methods: {
    confirmItem() {
      const { datas } = this.tableObj.selectData;
      let IsRepeat = false;
      let repeatMateria = "";
      if (datas.length > 0) {
        if (this.detailedData.length > 0) {
          datas.forEach((item) => {
            this.detailedData.forEach((Titem) => {
              if (item.Id === Titem.AssociatedNo) {
                IsRepeat = true;
                repeatMateria = item.ItemName || item.PartName;
              }
            });
          });
          if (IsRepeat) {
            this.$message({
              type: "warning",
              message:
                this.$t("Generality.Ge_IsDuplicate") + repeatMateria + " 重复!",
            });
          } else {
            this.$emit("confirmDetails", datas);
          }
        } else {
          this.$emit("confirmDetails", datas);
        }
      } else {
        this.$message({
          type: "warning",
          message: this.$t("Generality.Ge_CheckDetails"),
        });
      }
    },
    searchForm() {
      this.tableObj.formObj.form = Object.assign(
        {},
        this.tableObj.formObj.form,
        this.detailsSearchForm
      );
      this.tableObj.getData({CustomerName: this.CustomerName});
    },
  },
  created() {
    if (this.tableConfig) {
      this.tableObj = new this.tableConfig();
      this.tableObj.getData({CustomerName: this.CustomerName});
    }
    if (this.detailName === "outsourcingRequirement") {
      this.tableObj.formObj.form.State = "ToBeProcessed";
    } else if (this.detailName === "purchaseOrder") {
      this.tableObj.formObj.form.ItemStates = ["NotPurchased"];
    }
  },
  mounted() {},
  computed: {},
  components: {},
};
</script>
