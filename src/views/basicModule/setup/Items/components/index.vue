<template>
  <PageWrapper>
    <div slot="content">
      <baseInfo
        v-model="ruleForm"
        ref="baseInfo"
        :basicUnitListData="basicUnitListData"
      >
      </baseInfo>
    </div>
    <div slot="fixedFooter">
      <el-button type="primary" @click="save">{{
        $t("Generality.Ge_Save")
      }}</el-button>
    </div>
  </PageWrapper>
</template>

<script>
import baseInfo from "./components/baseInfo";

import { mapState } from "vuex";
import { getAllUnit } from "@/api/basicApi/systemSettings/unit";
import { saveItem, getByIdItem } from "@/api/basicApi/systemSettings/Item";
import closeTag from "@/utils/closeTag";
export default {
  name: "index",
  components: {
    baseInfo,
  },
  data() {
    return {
      ruleForm: {
        ItemId: "",
        ItemName: "",
        Description: "",
        Unit: "",
        ItemType: "",
        State: "Enable",
        PhotoUrl: "",
        SafetyStock: 1,
        MaxStock: 999,
        DataState: "Add",
        ItemCategory: "Standard",
        Project: "",
      },
      basicUnitListData: [],
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  async created() {
    await this.ConfigurationData();

    if (this.$route.query.ItemId) {
      this.GetDetailsData(this.$route.query.type);
    }
  },
  methods: {
    //加载配置数据
    async ConfigurationData() {
      await getAllUnit({ Keyword: "" }).then((res) => {
        this.basicUnitListData = res.Items;
      });
    },
    //编辑和复制数据
    async GetDetailsData(type) {
      await getByIdItem(this.$route.query.ItemId).then((res) => {
        this.ruleForm.DataState = "Add";

        this.ruleForm = res;
        //说明是复制一张单出来的
        if (type === "copy") {
          this.ruleForm.ItemId = "";
          this.ruleForm.DataState = "Add";
        } else if (type === "edit") {
          this.ruleForm.DataState = "Modify";
          this.ruleForm.type = "edit";
        }
      });
    },

    //保存物料信息
    save() {
      this.$refs.baseInfo.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.IsSave(this.ruleForm);
        } else {
          return false;
        }
      });
    },
    IsSave(data) {
      saveItem(data).then((res) => {
        let TagName = {
          path: "/setup/Se_Item_Detail",
          name: `Se_Item_Detail`,
          meta: { cache: true, title: "物料详情" },
          query: { ItemId: res },
          fullPath: "/setup/Se_Item_Detail",
        };
        closeTag(this.current, TagName);
      });
    },
  },
  watch: {
    $route(to, from) {
      // 页面缓存的时候不刷新数据，监听路由刷新数据
      // 判断路由监听的页面是不是本页面
      if (to.name !== this.$parent.$options.name) return;
      // 判断传过来的数据不为空并且传过来的数据是一条新的数据
      if (this.$route.query.ItemId !== undefined) {
        this.GetDetailsData(this.$route.query.type);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
