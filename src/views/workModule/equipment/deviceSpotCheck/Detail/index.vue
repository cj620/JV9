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
    <!--单据信息-->
    <JvBlock
      :title="cur_billId"
      ref="first"
      :contentStyle="{
        height: '230px',
      }" style="position: relative">
        <div style="position: relative; margin-left: 30px">
            <JvDetail :detailObj="detailObj"> </JvDetail>
            <SpotCheckStateTags :state="detailObj.detailData.State"></SpotCheckStateTags>
        </div>
    </JvBlock>
    <!--设备信息-->
    <JvBlock :title="$t('menu.Pr_Devices')" ref="second">
      <JvTable ref="BillTable" :table-obj="tableObj">
        <template #operation="{ row }">
          <TableAction
              :actions="[
              {
                label: $t('device.De_SpotCheck'),
                confirm: spotCheckMember.bind(null, row),
              },
            ]"
          />
        </template>
      </JvTable>
    </JvBlock>
    <SpotCheckItem
        :visible.sync="spotCheckVisible"
        v-if="spotCheckVisible"
        :DetailData="DetailData"
        @confirmData="confirmSpotCheck"
    >
    </SpotCheckItem>
  </PageWrapper>
</template>

<script>
import { tableConfig, detailConfig } from "./config"
import Detail from "@/jv_doc/class/detail/Detail";
import { Table } from "@/jv_doc/class/table";
import SpotCheckStateTags from "@/views/workModule/equipment/deviceSpotCheck/components/SpotCheckStateTags.vue";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import {
  assets_device_spot_check_get,
  assets_device_spot_check_save_result,
} from "@/api/workApi/equipment/spotCheck"
import { mapState } from "vuex";
import SpotCheckItem from "@/views/workModule/equipment/deviceSpotCheck/components/SpotCheckItem/SpotCheckItem.vue";

export default {
  name: "index",
  components: {
    SpotCheckItem,
    SpotCheckStateTags,
  },
  data() {
    return {
      cur_billId: "",
      detailObj: {},
      tableObj: {},
      DetailData: [],
      RemarkData: "",
      fileBillId: "",
      spotCheckVisible: false,
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("Generality.Ge_ItemsInfo"),
          name: "second",
        },
      ],
    }
  },
  computed: {
    ...mapState({
        current: (state) => state.page.current,
    }),
  },
  async created() {
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
    });
    this.tableObj = new Table({
      tableSchema: tableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationWidth: '100px',
      height: 350,
    });
    await this.GetData();
  },
  methods: {
    async GetData() {
      await assets_device_spot_check_get({
        BillId: this.$route.query.BillId
      }).then((res) => {
        this.detailObj.detailData = res;
        this.cur_billId = res.BillId;
        this.tableObj.setData(res.BillMembers);
      })
    },
    imgUrlPlugin,
    spotCheckMember(row) {
      this.DetailData = row
      this.spotCheckVisible = true
    },
    confirmSpotCheck(e) {
      assets_device_spot_check_save_result(e).then((res) => {
        this.GetData();
      })
      this.spotCheckVisible = false
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  }
}
</script>
<style lang="scss" scoped>
//.mould-img {
//  width: 120px;
//  height: 120px;
//  // background-color: pink;
//  position: absolute;
//  left: 10px;
//  right: 100px;
//}
//.items-details-Img-error {
//  background-color: rgb(231, 231, 231);
//  .image-slot {
//    width: 100%;
//    height: 100%;
//    display: flex;
//    justify-content: center;
//    align-items: center;
//    // color: rgb(161, 161, 161);
//    .error-icon {
//      color: rgb(161, 161, 161);
//      font-size: 19px;
//    }
//  }
//}
</style>
