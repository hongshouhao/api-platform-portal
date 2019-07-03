<template>
  <div>
    <Form :model="vtempl"
          :label-width="150"
          inline>
      <FormItem label="version">
        <Input v-model="vtempl.version"
               class="two"></Input>
      </FormItem>
      <FormItem label="description">
        <Input v-model="vtempl.description"
               class="two"></Input>
      </FormItem>
    </Form>
    <Divider />
    <Tabs value="ReRoutes"
          class="cardView">
      <TabPane label="ReRoutes"
               name="ReRoutes">
        <ReRoutesView class="content"
                      :vmodel="vconfigtempl.ReRoute"></ReRoutesView>
      </TabPane>
      <TabPane label="DynamicReRoutes"
               name="DynamicReRoutes">
        <DynamicReRoutesView class="content"
                             :vmodel="vconfigtempl.DynamicReRoute"></DynamicReRoutesView>
      </TabPane>
      <TabPane label="Aggregates"
               name="Aggregates">
        <AggregatesView class="content"
                        :vmodel="vconfigtempl.Aggregate"></AggregatesView>
      </TabPane>
      <TabPane label="Global"
               name="GlobalConfiguration">
        <GlobalView class="content"
                    :vmodel="vconfigtempl.GlobalConfiguration"></GlobalView>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import ReRoutesView from './parts/reroutes'
import DynamicReRoutesView from './parts/dynamic'
import AggregatesView from './parts/aggregates'
import GlobalView from './parts/global'
import modelTempl from '../modelTempl.js'

export default {
  data () {
    return {
      vconfigtempl: this.getVConfigTempl(
        modelTempl.getOcelotConfigurationSchema()
      )
    }
  },
  props: {
    vtempl: {}
  },
  watch: {
    vtempl: {
      handler (val) {
        if (val.jsonString) {
          this.vconfigtempl = this.getVConfigTempl(JSON.parse(val.jsonString))
        }
      }
    },
    vconfigtempl: {
      handler (val) {
        var fullconfig = {
          GlobalConfiguration: val.GlobalConfiguration,
          ReRoutes: [],
          DynamicReRoutes: [],
          Aggregates: []
        }
        fullconfig.ReRoutes.push(val.ReRoute)
        fullconfig.DynamicReRoutes.push(val.DynamicReRoute)
        fullconfig.Aggregates.push(val.Aggregate)
        this.vtempl.jsonString = JSON.stringify(fullconfig)
      },
      deep: true
    }
  },
  methods: {
    getVConfigTempl (ocelotConfig) {
      return {
        GlobalConfiguration: ocelotConfig.GlobalConfiguration,
        ReRoute: ocelotConfig.ReRoutes[0],
        DynamicReRoute: ocelotConfig.DynamicReRoutes[0],
        Aggregate: ocelotConfig.Aggregates[0]
      }
    }
  },
  components: {
    ReRoutesView,
    DynamicReRoutesView,
    AggregatesView,
    GlobalView
  }
}
</script>

<style scoped>
.two {
  width: 762px;
}
.full {
  width: 900px;
}
</style>
