<script>
import Common from "@/views/workModule/design/designTask/DesignTaskList";

export default {
  // 继承
  extends: Common,
  data(){
    return{
      tableTitle:i18n.t('menu.As_AssyTaskList'),
      ProcessType:'Assy'
    }
  }
}
</script>

<style>

</style>
