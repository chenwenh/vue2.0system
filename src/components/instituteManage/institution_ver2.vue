<template>
    <div class="institution">
        <div class="left">
            <div style="margin-top:20px;font-size:16px;margin-bottom:6px;color:#5cadff;text-align:right;height:30px;">
                <span style="float:right;margin-right:17px;display:inline-block;">
                    <el-button type="info"  @click="refreshes()"  size="small" >刷新</el-button>
                    <el-button type="info"  id="button"   @click="add()" icon="plus" size="small">增加</el-button>
                </span>
            </div>
            <div v-for="(base,index) in baseData">
                <div v-for="item in base.children" :key="item.id" v-show="visible" style="margin-bottom:4px;">
                    <span class="span1" :title="item.title">{{item.title}}</span>
                    <span class="span">
                        <el-button type="info"  @click="info(item.id,item.title)" icon="information" size="small">详情</el-button>
                        <el-button type="info"  @click="edit(item.id,item.title)" icon="edit" size="small" >编辑</el-button>
                        <el-button type="info"  @click="del(item.id,item.title)" icon="close" size="small" >删除</el-button>
                    </span>
                </div>
            </div>
        </div>
        <div class="right">
            <div v-show="adds" class="form form1">
                <p><i class="el-icon-information" style="color:#39f;font-size:18px;margin-right:5px;"></i>{{word}}</p>
                <p></p>
                <el-form ref="formCustom" inline label-position="right" label-width="120px" :model='formCustom'>
                    <el-form-item label="机构名称" prop="institutionName">
                        <el-input v-model="formCustom.institutionName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item prop="institutionCode" label="机构代码">
                        <el-input v-model="formCustom.institutionCode" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label='卡BIN号' prop='cardBin'>
                        <el-input v-model="formCustom.cardBin" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="机构类型" prop='institutionType'>
                        <el-select v-model="formCustom.institutionType" placeholder="请选择">
                            <el-option v-for="option in insType" :value="option.key" :key="option.key">{{option.value}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发卡机构号" prop='issuerCode'>
                        <el-input v-model="formCustom.issuerCode" placeholder="请输入"></el-input>
                        <label style="position:absolute;left:-80px;top:4px;color:red;font-size:18px;" v-show="visible1">*</label>
                    </el-form-item>
                    <el-form-item label="收单机构号" prop='receiveCode'>
                        <el-input v-model="formCustom.receiveCode" placeholder="请输入"></el-input>
                        <label style="position:absolute;left:-80px;top:4px;color:red;font-size:18px;" v-show="visible1">*</label>
                    </el-form-item>
                    <el-form-item label='机构简称' prop='insShortName'>
                        <el-input v-model="formCustom.insShortName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="机构地址" prop="institutionAddress">
                        <el-input v-model="formCustom.institutionAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="formCustom.email"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="contacts">
                        <el-input v-model="formCustom.contacts"></el-input>
                    </el-form-item>
                    <el-form-item prop="telphone" label="联系电话">
                        <el-input v-model="formCustom.telphone" type="text"></el-input>
                    </el-form-item>
                    <el-form-item prop="bankName" label="开户行名称">
                        <el-input v-model="formCustom.bankName"></el-input>
                    </el-form-item>
                    <el-form-item prop="bankNo" label="开户行行号">
                        <el-input v-model="formCustom.bankNo"></el-input>
                    </el-form-item>
                    <el-form-item prop="accountCode" label="机构银行账户">
                        <el-input v-model="formCustom.bankAccountNo" type="text"></el-input>
                    </el-form-item>
                    <el-form-item prop="accountContactsName" label="结算联系人姓名">
                        <el-input v-model="formCustom.accountContactsName"></el-input>
                    </el-form-item>
                    <el-form-item prop="accoountContactsTelphone" label="结算联系人电话">
                        <el-input v-model="formCustom.accoountContactsTelphone"></el-input>
                    </el-form-item>
                    <el-form-item prop="accountContactsEmail" label="结算人电子邮箱">
                        <el-input v-model="formCustom.accountContactsEmail"></el-input>
                    </el-form-item>
                    <el-form-item label="所属地域" prop='areaCode'>
                        <el-select v-model="formCustom.areaCode" placeholder="请选择" filterable clearable>
                            <el-option v-for="option in optionsArea" :value="option.key" :key="option.key">{{option.value}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" prop="description">
                        <el-input v-model="formCustom.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..." style="width:520px;"></el-input>
                    </el-form-item>
                </el-form>
                <div style="margin-top:15px;text-align:center;"><span style="margin-left:30px;"><el-button type="info"  @click="save('formCustom')"  style="padding:6px 15px !important;width:100px;" :loading="loading">保存</el-button></span></div>
            </div>
            <div v-show="show" class="info">
                <p><i class="el-icon-information" style="color:#39f;font-size:18px;margin-right:5px;"></i>{{titleInfo}}</p>
                <table class='tables'>
                    <tr>
                        <td>机构名称</td>
                        <td>{{formItem.institutionName}}</td>
                        <td>机构简称</td>
                        <td>{{formItem.insShortName}}</td>
                    </tr>
                    <tr>
                        <td>卡BIN代码</td>
                        <td>{{formItem.cardBin}}</td>
                        <td>机构代码</td>
                        <td>{{formItem.institutionCode}}</td>
                    </tr>
                    <tr>
                        <td>机构类型</td>
                        <td>{{formItem.institutionTypeShow}}</td>
                        <td>发卡机构号</td>
                        <td>{{formItem.issuerCode}}</td>
                    </tr>
                    <tr>
                        <td>收单机构号</td>
                        <td>{{formItem.receiveCode}}</td>
                        <td>上级机构</td>
                        <td>{{formItem.parent}}</td>
                    </tr>
                    <tr>
                        <td>机构状态</td>
                        <td>{{formItem.status}}</td>
                        <td>联系人</td>
                        <td>{{formItem.contacts}}</td>
                    </tr>
                    <tr>
                        <td>联系电话</td>
                        <td>{{formItem.telphone}}</td>
                        <td>电子邮件</td>
                        <td>{{formItem.email}}</td>
                    </tr>
                    <tr>
                        <td>机构地址</td>
                        <td>{{formItem.institutionAddress}}</td>
                        <td>清算备付金账号</td>
                        <td>{{formItem.settleReserveAccount}}</td>
                    </tr>
                    <tr>
                        <td>开户行名称</td>
                        <td>{{formItem.bankName}}</td>
                        <td>开户行行号</td>
                        <td>{{formItem.bankNo}}</td>
                    </tr>
                    <tr>
                        <td>开户行银行账号</td>
                        <td>{{formItem.bankAccount}}</td>
                        <td>结算联系人姓名</td>
                        <td>{{formItem.accountContactsName}}</td>
                    </tr>
                    <tr>
                        <td>结算联系人电话</td>
                        <td>{{formItem.accoountContactsTelphone}}</td>
                        <td>结算人电子邮箱</td>
                        <td>{{formItem.accountContactsEmail}}</td>
                    </tr>
                    <tr>
                        <td style="width:15%;">账户状态</td>
                        <td style="width:35%;">{{formItem.issrStatus}}</td>
                        <td style="width:15%;">审核意见</td>
                        <td style="width:35%;">
                            <div style="max-height:150px;overflow:auto;word-break:break-all">{{formItem.showApprovalResult}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>备注</td>
                        <td colspan="3">{{formItem.description}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<style scoped>
.ivu-menu-vertical .ivu-menu-submenu-title-icon {
    display: none;
}
.el-select{
    width:194px;
}
.institution .right .form textarea.ivu-input {
    width: 522px;
}
.tables {
    width: 98%;
    margin: 0 auto;
    border: 1px solid rgba(92, 173, 255, 0.3);
}
.tables tr td {
    padding: 5px 10px;
    border-bottom: 1px solid rgba(92, 173, 255, 0.3);
}
.tables tr td:nth-child(odd) {
    background: rgba(60, 141, 188, 0.7);
    text-align: right;
    padding-right: 20px;
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    min-width: 150px;
}
.info,.form1 {
    margin-top: 10px;
    border-radius: 8px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.info>p,.form>p {
    margin-left: 30px;
}
.tab2 tr:nth-child(odd) {
    background: #eee;
    font-weight: bolder;
    font-size: 14px
}
.tab2 tr:nth-child(even) {
    font-weight: 200;
}
.ivu-menu-vertical .ivu-menu-item,.ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 8px 15px;
}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
    margin-left: 20px;
}
.left {
    width: 470px;
    float: left;
    height:100%;
    border-right: 10px solid #eeeeee;
}
.left ul span.span {
    position: absolute;
    right: 15px;
}
.institution .right {
    width: 56%;
    float: left;
    margin-left: 20px;
    margin-top: 10px;
}
.institution .right .form1 {
    background: #eeeeee;
}
table {
    border-collapse: collapse;
}
.tab2 tr td,.tab2 tr th {
    border: 1px solid #ccc;
    padding: 5px 10px;
}
table tr:hover {
    background: rgb(235, 247, 255);
}
.ivu-form-item-error-tip {
    top: 20%;
    left: 50%;
    z-index: 100;
}
.ivu-page-options-sizer .ivu-select {
    width: 100px;
}
.form .ivu-select {
    width: 160px;
}
.ivu-date-picker-rel {
    width: 160px;
}
.form .ivu-input {
    width: 160px;
}
.right .form .ivu-input {
    width: 160px;
}
.institution .right .form .ivu-select {
    width: 160px;
}
.ivu-form-item {
    margin-bottom: 0px;
}
.left .ivu-menu-submenu-title,
.left .ivu-menu-item {
    padding: 4px 15px;
}
.left span.span1 {
    width: 245px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    margin-bottom: -4px;
}
.left>ul {
    overflow: auto;
}
.ivu-menu-vertical .ivu-menu-submenu-title-icon {
    display: none;
}
</style>
<script>
    import {global} from '../../global/global';
    export default{
        data(){
            return{
                insType:[],
                baseData:[],
                optionsArea:[],
                formItem:{},
                show:false,
                adds:false,
                accordion:true,
                type:'plus-circled',
                visible:true,
                visible1:false,
                title:'保存',
                titleInfo:'',
                word:'',
                formCustom:{},
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
        mounted(){
            let vm=this;
            //控制左侧树形结构的高度。
            var height=$(window).height()-100+'px';
            $('.left').css({"max-height":height});
        },
        methods:{
            refreshes(){
                this.search();
            },
            search(){
                let vm=this;
                 //获取左侧结构数据。
                global.get(`/city-tucs-contr/institutionInfo/getInstitutionTree`,{ params:null},function (res) {
                    vm.baseData=res.body.result;
                })
            },
            reset(name){
                let vm=this;
                vm.$refs[name].resetFields();
                $('.ivu-icon-ios-close').click();
            },
            info(param,param2){
                let vm=this;
                var id=param;
                vm.show=true;
                vm.adds=false;
                global.get(`/city-tucs-contr/institutionInfo/getInsInfo?id=${id}`,{ params:null},function (res) {
                    vm.formItem=res.body.result;
                    vm.titleInfo=vm.formItem.institutionName+"机构详情";
                })
            },
            add(){
                let vm=this;
                vm.adds=true;
                vm.show=false;
                vm.title='添加';
                vm.close();
                vm.word="机构增加";
                vm.visible1=false;
            },
            close(){
                let vm=this;
                vm.$refs['formCustom'].resetFields();
                $('.ivu-icon-ios-close').click();
                var formCustom=vm.formCustom;
                for(var value in formCustom){
                    formCustom[value]='';
                }
            },
            del(param,param2){
                let vm=this;
                global.common(param,title,`/city-tucs-contr/institutionInfo/delete?id=${id}`,function(res){
                    if(res.body.errorMsg=='otherUserExistException'){
                        global.warningMesBox('该机构下还有未删除用户');
                    }
                    else{
                        vm.search();
                    }
                },'删除成功！','删除失败！');
            },
            edit(param,param2){
                let vm=this;
                var id=param;
                vm.adds=true;
                vm.show=false;
                vm.title="修改";
                vm.$refs['formCustom'].resetFields();
                global.get(`/city-tucs-contr/institutionInfo/getInsInfo?id=${id}`,{ params:null},function (res) {
                    vm.$refs['formCustom'].resetFields();
                    vm.formCustom=res.body.result;
                    vm.word=vm.formCustom.institutionName+"机构修改";
                        if(vm.formCustom.institutionType=='0'){
                        vm.visible1=true;
                    }
                    else{
                        vm.visible1=false;
                    }
                })
            },
            save(name){
                let vm=this;
                vm.loading=true;
                if(vm.title=='添加'){
                    global.submitCommon('/city-tucs-contr/institutionInfo/save?',vm.formCustom,function(res){
                        if(res.body.errorMsg=='duplicateInsCode'){
                            global.warningMesBox('机构代码重复');
                        }
                        else if(res.body.result===false){
                            global.errMsg('保存失败');
                        }
                        else{
                             global.warningMesBox('保存成功,<br/>机构管理员账户为：'+res.body.user+',密码为:'+res.body.password);
                             vm.search();
                             vm.loading=false;
                        }
                    },'添加成功','添加失败');  
                }
                else if(vm.title=='修改'){
                    global.submitCommon('/city-tucs-contr/institutionInfo/update?',vm.formCustom,function(res){
                        if(res.body.errorMsg=='duplicateInsCode'){
                            global.warningMesBox('机构代码重复');
                        }
                        else if(res.body.result===false){
                            global.errMsg('修改失败');
                        }
                        else{
                             vm.search();
                             vm.loading=false;
                        }
                    },'修改成功','修改失败');
                }
                
            },

        }
    }
</script>