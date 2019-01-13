<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="logout">
        <span>欢迎光临</span>
        <a href="javascript:;"
           @click="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--
           router
         -->
        <el-menu :default-active="$route.path.slice(1)"
                 class="el-menu-vertical-demo"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 unique-opened
                 router>
          <!-- 第一个 -->
          <el-submenu :index="v.path"
                      v-for=" v in menusList"
                      :key="v.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ v.authName }}</span>
            </template>
            <el-menu-item v-for="l2 in v.children"
                          :key="l2.id"
                          :index="l2.path">
              <i class="el-icon-menu"></i>
              <span slot="title"> {{ l2.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      menusList: []
    }
  },
  methods: {
    // 左侧菜单渲染
    async menus () {
      let res = await this.axios.get('/menus')
      // console.log(res)
      if (res.meta.status === 200) {
        this.menusList = res.data
        // console.log(this.menusList)
      }
    },
    // 退出
    async logout () {
      // 移token
      try {
        await this.$confirm('您确定要退出吗', '温馨提示', {
          // confirmButtonText: '确定',
          // cancelButtonText: '取消',
          type: 'warning'
        })
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message.success('退出成功')
      } catch (e) {
        this.$message.info('取消删除')
      }
    }

  },
  created () {
    this.menus()
    console.log(this.$router)
    console.log(this.$route)
    console.log(this.$route.path)
  }
}
//  使用别名要加~ 绝对路径
// background-size:100px  100px  100% 100% 容易失真
// h1 页面中只能有一个
</script>
<style lang="stylus" scoped>
.home {
  height: 100%;

  .el-header {
    background-color: #b3c1cd;
    display: flex;

    .logo {
      width: 180px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .logout {
      width: 180px;
      height: 60px;
      line-height: 60px;
      float: right;
      font-weight: 700;

      a {
        color: orange;
      }
    }

    .title {
      flex: 1;

      h1 {
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        font-size: 30px;
        margin: 0;
        padding: 0;
      }
    }
  }

  .el-container {
    height: 100%;

    .el-aside {
      background-color: #555566;
      height: 100%;
    }

    .el-main {
      background: #d4dfe4;
    }
  }
}
</style>
