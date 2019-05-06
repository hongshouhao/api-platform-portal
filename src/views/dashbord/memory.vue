<template>
  <div id="memochart" style="width: 100%;height:100%;"></div>
</template>
<script>
import { Env } from "../../lib/env";
export default {
  data() {
    return {
      series: []
    };
  },
  mounted() {
    var _this = this;
    var chartoptions = {
      title: {
        text: "% 内存利用率"
      },
      xAxis: {
        type: "time",
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: function(value, index) {
            return "";
          }
        }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 100,
        splitLine: {
          show: false
        }
      },
      legend: {
        orient: "horizontal", // 'vertical'
        y: "bottom", // 'center' | 'bottom' | {number}
        icon: "circle",
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 20
      },
      series: []
    };

    let myChart = _this.$echarts.init(
      document.getElementById("memochart"),
      "shine"
    );
    myChart.setOption(chartoptions);
    setInterval(function() {
      var date = new Date().getTime() / 1000;
      _this.$axios
        .get(
          Env.prometheus_host +
            "/api/v1/query_range?query=((wmi_cs_physical_memory_bytes-wmi_os_physical_memory_free_bytes)/wmi_cs_physical_memory_bytes)*100&start=" +
            (date - 70) +
            "&end=" +
            date +
            "&step=1&_=" +
            date
        )
        .then(function(response) {
          var series = response.data.data.result.map(function(instanceItem) {
            var values = instanceItem.values.map(function(valueItem) {
              return {
                name: valueItem[0],
                value: [new Date(valueItem[0]), valueItem[1]]
              };
            });

            return {
              name: instanceItem.metric.instance,
              data: values,
              type: "line",
              smooth: "spline",
              showSymbol: false,
              hoverAnimation: false
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
  },
  methods: {}
};
</script>
