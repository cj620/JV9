<template>
  <page-wrapper :footer="false">
    <DevicesGantt v-if="DevicesOrPart">
      <template>
        <el-select
          v-model="DevicesOrPart"
          size="mini"
          style="width: 80px"
        >
          <el-option
            v-for="item in DevicesOrPartOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
    </DevicesGantt>
    <PartGantt v-else>
      <template>
        <el-select
          v-model="DevicesOrPart"
          size="mini"
          style="width: 80px"
        >
          <el-option
            v-for="item in DevicesOrPartOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>
    </PartGantt>
  </page-wrapper>
</template>

<script>
import PageWrapper from "~/cpn/PageWrapper/index.vue";
import PartGantt from '../components/PartGantt/index.vue';
import DevicesGantt from '../components/DeviceGantt/index.vue';

export default {
  name: "index1",
  data() {
    return {
      DevicesOrPart: 1,
      DevicesOrPartOptions: [
        {
          value: 0,
          label: i18n.t("DataV.Da_PartNo"),
        },
        {
          value: 1,
          label: i18n.t("DataV.Da_Equipment"),
        },
      ]
    }
  },
  methods: {

  },
  components: { PageWrapper, PartGantt, DevicesGantt },
};
</script>

<style scoped lang="scss"></style>
