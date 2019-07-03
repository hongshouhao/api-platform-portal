<template>
  <div>
    <Form :model="voptions" :label-width="150">
      <Row>
        <Col span="24">
          <FormItem label="AuthScheme">
            <Input v-model="voptions.AuthScheme"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="Authority">
            <Input v-model="voptions.Authority">
              <Button slot="append" icon="md-send" @click="displayWellKnown"></Button>
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="ApiName">
            <Input v-model="voptions.ApiName"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="ApiSecret">
            <Input v-model="voptions.ApiSecret"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="RoleClaimType">
            <Input v-model="voptions.RoleClaimType"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="NameClaimType">
            <Input v-model="voptions.NameClaimType"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="SupportedTokens">
            <Select v-model="voptions.SupportedTokens">
              <Option value="Both">Both</Option>
              <Option value="Jwt">Jwt</Option>
              <Option value="Reference">Reference</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Card class="mar10" dis-hover>
        <p slot="title">
          AuthenticationOptions
          <Tooltip placement="right" content="授权" theme="light" :delay="500">
            <Icon type="ios-information-circle"/>
          </Tooltip>
        </p>
        <Row>
          <Col span="12">
            <FormItem label="NameOrSchema">
              <Input v-model="voptions.TokenRetrievalOptions.NameOrSchema"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="Source">
              <Select v-model="voptions.TokenRetrievalOptions.Source">
                <Option value="FromAuthorizationHeader">FromAuthorizationHeader</Option>
                <Option value="FromQueryString">FromQueryString</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Card>
      <Card class="mar10" dis-hover>
        <Row>
          <Col span="12">
            <FormItem label="EnableCaching">
              <i-switch v-model="voptions.EnableCaching"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="CacheDuration">
              <Input v-model="voptions.CacheDuration"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="RequireHttpsMetadata">
              <i-switch v-model="voptions.RequireHttpsMetadata"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="ClaimsIssuer">
              <Input v-model="voptions.ClaimsIssuer"></Input>
            </FormItem>
          </Col>
        </Row>
      </Card>
      <Card class="mar10" dis-hover>
        <Row>
          <Col span="24">
            <FormItem label="ForwardDefault">
              <Input v-model="voptions.ForwardDefault"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="ForwardAuthenticate">
              <Input v-model="voptions.ForwardAuthenticate"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="ForwardChallenge">
              <Input v-model="voptions.ForwardChallenge"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="ForwardForbid">
              <Input v-model="voptions.ForwardForbid"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="ForwardSignIn">
              <Input v-model="voptions.ForwardSignIn"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="ForwardSignOut">
              <Input v-model="voptions.ForwardSignOut"></Input>
            </FormItem>
          </Col>
        </Row>
      </Card>
    </Form>
    <Form :model="vmodel" :label-width="100">
      <Row>
        <Col span="24">
          <FormItem label="description">
            <Input v-model="vmodel.description"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="createTime">
            <Input v-model="vmodel.createTime" readonly></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="modifiedTime">
            <Input v-model="vmodel.modifiedTime" readonly></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Modal v-model="showWellKnownDialog" footer-hide width="800">
      <highlight-code lang="JSON">{{wellKnownResponse}}</highlight-code>
    </Modal>
  </div>
</template>

<script>
import modelTempl from "../modelTempl.js";
export default {
  data() {
    return {
      vmodel: {},
      voptions: modelTempl.getIdentityAuthOptions(),
      showWellKnownDialog: false,
      wellKnownResponse: {}
    };
  },
  props: {
    authOptions: {}
  },
  watch: {
    authOptions() {
      var _this = this;
      _this.vmodel = _this.authOptions;
      if (_this.vmodel.jsonString) {
        _this.voptions = JSON.parse(_this.vmodel.jsonString);
      }
    },
    voptions: {
      handler(val, oldVal) {
        this.vmodel.jsonString = JSON.stringify(val);
      },
      deep: true
    }
  },
  methods: {
    displayWellKnown() {
      var _this = this;
      _this.$axios
        .get(_this.voptions.Authority.CombineWellKnownUri())
        .then(function(response) {
          _this.wellKnownResponse = response;
          _this.showWellKnownDialog = true;
        })
        .catch(function(error) {
          _this.$Notice.error({
            title: "服务连接失败!",
            desc: error
          });
        });
    }
  }
};
</script>
