<template>
  <Layout class="main" style="height: 100%">
    <Sider
      hide-trigger
      collapsible
      :width="256"
      :collapsed-width="64"
      v-model="collapsed"
      :style="{overflow: 'hidden'}"
    >
      <div class="logo-con" style="height:65px">
        <!-- <img v-show="!collapsed" :src="maxLogo" key="max-logo">
        <img v-show="collapsed" :src="minLogo" key="min-logo">-->
      </div>
      <Menu
        v-show="!collapsed"
        :active-name="activeName"
        theme="dark"
        width="auto"
        @on-select="handleSelect"
      >
        <MenuItem name="monitor">
          <Icon type="md-code"></Icon>服务器
        </MenuItem>
        <MenuItem name="ocelotconfig">
          <Icon type="md-code"></Icon>网关配置
        </MenuItem>
        <MenuItem name="ocelotadmin">
          <Icon type="md-code"></Icon>网关配置管理
        </MenuItem>
        <MenuItem name="template">
          <Icon type="ios-clipboard"></Icon>模板配置
        </MenuItem>
        <MenuItem name="consuladmin">
          <Icon type="md-code"></Icon>服务注册
        </MenuItem>
        <MenuItem name="statistic">
          <Icon type="stats-bars"></Icon>接口统计
        </MenuItem>
        <MenuItem to="http://192.168.84.24:8611" target="_blank">
          <Icon type="ios-people"></Icon>认证授权
        </MenuItem>
        <MenuItem to="http://192.168.84.24:8998" target="_blank">
          <Icon type="md-code"></Icon>APM
        </MenuItem>
        <MenuItem name="alerts">
          <Icon type="md-code"></Icon>监控
        </MenuItem>
      </Menu>
    </Sider>
    <Layout>
      <Header class="header-con"></Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <router-view/>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import { Identity } from "../lib/identity";
import minLogo from "../assets/logo-min.jpg";
import maxLogo from "../assets/logo.jpg";

export default {
  data() {
    return {
      activeName: "ocelotconfig",
      collapsed: false,
      minLogo,
      maxLogo
    };
  },
  mounted() {
    // Identity.ensureLogedin();
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
.layout-footer-center {
  text-align: center;
}
</style> 