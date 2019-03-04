<template>
  <div>
    <Row>
      <Col span="8">Duration:
        <Tag>{{duration}}</Tag>
      </Col>
      <Col span="8">Spans:
        <Tag>{{spans}}</Tag>
      </Col>
    </Row>
    <br>
    <Table
      ref="configTable"
      :columns="columns"
      :data="columnData"
      stripe
      :loading="loading"
      @on-row-click="rowClick"
    ></Table>
    <Modal v-model="modal" :title="serviceName">
      <div>
        <Tag>{{spanServiceName}}</Tag>
        <Tag>{{spanDuration}}</Tag>
        <br>
        <Timeline>
          <TimelineItem v-for="item in timeline" :key="item.spanId">
            <p class="time">{{item.timestamp}}</p>
            <p class="content" v-for="field in item.fields">
              <span>{{field.value}}</span>
            </p>
          </TimelineItem>
        </Timeline>
        <br>
        <Table :columns="spanColumns" :data="spanData" stripe></Table>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      duration: "",
      service: "",
      modal: false,
      spans: "",
      columns: [
        {
          title: "Span",
          key: "span",
          align: "center"
        },
        {
          title: "Time(%)",
          key: "time",
          width: 100,
          align: "center"
        },
        {
          title: "Timeline",
          key: "duration",
          width: 100,
          align: "center"
        }
      ],
      columnData: [],
      loading: false,
      spanDuration: 0,
      spanServiceName: "",
      timeline: [],
      spanColumns: [
        {
          title: "Tag Key",
          key: "key",
          align: "center"
        },
        {
          title: "Value",
          key: "value",
          align: "center"
        }
      ],
      spanData: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var _this = this;
      Identity.getAccessToken().then(function(token) {
        $.ajax({
          url: env.butterfly_host + "/api/tracedetail/" + _this.id,
          type: "GET",
          success: function(data) {
            var dura = data.duration;
            if (dura < 1000) {
              _this.duration = dura + "μs";
            } else {
              _this.duration = (dura / 1000).toFixed(2) + "ms";
            }
            _this.spans = data.spans.length;
            _this.columnData = data.spans.map(function(item) {
              item.span = item.serviceName + " " + item.operationName;
              item.time =
                Math.round((item.duration / data.duration) * 10000) / 100.0 +
                "%";
              return item;
            });
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus + "," + errorThrown);
          }
        });
      });
    },
    rowClick(row) {
      this.modal = true;
      var _this = this;
      Identity.getAccessToken().then(function(token) {
        $.ajax({
          url: env.butterfly_host + "/api/spandetail/" + row.spanId,
          type: "GET",
          success: function(data) {
            _this.serviceName = data.serviceName;
            var dura = data.duration;
            if (dura < 1000) {
              _this.spanDuration = dura + "μs";
            } else {
              _this.spanDuration = (dura / 1000).toFixed(2) + "ms";
            }
            _this.spanServiceName = data.serviceName;
            _this.timeline = data.logs.map(function(item) {
              item.timestamp = new Date(item.timestamp).Format(
                "yyyy-MM-dd hh:mm:ss"
              );
              return item;
            });
            _this.spanData = data.tags;
            console.log(_this.timeline);
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

<style>
</style>
