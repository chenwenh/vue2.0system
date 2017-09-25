<template>
    <div class="block" style="text-align:right;padding-right:30px;padding-top:20px;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[20,50,100, 200]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    methods: {
      handleSizeChange(val) {
       // console.log(`每页 ${val} 条`);
        this.$emit("sizeChange",val);
      },
      handleCurrentChange(val) {
       // console.log(`当前页: ${val}`);
        this.$emit("currentChange",val);
      }
    },
    props:['total','size','current'],
    data() {
      return {
      };
    }
  }
</script>