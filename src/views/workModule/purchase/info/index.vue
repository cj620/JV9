<template>
  <PageWrapper :footer="false">
    <div class="info-page" v-loading="loading">
      <el-tabs
        v-model="currentTabName"
        type="border-card"
        style="height: 100%"
        @tab-click="handleTabClick"
      >
        <el-tab-pane
          :label="$t('Generality.Ge_NotPurchased')"
          class="info-page-pane"
          name="NotPurchased"
        >
          <div :style="{ height: boxHeight + 'px' }">
            <JvTable :table-obj="NotPurchasedTableObj">
              <template #Quantity="{ record }">
                <div style="color: red">
                  {{ record }}
                </div>
              </template>
              <template #btn-list>
                <Action
                  size="mini"
                  :actions="[
                    {
                      label: $t('Generality.Ge_CreateOrders'),
                      confirm: createPurchaseOrder,
                      disabled: !NotPurchasedTableObj.selectData.datas.length
                    },
                  ]"
                ></Action>
              </template>
            </JvTable>
          </div>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('Generality.Ge_Purchased')"
          class="info-page-pane"
          name="Purchased"
        >
          <div :style="{ height: boxHeight + 'px' }">
            <JvTable :table-obj="PurchasedTableObj">
              <template #Quantity="{ record }">
                {{ record }}
              </template>
            </JvTable>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </PageWrapper>
</template>
<script>
import { NotPurchasedTable, PurchasedTable } from "./config";
import BillStateTags from "@/components/WorkModule/BillStateTags";
import Action from "~/cpn/JvAction/index.vue";
export default {
  name: "Pu_PurchaseInfo",
  components: {Action, BillStateTags },
  data() {
    return {
      keyword: "",
      currentTabName: "NotPurchased",
      NotPurchasedTableObj: {},
      PurchasedTableObj: {},
      boxHeight: 0,
      loading: true,
    }
  },
  created() {
    this.NotPurchasedTableObj = new NotPurchasedTable();
    this.PurchasedTableObj = new PurchasedTable();
  },
  mounted() {
    this.NotPurchasedTableObj.getData();
    this.PurchasedTableObj.getData();
    this.setContainer();
    this.loading = false;
  },
  methods: {
    setContainer() {
      let mainContent = document.querySelector(".main-content");
      this.boxHeight = mainContent.clientHeight - 80;
      window.onresize = (e) => {
        this.debounce(() => {
          this.boxHeight = mainContent.clientHeight - 80;
          mainContent.style.overflowY = "none";
        }, 100);
      }
    },
    handleTabClick(tab) {
      this.loading = true;
      if (tab.name === 'Purchased') {
        this.PurchasedTableObj.getData();
      } else {
        this.NotPurchasedTableObj.getData();
      }
      this.loading = false;
    },
    createPurchaseOrder() {
      this.$router.push({
        name: "Pu_Order_Add",
        params: {
          selectedData: this.NotPurchasedTableObj.selectData.datas
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.info-page {
  background: #fff;
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  position: relative;
  .info-page-pane {
    height: 100%;
  }
}
::v-deep .el-tabs__content {
  padding: 0 15px 5px 15px !important;
}
</style>
