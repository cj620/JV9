<template>
  <PageWrapper title="上海皆唯科技有限公司">
    <div slot="footer" class="footer-text">
      <el-descriptions>
        <el-descriptions-item label="分类">普通</el-descriptions-item>
        <el-descriptions-item label="国家（地区）">中国</el-descriptions-item>
        <el-descriptions-item label="币种代码">CNY ￥</el-descriptions-item>
        <el-descriptions-item label="销售税率">11 </el-descriptions-item>
        <el-descriptions-item label="行业">自动化</el-descriptions-item>
        <el-descriptions-item label="销售负责人">王敬之</el-descriptions-item>
      </el-descriptions>
    </div>
    <JvBlock title="联系信息" :contentStyle="{ padding: '24px 16px' }">
      <el-descriptions>
        <el-descriptions-item label="联系人姓名">王敬之</el-descriptions-item>
        <el-descriptions-item label="手机">1325874568</el-descriptions-item>
        <el-descriptions-item label="所在地区">中国</el-descriptions-item>
        <el-descriptions-item label="详细地址"
          >都市路1699号</el-descriptions-item
        >
        <el-descriptions-item label="电话">285743225</el-descriptions-item>
        <el-descriptions-item label="邮编">518114</el-descriptions-item>
        <el-descriptions-item label="Email">545454@qq.com</el-descriptions-item>
        <el-descriptions-item label="传真">258741125</el-descriptions-item>
        <el-descriptions-item label="备注">大哥</el-descriptions-item>
      </el-descriptions>
    </JvBlock>
    <JvBlock title="财务信息" :contentStyle="{ padding: '24px 16px' }">
      <el-descriptions>
        <el-descriptions-item label="开户名称">王敬之</el-descriptions-item>
        <el-descriptions-item label="开户银行">1325874568</el-descriptions-item>
        <el-descriptions-item label="银行账号">中国</el-descriptions-item>
        <el-descriptions-item label="付款条件"
          >都市路1699号</el-descriptions-item
        >
        <el-descriptions-item label="发票抬头">285743225</el-descriptions-item>
        <el-descriptions-item label="纳税人识别号">518114</el-descriptions-item>
        <el-descriptions-item label="开票地址"
          >545454@qq.com</el-descriptions-item
        >
        <el-descriptions-item label="开票电话">258741125</el-descriptions-item>
      </el-descriptions>
    </JvBlock>
    <JvBlock title="收货信息" :contentStyle="{ padding: '24px 16px' }">
      <el-tag effect="plain" type="info" style="margin-bottom:16px"
        >公司地址</el-tag
      >
      <el-descriptions>
        <el-descriptions-item label="所在地区">王敬之</el-descriptions-item>
        <el-descriptions-item label="详细地址">1325874568</el-descriptions-item>
        <el-descriptions-item label="收货人">中国</el-descriptions-item>
        <el-descriptions-item label="手机">都市路1699号</el-descriptions-item>
        <el-descriptions-item label="电话">285743225</el-descriptions-item>
        <el-descriptions-item label="传真">518114</el-descriptions-item>
      </el-descriptions>
    </JvBlock>
    <JvBlock title="附件信息"></JvBlock>
  </PageWrapper>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer-text {
  margin: 10px 0;
}
</style>
