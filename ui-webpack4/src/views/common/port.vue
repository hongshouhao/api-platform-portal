<template>
  <Card dis-hover>
    <p slot="title"
       class="highlight">
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
    <div v-for="(item,index) in data"
         :key="index"
         style="margin-bottom:5px;">
      <Row>
        <Col>
        <Row>
          <Col span="11"
               class="host">
          <Input v-model="item.Host">
          <span slot="prepend">Host</span>
          </Input>
          </Col>
          <Col span="11"
               class="port">
          <Input v-model="item.Port"
                 Number>
          <span slot="prepend">Port</span>
          <Button slot="append"
                  icon="md-close"
                  size="small"
                  @click="onDelete(index)"></Button>
          </Input>
          </Col>
        </Row>
        </Col>
      </Row>
    </div>
  </Card>
</template>

<script>
export default {
  data () {
    return {
      data: []
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
    array: {
      type: Array,
      default () {
        return [{
          Host: '',
          Port: 80
        }]
      }
    }
  },
  watch: {
    array () {
      this.data = this.array
    }
  },
  methods: {
    add () {
      this.data.push({
        host: '',
        port: 0
      })
    },
    onDelete (index) {
      this.data.splice(index, 1)
    }
  }
}
</script>

<style>
.host input {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  border-right: 0px !important;
}
.port .ivu-input-group-prepend {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>
