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
    <Action slot="sticky-extra" size="small" :actions="[
      {
        label: $t('Generality.Ge_Edit'),
        confirm: edit,
      },
    ]"></Action>
    <!--单据信息-->
    <JvBlock
      :title="cur_billId"
      ref="first"
      :contentStyle="{
        paddingLeft: '150px',
        height: '180px',
      }" style="position: relative">
        <div class="mould-img">
          <el-image :preview-src-list="[imgUrlPlugin(detailObj.detailData.DevicePhotoUrl)]" style="width: 100%; height: 100%"
                    :src="imgUrlPlugin(detailObj.detailData.DevicePhotoUrl)" fit="cover" class="items-details-Img-error">
              <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
              </div>
          </el-image>
        </div>
        <div style="position: relative; margin-left: 100px" >
            <JvDetail :detailObj="detailObj"> </JvDetail>
            <JvState :state="detailObj.detailData.State"></JvState>
        </div>
    </JvBlock>
    <!--物料信息-->
    <JvBlock :title="$t('Generality.Ge_ItemsInfo')" ref="second">
      <JvTable :table-obj="tableObj"> </JvTable>
    </JvBlock>
    <!--备注-->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="third">
      <JvRemark :RemarkData="RemarkData"></JvRemark>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import { tableConfig, detailConfig } from "./config"
import Detail from "@/jv_doc/class/detail/Detail";
import { Table } from "@/jv_doc/class/table";
import { stateEnum } from "@/enum/workModule";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { assets_device_spot_check_get } from "@/api/workApi/equipment/spotCheck"
import JvState from "@/components/JVInternal/JvState/index.vue";
import JvRemark from "@/components/JVInternal/JvRemark/index.vue";
import { mapState } from "vuex";

export default {
  name: "As_DeviceSpotCheckDetail",
  components: {
    JvRemark,
    JvState,
  },
  data() {
    return {
      cur_billId: "",
      detailObj: {},
      tableObj: {},
      RemarkData: "",
      fileBillId: "",
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("Generality.Ge_ItemsInfo"),
          name: "second",
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
          name: "third",
        },
      ],
    }
  },
  computed: {
    ...mapState({
        current: (state) => state.page.current,
    }),
    stateMap() {
        return stateEnum[this.detailObj.detailData.State];
    },
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
      operationCol: false,
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
        this.tableObj.setData(res.BillItems);
      })
    },
    imgUrlPlugin,
    edit(){

    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  }
}
</script>
<style lang="scss" scoped>
.mould-img {
  width: 120px;
  height: 120px;
  // background-color: pink;
  position: absolute;
  left: 10px;
  right: 100px;
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
