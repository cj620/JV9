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
                  style="margin-right: 10px"
                  v-for="(item, index) in inputList" :key="index"
                  v-model="detailsSearchForm[item.label]"
                  :placeholder="item.title"
                ></el-input>
              </el-form-item>
              <!--<slot name="customerName"></slot>-->
              <el-button type="primary" size="mini" @click="searchForm">{{
                  $t("Generality.Ge_Search")
                }}</el-button>
                <slot name="slot-btn" :form="tableObj.formObj.form"></slot>
              <!--</el-form-item>-->
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
    formConfig: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      tableObj: {},
      detailsSearchForm: {
        Keyword: "",
      },
      inputList: [
        {label: 'Keyword', title: this.$t('Generality.Ge_InputPlaceholder')}
      ],
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
      delete this.tableObj.formObj.form.undefined
      this.tableObj.getData();
    },
  },
  created() {

    this.formConfig.forEach(item => {
      this.detailsSearchForm[item.key] = ''
      this.inputList.push(item)
    })

    if (this.tableConfig) {
      this.tableObj = new this.tableConfig();
      this.tableObj.getData();
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

<style lang="scss" scoped>
::v-deep .el-form-item__content{
  display: flex;
}
</style>
