<template>
  <Card dis-hover>
    <p slot="title">
      {{title}}
      <Tooltip placement="right" content theme="light" :delay="500">
        <p slot="content">{{tooltip}}</p>
        <Icon type="ios-information-circle"/>
      </Tooltip>
    </p>

    <a href="#" slot="extra" @click.prevent="add">
      <Icon type="md-add" size="18" style="margin-right:5px;"></Icon>
    </a>
    <div v-for="(item,index) in arr" :key="title+index" style="margin-bottom:5px;">
      <Row>
        <Col span="24">
          <Input v-model="item.value">
            <Select
              slot="prepend"
              v-model="item.key"
              not-found-text="请选择一个授权方案"
              @on-change="sltedClaimChanged"
              style="width: 150px"
            >
              <Option
                v-for="(claim, cidx) in wellKnown.claims_supported"
                :value="claim"
                :key="cidx"
              >{{claim}}</Option>
            </Select>
            <Button slot="append" icon="md-close" @click="onDelete(index)"></Button>
          </Input>
        </Col>
      </Row>
    </div>
  </Card>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
      wellKnown: {}
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    tooltip: {
      type: String,
      default: ""
    },
    idsHost: {
      type: String,
      default: ""
    },
    property: {},
    propertyName: ""
  },
  mounted() {
    this.arr = this.objToArray(this.property, this.propertyName);
  },
  watch: {
    arr: {
      handler(val, oldVal) {
        var obj = {};
        val.forEach(ele => {
          obj[ele.key] = ele.value;
        });
        this.$emit("onPropertyChanged", obj, this.propertyName);
      },
      deep: true
    },
    idsHost() {
      this.loadWellKnown();
    }
  },
  methods: {
    add() {
      this.arr.push({
        key: "",
        value: ""
      });
    },
    onDelete(index) {
      this.arr.splice(index, 1);
    },
    objToArray(property, name) {
      var result = new Array();
      if (property) {
        for (let prop in property) {
          result[name].push({
            id: prop,
            key: prop,
            value: property[prop]
          });
        }
      }
      return result;
    },
    loadWellKnown() {
      debugger;
      var _this = this;
      if (_this.idsHost) {
        _this.$axios
          .get(_this.idsHost.CombineWellKnownUri())
          .then(function(response) {
            _this.wellKnown = response.data;
          })
          .catch(function(error) {
            _this.$Notice.error({
              title: "服务连接失败!",
              desc: error
            });
          });
      }
    },
    sltedClaimChanged() {}
  },
  components: {}
};
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
