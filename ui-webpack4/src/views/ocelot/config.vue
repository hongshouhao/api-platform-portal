<template>
  <Card dis-hover>
    <div class="panel main-content-con">
      <Tabs value="table">
        <TabPane label="Table View" name="table">
          <div class="content">
            <Button
              icon="ios-refresh"
              type="primary"
              :style="{ margin: '10px' }"
              @click="refreshData"
              >刷新</Button
            >
            <Button
              icon="md-add"
              type="primary"
              @click="addNewSection"
              :style="{ margin: '10px 5px' }"
              >新增</Button
            >
            <Button
              icon="ios-locate-outline"
              type="primary"
              @click="verifySelectedSections"
              :style="{ margin: '10px 5px' }"
              >验证</Button
            >
            <Table
              ref="sectionTable"
              :columns="columns"
              :data="dataSource"
              :loading="loading"
              stripe
            ></Table>
          </div>
        </TabPane>

        <TabPane label="JSON View">
          <highlight-code lang="JSON">{{
            dataSourceJsonString
          }}</highlight-code>
        </TabPane>
      </Tabs>
      <Drawer :closable="false" width="800" v-model="showEditView">
        <div slot="header" class="drawerheader">
          <p>配置详情</p>
          <Button
            type="success"
            style="float: right;margin-right: 8px"
            @click="saveSection"
            >Save</Button
          >
          <Button
            type="error"
            :disabled="forUpdate == false"
            style="float: right;margin-right: 8px"
            @click="deleteSection"
            >Delete</Button
          >
        </div>
        <EditView
          :section="vsection"
          :forUpdate="forUpdate"
          style="margin:0 0 5px 0;"
        ></EditView>
      </Drawer>
      <Modal v-model="viewJsonString" footer-hide width="800">
        <highlight-code lang="JSON">{{ json }}</highlight-code>
      </Modal>
    </div>
  </Card>
</template>

<script>
import modelTempl from '../modelTempl.js'
import EditView from './sectionEdit'

export default {
  data() {
    return {
      vsection: {},
      columns: [
        {
          type: 'index',
          width: 80
        },
        {
          title: 'name',
          key: 'name',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h(
              'a',
              {
                on: {
                  click: () => {
                    this.editSection(params.row)
                  }
                }
              },
              params.row.name
            )
          }
        },
        {
          title: 'jsonString',
          key: 'jsonString',
          ellipsis: true,
          render: (h, params) => {
            return h(
              'a',
              {
                on: {
                  click: () => {
                    this.viewJsonString = true
                    this.json = JSON.stringify(
                      JSON.parse(params.row.jsonString),
                      null,
                      2
                    )
                  }
                }
              },
              '{ JSON }'
            )
          }
        },
        {
          title: 'enable',
          key: 'enable',
          width: 150,
          align: 'center'
        },
        {
          title: 'description',
          key: 'description',
          width: 250,
          align: 'center'
        },
        {
          title: 'createTime',
          key: 'createTime',
          width: 180,
          align: 'center'
        },
        {
          title: 'modifiedTime',
          key: 'modifiedTime',
          width: 180,
          align: 'center'
        }
      ],
      dataSource: [],
      dataSourceJsonString: '',
      showEditView: false,
      viewJsonString: false,
      json: {},
      modalTitle: '',
      forUpdate: false,
      loading: false
    }
  },
  mounted() {
    this.refreshData()
  },
  methods: {
    refreshData() {
      var _this = this
      _this.loading = true
      _this.$ocelotClient.GetAllSections(
        function(data) {
          _this.dataSourceJsonString = JSON.stringify(data, null, 2)
          _this.dataSource = data
          _this.loading = false
        },
        function(errorThrown) {
          if (errorThrown === 'Unauthorized') {
            _this.$Message.warning('登录过期，请重新登录')
          } else _this.$Message.warning('数据获取失败！')
        }
      )
    },
    addNewSection() {
      this.vsection = modelTempl.getOcelotConfigSection()
      this.forUpdate = false
      this.showEditView = true
    },
    editSection(row) {
      this.vsection = row
      this.forUpdate = true
      this.showEditView = true
    },
    saveSection() {
      var _this = this
      _this.$ocelotClient.SaveSection(
        _this.vsection,
        function() {
          _this.$Notice.success({
            title: '保存成功'
          })
          _this.showEditView = false
          _this.refreshData()
        },
        function(errorThrown) {
          _this.$Notice.error({
            title: '保存失败',
            desc: errorThrown
          })
        }
      )
    },
    deleteSection() {
      var _this = this
      _this.$Modal.confirm({
        title: '注意',
        content: '<p>是否删除当前行？</p>',
        onOk: () => {
          _this.$ocelotClient.DeleteSection(
            _this.vsection.name,
            function() {
              _this.$Notice.success({
                title: '删除成功'
              })
              _this.showEditView = false
              _this.refreshData()
            },
            function(errorThrownn) {
              _this.$Notice.error({
                title: '删除失败:',
                desc: errorThrownn
              })
            }
          )
        }
      })
    },
    verifySelectedSections() {
      var _this = this
      var rows = _this.$refs.sectionTable.getSelection()
      _this.$ocelotClient.ValidateSection(
        rows,
        function() {
          _this.$Notice.success({ title: '验证通过' })
        },
        function(errorThrown) {
          _this.$Notice.error({
            title: '验证失败：',
            desc: errorThrown
          })
        }
      )
    }
  },
  components: {
    EditView
  }
}
</script>

<style>
.ivu-tabs-tabpane code {
  height: calc(100vh - 220px);
  overflow-y: scroll;
}
</style>
