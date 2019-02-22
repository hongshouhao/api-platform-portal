<template>
  <Card>
    <p slot="title">{{title}}</p>
    <a href="#" slot="extra" @click.prevent="add">
      <Icon type="ios-add-circle-outline" size="18" style="margin-right:5px;"></Icon>新增
    </a>
    <div v-for="(item,index) in data" :key="index" style="margin-bottom:5px;">
      <Row>
        <Col span="22">
          <Row>
            <Col span="11">
              <Input v-model="item.Host">
                <span slot="prepend">Host</span>
              </Input>
            </Col>
            <Col span="11" offset="1">
              <Input v-model="item.Port" number>
                <span slot="prepend">Port</span>
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
    array: {
      type: Array,
      default: [
        {
          host: "",
          port: 0
        }
      ]
    }
  },
  watch: {
    array() {
      this.data = this.array;
    }
  },
  methods: {
    add() {
      this.data.push({
        host: "",
        port: 0
      });
    },
    onDelete(index) {
      this.data.splice(index, 1);
    }
  }
};
</script>

<style>
</style>
