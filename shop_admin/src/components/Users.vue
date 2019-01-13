<template>
  <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
      <el-breadcrumb-item to='/users'>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框-->
    <el-input placeholder="请输入内容"
              v-model="query"
              class="input-with-select">
      <el-button slot="append"
                 icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success"
               plain
               @click="showAddDialog ">
      用户添加
    </el-button>

    <!-- 表格 -->
    <!--
       data: 表示显示的数据 会根据数据自动遍历
       el-table-column:  定义表格的一列
       lable:  表头
prop: 表示

自定义模板：
   1. 需要使用<template slot-scope="scope"></template>
   2. 用scop.row(是一个对象)来获取数据  是当前的对象  是整行的信息
       scope.column  是当前列的信息
       用法:
       <template slot-scope="scope">
          <a  href="#"> {{ scope.row.username }}</a>
       </template>
     -->
    <el-table :data="userList"
              style="width: 100%">
      <el-table-column prop="username"
                       label="姓名"
                       width="200">
      </el-table-column>
      <el-table-column prop="email"
                       label="邮箱"
                       width="200">
      </el-table-column>
      <el-table-column prop="mobile"
                       label="电话"
                       width="200">
      </el-table-column>
      <el-table-column prop="mg_state"
                       label="状态"
                       width="200">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state"
                     active-color="#13ce66"
                     inactive-color="#ff4949"
                     @change="changeState(scope.row)">
            <!-- @change="changeState(scope.row)" -->
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="mini"
                     @click="showEditDialog(scope.row)"
                     plain>
          </el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     size="mini"
                     plain
                     @click="deleteUser(scope.row.id)">
          </el-button>
          <el-button type="success"
                     icon="el-icon-check"
                     size="mini"
                     plain
                     round>
            分配角色
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[2, 4, 6, 8]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   background>
    </el-pagination>
    <!-- 添加对话框 -->
    <el-dialog title="添加用户"
               width="40%"
               :visible.sync="addDialogVisible">
      <!-- 表单组件 -->
      <el-form :model="addForm"
               ref="addForm"
               label-width="80px"
               status-icon
               :rules="rules2">
        <el-form-item label="用户名"
                      prop="username">
          <el-input v-model="addForm.username"
                    placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="addForm.password"
                    placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="addForm.email"
                    placeholder="请输入邮箱">
          </el-input>
        </el-form-item>
        <el-form-item label="手机"
                      prop="mobile">
          <el-input v-model="addForm.mobile"
                    placeholder="请输入手机">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改对话框 -->
    <!-- 表单的数据需要回显 -->
    <!-- 表单校验  点击确定  发送ajax请求 -->
    <el-dialog title="修改用户"
               width="40%"
               :visible.sync="editDialogVisible">
      <!-- 表单组件 -->
      <el-form :model="editForm"
               ref="editForm"
               label-width="80px"
               status-icon
               :rules="rules2">
        <el-form-item label="用户名"
                      prop="username">
          <el-tag type="info"> {{editForm.username}}</el-tag>

        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="editForm.email"
                    placeholder="请输入邮箱">
          </el-input>
        </el-form-item>
        <el-form-item label="手机"
                      prop="mobile">
          <el-input v-model="editForm.mobile"
                    placeholder="请输入手机">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="updateUser">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
// import axios from 'axios'
export default {
  data () {
    return {
      userList: [],
      query: '',
      currentPage: 1,
      pageSize: 2,
      // 总的条数
      total: 0,
      baseUrl: 'http://localhost:8888/api/private/v1/',
      // 对话框
      addDialogVisible: false,

      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 匹配校验规则
      rules2: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: '请输入正确的邮箱名字', trigger: 'blur' }

        ],
        mobile: [
          { required: true,
            pattern: /^1\d{10}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]

      },
      editDialogVisible: false,
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      }

    }
  },

  // 1.data 中发送的请求是以请求体的方式发送的
  // 2. 除了登录请求  其余所有的请求都必须携带token   设置在请求头中
  methods: {
    getUserList () {
      this.axios({
        method: 'get',
        url: this.baseUrl + 'users',
        // url: 'users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      }).then(res => {
        console.log(res)
        let { meta: { status }, data: { users, total } } = res
        // res.meta.status === 200
        if (status === 200) {
          this.userList = users
          this.total = total
          // this.userList = res.data.users
          // this.total = res.data.total
          // console.log(this.userList)
        }
      })
    },
    deleteUser (id) {
      //  弹出确认框
      console.log(id)

      this.$confirm('你确定要删除该用户吗?', '温馨提示', {
        type: 'warning'
      })
      return this.axios({
        method: 'delete',
        url: `users/${id}`
      }).then(res => {
        if (res.meta.status === 200) {
          // 如果当前就剩一条  还渲染当前  就会有问题  当前页没有数据了  就渲染上一页的
          if (this.userList.length <= 1 && this.currentPage > 1) {
            this.currentPage--
          }
          this.getUserList()
          this.$message.success('删除成功')
        } else {
          this.$message.success('删除失败')
        }
      })
    },
    showAddDialog () {
      // 显示对话框
      this.addDialogVisible = true
    },
    showEditDialog (user) {
      // 显示对话框
      console.log(user)
      this.editDialogVisible = true
      this.editForm.id = user.id
      this.editForm.email = user.email
      this.editForm.mobile = user.mobile
      this.editForm.username = user.username
    },

    addUser () {
      this.$refs.addForm.validate(valid => {
        if (!valid) return false
        this.axios({
          url: 'users',
          method: 'post',
          data: this.addForm

        }).then(res => {
          if (res.meta.status === 201) {
            // 重新渲染最后一页
            this.total++
            this.currentPage = Math.ceil(this.total / this.pageSize)
            // 重新渲染
            this.getUserList()
            // 隐藏模态框
            this.addDialogVisible = false
            // 重置表单
            this.$refs.addForm.resetFiles()
          } else {
            this.$message.error(res.meta.msg)
          }
        })
      })
    },
    updateUser () {
      this.$refs.editForm.validate(valid => {
        if (!valid) return false
        this.axios({
          method: 'put',
          url: `users/${this.editForm.id}`,
          data: this.editForm

        }).then(res => {
          if (res.meta.status === 200) {
            console.log(res)
            // 重置表单
            this.$refs.editForm.resetFields()
            // 重新渲染最后一页
            // this.total++
            // this.currentPage = Math.ceil(this.total / this.pageSize)
            // 重新渲染
            this.getUserList()
            // 隐藏模态框
            this.editDialogVisible = false
          } else {
            this.$message.error(res.meta.msg)
          }
        })
      })
    },
    // editUser () {
    //   console.log(111)
    // },
    async  changeState (user) {
      console.log(user)
      let res = await this.axios({
        method: 'put',
        // users/:uId/state/:type
        url: this.baseUrl + `users/${user.id}/state/$(user.mg_state)`
      })
      if (res.meta.status === 200) {
        // console.log(res.meta.status)
        this.$message.success({
          message: '设置状态成功',
          type: 'success'
        })
        this.getUserList()
      } else {
        this.$message.error('修改失败')
      }
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUserList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getUserList()
    }
  },
  created () {
    this.getUserList()
  }
}
</script>
<style lang="stylus" scoped>
.input-with-select {
  width: 400px;
  margin-bottom: 10px;
}
</style>
