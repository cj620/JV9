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
      <JvBlock :title="cur_billId" ref="first">
          <!---->
          <div style="position: relative">
              <JvDetail :detailObj="detailObj"> </JvDetail>
              <JvState :state="detailObj.detailData.State"></JvState>
          </div>
      </JvBlock>
  </PageWrapper>
</template>

<script>
import JvState from "@/components/JVInternal/JvState/index.vue";
import Detail from "@/jv_doc/class/detail/Detail";
import { stateEnum } from "@/enum/workModule";
import { detailConfig } from "./config"
import { assets_device_spot_check_get } from "@/api/workApi/equipment/spotCheck"
import {mapState} from "vuex";
export default {
  name: "As_DeviceSpotCheckDetail",
  components: {
      JvState,
  },
  data() {
    return {
      cur_billId: "",
      detailObj: {},
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
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "fourth",
        },
        {
          label: this.$t("Generality.Ge_ApproveProcess"),
          name: "fifth",
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
    await this.GetData();
  },
  methods: {
    async GetData() {
      await assets_device_spot_check_get({
          BillId: this.$route.query.BillId
      }).then((res) => {
          this.detailObj.detailData = res;
      })
    }
  }
}
</script>
