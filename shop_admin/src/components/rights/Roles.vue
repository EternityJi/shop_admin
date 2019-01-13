<template>
  <div class="Roles">
    <!-- 111111 -->
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item to='/users'>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色 -->
    <el-button type="success"
               plain
               @click="showAdd">添加角色
    </el-button>
    <!-- 角色表格 -->
    <el-table :data="roleList"
              style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <!-- 表格中树型列表 -->
          <!-- 展示一级 -->
          <el-row v-for="l1 in row.children "
                  :key="l1.id">
            <el-col :span="4">
              <el-tag type="primary"
                      closable
                      @close="delRight(row,l1.id)">
                {{ l1.authName}}
              </el-tag>
            </el-col>
            <el-col :span="
                      20">
              <!-- 展示二级列表 -->
              <el-row v-for="l2 in l1.children "
                      :key="l2.id">
                <el-col :span="4">
                  <el-tag type="success"
                          closable
                          @close="delRight(row,l2.id)">
                    {{ l2.authName}}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <!-- 展示3级 -->
                  <!-- <el-row v-for="l3 in l2.children "
                          :key="l3.id">
                    <el-tag type="danger"
                            closable
                            @close="delRight(row,l3.id)">
                      {{l3.authName}}
                    </el-tag>
                  </el-row> -->
                  <el-tag closable
                          class="l3"
                          type="danger"
                          v-for="l3 in l2.children"
                          :key="l3.id"
                          @close="delRight(row,l3.id)">
                    {{l3.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称"
                       prop="roleName">
      </el-table-column>
      <el-table-column label="角色描述"
                       prop="roleDesc">
      </el-table-column>
      <el-table-column label="操作"
                       prop="">
        <template slot-scope="{row}">
          <el-button type="primary"
                     icon="el-icon-edit"
                     circle
                     plain
                     size="mini"
                     @click="showEditRole(row)"></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     circle
                     plain
                     size="mini"
                     @click="delRole(row.id)"></el-button>
          <el-button type="success"
                     round
                     plain
                     size="mini"
                     icon="el-icon-check"
                     @click="showAssign(row)">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分配权限  树型控件 -->
    <el-dialog title="分配权限"
               :visible.sync="assignDialogVisible"
               width="40%">

      <!-- 1.弹出对话框 -->
      <el-tree :data="rightList"
               show-checkbox
               default-expand-all
               node-key="id"
               ref="tree"
               highlight-current
               :props="defaultProps">
      </el-tree>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="assignDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="assignRight()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色 -->
    <el-dialog title="添加角色"
               :visible.sync="addDialogVisible"
               width="40%">
      <el-form status-icon
               ref="addForm"
               label-width="80px"
               :rules="rules"
               :model="addForm">
        <el-form-item label="角色名称"
                      prop="name">
          <el-input v-model="addForm.name">
          </el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      prop="desc">
          <el-input v-model="addForm.desc">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色 -->
    <el-dialog title="修改角色"
               :visible.sync="editDialogVisible"
               width="40%">
      <el-form status-icon
               ref="editForm"
               label-width="80px"
               :rules="editRules"
               :model="editForm">
        <el-form-item label="角色名称"
                      prop="roleName">
          <el-input v-model="editForm.roleName">
          </el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      prop="roleDesc">
          <el-input v-model="editForm.roleDesc">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="editDialogVisible= false">取 消</el-button>
        <el-button type="primary"
                   @click="editRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      roleList: [],
      assignDialogVisible: false,
      rightList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleId: '',
      addDialogVisible: false,
      addList: [],
      // 添加角色对话框
      addForm: {
        // 角色名称
        name: '',
        // 角色描述
        desc: ''
      },
      // 修改角色对话框
      editForm: {
        // 角色名称
        roleName: '',
        // 角色描述
        roleDesc: ''
      },
      // 对话框先隐藏
      editDialogVisible: false,
      // 匹配添加角色校验规则
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在6 到 5 个字符', trigger: 'blur' }
        ]
      },
      editRules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在6 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 渲染表格列表
    async getRoleList () {
      let res = await this.axios.get('roles')
      // console.log(res)
      if (res.meta.status === 200) {
        this.roleList = res.data
        console.log(this.roleList)
      }

      // getAuthList (role) {
      //   console.log(role)

      //   // 获取数据  进行渲染
      //   // let res = await this.axios.post(`roles/${roleId}/rights`)
      //   this.$refs.tree.getAuthList([3])
      // }
    },
    // 删除权限
    async  delRight (role, rightId) {
      // console.log(role, rightId)
      // console.log(role.id)

      let res = await this.axios.delete(`roles/${role.id}/rights/${rightId}`)
      console.log(res)
      if (res.meta.status === 200) {
        // 删除成功
        // 不能直接渲染

        // console.log(this)
        // 只渲染了当前角色的权限信息
        role.children = res.data
        // 提示信息
        this.$message.success('删除权限成功了')
      }
    },
    // 分配权限
    async showAssign (role) {
      // console.log(role)

      this.roleId = role.id
      // 显示对话框
      this.assignDialogVisible = true
      // 获取所有的权限数据
      let res = await this.axios.get(`rights/tree`)
      console.log(res)

      if (res.meta.status === 200) {
        this.rightList = res.data
      }
      let ids = []
      role.children.forEach(l1 => {
        l1.children.forEach(l2 => {
          l2.children.forEach(l3 => {
            ids.push(l3.id)
          })
        })
      })
      this.$refs.tree.setCheckedKeys(ids)
    },
    async assignRight () {
      console.log(111)
      // 获取所有选到的权限的id
      let checkedKeys = this.$refs.tree.getCheckedKeys()
      // 所有的半选中的节点
      let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      let rids = checkedKeys.concat(halfCheckedKeys).join()
      // console.log(rids)

      let res = await this.axios.post(`roles/${this.roleId}/rights`, { rids })

      if (res.meta.status === 200) {
        //   console.log(111)

        this.assignDialogVisible = false
        this.getRoleList()
        this.$message.success('分配权限成功了')
      }
    },
    async showAdd () {
      // console.log(111)
      this.addDialogVisible = true
    },
    async addRole () {
      this.addDialogVisible = false
      // console.log(33)
      // console.log(this.addForm)
      let res = await this.axios.post('/roles', {
        roleName: this.addForm.name,
        roleDesc: this.addForm.desc
      })
      console.log(res)

      if (res.meta.status === 201) {
        this.$message({
          message: '恭喜你,添加成功',
          type: 'success'
        })
        // 进行渲染
        this.getRoleList()
        // 重置表单
        this.$refs.addForm.resetFields()
      } else {
        this.$message({
          message: '添加失败'
        })
      }
    },
    // 删除角色
    async delRole (roleId) {
      console.log(roleId)
      let res = await this.axios.delete(`roles/${roleId}`)
      console.log(res)
      if (res.meta.status === 200) {
        this.$message({
          message: '恭喜你,删除成功',
          type: 'success'
        })
        // 进行渲染
        this.getRoleList()
      } else {
        this.$message({
          message: '添加失败'
        })
      }
    },
    // 显示编辑角色对话框
    async showEditRole (role) {
      this.editDialogVisible = true
      // 数据回显
      console.log(role)
      this.editForm.roleName = role.roleName
      this.editForm.roleDesc = role.roleDesc
      this.editForm.id = role.id
    },
    // 编辑角色
    async editRole () {
      // console.log(this)
      // console.log(this.editForm)
      let id = this.editForm.id
      // console.log(id)
      let res = await this.axios.put(`roles/${id}`, {
        roleName: this.editForm.roleName,
        roleDesc: this.editForm.roleDesc
      })
      console.log(res)
      if (res.meta.status === 200) {
        this.$message({
          message: '恭喜您,修改成功',
          type: 'success'
        })
        this.getRoleList()
        this.editDialogVisible = false
      }
    }
  },
  // 渲染调用
  created () {
    this.getRoleList()
  }
}
</script>
<style lang="stylus" scoped>
.el-tag {
  margin-right: 5px;
  margin-top: 10px;
}
</style>
