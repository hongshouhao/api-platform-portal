<template>
  <Card>
    <p slot="title">{{title}}</p>
    <a href="#" slot="extra" @click.prevent="add">
      <Icon type="ios-add-circle-outline" size="18" style="margin-right:5px;"></Icon>新增
    </a>
    <Row>
      <div v-for="(item,index) in data" :key="index">
        <Col span="12" style="margin-bottom:5px;">
          <Row>
            <Col span="14">
              <Input v-model="array[index]"></Input>
            </Col>
            <Col span="8" offset="1">
              <Button type="warning" ghost @click="onDelete(index)">删除</Button>
            </Col>
          </Row>
        </Col>
      </div>
    </Row>
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
      default: []
    }
  },
  watch: {
    array() {
      this.data = this.array;
    }
  },
  methods: {
    add() {
      this.data.push("");
    },
    onDelete(index) {
      this.data.splice(index, 1);
    }
  }
};
</script>

<style>
</style>
