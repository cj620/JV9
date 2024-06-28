<template>
  <PageWrapper :footer="false">
    <div class="info-page" v-loading="loading">
      <div class="total-count">
        {{ NotPurchasedCount }}
      </div>
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
            <div class="search-row">
              <div class="search-row-item">
                {{ $t("Generality.Ge_BillId") }}：
                <el-input
                  size="mini"
                  style="width: 140px"
                  v-model="NotPurchasedTableObj.formObj.form.BillId"
                ></el-input>
              </div>
              <div class="search-row-item">
                {{ $t("Generality.Ge_KeyWords") }}：
                <el-input
                  size="mini"
                  style="width: 140px"
                  v-model="NotPurchasedTableObj.formObj.form.Keyword"
                ></el-input>
              </div>
              <el-button size="mini" @click="search('NotPurchased')">
                {{ $t("Generality.Ge_Search") }}
              </el-button>
              <el-button size="mini" @click="reset('NotPurchased')">
                {{ $t("Generality.Ge_Reset") }}
              </el-button>
            </div>
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
            <div class="search-row">
              <div class="search-row-item">
                {{ $t("Generality.Ge_BillId") }}：
                <el-input
                  size="mini"
                  style="width: 140px"
                  v-model="PurchasedTableObj.formObj.form.BillId"
                ></el-input>
              </div>
              <div class="search-row-item">
                {{ $t("Generality.Ge_KeyWords") }}：
                <el-input
                  size="mini"
                  style="width: 140px"
                  v-model="PurchasedTableObj.formObj.form.Keyword"
                ></el-input>
              </div>
              <el-button size="mini" @click="search('Purchased')">
                {{ $t("Generality.Ge_Search") }}
              </el-button>
              <el-button size="mini" @click="reset('Purchased')">
                {{ $t("Generality.Ge_Reset") }}
              </el-button>
            </div>
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
      NotPurchasedCount: 0,
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
    this.getNPCount();
  },
  methods: {
    getNPCount() {
      setTimeout(() => {
        this.NotPurchasedCount = this.NotPurchasedTableObj.pager.Total;
      }, 200);
    },
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
        this.getNPCount();
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
    },
    search(e) {
      if (e === 'NotPurchased') {
        this.NotPurchasedTableObj.getData();
        this.getNPCount();
      } else {
        this.PurchasedTableObj.getData();
      }
    },
    reset(e) {
      if (e === 'NotPurchased') {
        this.NotPurchasedTableObj.reset();
        this.getNPCount();
      } else {
        this.PurchasedTableObj.reset();
      }
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
.search-row {
  position: absolute;
  height: 45px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: left;
  .search-row-item {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    margin-right: 10px;
    font-size: 14px;
  }
}
::v-deep .el-tabs__content {
  padding: 0 15px 5px 15px !important;
}
.total-count {
  width: 18px;
  height: 16px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  z-index: 100;
  left: 68px;
  top: 12px;
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
