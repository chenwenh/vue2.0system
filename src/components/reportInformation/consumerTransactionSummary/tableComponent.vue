<template>
    <el-table :data="tableData" border stripe style="width: 100%" :max-height="height" show-summary :summary-method="getSummaries">
        <el-table-column type="index" width="70"></el-table-column>
        <el-table-column v-for="column in columns" :key="column.key" :prop="column.key" :label="column.title" :width="column.width"></el-table-column>
    </el-table>
</template>
<script>
    import {global} from '../../../global/global';
    let selectedColumns=[];
    export default{
        data(){
            return{
                height:500,
                tableData:[],
                columns:[
                {
                    title: '省',
                    key: 'province',
                    width:170
                },
                {
                    title: '市',
                    key: 'city',
                    width:150
                },
                {
                    title: '消费方式',
                    key: 'consumeType',
                    width:150
                },
                {
                    title: '公交公司',
                    key: 'busCompany',
                    width:150
                },
                {
                    title: '车队',
                    key: 'busTeam',
                     width:150
                },
                {
                    title: '线路',
                    key: 'lineNo',
                    width:100
                },
                {
                    title: '受理卡种',
                    key: 'cardType',
                    width:120
                },
                {
                    title: '交易笔数',
                    key: 'transCount',
                    width:100
                },
                {
                    title: '交易金额',
                    key: 'transAmount',
                    width:120
                },
                {
                    title: '手续费',
                    key: 'fee',
                    width:120
                },
                {
                    title: '交易结算',
                    key: 'settleAmount',
                    width:100
                },
                {
                    title: '交易日期',
                    key: 'transDate',
                    width:150
                },
                    {
                    title: '清算日期',
                    key: 'clearDate',
                    width:150
                },
                ],
            }
        },
         mounted(){
            this.height=global.tableHeight(160);
        },
        methods:{
            //可以对传过来的数值再做进一步的处理。
            formatter(row, column) {
                return row.province;
            },
            //填充表格
            tableDatas(res){
                this.tableData=res;
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                    
                } else {
                    sums[index] = '';
                }
                });
                sums[1]='';
                sums[2]='';
                sums[3]='';
                sums[4]='';
                sums[5]='';
                sums[6]='';
                sums[7]='';
                sums[9]=global.toDecimal(sums[9],2);//保留两位小数
                sums[10]=global.toDecimal(sums[10],4);//保留四位小数
                sums[11]=global.toDecimal(sums[11],4);//保留四位小数
                return sums;
            }
        },
    }
</script>