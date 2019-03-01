<template>
  <div>
    <div class="searchPanel">
      <Row>
        <Col span="4" offset="1">Service:
          <Select v-model="service" style="width:200px">
            <Option v-for="item in Services" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="4">Tags:
          <Input v-model="tag" style="width:200px"/>
        </Col>
        <Col span="4">Start:
          <DatePicker v-model="start" type="datetime" style="width:200px"></DatePicker>
        </Col>
        <Col span="4">End:
          <DatePicker v-model="end" type="datetime" style="width:200px"></DatePicker>
        </Col>
        <Col span="4">Limit:
          <Select v-model="limit" style="width:200px">
            <Option v-for="item in limits" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="2">
          <Button icon="md-search" type="primary" @click="onSearch">搜索</Button>
        </Col>
      </Row>
    </div>
    <Divider></Divider>
    <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
    <Divider></Divider>
    <div class="listView">
      <div v-for="item in tableData" :key="item.traceId" class="list">
        <p v-for="service in item.services">{{service.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Services: [],
      limits: [
        {
          value: 10,
          label: "10"
        },
        {
          value: 20,
          label: "20"
        },
        {
          value: 50,
          label: "50"
        }
      ],
      columns: [
        {
          title: "traceId",
          key: "traceId",
          width: 100,
          align: "center"
        },
        {
          title: "duration",
          key: "duration",
          width: 150,
          align: "center"
        },
        {
          title: "finishTimestamp",
          key: "finishTimestamp",
          width: 150,
          align: "center"
        },
        {
          title: "services",
          key: "services",
          width: 150,
          align: "center"
        },
        {
          title: "duration",
          key: "duration",
          width: 150,
          align: "center"
        },
        {
          title: "duration",
          key: "duration",
          width: 150,
          align: "center"
        }
      ],
      columnData: [],
      loading: false,
      service: "",
      tag: "",
      start: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2),
      end: new Date(),
      limit: 10,
      chartData: [],
      tableData: []
    };
  },
  mounted() {
    this.getData();
    this.onSearch();
  },
  methods: {
    getData() {
      var _this = this;
      Identity.getAccessToken().then(function(token) {
        $.ajax({
          url: env.butterfly_host + "/api/service",
          type: "GET",
          success: function(data) {
            data.forEach(function(item) {
              _this.Services.push({
                value: item,
                label: item
              });
            });
            _this.service = _this.Services[1].value;
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus + "," + errorThrown);
          }
        });
      });
    },
    onSearch() {
      var Obj = {
        service: this.service,
        tags: this.tag,
        startTimestamp: new Date(this.start).getTime(),
        finishTimestamp: new Date(this.end).getTime(),
        limit: this.limit
      };
      this.getTableData(Obj);
      this.getChartData(Obj);
    },
    getTableData(Obj) {
      var _this = this;
      Identity.getAccessToken().then(function(token) {
        $.ajax({
          url: env.butterfly_host + "/api/trace",
          type: "GET",
          data: Obj,
          success: function(data) {
            _this.tableData = data;
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus + "," + errorThrown);
          }
        });
      });
    },
    getChartData(Obj) {
      var _this = this;
      Identity.getAccessToken().then(function(token) {
        $.ajax({
          url: env.butterfly_host + "/api/trace/histogram",
          type: "GET",
          data: Obj,
          success: function(data) {
            _this.chartData = data;
            let myChart = _this.$echarts.init(
              document.getElementById("myChart")
            );
            var dataList = data.map(function(item) {
              return item.count;
            });
            var dateList = data.map(function(item) {
              return item.time;
            });
            var options = {
              visualMap: {
                show: false,
                type: "continuous",
                seriesIndex: 0,
                min: 0,
                max: 20
              },
              xAxis: {
                data: dateList
              },
              yAxis: {
                splitLine: { show: false }
              },
              tooltip: {
                trigger: "axis"
              },
              series: [
                {
                  data: dataList,
                  type: "line",
                  showSymbol: false
                }
              ]
            };
            myChart.setOption(options);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus + "," + errorThrown);
          }
        });
      });
    }
  }
};
</script>

<style scoped lang="less">
.searchPanel {
  padding: 10px;
}
.listView {
  padding: 10px;
  .list {
    margin: 5px 0;
  }
}
</style>
