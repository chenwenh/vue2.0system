<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
            <el-form-item label="审批人"  prop="user">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
                <el-select v-model="formInline.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="resetForm('formInline')">重置</el-button>
            </el-form-item>
        </el-form>
        <table-component :tableData="tableData"></table-component>
        <page-pagination></page-pagination>
    </div>
</template>
<style> 

</style>
<script>
  import tableComponent from './tableComponent'
  import pagePagination from './pagePagination'
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
        }]
      }
    },
    props: ['refresh'],
    activated: function() {
        //每次指定此组件显示时，则判断refresh是否打开过，如果打开过，则保留数据，不重新加载。为true时为没有打开，需要重新加载数据，执行相应的操作。
        if (this.refresh) {
          this.resetForm('formInline');
        }
    },
    components:{
        tableComponent,
        pagePagination
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      resetForm(formName){
          this.$refs[formName].resetFields();
      },
    }
  }
</script>