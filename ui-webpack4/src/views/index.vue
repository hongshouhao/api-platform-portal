<template>
  <Layout class="main">
    <Sider hide-trigger
           theme="light"
           collapsible
           :width="230"
           :collapsed-width="78"
           v-model="isCollapsed">
      <div class="logo-con">
        <p class="title">API Platform</p>
      </div>
      <Menu :active-name="activeName"
            :class="menuitemClasses"
            theme="dark"
            width="auto"
            @on-select="handleSelect">
        <MenuItem name="monitor">
        <Icon type="md-desktop" />
        <span>服务器监控</span>
        </MenuItem>
        <Submenu name="apigateway"
                 v-if="config.ocelot.enable">
          <template slot="title">
            <Icon type="md-cube" />
            <span>网关</span>
          </template>
          <MenuItem name="ocelotconfig">
          <Icon type="md-cog" />
          <span>路由配置</span>
          </MenuItem>
          <MenuItem name="ocelotadmin">
          <Icon type="md-code-working" />
          <span>路由发布</span>
          </MenuItem>
          <MenuItem name="template">
          <Icon type="md-clipboard" />
          <span>路由模板</span>
          </MenuItem>
          <MenuItem name="test">
          <Icon type="md-clipboard" />
          <span>测试</span>
          </MenuItem>
          <MenuItem name="authoptions">
          <Icon type="md-lock" />
          <span>认证方案</span>
          </MenuItem>
        </Submenu>

        <MenuItem name="consuladmin">
        <Icon type="md-swap" />
        <span>服务注册</span>
        </MenuItem>

        <MenuItem name="statistic">
        <Icon type="md-stats" />
        <span>访问统计</span>
        </MenuItem>

        <MenuItem name="alerts"
                  v-if="config.karma.enable">
        <Icon type="md-eye" />
        <span>报警</span>
        </MenuItem>

        <MenuItem name
                  :to="identityAdmin"
                  target="_blank">
        <Icon type="md-people" />
        <span>认证授权</span>
        </MenuItem>

        <MenuItem name
                  :to="apm"
                  target="_blank">
        <Icon type="md-navigate" />
        <span>APM</span>
        </MenuItem>

        <MenuItem name
                  :to="uiconsul"
                  target="_blank"
                  v-if="config.consul.enable">
        <Icon type="md-contrast" />
        <span>Consul</span>
        </MenuItem>

        <MenuItem name
                  :to="kibana"
                  target="_blank"
                  v-if="config.kibana.enable">
        <Icon type="md-recording" />
        <span>Kibana</span>
        </MenuItem>
      </Menu>
    </Sider>
    <Layout class="layout">
      <Header class="header-con">
        <Icon @click.native="collapsedSider"
              :class="rotateIcon"
              :style="{margin: '0 20px'}"
              type="md-menu"
              size="24"></Icon>
        <user></user>
      </Header>
      <Content class="content-con">
        <router-view />
      </Content>
    </Layout>
    </Content>
  </Layout>
  </Layout>
</template>

<script>
import './index.less'
// eslint-disable-next-line no-unused-vars
import _config from '../config'
import user from './user'
import maxLogo from '../assets/logo.jpg'

export default {
  data () {
    return {
      config: _config,
      activeName: 'monitor',
      kibana: _config.kibana.baseURL,
      uiconsul: _config.consul.baseURL,
      apm: _config.apm.baseURL,
      identityAdmin: _config.ids.adminApiBaseURL,
      isCollapsed: false,
      maxLogo
    }
  },
  mounted () {
    this.activeName = this.$route.name
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    handleSelect (name) {
      if (name) {
        this.$router.push({ name: name })
        this.activeName = name
      }
    },
    collapsedSider () {
      this.isCollapsed = !this.isCollapsed
    }
  },
  components: {
    user
  }
}
</script>
