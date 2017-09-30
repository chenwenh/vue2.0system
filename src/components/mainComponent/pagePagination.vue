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
       <input v-model="names">
  </div>
</template>
<script>
    import bus from './../../assets/js/eventBus'
  export default {
    methods: {
      handleSizeChange(val) {
        this.$emit("sizeChange",val);
      },
      handleCurrentChange(val) {
        this.$emit("currentChange",val);
      }
    },
    props:['total','size','current'],
    mounted(){
      let vm=this;
      bus.$on('second',function(msg){
        vm.names=msg;
      });
    },
    data() {
      return {
        names:'',
      };
    }
  }
</script>