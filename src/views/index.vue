<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%'}">
        <Menu mode="horizontal" theme="dark" :active-name="activeName" @on-select="handleSelect">
          <div class="layout-nav">
            <MenuItem name="login">
              <Icon type="md-code"></Icon>Login
            </MenuItem>
            <MenuItem name="ocelot">
              <Icon type="md-code"></Icon>网关配置
            </MenuItem>
            <MenuItem name="template">
              <Icon type="ios-clipboard"></Icon>模板配置
            </MenuItem>
            <MenuItem name="test">
              <Icon type="ios-flower"></Icon>接口测试
            </MenuItem>
            <MenuItem name="statistic">
              <Icon type="ios-podium"></Icon>接口统计
            </MenuItem>
            <MenuItem name="authority">
              <Icon type="ios-people"></Icon>权限
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Content :style="{margin: '88px 20px 0', minHeight: '500px',background:'#fff'}">
        <router-view></router-view>
      </Content>
      <Footer class="layout-footer-center">2019 &copy;</Footer>
    </Layout>
  </div>
</template>

<script>
import { Identity } from "../lib/identity";

export default {
  data() {
    return {
      activeName: "ocelot"
    };
  },
  mounted() {
    Identity.ensureLogedin();
    var ajaxInterceptor = require("ajax-interceptor");
    ajaxInterceptor.addRequestCallback(function(xhr) {});
    ajaxInterceptor.wire();
    this.activeName = this.$route.name;
  },
  methods: {
    handleSelect(name) {
      this.$router.push({ name: name });
      this.activeName = name;
    }
  }
};
</script>

<style scoped lang="less">
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.ivu-layout-header {
  background: #fff;
  padding: 0;
}
.ivu-menu-horizontal.ivu-menu-light:after {
  display: none;
}
.layout-nav {
  width: 670px;
  margin: 0 auto;
}
.layout-footer-center {
  text-align: center;
}
</style> 