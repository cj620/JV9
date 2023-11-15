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
      <Action slot="sticky-extra" size="small" :actions="btnAction"></Action>
      <!--单据信息-->
      <JvBlock
        :title="cur_billId"
        ref="first"
        :contentStyle="{
          paddingLeft: '150px',
          height: '180px',
        }" style="position: relative">
          <div slot="extra">
            <el-button
              size="mini"
              type="primary"
              @click="edit(detailObj.detailData)"
            >
              {{ $t("Generality.Ge_Edit") }}
            </el-button>
          </div>
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
  </PageWrapper>
</template>

<script>
import JvState from "@/components/JVInternal/JvState/index.vue";
import Detail from "@/jv_doc/class/detail/Detail";
import { stateEnum } from "@/enum/workModule";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { detailPageModel } from "@/jv_doc/utils/system";
import { detailConfig } from "./config"
import { assets_device_spot_check_get } from "@/api/workApi/equipment/spotCheck"
import { mapState } from "vuex";
import {API as Account} from "@/api/workApi/purchase/account";
export default {
  name: "As_DeviceSpotCheckDetail",
  components: {
      JvState,
  },
  data() {
    return {
      cur_billId: "",
      detailObj: {},
      btnAction: [],
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        // {
        //   label: this.$t("Generality.Ge_ItemsInfo"),
        //   name: "second",
        // },
        // {
        //   label: this.$t("Generality.Ge_Remarks"),
        //   name: "third",
        // },
        // {
        //   label: this.$t("Generality.Ge_Annex"),
        //   name: "fourth",
        // },
        // {
        //   label: this.$t("Generality.Ge_ApproveProcess"),
        //   name: "fifth",
        // },
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
          this.cur_billId = res.BillId;
          this.btnAction = detailPageModel(this, res, Account, this.GetData);
      })
    },
    imgUrlPlugin,
    edit(){

    }
  }
}
</script>
