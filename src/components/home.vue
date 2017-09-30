<template>
    <p class="welcome" style="border:none;">
       <i class="el-icon-circle-check" style="font-size:30px;color:#0c6"></i><span>欢迎进入后台管理系统</span>
    </p>
</template>
<style>
    .welcome{
        border-radius:4px;
        position:absolute;
        top:40%;
        left:50%;
        padding-top:30px;
        animation:show 0.8s;
    }
    .welcome span{
        margin-top:-4px;
        font-size:16px;
        position:relative;
        top:-4px;
        left:8px;
    }
    @keyframes show{
        from{
            transform:scale(0.5);
        }
        to{
            transform:scale(1);
        }
    }
</style>