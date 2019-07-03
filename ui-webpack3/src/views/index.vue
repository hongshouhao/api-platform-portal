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
        <p class="title">API Platform</p>
      </div>
      <Menu
        v-show="!collapsed"
        :active-name="activeName"
        theme="dark"
        width="auto"
        @on-select="handleSelect"
      >
        <MenuItem name="monitor">
          <Icon type="md-desktop"/>服务器监控
        </MenuItem>
        <Submenu name="apigateway">
          <template slot="title">
            <Icon type="md-cube"/>网关
          </template>
          <MenuItem name="ocelotconfig">
            <Icon type="md-cog"/>跳转配置
          </MenuItem>
          <MenuItem name="ocelotadmin">
            <Icon type="md-code-working"/>配置发布
          </MenuItem>
          <MenuItem name="template">
            <Icon type="md-clipboard"/>模板配置
          </MenuItem>
        </Submenu>
        <MenuItem name="authoptions">
          <Icon type="md-lock"/>认证方案
        </MenuItem>
        <MenuItem name="consuladmin">
          <Icon type="md-swap"/>服务注册
        </MenuItem>
        <MenuItem name="statistic">
          <Icon type="md-stats"/>访问统计
        </MenuItem>
        <MenuItem name="alerts">
          <Icon type="md-eye"/>报警
        </MenuItem>
        <MenuItem name :to="identityAdmin" target="_blank">
          <Icon type="md-people"/>认证授权
        </MenuItem>
        <MenuItem name :to="skywalking" target="_blank">
          <Icon type="md-navigate"/>APM
        </MenuItem>
        <MenuItem name :to="uiconsul" target="_blank">
          <Icon type="md-contrast"/>Consul
        </MenuItem>
        <MenuItem name :to="kibana" target="_blank">
          <Icon type="md-recording"/>Kibana
        </MenuItem>
      </Menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <div>{{user}}</div>
      </Header>
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
import "./utility";
import Env from "../lib/env";
import maxLogo from "../assets/logo.jpg";

export default {
  data() {
    return {
      user: "",
      activeName: "monitor",
      kibana: Env.kibana_home,
      uiconsul: Env.consul_host,
      skywalking: Env.skywalking_home,
      identityAdmin: Env.identityServerAdmin_host,
      collapsed: false,
      maxLogo
    };
  },
  created() {
    this.$webapi.identity.ensureLogedin();
    this.user = this.$webapi.identity.getUser().name;
  },
  mounted() {
    this.activeName = this.$route.name;
  },
  methods: {
    handleSelect(name) {
      if (name) {
        this.$router.push({ name: name });
        this.activeName = name;
      }
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
.title {
  color: #fff;
  font-size: 24px;
  line-height: 50px;
}
</style> 