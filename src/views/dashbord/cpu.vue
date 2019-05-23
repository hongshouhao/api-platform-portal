<template>
  <div>
    <div id="cpuchart" style="width: 100%;height:100%;"></div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>
<script>
import { Env } from "../../lib/env";
export default {
  data() {
    return {
      series: [],
      spinShow: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 500);
  },
  methods: {
    init() {
      var _this = this;
      var chartoptions = {
        title: {
          text: "CPU利用率(%)",
          x: "center"
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          }
        },
        legend: {
          type: "scroll",
          y: "bottom",
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10,
          width: "95%",
          itemGap: 20,
          left: 20,
          right: 20
        },
        series: [],
        color: [
          "#EAC14D",
          "#4CBDFF",
          "#FF944C",
          "#2E2BF7",
          "#60E1B8",
          "#E5383E",
          "#7351E4",
          "#59E441",
          "#1EB5A4"
        ]
      };
      let myChart = _this.$echarts.init(
        document.getElementById("cpuchart"),
        "light"
      );
      myChart.setOption(chartoptions);
      setInterval(function() {
        var date = new Date().getTime() / 1000;
        _this.$axios
          .get(
            Env.prometheus_host +
              '/api/v1/query_range?query=(sum by(instance)(irate(wmi_cpu_time_total{mode!="idle"}[5m]))/sum by(instance)(irate(wmi_cpu_time_total[5m])))*100&start=' +
              (date - 70) +
              "&end=" +
              date +
              "&step=1&_=" +
              date
          )
          .then(function(response) {
            _this.spinShow = false;
            var series = response.data.data.result.map(function(instanceItem) {
              var values = instanceItem.values.map(function(valueItem) {
                return {
                  name: valueItem[0],
                  value: [
                    new Date(valueItem[0] * 1000),
                    valueItem[1].replace(/([0-9]+\.[0-9]{2})[0-9]*/, "$1")
                  ]
                };
              });

              return {
                name: instanceItem.metric.instance,
                data: values,
                type: "line",
                smooth: true,
                showSymbol: false,
                hoverAnimation: false,
                lineStyle: {
                  width: 1
                }
              };
            });

            chartoptions.series = series;
            myChart.setOption(chartoptions);
          })
          .catch(function(error) {
            _this.$Notice.error({
              title: "获取数据失败",
              desc: error
            });
          });
      }, 2000);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>
