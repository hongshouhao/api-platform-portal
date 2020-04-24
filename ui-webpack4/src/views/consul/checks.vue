<template>
  <Card dis-hover>
    <RadioGroup
      v-model="filter"
      style="margin-left:20px"
      @on-change="filterChecks"
    >
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

    <div class="panel" style="margin-top:14px">
      <div class="content">
        <!-- <Button
          icon="md-add"
          type="primary"
          :style="{ margin: '10px 5px' }"
          @click="editState = true"
          >注册新服务</Button
        > -->

        <Table
          ref="checkTable"
          :columns="columns"
          :data="checks"
          stripe
        ></Table>
        <br />
      </div>
      <!-- <Drawer title="检查结果"
              :closable="false"
              width="800"
              v-model="showOutput"
              style="overflow:hidden">
        <serviceEditView
          ref="serviceEditView"
          v-if="editState"
          :model="model"
        ></serviceEditView>
        <div class="drawer-footer-buttons">
          <Button type="primary" @click="save">Save</Button>
        </div>
      </Drawer> -->
      <Modal v-model="showOutput" footer-hide width="800">
        <highlight-code>{{ output }}</highlight-code>
      </Modal>
    </div>
  </Card>
</template>

<script>
import config from '../../config'
var consul = require('consul')({
  host: new URL(config.consul.baseURL).hostname
})
var enumerable = require('linq')
export default {
  data() {
    return {
      service: {},
      showOutput: false,
      filter: 'all',
      output: '',
      checks: [],
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: 'Name',
          key: 'Name'
        },
        {
          title: 'Notes',
          key: 'Notes',
          width: 150
        },
        {
          title: 'Status',
          key: 'Status',
          align: 'center',
          render: (h, params) => {
            return h(
              'Icon',
              {
                props: this.getStatusIcon(params.row.Status)
              },
              params.row.Status
            )
          },
          width: 100
        },
        {
          title: ' ',
          key: 'Output',
          ellipsis: true,
          render: (h, params) => {
            let _this = this
            return h('div', [
              h(
                'a',
                {
                  attrs: {
                    href: params.row.OutputObject.href,
                    target: '_blank'
                  }
                },
                params.row.OutputObject.status
              ),
              h(
                'span',
                {
                  attrs: {
                    style: 'margin:0 8px'
                  }
                },
                ''
              ),
              h(
                'a',
                {
                  on: {
                    click() {
                      _this.output = params.row.OutputObject.output
                      _this.showOutput = true
                    }
                  }
                },
                'Output'
              )
            ])
          }
        }
        // {
        //   title: 'Action',
        //   key: 'action',
        //   align: 'center',
        //   width: 100,
        //   render: (h, params) => {
        //     return h('div', [
        //       h(
        //         'Button',
        //         {
        //           props: {
        //             type: 'error',
        //             size: 'small'
        //           },
        //           on: {
        //             click: () => {
        //               this.deregister(params.row)
        //             }
        //           }
        //         },
        //         '注销'
        //       )
        //     ])
        //   }
        // }
      ]
    }
  },
  props: {},
  mounted() {
    let _this = this
    let serviceName = this.$route.query.service
    let targ = enumerable
      .from(this.$store.servicesInConsul)
      .firstOrDefault(s => s.ServiceName === serviceName)
    if (targ) {
      _this.service = targ
      _this.checks = _this.service.Checks
    } else {
      consul.health.service(serviceName, function(err3, fullServices) {
        if (err3) throw err3
        _this.service = fullServices[0].Service
        _this.service.Checks = enumerable
          .from(fullServices[0].Checks)
          .where(s => s.ServiceName === serviceName)
          .toArray()

        _this.service.Checks.forEach(element => {
          element.OutputObject = _this.parseOutput(element.Output)
          if (!element.Output) {
            element.Status = 'pending'
          }
        })

        _this.checks = _this.service.Checks
      })
    }
  },
  methods: {
    parseOutput(outputString) {
      let result = {}
      let typeSpace = outputString.indexOf(' ')
      result.type = outputString.substring(0, typeSpace)

      if (result.type === 'HTTP') {
        let actionSpace = outputString.indexOf(' ', typeSpace + 1)
        let firstColon = outputString.indexOf(':', actionSpace + 1)
        let secondColon = outputString.indexOf(':', firstColon + 1)
        let outputIndex = outputString.indexOf('Output:', secondColon + 1)

        result.href = outputString.substring(actionSpace + 1, secondColon)
        result.httpCode = outputString.substring(
          secondColon + 2,
          secondColon + 5
        )
        result.status = result.type + ':' + result.httpCode
        result.output = outputString.substring(outputIndex + 8)
        result.ishtml = result.output.startsWith('<!DOCTYPE')
      }
      return result
    },
    getStatusIcon(status) {
      var result = {
        size: 20,
        type: '',
        color: ''
      }
      if (status === 'passing') {
        result.type = 'md-checkmark'
        result.color = '#19be6b'
      } else if (status === 'critical') {
        result.type = 'md-close'
        result.color = '#ed4014'
      } else if (status === 'pending') {
        result.type = 'md-bicycle'
        result.color = '#5cadff'
      }
      return result
    },
    filterChecks() {
      if (this.filter === 'all') {
        this.checks = this.service.Checks
      } else {
        this.checks = enumerable
          .from(this.service.Checks)
          .where(s => s.Status === this.filter)
          .toArray()
      }
    }
    // deregister(row) {
    //   var _this = this
    //   _this.$Modal.confirm({
    //     title: '警告',
    //     content: '<p>确定注销此服务实例？</p>',
    //     onOk: () => {
    //       consul.agent.service.deregister(row.ID, function(err) {
    //         if (err) {
    //           _this.$Notice.error({
    //             title: '注销失败:',
    //             desc: err
    //           })
    //         } else {
    //           _this.$Notice.success({
    //             title: '注销成功'
    //           })
    //           _this.dcChanged(_this.selecteddc)
    //         }
    //       })
    //     }
    //   })
    // },
    // save() {
    //   var _this = this
    //   var options = this.$refs.serviceEditView.model
    //   consul.agent.service.register(options, function(err) {
    //     if (err) {
    //       _this.$Notice.error({
    //         title: '服务注册失败:',
    //         desc: err
    //       })
    //     } else {
    //       _this.$Notice.success({
    //         title: '服务注册成功'
    //       })
    //       _this.editState = false
    //       _this.dcChanged(_this.selecteddc)
    //     }
    //   })
    // }
  },
  components: {}
}
</script>

<style scoped>
.mappingcontent {
  height: 500px;
  overflow-y: scroll;
}
</style>
