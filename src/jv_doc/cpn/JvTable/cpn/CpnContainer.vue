<!--
 * @Author: C.
 * @Date: 2021-08-13 11:26:01
 * @LastEditTime: 2021-09-17 16:17:43
 * @Description: file content
-->
<script>
import { getCpn } from "../../../maps";
export default {
  props: {
    cpn: String,
    params: Object
  },
  render (h, cxt) {
    // console.log(this.cpn, 65565565);
    return h(getCpn(this.cpn), {
      props: {
        ...this.params
      }
    })
  }
}
</script>
