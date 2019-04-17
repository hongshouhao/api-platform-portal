<template>
  <div class="detail">
    <Form :model="templateEditModel" :label-width="150" inline>
      <FormItem label="version">
        <Input v-model="templateEditModel.template.version" class="two"></Input>
      </FormItem>
      <FormItem label="description">
        <Input v-model="templateEditModel.template.description" class="two"></Input>
      </FormItem>
    </Form>
    <Divider/>
    <Tabs value="ReRoutes" type="card" class="cardView">
      <TabPane label="ReRoutes" name="ReRoutes">
        <ReRoutesView ref="reroutesView" class="content" :jsonString="rerouteString"></ReRoutesView>
      </TabPane>
      <TabPane label="DynamicReRoutes" name="DynamicReRoutes">
        <DynamicReRoutesView ref="dynamicView" class="content" :jsonString="dynamicString"></DynamicReRoutesView>
      </TabPane>
      <TabPane label="Aggregates" name="Aggregates">
        <AggregatesView ref="aggregatesView" class="content" :jsonString="aggregateString"></AggregatesView>
      </TabPane>
      <TabPane label="Global" name="GlobalConfiguration">
        <GlobalView ref="globalView" class="content" :jsonString="globalString"></GlobalView>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import ReRoutesView from "./parts/reroutes";
import DynamicReRoutesView from "./parts/dynamic";
import AggregatesView from "./parts/aggregates";
import GlobalView from "./parts/global";

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
    templateEditModel: {
      type: Object,
      default: {
        forUpdate: false,
        template: {}
      }
    }
  },
  created() {
    if (this.templateEditModel.template.jsonString) this.init();
  },
  methods: {
    init() {
      var wholeConfigObj = eval(
        "(" + this.templateEditModel.template.jsonString + ")"
      );
      this.rerouteString = JSON.stringify(
        { ReRoutes: wholeConfigObj.ReRoutes },
        null,
        2
      );
      this.dynamicString = JSON.stringify(
        { DynamicReRoutes: wholeConfigObj.DynamicReRoutes },
        null,
        2
      );
      this.aggregateString = JSON.stringify(
        { Aggregates: wholeConfigObj.Aggregates },
        null,
        2
      );
      this.globalString = JSON.stringify(
        { GlobalConfiguration: wholeConfigObj.GlobalConfiguration },
        null,
        2
      );
    }
  },
  components: {
    ReRoutesView,
    DynamicReRoutesView,
    AggregatesView,
    GlobalView
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
