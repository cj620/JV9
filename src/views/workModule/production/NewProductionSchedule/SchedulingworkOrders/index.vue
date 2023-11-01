
<template>
  <page-wrapper :footer="false">
    <JvTable :tableObj="tableObj">
      <template #Level="{ row }">
        <div>
          {{ LevelEnum[row.Level].name }}
        </div>
      </template>
    </JvTable>
  </page-wrapper>
</template>

<script>
import {Table} from "./config";
import LevelEnum from '@/enum/workModule/production/LevelEnum'
export default {
  name: "index",
  data() {
    return {
      tableObj: {},
      LevelEnum
    }
  },
  created() {
    this.tableObj = new Table();
    console.log(this.tableObj.getData)
    this.tableObj.getData({selectType: 3, CurrentPage: 1, PageSize: 10})
  }
}
</script>

<style scoped lang="scss">

</style>
