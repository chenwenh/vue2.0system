<template>
  <el-table :data="tableData" border stripe @selection-change="handleSelectionChange" style="width: 100%" max-height="500">
    <el-table-column type="index" width="50">
    </el-table-column>
    <el-table-column type="selection" width="55">
    </el-table-column>
    <el-table-column prop="date" label="日期" sortable width="180">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="地址" show-overflow-tooltip :formatter="formatter">
    </el-table-column>
    <el-table-column prop="tag" label="标签" width="100">
      <template scope="scope">
        <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  let selectedColumns=[];
  export default {
    data() {
      return {
        multipleSelection:[],
      }
    },
    props:['tableData'],
    methods: {
      //可以对传过来的数值再做进一步的处理。
      formatter(row, column) {
        return row.address+'000';
      },
      //选择多选框时得到当前选择的行的值。
       handleSelectionChange(val) {
        let vm=this;
        this.multipleSelection = val;
        selectedColumns=[];
        for(var i=0;i<this.multipleSelection.length;i++){
          selectedColumns.push(vm.multipleSelection[i].date);
        }
        console.log(selectedColumns);
      },
      //编辑时获取该行的信息。
      handleEdit(index, row) {
        console.log(index, row.date);
      },
      //删除时获取该行的信息。
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        console.log(index, row.date);
      }

    }
  }
</script>