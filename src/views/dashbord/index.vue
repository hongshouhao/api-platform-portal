<template>
  <div class="panel">
    <Card :bordered="false">
      <CPUView style="width: 95%;height:300px;"></CPUView>
    </Card>
    <br>
    <Card :bordered="false">
      <MEMView style="width: 95%;height:300px;"></MEMView>
    </Card>
  </div>
</template>
<script>
import CPUView from "./cpu";
import MEMView from "./memory";

export default {
  data() {
    return {};
  },
  components: {
    CPUView,
    MEMView
  }
};
</script>
