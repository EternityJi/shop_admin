<template>
  <div class="wrapper">
    <!-- el-form：表单组件 -->
    <el-form :model="form"
             status-icon
             :rules="rules"
             ref="form"
             label-width="80px"
             class="demo-ruleForm">
      <img src="../assets/avatar.jpg"
           alt="">
      <!-- 表单项 -->
      <el-form-item label="用户名"
                    prop="username">
        <el-input v-model="form.username"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码"
                    prop="password">
        <el-input type="password"
                  v-model="form.password"
                  placeholder="请输入密码"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        // 发送ajax请求
        axios({
          method: 'post',
          url: 'http://localhost:8888/api/private/v1/login',
          data: this.form
        }).then(res => {
          console.log(res)
          console.log(this.form)
          if (res.data.meta.status === 200) {
            this.$message({
              message: '登陆成功了',
              type: 'success',
              duration: 1000
            })
            // 把token存储起来
            console.log(res)
            localStorage.setItem('token', res.data.data.token)
            this.$router.push('/home')
            // 编程式导航
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
      })
    },
    reset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
html,body {
  width: 100%;
  height: 100%;
  background: #2d434c;
}

.wrapper {
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
}

img {
  border-radius: 50%;
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  border: 10px solid #fff;
}

.el-form {
  width: 400px;
  margin: 200px auto;
  background-color: #fff;
  padding: 75px 40px 15px;
  position: relative;
}

.el-button + .el-button {
  margin-left: 80px;
}
</style>
