<template>
  <card>
    <div class="content">
      <Button icon="ios-refresh"
              type="primary"
              :style="{margin:'10px'}"
              @click="refreshData">刷新</Button>
      <Button icon="md-add"
              type="primary"
              :style="{margin:'10px 5px'}"
              @click="addNewOption">新增</Button>
      <Table :columns="columns"
             :data="dataSource"
             :loading="loading"
             stripe></Table>
      <Drawer width="800"
              v-model="showEditView"
              :closable="false">
        <div slot="header"
             class="drawerheader">
          <span>配置详情</span>
          <Button type="success"
                  style="float: right;margin-right: 8px"
                  @click="saveOption">Save</Button>
          <Button type="error"
                  style="float: right;margin-right: 8px"
                  @click="deleteOption">Delete</Button>
        </div>
        <optionsEditView :authOptions="voption"
                         style="margin:0 0 5px 0;"></optionsEditView>
      </Drawer>
    </div>
  </card>
</template>

<script>
import env from '../../global'
import optionsEditView from './optionsEdit'

export default {
  data () {
    return {
      loading: false,
      editState: false,
      showEditView: false,
      voption: {},
      json: {},
      columns: [
        {
          type: 'index',
          width: 80
        },
        {
          title: 'description',
          key: 'description',
          width: 250,
          align: 'center'
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
                    this.showEditView = true
                    this.voption = params.row
                  }
                }
              },
              '{ JSON }'
            )
          }
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
      dataSource: []
    }
  },
  mounted () {
    this.refreshData()
  },
  methods: {
    refreshData () {
      var _this = this
      _this.loading = true
      _this.$axios
        .get(env.ocelotAdmin_host + '/admin/authoptions/getall')
        .then(function (response) {
          _this.dataSource = response.data
          _this.loading = false
        })
        .catch(function (error) {
          _this.$Notice.error({
            title: '获取数据失败',
            desc: error
          })
        })
    },
    deleteOption () {
      var _this = this
      _this.$Modal.confirm({
        title: '注意',
        content: '<p>确定是否删除当前行？</p>',
        onOk: () => {
          _this.$axios
            .post(
              env.ocelotAdmin_host +
              '/admin/authoptions/delete?id=' +
              _this.voption.id
            )
            .then(function (response) {
              _this.$Notice.success({
                title: '删除成功'
              })
              _this.showEditView = false
              _this.refreshData()
            })
            .catch(function (error) {
              _this.$Notice.error({
                title: '删除失败:',
                desc: error
              })
            })
        }
      })
    },
    addNewOption () {
      this.voption = {
        description: '',
        createTime: new Date().toLocaleString(),
        modifiedTime: new Date().toLocaleString(),
        jsonString: ''
      }
      this.showEditView = true
    },
    saveOption () {
      var _this = this
      _this.$axios
        .post(env.ocelotAdmin_host + '/admin/authoptions/save', _this.voption)
        .then(function (response) {
          _this.$Notice.success({
            title: '保存成功'
          })
          _this.showEditView = false
          _this.refreshData()
        })
        .catch(function (error) {
          _this.$Notice.error({
            title: '保存失败:',
            desc: error
          })
        })
    }
  },
  components: { optionsEditView }
}
</script>

<style scoped>
.mappingcontent {
  height: 500px;
  overflow-y: scroll;
}
</style>
