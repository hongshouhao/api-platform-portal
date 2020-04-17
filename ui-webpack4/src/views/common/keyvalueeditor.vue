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
    <div v-for="(item, index) in list"
         :key="title + index"
         style="margin-bottom:5px;">
      <Row>
        <Col span="12">
        <Input v-model="item.key"
               class="key">
        <span slot="prepend">Key</span>
        </Input>
        </Col>
        <Col span="12">
        <Input v-model="item.value"
               class="value">
        <span slot="prepend">Value</span>
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
export default {
  data () {
    return {
      init: false,
      list: []
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
    property: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  mounted () {
  },
  watch: {
    property () {
      this.init = true
      this.list = this.objToArray(this.property)
    },
    list: {
      handler () {
        if (this.init === true) {
          this.init = false
          return
        }
        let obj = {}
        this.list.forEach(ele => {
          obj[ele.key] = ele.value
        })
        this.$emit('update:property', obj)
      },
      deep: true
    }
  },
  methods: {
    add () {
      this.list.push({
        key: '',
        value: ''
      })
    },
    onDelete (index) {
      this.list.splice(index, 1)
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
    }
  },
  components: {}
}
</script>

<style>
.key input {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.value .ivu-input-group-prepend {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>
