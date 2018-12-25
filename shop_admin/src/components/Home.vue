<template>
  <el-container class="home">
    <el-header>
      <div class="logo"></div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="logout">
        <span>欢迎光临</span>
        <a href=""
           @click="logout">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    logout () {
      // 退出
      // 移token
      this.$confirm('您确定要退出吗', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点确定
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message.success('退出成功')
      }).catch(() => {
        // 点取消
        this.$message.info('取消退出')
      })
    }
  }
}
//  使用别名要加~ 绝对路径
// background-size:100px  100px  100% 100% 容易失真
// h1 页面中只能有一个
</script>
<style lang="stylus" scoped>
*{
  margin : 0;
  padding: 0;
}
.home {
  height: 100%;
  .el-header {
    background-color: #b3c1cd;
    display: flex;

    .logo {
      width: 180px;
      background-image: url('~@/assets/logo.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .logout {
      width: 180px;
      height: 60px;
      line-height:60px;
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
        line-height:60px;
        text-align: center;
        color: #fff;
        font-size: 30px;
      }
    }
  }
}
</style>
