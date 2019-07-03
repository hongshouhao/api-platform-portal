<template>
  <div>
    <div class="searchPanel">
      <Row>
        <Col span="2" class="searchPanel_label">统计范围：</Col>
        <Col span="4">
          <Select v-model="filter.uriPrefix" filterable @on-change="loadChart">
            <Option v-for="item in endpoints" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </Col>
        <Col span="1" class="searchPanel_label">时间：</Col>
        <Col span="4">
          <DatePicker
            type="daterange"
            format="yyyy年MM月dd日"
            :options="datePickerOptions"
            placement="bottom-end"
            placeholder="Select date"
            v-model="filter.dateRange"
            @on-change="loadChart"
            style="width:100%"
          ></DatePicker>
        </Col>
        <Col span="2" class="searchPanel_label">统计周期：</Col>
        <Col span="2">
          <Input v-model="filter.histogramInterval" placeholder="统计周期" @on-enter="loadChart"></Input>
        </Col>
      </Row>
    </div>
    <br>
    <div style="position:relative">
      <div id="barChart" :style="{width: '100%', height: '350px'}"></div>
    </div>
  </div>
</template>

<script>
import Env from "../../lib/env";
const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: Env.elasticserach_host });
var Enumerable = require("linq");
export default {
  data() {
    return {
      endpoints: [],
      filter: {
        uriPrefix: "",
        histogramInterval: "30m",
        dateRange: []
      },
      datePickerOptions: {
        shortcuts: [
          {
            text: "近一周",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "近一月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "近三月",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          },
          {
            text: "近一年",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              return [start, end];
            }
          }
        ]
      }
    };
  },
  mounted() {
    var _this = this;
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
    _this.filter.dateRange = [start, end];

    _this.getUriPatterns().then(function() {
      _this.filter.uriPrefix = _this.endpoints[0];
      _this.loadChart();
    });
  },
  methods: {
    loadChart() {
      var _this = this;
      client
        .search({
          index: "filebeat-iis-apigateway-*",
          body: {
            aggs: {
              datehistogram_terms: {
                date_histogram: {
                  field: "@timestamp",
                  interval: _this.filter.histogramInterval,
                  time_zone: "Asia/Shanghai",
                  min_doc_count: 1
                },
                aggs: {
                  by_ip: {
                    terms: {
                      field: "c-ip.keyword",
                      size: 10,
                      order: {
                        _count: "desc"
                      }
                    },
                    aggs: {
                      by_uri: {
                        terms: {
                          field: "cs-uri-stem.keyword",
                          size: 5,
                          order: {
                            _count: "desc"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            size: 0,
            _source: {
              excludes: []
            },
            stored_fields: ["*"],
            script_fields: {},
            docvalue_fields: [
              {
                field: "@timestamp",
                format: "date_time"
              }
            ],
            query: {
              bool: {
                must: [
                  {
                    range: {
                      "@timestamp": {
                        gte: _this.filter.dateRange[0].getTime(),
                        lte: _this.filter.dateRange[1].getTime(),
                        format: "epoch_millis"
                      }
                    }
                  },
                  {
                    match_phrase_prefix: {
                      "cs-uri-stem": _this.filter.uriPrefix.replace("/", "\\/")
                    }
                  }
                ],
                filter: [],
                should: []
              }
            },
            timeout: "30000ms"
          }
        })
        .then(function(response) {
          var chartoptions = {
            title: {
              text: "IP/API访问频次",
              x: "center"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              type: "scroll",
              orient: "horizontal",
              y: "bottom",
              icon: "circle",
              itemWidth: 10,
              itemHeight: 10,
              itemGap: 20
            },
            xAxis: _this.readXAxis(response),
            yAxis: [
              {
                type: "value"
              }
            ],
            series: _this.readYAxis(response),
            color: [
              "#EAC14D",
              "#4CBDFF",
              "#FF944C",
              "#2E2BF7",
              "#60E1B8",
              "#E5383E",
              "#7351E4",
              "#59E441",
              "#1EB5A4",
              "#c23531",
              "#2f4554",
              "#61a0a8"
            ]
          };
          let myChart = _this.$echarts.init(
            document.getElementById("barChart"),
            "light"
          );
          myChart.setOption(chartoptions);
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        });
    },
    readXAxis(res) {
      var xdates = new Array();
      var topbuckets = res.body.aggregations.datehistogram_terms.buckets;
      for (var i = 0; i < topbuckets.length; i++) {
        var date = new Date(topbuckets[i].key_as_string);
        var xdate =
          date.getFullYear() +
          "-" +
          date.getMonth() +
          "-" +
          date.getDate() +
          " " +
          this.PrefixInteger(date.getHours(), 2) +
          ":" +
          this.PrefixInteger(date.getMinutes(), 2) +
          ":" +
          this.PrefixInteger(date.getSeconds(), 2);
        xdates.push(xdate);
      }
      return [
        {
          type: "category",
          data: xdates
        }
      ];
    },
    PrefixInteger(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
    readYAxis(res) {
      var topbuckets = res.body.aggregations.datehistogram_terms.buckets;
      var ipbuckets = Enumerable.from(topbuckets).selectMany(
        s => s.by_ip.buckets
      );
      var uribuckets = Enumerable.from(ipbuckets).selectMany(
        s => s.by_uri.buckets
      );

      var iplist = ipbuckets
        .select(s => s.key)
        .distinct()
        .toArray();
      var urilist = uribuckets
        .select(s => s.key)
        .distinct()
        .toArray();

      var barItems = new Array();
      for (var j = 0; j < iplist.length; j++) {
        var ip = iplist[j];
        var barItem = {};
        barItem.name = ip;
        barItem.type = "bar";
        barItem.data = new Array();

        for (var i = 0; i < topbuckets.length; i++) {
          var ipItem = Enumerable.from(
            topbuckets[i].by_ip.buckets
          ).firstOrDefault(s => s.key === ip);
          var count = 0;
          if (ipItem) {
            count = ipItem.doc_count;
          }
          barItem.data.push(count);
        }

        barItems.push(barItem);
      }

      for (var j = 0; j < urilist.length; j++) {
        var uri = urilist[j];
        for (var i = 0; i < iplist.length; i++) {
          var ip = iplist[i];
          var stackItem = {};
          stackItem.name = uri;
          stackItem.type = "bar";
          stackItem.stack = ip;
          stackItem.data = new Array();
          for (var i = 0; i < topbuckets.length; i++) {
            var ipItem = Enumerable.from(
              topbuckets[i].by_ip.buckets
            ).firstOrDefault(s => s.key === ip);
            var count = 0;
            if (ipItem) {
              var uriItem = Enumerable.from(
                ipItem.by_uri.buckets
              ).firstOrDefault(s => s.key === uri);
              if (uriItem) {
                count = uriItem.doc_count;
              }
            }
            stackItem.data.push(count);
          }
          barItems.push(stackItem);
        }
      }
      return barItems;
    },
    getUriPatterns() {
      var _this = this;
      return client
        .search({
          index: "filebeat-iis-apigateway-*",
          body: {
            query: {
              bool: {
                must: [
                  {
                    range: {
                      "@timestamp": {
                        gte: _this.filter.dateRange[0].getTime(),
                        lte: _this.filter.dateRange[1].getTime(),
                        format: "epoch_millis"
                      }
                    }
                  },
                  {
                    match_phrase: {
                      "cs.keyword": {
                        query: "-"
                      }
                    }
                  }
                ],
                filter: [],
                should: []
              }
            },
            aggs: {
              uri_aggs: {
                terms: {
                  field: "cs-uri-stem.keyword"
                }
              }
            }
          }
        })
        .then(function(response) {
          var fulluris = Enumerable.from(
            response.body.aggregations.uri_aggs.buckets
          )
            .select(s => s.key)
            .distinct()
            .toArray();
          _this.endpoints = Enumerable.from(fulluris)
            .selectMany(s => {
              var uris = new Array();
              var curind = s.indexOf("/");
              if (curind == 0) {
                curind = s.indexOf("/", 1);
              }
              while (curind >= 1) {
                var sub = s.substring(0, curind);
                uris.push(sub);
                curind = s.indexOf("/", curind + 1);
              }
              uris.push(s.trimRight("/"));
              return uris;
            })
            .distinct()
            .toArray();
        });
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.searchPanel_label {
  line-height: 30px;
  text-align: right;
}
</style>
