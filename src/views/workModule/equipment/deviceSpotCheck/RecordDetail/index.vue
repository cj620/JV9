<template>
  <PageWrapper ref="page">
    <!--单据信息-->
    <JvBlock
      :title="cur_billId"
      ref="first"
      :contentStyle="{
        height: '285px',
      }" style="position: relative">
      <div style="position: relative; margin-left: 30px">
        <JvDetail :detailObj="detailObj">
          <template #BillId="{ record }">
            <span
              style="color: #409eff; cursor: pointer"
              @click="linkToCheckDetail(record)"
            >
              {{ record }}
            </span>
          </template>
          <template #AssociatedNo="{ record }">
            <span
              style="color: #409eff; cursor: pointer"
              @click="linkToProject(record)"
            >
              {{ record }}
            </span>
          </template>
        </JvDetail>
        <SpotCheckStateTags :state="detailObj.detailData.State"></SpotCheckStateTags>
      </div>
    </JvBlock>
    <JvBlock :title="$t('device.De_SpotCheckMember')" ref="second">
      <JvTable ref="BillTable" :table-obj="tableObj"></JvTable>
    </JvBlock>
  </PageWrapper>
</template>
<script>
import SpotCheckStateTags from "@/views/workModule/equipment/deviceSpotCheck/components/SpotCheckStateTags.vue";
import { detailConfig, msgTableConfig } from "./config"
import { mapState } from "vuex";
import Detail from "@/jv_doc/class/detail/Detail";
import { Table } from "@/jv_doc/class/table";
import { assets_device_spot_check_get_member } from "@/api/workApi/equipment/spotCheck"
export default {
  name: "index",
  components: {
    SpotCheckStateTags,
  },
  data() {
    return {
      cur_billId: "",
      detailObj: {},
      tableObj: {},
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
      tableSchema: msgTableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 450,
    })
    await this.GetData();
  },
  methods: {
    GetData() {
      assets_device_spot_check_get_member({Id: this.$route.query.Id}).then((res) => {
        this.detailObj.detailData = res;
        this.cur_billId = res.Id;
        this.tableObj.setData(res.BillItems);
      })
    },
    linkToCheckDetail(BillId) {
      this.$router.push({
        name: "As_DeviceSpotCheckDetail",
        query: { BillId },
      });
    },
    linkToProject(BillId) {
      this.$router.push({
        name: "As_DeviceSpotCheckPlanDetail",
        query: { BillId },
      });
    },
  }
}
</script>
