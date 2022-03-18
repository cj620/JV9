<!--
 * @Author: H.
 * @Date: 2021-11-04 10:35:27
 * @LastEditTime: 2022-01-14 09:23:46
 * @Description:
-->
<template>
  <PageWrapper>
    <JvBlock :title="$t('Generality.Ge_UserDetails')">
      <div class="user-info">
        <div class="user-info-img">
          <img
            :src="imgUrlPlugin(UserInfo.PhotoUrl)"
            :onerror="errorDefaultImg"
            class="materialImage"
            alt=""
          />
        </div>
        <div class="user-info-details">
          <JvDetail :detailObj="detailObj">
            <template #Sex="{ record }">
              <el-tag>
                {{ sex[record] }}
              </el-tag>
            </template>
            <template #Activate="{ record }">
              <el-tag>
                {{ record ? $t("setup.Active") : $t("setup.Deactive") }}
              </el-tag>
            </template>
          </JvDetail>
        </div>
        <div>
          <Action
            slot="extra"
            size="mini"
            :primary="[
              {
                label: $t('Generality.Ge_Edit'),
                icon: 'el-icon-delete',
                confirm: edit.bind(null, UserId),
              },
            ]"
          ></Action>
        </div>
      </div>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import { getUser } from "@/api/basicApi/systemSettings/user";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { detailConfig } from "./config";
import Detail from "@/jv_doc/class/detail/Detail";
import {
  getAllUserConfig,
  updateConfig,
} from "@/api/basicApi/systemSettings/user";
export default {
  data() {
    return {
      UserId: this.$route.query.UserId,
      UserInfo: {},
      detailObj: {},
      errorDefaultImg:
        'this.src="' + require("@/assets/errorImg/error.png") + '"',
      defaultImgUrl: window.global_config.ImgBase_Url,
      sex: {
        Male: this.$t("setup.Male"),
        Female: this.$t("setup.Female"),
      },
    };
  },
  methods: {
    imgUrlPlugin,
    async getUser() {
      await getUser({ UserId: this.UserId }).then((res) => {
        this.UserInfo = res;
        this.detailObj.setData(res);
      });
    },
    edit(id) {
      this.$router.push({
        name: "Se_UserInfo_Edit",
        query: { UserId: id, type: "edit", title: "editUsers" },
      });
    },
  },
  created() {
    if (this.UserId) {
      this.getUser();
    }
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      direction: "left",
    });
  },
  mounted() {},
  computed: {},
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  &-img {
    width: 126px;
    height: 126px;
    margin-top: 20px;
    margin-left: 60px;
    img {
      width: 126px;
      height: 126px;
      border-radius: 5px;
    }
  }
  &-details {
    padding-top: 20px;
    padding-left: 60px;
    padding-right: 60px;
    flex: 1;
  }
}
</style>
