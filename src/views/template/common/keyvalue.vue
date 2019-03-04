<template>
  <Card>
    <p slot="title">{{title}}</p>
    <a href="#" slot="extra" @click.prevent="add">
      <Icon type="ios-add-circle-outline" size="18" style="margin-right:5px;"></Icon>新增
    </a>
    <div v-for="(item,index) in data" :key="title+index" style="margin-bottom:5px;">
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
      data: []
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    kvarray: {
      type: Array,
      default() {
        return [
          {
            id: 0,
            key: "",
            value: ""
          }
        ];
      }
    }
  },
  watch: {
    kvarray() {
      this.data = this.kvarray;
    }
  },
  methods: {
    add() {
      this.data.push({
        key: "",
        value: ""
      });
    },
    onDelete(index) {
      this.data.splice(index, 1);
    }
  },
  components: {}
};
</script>

<style>
</style>
