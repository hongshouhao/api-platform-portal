<template>
  <div class="panel">
    <Row>
      <Col span="12">
        <CPUView style="width: 700px;height:300px;"></CPUView>
      </Col>
      <Col span="12">
        <MEMView style="width: 700px;height:300px;"></MEMView>
      </Col>
    </Row>
  </div>
</template>
<script>
import CPUView from "./cpu";
import MEMView from "./memory";

export default {
  data() {
    return {};
  },
  mounted() {},
  components: {
    CPUView,
    MEMView
  }
};
</script>
