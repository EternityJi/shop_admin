# element-ui

## form( 对话框+ form表单)

<el-form ref="addForm" :model="addForm" lable-width="180px" :rules="rules">
    <el-form-item lable="角色名称" props="">
        <el-input v-model="addForm.username"></el-input>
    </el-form-item>
</el-form>

* 校验: rule属性   有红星  说明设置成功
* 点击确定时  this.$refs.addForm.validate()
* 发送ajax成功后   (关闭对话框 重置表单   重新渲染  提示消息)

## 角色管理 修改功能

1. 点击修改按钮
2. 弹出对话框
3. 在对话框中放form
4. 让数据回显
5. 表单校验
6. 点击确定按钮
7. 表单校验成功 发送ajax请求
8. 发送成功(关闭对话框 重置表单   重新渲染  提示消息)

### 进阶的需求(优化)

添加和修改 共用一个模态框 
不同的地方: 内容需要回显  ajax不同

★★★:1. 数据回显：(不能修改对象)
      2. 共用时候 会有问题 :  方案：  在添加的时候  将表单清空
点确定的时候  会有bug
所以要有逻辑判断：
添加和修改的时候 判断一下 (可用计算属性)
      3. 发送ajax请求
   点击确定的时候:   不一样的地方(1. method  pust put   2.url 3.状态码不一样)


## 分配角色assign

需求:
点击按钮
弹出对话框
提供一个表单
在表单中提供一个下拉框(有下拉列表)
回显showAssignForm(scope.row) user.name

下拉框数据显示:
把el-input换成 el-select1
<el-select>
  <el-option :value="item.id" >
  </el-option>
</el-select>
 role-id=0  说明是超级管理员 不用操作 

## 左侧菜单栏的数据渲染

## this.$route

this.$router 整个路由对象  跳转路由时用
this.$route  一个路由  当前路由
this.$route.path
可以拿到path  地址  参数

## gitkeep

## axios

get请求:
// 注意如果是get请求  注意第二个参数并不是data  而是config对象
axios.get('url',{
  params:{
     type: 3,
     pagenum:

  }
})
axios.get('url'?type=2)

## 解构row

<template slot-scope="{row}">

   {{ row.cat_deleted ? '是' : '否'}}

</template>

## iView

## nuxt

## 树型的表格

element-tree-grid

需要注册一个全局组件
Vue.component('EltreeGrid.name',{})

treeKey: 设置嵌套解析的key  默认值  id  
parent-key: 默认值  id  添加上 可以收缩

level-key: 用于指定节点的深度  depth
childKey: 找子元素 指定子元素的值  默认值是children
:indentSize='20'  缩进  加了冒号 是数字  20
不加冒号  是字符串


 
