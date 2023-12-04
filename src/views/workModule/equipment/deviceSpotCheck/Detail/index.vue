<template>
  <PageWrapper ref="page">
    <!--单据信息-->
    <JvBlock
      :title="cur_billId"
      ref="first"
      :contentStyle="{
        height: '230px',
      }" style="position: relative">
        <div style="position: relative; margin-left: 30px">
            <JvDetail :detailObj="detailObj">
              <template #AssociatedNo="{ record }">
            <span
                style="color: #409eff; cursor: pointer"
                @click="linkToProject(record)"
            >
              {{ record }}
            </span>
              </template></JvDetail>
            <SpotCheckStateTags :state="detailObj.detailData.State"></SpotCheckStateTags>
        </div>
    </JvBlock>
    <!--设备信息-->
    <JvBlock :title="$t('device.De_SpotCheckMember')" ref="second">
      <JvTable ref="BillTable" :table-obj="tableObj">
        <template #operation="{ row }">
          <TableAction
              :actions="[
              {
                label: $t('device.De_SpotCheck'),
                disabled: row.State === 'Verified',
                confirm: spotCheckMember.bind(null, row),
              },
              {
                label: $t('device.De_SpotCheckMsg'),
                confirm: spotCheckMsg.bind(null, row),
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
    <JvDialog
        :visible.sync="spotCheckMsgVisible"
        v-if="spotCheckMsgVisible"
        :title="$t('device.De_SpotCheckMsg')"
        width="60%"
        :close-on-click-modal="false"
        :modal-append-to-body="false"
        :append-to-body="false"
        :IsShowFooterBtn="false"
    >
      <JvTable :table-obj="msgTableObj"></JvTable>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { tableConfig, detailConfig, msgTableConfig } from "./config"
import Detail from "@/jv_doc/class/detail/Detail";
import { Table } from "@/jv_doc/class/table";
import SpotCheckStateTags from "@/views/workModule/equipment/deviceSpotCheck/components/SpotCheckStateTags.vue";
import SpotCheckItem from "@/views/workModule/equipment/deviceSpotCheck/components/SpotCheckItem/SpotCheckItem.vue";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import {
  assets_device_spot_check_get,
  assets_device_spot_check_save_result,
  assets_device_spot_check_get_member,
} from "@/api/workApi/equipment/spotCheck"
import { mapState } from "vuex";

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
      msgTableObj: {},
      DetailData: [],
      RemarkData: "",
      fileBillId: "",
      spotCheckVisible: false,
      spotCheckMsgVisible: false,
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
      operationWidth: '150px',
      height: 450,
    });
    this.msgTableObj = new Table({
      tableSchema: msgTableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 200,
    })
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
    // 关联编号跳转
    linkToProject(BillId) {
      this.$router.push({
        name: "As_DeviceSpotCheckPlanDetail",
        query: { BillId },
      });
    },
    spotCheckMsg(row) {
      this.spotCheckMsgVisible = true
      assets_device_spot_check_get_member({Id: row.Id}).then((res) => {
        this.msgTableObj.setData(res.BillItems)
      })
    },
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
