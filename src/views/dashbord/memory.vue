<template>
  <div id="memochart" style="width: 100%;height:100%;"></div>
</template>
<script>
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
      // tooltip: {
      //   trigger: "axis",
      //   formatter: function(params) {
      //     params = params[0];
      //     var date = new Date(params.name);
      //     return (
      //       date.getDate() +
      //       "/" +
      //       (date.getMonth() + 1) +
      //       "/" +
      //       date.getFullYear() +
      //       " : " +
      //       params.value[1]
      //     );
      //   },
      //   axisPointer: {
      //     animation: false
      //   }
      // },
      xAxis: {
        type: "time",
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: function(value, index) {
            return new Date(value).getFullYear();
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

    let myChart = _this.$echarts.init(document.getElementById("memochart"));
    myChart.setOption(chartoptions);
    setInterval(function() {
      var date = new Date().getTime() / 1000;
      _this.$axios
        .get(
          "http://192.168.84.24:9090/api/v1/query_range?query=((wmi_cs_physical_memory_bytes-wmi_os_physical_memory_free_bytes)/wmi_cs_physical_memory_bytes)*100&start=" +
            (date - 70) +
            "&end=" +
            date +
            "&step=1&_=" +
            date
        )
        .then(function(response) {
          console.log(response);
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
          console.log(error);
        });
    }, 2000);
  },
  methods: {}
};
</script>
