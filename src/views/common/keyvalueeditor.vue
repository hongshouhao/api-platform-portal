<template>
  <Card dis-hover>
    <p slot="title">
      {{title}}
      <Tooltip placement="bottom" content theme="light" :delay="500">
        <p slot="content">{{tooltip}}</p>
        <Icon type="ios-information-circle"/>
      </Tooltip>
    </p>

    <a href="#" slot="extra" @click.prevent="add">
      <Icon type="ios-add-circle-outline" size="18" style="margin-right:5px;"></Icon>新增
    </a>
    <div v-for="(item,index) in arr" :key="title+index" style="margin-bottom:5px;">
      <Row>
        <Col span="22">
          <Row>
            <Col span="11">
              <Input v-model="item.key">
                <span slot="prepend">key</span>
              </Input>
            </Col>
            <Col span="11" offset="1">
              <Input v-model="item.value">
                <span slot="prepend">value</span>
              </Input>
            </Col>
          </Row>
        </Col>
        <Col span="2">
          <Button type="warning" ghost @click="onDelete(index)">删除</Button>
        </Col>
      </Row>
    </div>
  </Card>
</template>

<script>
export default {
  data() {
    return {
      arr: []
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
    }
  },
  components: {}
};
</script>

<style>
</style>
