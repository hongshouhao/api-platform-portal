<template>
  <Card dis-hover>
    <p slot="title">
      {{title}}
      <Tooltip placement="right"
               content
               theme="light"
               :delay="500">
        <p slot="content">{{tooltip}}</p>
        <Icon type="ios-information-circle" />
      </Tooltip>
    </p>

    <a href="#"
       slot="extra"
       @click.prevent="add">
      <Icon type="md-add"
            size="18"
            style="margin-right:5px;"></Icon>
    </a>
    <div v-for="(item,index) in claims"
         :key="index"
         style="margin-bottom:5px;">
      <Row>
        <Col span="24">
        <Input v-model="item.value">
        <Select slot="prepend"
                v-model="item.key"
                not-found-text="请选择一个授权方案"
                style="width: 150px">
          <Option v-for="(claim, cidx) in wellKnown.claims_supported"
                  :value="claim"
                  :key="cidx">{{claim}}</Option>
        </Select>
        <Button slot="append"
                icon="md-close"
                @click="onDelete(index)"></Button>
        </Input>
        </Col>
      </Row>
    </div>
  </Card>
</template>

<script>
import env from '../../../global'
export default {
  data () {
    return {
      wellKnown: {},
      init: false,
      claims: []
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      default: ''
    },
    idsHost: {
      type: String,
      default: ''
    },
    property: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
    this.loadWellKnown()
  },
  watch: {
    idsHost () {
      this.loadWellKnown()
    },
    property () {
      this.init = true
      this.claims = this.objToArray(this.property)
    },
    claims: {
      handler () {
        if (this.init === true) {
          this.init = false
          return
        }
        let obj = {}
        this.claims.forEach(ele => {
          obj[ele.key] = ele.value
        })
        this.$emit('update:property', obj)
      },
      deep: true
    }
  },
  methods: {
    add () {
      this.claims.push({
        key: '',
        value: ''
      })
    },
    onDelete (index) {
      this.claims.splice(index, 1)
    },
    objToArray (property) {
      var result = []
      if (property) {
        for (let prop in property) {
          result.push({
            id: prop,
            key: prop,
            value: property[prop]
          })
        }
      }
      return result
    },
    loadWellKnown () {
      var _this = this
      if (_this.idsHost) {
        _this.$axios
          .get(_this.idsHost + env.identityServerWellKnownUri)
          .then(function (response) {
            _this.wellKnown = response.data
          })
          .catch(function (error) {
            _this.$Notice.error({
              title: '服务连接失败!',
              desc: error
            })
          })
      }
    }
  },
  components: {}
}
</script>

<style>
/* .key input {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  border-right: 0px !important;
} */
/* .value .ivu-input-group-prepend {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
} */
</style>
