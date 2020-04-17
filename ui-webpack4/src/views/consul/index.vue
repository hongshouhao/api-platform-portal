<template>
  <Card dis-hover>
    <i-select style="width:200px"
              @on-change="dcChanged"
              v-model="selecteddc">
      <i-option v-for="item in datacenters"
                :value="item"
                :key="item">{{
        item
      }}</i-option>
    </i-select>
    <RadioGroup v-model="filter"
                style="margin-left:20px"
                @on-change=filterServices>
      <Radio label="all">
        <Icon type="md-list" />
        <span>All</span>
      </Radio>
      <Radio label="critical">
        <Icon type="md-close-circle" />
        <span>Critical</span>
      </Radio>
      <Radio label="passing">
        <Icon type="ios-checkmark-circle" />
        <span>Passing</span>
      </Radio>
    </RadioGroup>
    <div class="wrapper">
      <Card class="wrapper-content"
            v-for="(item, index) in services"
            :key="index">
        <div slot="title"
             style="margin:8px auto">
          <a href="#"
             @click.prevent="serviceChecks(item)">
            <Icon type="ios-loop-strong"></Icon>
            {{ item.Service }}
          </a>
        </div>
        <div>{{ item.Node }}</div>
        <div>{{ item.ServiceHost }}</div>
        <div>{{ item.Meta?item.Meta.description:""}}</div>
        <Divider />
        <div>
          <Tag color="success">{{item.SummaryPassed}}</Tag>
          <Tag color="error">{{item.SummaryError}}</Tag>
        </div>
      </Card>
    </div>
  </Card>
</template>

<script>
import env from '../../global'
var enumerable = require('linq')
var consul = require('consul')({ host: new URL(env.consul_host).hostname })
export default {
  data () {
    return {
      selecteddc: '',
      datacenters: [],
      filter: 'all',
      allServices: [],
      services: []
    }
  },
  mounted () {
    this.refreshDcs()
  },
  methods: {
    refreshDcs () {
      var _this = this
      consul.catalog.datacenters(function (err, dcs) {
        if (err) throw err

        _this.datacenters = dcs
        var dc = dcs[0]
        if (dc) {
          _this.selecteddc = dc
          _this.dcChanged(dc)
        }
      })
    },
    dcChanged (dc) {
      if (!dc) return
      let _this = this
      consul.catalog.node.list(dc, function (err1, nodes) {
        if (err1) throw err1

        _this.allServices.length = 0
        _this.services = _this.allServices
        _this.$store.commit('setServices', _this.allServices)

        for (var j = 0; j < nodes.length; j++) {
          var node = nodes[j]
          consul.catalog.node.services(node.Node, function (err2, nodeservices) {
            if (err2) throw err2
            for (var svcName in nodeservices.Services) {
              let svcobj = nodeservices.Services[svcName]
              if (svcobj.Service) {
                svcobj.Node = node.Node
                svcobj.ServiceHost = svcobj.Address + ':' + svcobj.Port
                svcobj.ServiceTags = svcobj.Tags.join(',')
                svcobj.SummaryPassed = ""
                svcobj.SummaryError = ""

                _this.allServices.push(svcobj)

                consul.health.service(svcobj.Service, function (err3, checks) {
                  if (err3) throw err3

                  svcobj.Checks = enumerable
                    .from(checks)
                    .selectMany(s => s.Checks)
                    .where(s => s.ServiceName === svcobj.Service).toArray()

                  enumerable
                    .from(svcobj.Checks).forEach(s => {
                      if (!s.Output) {
                        s.Status = "pending"
                      }
                    })

                  svcobj.SummaryPassed = enumerable
                    .from(svcobj.Checks)
                    .count(s => s.Status === 'passing') + " passing"

                  svcobj.SummaryError = enumerable
                    .from(svcobj.Checks)
                    .count(s => s.Status === 'critical') + " critical"

                  svcobj.Status = enumerable
                    .from(svcobj.Checks)
                    .all(s => s.Status === 'passing') ? 'passing' : 'critical'
                })
              }
            }
          })
        }
      })
    },
    filterServices () {
      if (this.filter === "all") {
        this.services = this.allServices
      }
      else {
        this.services = enumerable.from(this.allServices).where(s => s.Status === this.filter).toArray()
      }
    },
    serviceChecks (svc) {
      this.$router.push({
        path: '/serviceChecks',
        query: { service: svc.Service }
      })
    }
  },
  components: {}
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
.wrapper-content {
  margin-top: 14px;
  width: 32%;
}
</style>
