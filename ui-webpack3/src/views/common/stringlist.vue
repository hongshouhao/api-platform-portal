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
    <Row>
      <div v-for="(item,index) in data" :key="index">
        <Col span="12" style="margin-bottom:5px;">
          <Input v-model="array[index]">
            <Button slot="append" icon="md-close" size="small" @click="onDelete(index)"></Button>
          </Input>
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
    tooltip: {
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
