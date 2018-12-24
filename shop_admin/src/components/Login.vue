<template>
  <div class="wrapper">
    <!-- el-form：表单组件 -->
    <el-form :model="form"
             status-icon
             :rules="rules"
             ref="ruleForm2"
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
                   @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style >
html,
body {
  width: 100%;
  height: 100%;
  background: #2d434c;
}
.wrapper {
  width: 480px;
  height: 276px;
  background: #fff;
  margin: 0 auto;
  padding: 75px 40px 15px 40px;
}
img{
      border-radius: 50%;
  }
</style>
