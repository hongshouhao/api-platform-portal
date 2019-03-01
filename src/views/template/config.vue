<template>
  <div class="detail">
    <Form :model="sectionModel" :label-width="150" inline>
      <FormItem label="version">
        <Input v-model="sectionModel.version" class="two"></Input>
      </FormItem>
      <FormItem label="description">
        <Input v-model="sectionModel.description" class="two"></Input>
      </FormItem>
    </Form>
    <Divider/>
    <Tabs value="ReRoutes" type="card" class="cardView">
      <TabPane label="ReRoutes" name="ReRoutes">
        <re-routes-view ref="reroutes" class="content" :jsonString="rerouteString"></re-routes-view>
      </TabPane>
      <TabPane label="DynamicReRoutes" name="DynamicReRoutes">
        <dynamic-re-routes-view ref="dynamic" class="content" :jsonString="dynamicString"></dynamic-re-routes-view>
      </TabPane>
      <TabPane label="Aggregates" name="Aggregates">
        <aggregates-view ref="aggregates" class="content" :jsonString="aggregateString"></aggregates-view>
      </TabPane>
      <TabPane label="GlobalConfiguration" name="GlobalConfiguration">
        <global-configuration-view ref="global" class="content" :jsonString="globalString"></global-configuration-view>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import ReRoutesView from "./config/reroutes";
import DynamicReRoutesView from "./config/dynamic";
import AggregatesView from "./config/aggregates";
import GlobalConfigurationView from "./config/global";
export default {
  data() {
    return {
      rerouteString: "",
      dynamicString: "",
      aggregateString: "",
      globalString: ""
    };
  },
  props: {
    sectionModel: {
      type: Object,
      default: {
        version: "",
        description: ""
      }
    }
  },
  created() {
    if (this.sectionModel.jsonString) this.init();
  },
  methods: {
    init() {
      var jsonObj = eval("(" + this.sectionModel.jsonString + ")");
      this.rerouteString = JSON.stringify(
        { ReRoutes: jsonObj.ReRoutes },
        null,
        2
      );
      this.dynamicString = JSON.stringify(
        { DynamicReRoutes: jsonObj.DynamicReRoutes },
        null,
        2
      );
      this.aggregateString = JSON.stringify(
        { Aggregates: jsonObj.Aggregates },
        null,
        2
      );
      this.globalString = JSON.stringify(
        { GlobalConfiguration: jsonObj.GlobalConfiguration },
        null,
        2
      );
    }
  },
  components: {
    ReRoutesView,
    DynamicReRoutesView,
    AggregatesView,
    GlobalConfigurationView
  }
};
</script>

<style scoped>
.two {
  width: 762px;
}
.full {
  width: 900px;
}
</style>
