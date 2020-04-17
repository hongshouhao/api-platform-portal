<template>
  <Dropdown class="user"
            @on-click="handleClick">
    <Badge>
      <Avatar :src="userlogo" />
    </Badge>

    <DropdownMenu slot="list">
      <DropdownItem name="info">
        {{oidcUser.name}}
      </DropdownItem>
      <DropdownItem name="logout">退出登录</DropdownItem>
    </DropdownMenu>
    <Modal name="modal"
           v-model="displayed"
           footer-hide>
      <userinfo />
    </Modal>
  </Dropdown>
</template>

<script>
import avatar from '../../assets/avatar.png'
import { mapGetters, mapActions } from 'vuex'
import userinfo from './signedinuser'
export default {
  data () {
    return {
      displayed: false
    }
  },
  props: {
  },
  computed: {
    ...mapGetters('oidcStore', [
      'oidcUser'
    ]),
    userlogo: {
      get () {
        return avatar
      }    }
  },
  methods: {
    ...mapActions('oidcStore', [
      'authenticateOidcSilent',
      'signOutOidc'
    ]),
    logout () {
      this.signOutOidc().then(() => {
        this.$router.push({
          path: '/'
        })
      })
    },
    displayInfo () {
      this.displayed = true
      // let _this = this
      // _this.$Modal.info({
      //   title: '用户信息',
      //   render: (h) => {
      //     console.log(userinfo)
      //     return h(userinfo)
      //   },
      //   width: 600,
      //   closable: false
      // })
    },
    handleClick (name) {
      switch (name) {
        case 'info':
          this.displayInfo()
          break
        case 'logout':
          this.logout()
          break
      }
    }
  },
  components: {
    userinfo
  }
}
</script>
<style scoped lang="less">
.user {
  position: absolute;
  right: 50px;
}
</style>
