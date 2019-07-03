<template>
  <div>
    <div id="memochart" style="width: 100%;height:100%;"></div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>
<script>
import env from "../../lib/env";
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
          text: "内存利用率(%)",
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
        document.getElementById("memochart"),
        "light"
      );
      myChart.setOption(chartoptions);
      setInterval(function() {
        var date = new Date().getTime() / 1000;
        _this.$axios
          .get(
            env.prometheus_host +
              "/api/v1/query_range?query=((wmi_cs_physical_memory_bytes-wmi_os_physical_memory_free_bytes)/wmi_cs_physical_memory_bytes)*100&start=" +
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
                smooth: "spline",
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
      myChart.resize();
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>
