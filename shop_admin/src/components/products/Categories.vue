<template>
  <div>
    <el-button type="success"
               plain>添加分类</el-button>
    <!-- 表格部分 -->
    <el-table :data="categoryList"
              style="width:100%">
      <el-table-column prop="name"
                       label="分类名称">
        <!-- 树形结构 -->
        <!-- <el-tree :data="nameList"
                 :props="defaultProps"
                 @node-click="handleNodeClick"></el-tree> -->

      </el-table-column>
      <el-table-column prop="date"
                       label="是否删除">
      </el-table-column>
      <el-table-column prop="sort"
                       label="排序">
      </el-table-column>
      <el-table-column prop="handle"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="primary"
                     icon="el-icon-edit"
                     circle
                     plain
                     size="mini"></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     circle
                     plain
                     size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[2, 4, 6, 8]"
                   :page-size="2"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   background>
    </el-pagination>
  </div>

</template>
<script>
export default {
  data () {
    return {
      categoryList: [],
      //  分页的数据
      currentPage: 1,
      pageSize: 10,
      total: 0
      // 树型结构
      // nameList: [],
      // defaultProps: {
      //   children: 'children',
      //   label: 'cat_name'
      // }
    }
  },
  methods: {
    async getCategoryList () {
      // 应该拿到三级所有的分类 type [1, 2, 3]
      // 有分页  应该拿到分页的参数
      // 分页  当前页 currentPage  每页的条数 pageSize total
      let res = await this.axios.get('categories', {
        params: {
          type: 3,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      })
      if (res.meta.status === 200) {
        this.nameList = res.data.result
        console.log(this.total)
        console.log(res.data.total)
        this.total = res.data.total
      }
      console.log(res)
    },
    // 分页页码处理
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  created () {
    this.getCategoryList()
  }
}
</script>
<style lang="stylus" scoped>
</style>
