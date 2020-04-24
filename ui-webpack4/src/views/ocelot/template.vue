<template>
  <Card>
    <div class="panel">
      <Button
        icon="md-add"
        type="primary"
        @click="addNewTemplate"
        :style="{ margin: '10px 5px' }"
        >新增</Button
      >
      <Table
        ref="configTable"
        :columns="columns"
        :data="dataSource"
        stripe
        :loading="loading"
      ></Table>
      <Drawer
        title="Template Edit"
        :closable="false"
        width="800"
        v-model="editState"
        style="overflow:hidden"
      >
        <div slot="header" class="drawerheader">
          <p>配置详情</p>
          <Button
            type="success"
            style="float: right;margin-right: 8px"
            @click="saveTemplate"
            >Save</Button
          >
          <Button
            type="error"
            style="float: right;margin-right: 8px"
            @click="deleteTemplate"
            >Delete</Button
          >
        </div>
        <TemplEditView :vtempl="vtempl"></TemplEditView>
        <div class="drawer-footer-buttons"></div>
      </Drawer>
      <Modal v-model="viewJsonString" footer-hide width="800">
        <highlight-code lang="JSON">{{ json }}</highlight-code>
      </Modal>
    </div>
  </Card>
</template>

<script>
import config from '../../config'
import modelTempl from '../modelTempl.js'
import TemplEditView from './templateEdit'

export default {
  data() {
    return {
      editState: false,
      dataSource: [],
      json: {},
      loading: false,
      vtempl: {},
      forUpdate: false,
      viewJsonString: false,
      columns: [
        {
          type: 'index',
          width: 80
        },
        {
          title: 'version',
          key: 'version',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h(
              'a',
              {
                on: {
                  click: () => {
                    this.showTemplEditView(params.row)
                  }
                }
              },
              params.row.version
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
          title: 'description',
          key: 'description',
          width: 200,
          align: 'center'
        },
        {
          title: 'createTime',
          key: 'createTime',
          width: 200,
          align: 'center'
        },
        {
          title: 'modifiedTime',
          key: 'modifiedTime',
          width: 200,
          align: 'center'
        }
      ]
    }
  },
  mounted() {
    this.refreshData()
  },
  methods: {
    refreshData() {
      var _this = this
      _this.$axios
        .get(config.ocelot.adminApiBaseURL + '/admin/template/getall')
        .then(response => {
          _this.dataSource = response.data
          _this.editState = false
        })
        .catch(error => {
          _this.$Notice.error({
            title: '获取模板列表失败',
            desc: error
          })
        })
    },
    saveTemplate() {
      var _this = this
      _this.$axios
        .post(
          config.ocelot.adminApiBaseURL + '/admin/template/save',
          _this.vtempl
        )
        .then(() => {
          _this.$Notice.success({
            title: '模板保存成功'
          })
          _this.refreshData()
        })
        .catch(error => {
          _this.$Notice.error({
            title: '模板保存失败',
            desc: error
          })
        })
    },
    addNewTemplate() {
      this.editState = true
      this.vtempl = modelTempl.getOcelotTemplate()
      this.forUpdate = false
    },
    showTemplEditView(row) {
      this.editState = true
      this.vtempl = row
      this.forUpdate = true
    },
    deleteTemplate() {
      var _this = this
      _this.$Modal.confirm({
        title: '注意',
        content: '<p>是否删除当前模板？</p>',
        onOk: () => {
          _this.$axios
            .post(
              config.ocelot.adminApiBaseURL +
                '/admin/template/delete?version=' +
                _this.vtempl.version
            )
            .then(() => {
              _this.$Notice.success({
                title: '删除成功'
              })
              _this.refreshData()
            })
            .catch(error => {
              _this.$Notice.error({
                title: '删除失败',
                desc: error
              })
            })
        }
      })
    }
  },
  components: {
    TemplEditView
  }
}
</script>
