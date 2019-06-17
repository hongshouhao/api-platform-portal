<template>
  <div class="panel">
    <Row :gutter="16">
      <Col span="12">
        <Card :bordered="false">
          <CPUView style="height:300px;"></CPUView>
        </Card>
      </Col>
      <Col span="12">
        <Card :bordered="false">
          <MEMView style="height:300px;"></MEMView>
        </Card>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
        <Card :bordered="false">
          <statistic-view style="height:400px;"></statistic-view>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import CPUView from "./cpu";
import MEMView from "./memory";
import StatisticView from "./statistic";

export default {
  data() {
    return {};
  },
  components: {
    CPUView,
    MEMView,
    StatisticView
  }
};
</script>
