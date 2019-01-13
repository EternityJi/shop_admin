<template>
  <div>
    <el-button type="success"
               plain
               @click="addGoods">添加商品</el-button>
    <el-table ref=""
              :data="tableDate"
              style="width:100%">
      <el-table-column type="index"
                       width="50">
      </el-table-column>
      <el-table-column label="商品名称"
                       prop="goods_name">
      </el-table-column>
      <el-table-column label="商品价格"
                       prop="goods_price">
      </el-table-column>
      <el-table-column label="商品重量"
                       prop="goods_weight">
      </el-table-column>
      <el-table-column label="创建时间"
                       prop="add_time">
      </el-table-column>
      <el-table-column label="操作">
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
    <!-- 分页功能 -->
    <!-- size-change 每页的条数发生改变时  触发 -->
    <!-- current-change 当前页发生改变会触发-->
    <!-- current-page 当前页 -->
    <!-- page-size  每页的条数 -->
    <!-- total 总条数 -->
    <!-- page-sizes="[2,4,6,8]" 设置修改每页条数的选项
    -->
    <!-- layout 控制分页的布局 -->
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[2, 4, 6, 8, 10]"
                   :page-size="pageSize"
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
      tableDate: [],
      // 分页设置
      query: '',
      // 默认显示1条
      currentPage: 1,
      pageSize: 2,
      total: 0
    }
  },
  methods: {
    async getTable () {
      let res = await this.axios.get(`goods`,
        {
          params: {
            query: this.query,
            // 当前页码
            pagenum: this.currentPage,
            // 每页显示条数
            pagesize: this.pageSize
          }
        }
      )
      console.log(res)
      if (res.meta.status === 200) {
        this.tableDate = res.data.goods
        this.total = res.data.total
        // console.log(this.total)
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      // 修改当前页
      this.pageSize = val
      // 重新渲染
      this.getTable()
    },
    handleCurrentChange (val) {
      // 修改currentPage
      console.log(`当前页: ${val}`)
      // 修改当前页
      this.currentPage = val
      // 重新渲染
      this.getTable()
    },
    addGoods () {
      console.log(1111)
    }
  },
  created () {
    this.getTable()
  }
}
</script>
<style lang="stylus" scoped>
.el-table >>> .cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
