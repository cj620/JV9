<!--物料详情-->
<template>
  <PageWrapper ref="page">
    <el-tabs @tab-click="tabClick" slot="sticky-tabs">
      <!-- tab 导航栏  -->
      <el-tab-pane
        v-for="pane in tabPanes"
        :key="pane.name"
        :label="pane.label"
        :name="pane.name"
      ></el-tab-pane>
    </el-tabs>
    <Action
      slot="sticky-extra"
      size="small"
      :actions="[
        {
          label: $t('Generality.Ge_Edit'),
          confirm: edit.bind(null),
        },
        {
          label: $t('Generality.Ge_Copy'),
          icon: 'el-icon-delete',
          confirm: copy.bind(null),
        },
        {
          label: $t('Generality.Ge_Disable'),
          icon: 'el-icon-delete',
          disabled: detailObj.detailData.State === 'Disable',
          popConfirm: {
            title: $t('Generality.Ge_IsDisabled'),
            confirm: disable.bind(null),
          },
        },
        {
          label: $t('Generality.Ge_Enable'),
          icon: 'el-icon-delete',
          disabled: detailObj.detailData.State === 'Enable',
          popConfirm: {
            title: $t('Generality.Ge_WhetherToStartUsing'),
            confirm: enable.bind(null),
          },
        },
      ]"
    >
    </Action>
    <!--单据信息-->
    <JvBlock :title="$t('Generality.Ge_ItemsInfo')" ref="first">
      <div style="display: flex">
        <div style="width: 120px; margin-right: 20px">
          <el-image
            style="width: 100px; height: 100px"
            :src="imgUrlPlugin(detailObj.detailData.PhotoUrl)"
            :preview-src-list="[imgUrlPlugin(detailObj.detailData.PhotoUrl)]"
            class="items-details-Img-error"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline error-icon"></i>
            </div>
          </el-image>
        </div>

        <JvDetail :detailObj="detailObj">
          <!-- 含税金额 -->
          <template #ItemCategory="{ record }">
            {{itemCategoryEnumMap[record].name}}
          </template>
        </JvDetail>
        <div class="Items-info-content">
          {{ stateMap && stateMap.name }}
        </div>
      </div>
    </JvBlock>
    <!--物料信息-->
    <JvBlock :title="$t('Generality.Ge_InventoryInfo')" ref="second">
      <JvTable :table-obj="tableObj1"> </JvTable>
    </JvBlock>
    <!--结存汇总-->
    <JvBlock :title="$t('menu.St_StockSummary')" ref="third">
      <JvTable :table-obj="tableObj2">
        <template #AccountedType="{ row }">
          {{ accountedTypeEnum[row.AccountedType] }}
        </template>
      </JvTable>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import { getByIdItem } from "@/api/basicApi/systemSettings/Item";
import Detail from "@/jv_doc/class/detail/Detail";
import { detailConfig, InventoryConfig,stockSummaryConfig } from "./config";
import Sticky from "@/components/Sticky";
import { stateEnum,itemCategoryEnum } from "@/enum/baseModule";
import { updateStateItem } from "@/api/basicApi/systemSettings/Item";
import { Table } from "@/jv_doc/class/table";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
export default {
  name: "index",
  data() {
    return {
      ruleForm: {},
      materialSpecDataList: [],
      auxiliaryUnitInfoData: [],
      detailObj: {},
      tableObj1: {},
      tableObj2: {},
      tableObj: {},
      accountedTypeEnum: {
        St_OtherOut: this.$t("menu.St_OtherOut"),
        St_OtherIn: this.$t("menu.St_OtherIn"),
        St_Picking: this.$t("menu.St_Picking"),
        St_ReturnPicking: this.$t("menu.St_ReturnPicking"),
        St_ProduceIn: this.$t("menu.St_ProduceIn"),
        St_StockInit: this.$t("menu.St_StockInit"),
        St_StockCheck: this.$t("menu.St_StockCheck"),
        St_CostChange: this.$t("menu.St_CostChange"),
        St_SplitAssemble: this.$t("menu.St_SplitAssemble"),
        St_Dispatch: this.$t("menu.St_Dispatch"),
        St_WasteOut: this.$t("menu.St_WasteOut"),
        St_SurplusIn: this.$t("menu.St_SurplusIn"),
        Pu_StockIn: this.$t("menu.Pu_StockIn"),
      },
      tabPanes: [
        {
          label: this.$t("Generality.Ge_ItemsInfo"),
          name: "first",
        },
        {
          label:this.$t("Generality.Ge_InventoryInfo"),
          name: "second",
        },
        {
          label:this.$t("menu.St_StockSummary"),
          name: "third",
        },
      ],
    };
  },
  computed: {
    stateMap() {
      return stateEnum[this.detailObj.detailData.State];
    },
    itemCategoryEnumMap() {
      return itemCategoryEnum
    },
  },
  created() {
    console.log(this.$route, 54321);
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
    });
    this.tableObj1 = new Table({
      tableSchema: InventoryConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 350,
    });
    this.tableObj2 = new Table({
      tableSchema: stockSummaryConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 350,
    });
    this.GetDetailsData();
  },
  components: {},
  methods: {
    imgUrlPlugin,
    //获取数据
    async GetDetailsData() {
      await getByIdItem(this.$route.query.ItemId).then((res) => {
        console.log(res);
        this.detailObj.detailData = res;
        this.tableObj1.setData(res.ItemStockInfo);
        this.tableObj2.setData(res.ItemStockRecord);
      });
    },
    refresh() {
      this.GetDetailsData();
    },
    //编辑一张单子出来
    edit() {
      this.$router.push({
        name: "Se_Item_Edit",
        query: {
          ItemId: this.detailObj.detailData.ItemId,
          type: "edit",
          title: "Se_Item_Edit",
        },
      });
    },
    //复制一张单子出来

    copy() {
      this.$router.push({
        name: "Se_Item_Edit",
        query: {
          ItemId: this.detailObj.detailData.ItemId,
          type: "copy",
          title: "Se_Item_Edit",
        },
      });
    },
    //禁用
    disable() {
      var str = {
        ItemId: this.detailObj.detailData.ItemId,
        State: "Disable",
      };
      updateStateItem(str).then((res) => {
        console.log(this.current, 555666);
        this.GetDetailsData();
      });
    },
    //禁用
    enable() {
      var str = {
        ItemId: this.detailObj.detailData.ItemId,
        State: "Enable",
      };
      updateStateItem(str).then((res) => {
        console.log(this.current, 555666);
        this.GetDetailsData();
      });
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  },
};
</script>

<style lang="scss">
.mould-img {
  width: 100px;
  height: 100px;
  // background-color: pink;
  position: absolute;
  left: 10px;
  right: 100px;
}
.Items-info-content {
  position: absolute;
  right: 40px;
  font-size: 24px;
  font-weight: 500;
  border: 2px solid #000;
  padding: 5px 10px;
  height: 41px;
}
.materials-details-tab {
  height: 50px;
  line-height: 50px;
  width: 100%;
  // position: relative;
  transition: 600ms ease position;
}
.items-details-Img-error {
  background-color: rgb(231, 231, 231);
  .image-slot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // color: rgb(161, 161, 161);
    .error-icon {
      color: rgb(161, 161, 161);
      font-size: 19px;
    }
  }
}
</style>
