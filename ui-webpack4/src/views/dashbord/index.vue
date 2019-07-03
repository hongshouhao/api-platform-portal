<template>
  <div class="panel">
    <Row :gutter="16">
      <Col span="12">
      <Card :bordered="false">
        <cpuView style="height:300px;"></cpuView>
      </Card>
      </Col>
      <Col span="12">
      <Card :bordered="false">
        <memView style="height:300px;"></memView>
      </Card>
      </Col>
    </Row>
    <br>
    <Row>
      <Col span="24">
      <Card :bordered="false">
        <statisticView style="height:400px;"></statisticView>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import cpuView from './cpu'
import memView from './memory'
import statisticView from './statistic'

export default {
  data () {
    return {}
  },
  components: {
    cpuView,
    memView,
    statisticView
  }
}
</script>
