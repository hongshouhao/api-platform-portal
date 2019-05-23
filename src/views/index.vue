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
        <p class="title">Ocelot</p>
      </div>
      <Menu
        v-show="!collapsed"
        :active-name="activeName"
        theme="dark"
        width="auto"
        @on-select="handleSelect"
      >
        <MenuItem name="monitor">
          <Icon type="md-desktop"></Icon>服务器
        </MenuItem>
        <MenuItem name="statistic">
          <Icon type="md-stats"></Icon>接口统计
        </MenuItem>
        <MenuItem name="ocelotconfig">
          <Icon type="md-cog"></Icon>网关配置
        </MenuItem>
        <MenuItem name="ocelotadmin">
          <Icon type="md-code-working"></Icon>网关配置发布
        </MenuItem>
        <MenuItem name="template">
          <Icon type="ios-clipboard"></Icon>模板配置
        </MenuItem>
        <MenuItem name="consuladmin">
          <Icon type="ios-create-outline"></Icon>服务注册
        </MenuItem>
        <MenuItem name="alerts">
          <Icon type="md-eye"></Icon>监控
        </MenuItem>
        <MenuItem :to="identityAdmin" target="_blank">
          <Icon type="ios-people"></Icon>认证授权
        </MenuItem>
        <MenuItem :to="skywalking" target="_blank">
          <Icon type="md-navigate"></Icon>APM
        </MenuItem>
        <MenuItem :to="uiconsul" target="_blank">
          <Icon type="md-contrast"></Icon>Consul
        </MenuItem>
        <MenuItem :to="kibana" target="_blank">
          <Icon type="md-recording"></Icon>Kibana
        </MenuItem>
      </Menu>
    </Sider>
    <Layout>
      <!-- <Header class="header-con">
        <div>{{user}}</div>
      </Header>-->
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
import { Env } from "../lib/env";
import { Identity } from "../lib/identity";
import maxLogo from "../assets/logo.jpg";

export default {
  data() {
    return {
      user: "",
      activeName: "ocelotconfig",
      kibana: Env.kibana_home,
      uiconsul: Env.consul_host,
      skywalking: Env.skywalking_home,
      identityAdmin: Env.identityServerAdmin_host,
      collapsed: false,
      maxLogo
    };
  },
  created() {
    Identity.ensureLogedin();
    this.user = Identity.getUser().name;
  },
  mounted() {
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
.title {
  color: #fff;
  font-size: 24px;
  line-height: 50px;
}
</style> 