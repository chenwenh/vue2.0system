<template>
    <div>
    <div v-show="show" style="padding-top:30px;">
        <table style="width:60%;margin-left:20%;margin-top:20px;" class="tabss">
            <tbody>
                <tr>
                    <td style="border-top-left-radius:8px;">机构名称</td>
                    <td style="border-top-right-radius:8px;">
                        <label>{{formItem.institutionName}}</label>
                    </td>
                </tr>
                <tr>
                    <td>机构代码</td>
                    <td>
                        <label>{{formItem.institutionCode}}</label>
                    </td>
                </tr>
                <tr>
                    <td>机构简称</td>
                    <td>
                        <label>{{formItem.shortName}}</label>
                    </td>
                </tr>
                <tr>
                    <td>机构类型</td>
                    <td><label>{{formItem.institutionTypeShow}}</label></td>
                </tr>
                <tr>
                    <td>发卡机构代码</td>
                    <td><label>{{formItem.issuerCode}}</label></td>
                </tr>
                <tr>
                    <td>收单机构代码</td>
                    <td><label>{{formItem.receiveCode}}</label></td>
                </tr>
                <tr>
                    <td>机构地址</td>
                    <td><label>{{formItem.institutionAddress}}</label></td>
                </tr>
                <tr>
                    <td>电子邮箱</td>
                    <td><label>{{formItem.email}}</label></td>
                </tr>
                <tr>
                    <td>联系人</td>
                    <td><label>{{formItem.contacts}}</label></td>
                </tr>
                <tr>
                    <td>联系电话</td>
                    <td><label>{{formItem.telphone}}</label></td>
                </tr>
                <tr>
                    <td>审核状态</td>
                    <td><label id="linkmanname">{{formItem.status}}</label></td>
                </tr>
                <tr>
                    <td>联系电话</td>
                    <td><label>{{formItem.telphone}}</label></td>
                </tr>
                <tr>
                    <td>审核人</td>
                    <td><label>{{formItem.auditor}}</label></td>
                </tr>
                <tr>
                    <td style="border-bottom-left-radius:8px;">审核意见</td>
                    <td><label>{{formItem.showApprovalResult}}</label></td>
                </tr>
            </tbody>
        </table>
        <p style="text-align:center;margin-top:10px;">
            <el-button type="info" icon="edit" style="font-size:14px;" @click="edit()">修改</el-button>
        </p>
    </div>
    <div v-show="!show" style="padding-top:30px;">
        <table style="width:60%;margin-left:20%;margin-top:20px;" class="tabss tabss2">
            <tbody>
                <tr>
                    <td style="border-top-left-radius:8px;">机构名称</td>
                    <td style="border-top-right-radius:8px;">
                        <el-input v-model="formItem.institutionName" placeholder="请输入" disabled></el-input>
                    </td>
                </tr>
                <tr>
                    <td>机构代码</td>
                    <td>
                        <el-input v-model="formItem.institutionCode" placeholder="请输入" disabled></el-input>
                    </td>
                </tr>
                <tr>
                    <td>机构简称</td>
                    <td>
                        <el-input v-model="formItem.shortName" placeholder="请输入"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>机构类型</td>
                    <td>
                        <el-input v-model="formItem.institutionTypeShow" placeholder="请输入" disabled></el-input>
                    </td>
                </tr>
                <tr>
                    <td>发卡机构代码</td>
                    <td>
                        <el-input v-model="formItem.issuerCode" placeholder="请输入" disabled></el-input>
                    </td>
                </tr>
                <tr>
                    <td>收单机构代码</td>
                    <td>
                        <el-input v-model="formItem.receiveCode" placeholder="请输入" disabled></el-input>
                    </td>
                </tr>
                <tr>
                    <td>机构地址</td>
                    <td>
                        <el-input v-model="formItem.institutionAddress" placeholder="请输入"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>电子邮箱</td>
                    <td style="position:relative;">
                        <el-input v-model="formItem.email" placeholder="请输入" class="email"></el-input>
                        <label id="email" style="position:absolute;right:30px;top:12px;display:inline-block;color:red;"></label>
                    </td>
                </tr>
                <tr>
                    <td>联系人</td>
                    <td>
                        <el-input v-model="formItem.contacts" placeholder="请输入"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>联系电话</td>
                    <td style="position:relative;">
                        <el-input v-model="formItem.telphone" placeholder="请输入" class="telphone"></el-input>
                        <label id="telphone" style="position:absolute;right:30px;top:12px;display:inline-block;color:red;"></label>
                    </td>
                </tr>
                <tr>
                    <td>审核状态</td>
                    <td>
                        <el-input v-model="formItem.status" placeholder="请输入" disabled></el-input>
                    </td>
                </tr>
                <tr>
                    <td>审核人</td>
                    <td>
                        <el-input v-model="formItem.auditor" disabled></el-input>
                    </td>
                </tr>
                <tr>
                    <td style="border-bottom-left-radius:8px;">审核意见</td>
                    <td>
                        <el-input v-model="formItem.showApprovalResult" disabled></el-input>
                    </td>
                </tr>
            </tbody>
        </table>
        <p style="text-align:center;margin-top:10px;">
            <el-button type="info" style="font-size:14px;width:100px;" @click="save()" :loading="loading">保存</el-button>
        </p>
    </div>
    </div>
</template>
<style scoped>
    .tabss tr td:nth-child(odd){
        background:rgba(60,141,188,0.7);
        width:40%;
        text-align:right;
        padding-right:20px;
        color:white;
        border-bottom:1px solid rgba(255,255,255,0.2);
    }
    .tabss.tabss2 tr td:nth-child(odd){
        padding-right:20px;
    }
    .tabss tr td:nth-child(even){
        width:60%;
    }
    legend{
        text-align:center;
    }
    table{
        border-collapse:collapse;
    }
    .tabss tr td,.tabss tr th{
        border:1px solid #ccc;
        border-left:none;
        padding:5px 10px;
    }
    .tabss.tabss2 tr td{
        padding:2px 3px;
    }
    .tabss.tabss2 tr td:nth-child(2){
        border:none;
    }
    table tr:hover{
        background:rgb(235,247,255);
    }
      .ivu-table td, .ivu-table th{
        height:35px;
    }
    .form .ivu-input{
        width:160px;
    }
</style>
<script>
    import {global} from '../../global/global';
    export default{
        data(){
            return{
                show:true,
                formItem:{},
                loading:false,
            }
        },
        props:['refresh'],
        activated: function() {
            //如果窗口关闭过，重新打开时需要重新加载数据。
            if (this.refresh) {
                this.search();
            }
        },
        methods:{
            search(){
                let vm=this;
                //获取表单数据。
                global.get(`/city-tucs-contr/institutionInfo/getInsInfo`,{ params:null},function (res) {
                    vm.formItem=res.body.result;
                })
            },
            //编辑
            edit(){
                this.show=false;
            },
            //保存
            save(){
                let vm=this;
                vm.loading=true;
                global.get(`/city-tucs-contr/institutionInfo/updateCurrentIns`,{ params:vm.formItem},function (res) {
                    vm.show=true;
                    vm.search();
                    vm.loading=false;
                })
            }
        }
    }
</script>