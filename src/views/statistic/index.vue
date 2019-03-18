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
    <div id="lineChart" :style="{width: '100%', height: '350px'}"></div>
    <div id="barChart" :style="{width: '100%', height: '350px'}"></div>
    <div class="listView">
      <div
        v-for="item in tableData"
        :key="item.traceId"
        class="list"
        v-on:click="onShow(item.traceId)"
      >
        <Row>
          <Col span="19">
            <Progress :percent="item.per" :hide-info="true"/>
          </Col>
          <Col span="4" offset="1">
            <a>{{item.dura}}</a>
          </Col>
          <Col span="20">
            <tag v-for="service in item.services" :key="service.name">{{service.name}}</tag>
          </Col>
          <Col span="4">
            <p>{{item.time}}</p>
          </Col>
        </Row>
      </div>
    </div>
    <Modal v-model="model" title="查看详情" width="700">
      <detail-view v-if="model" :id="id"></detail-view>
    </Modal>
  </div>
</template>

<script>
import { Env } from "../../lib/env";
import { Identity } from "../../lib/identity";
import DetailView from "./detail";
export default {
  data() {
    return {
      model: false,
      id: "",
      title: "",
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
      start: new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 30),
      end: new Date(),
      limit: 10,
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
          url: Env.butterfly_host + "/api/service",
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
      this.getStatistic(Obj);
    },
    getStatistic(Obj) {
      var _this = this;
      Identity.getAccessToken().then(function(token) {
        $.ajax({
          url: Env.butterfly_host + "/api/statistic/histogram",
          type: "GET",
          data: Obj,
          success: function(data) {
            console.log(data);
            let myChart = _this.$echarts.init(
              document.getElementById("barChart")
            );
            var dataList = data.map(function(item) {
              return item.count;
            });
            var dateList = data.map(function(item) {
              return item.time;
            });
            var options = {
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
                  type: "bar",
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
    },
    onShow(id) {
      this.id = id;
      this.model = true;
    },
    getTableData(Obj) {
      var _this = this;
      Identity.getAccessToken().then(function(token) {
        $.ajax({
          url: Env.butterfly_host + "/api/trace",
          type: "GET",
          data: Obj,
          success: function(data) {
            _this.tableData = data.map(function(item) {
              if (item.duration < 1000) {
                item.dura = item.duration + "μs";
              } else {
                item.dura = (item.duration / 1000).toFixed(2) + "ms";
              }
              item.per = item.duration / 20;
              return item;
            });
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
          url: Env.butterfly_host + "/api/trace/histogram",
          type: "GET",
          data: Obj,
          success: function(data) {
            let myChart = _this.$echarts.init(
              document.getElementById("lineChart")
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
  },
  components: {
    DetailView
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
    margin: 15px 0;
    cursor: pointer;
  }
}
</style>
