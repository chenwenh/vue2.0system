import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from './../assets/js/zh_CN.js'
import { Validator } from 'vee-validate'
Validator.addLocale(zh_CN);

//自定义规则
Validator.extend('nickname', {
  messages: {
   zh_CN:field => '请输入正确的呢称(2-15字符，中英文、数字和下划线)',
  },
  validate: value => {
   return /^[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+$/.test(value)
  }
});

Validator.extend('mobile', {
  messages: {
   zh_CN:field => '必须是11位手机号码',
  },
  validate: value => {
   return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});

const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields', 
  delay: 0, //对错误提示的延迟时间
  locale: 'zh_CN', 
  dictionary: null, 
  strict: true, //代表没有设置规则的表单不进行校验
  enableAutoClasses: true,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'ng-valid', // model is valid
    invalid: 'ng-invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'ng-dirty' // control has been interacted with
  },
  events: 'input|blur',//在用户输入和表单失去焦点时都进行校验
  inject: true  
}

//修改默认错误提示
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '邮箱格式不正确',
      required: ( field )=> "请输入" + field
    },
    attributes:{
        email:'邮箱',
        checkPass:'密码',
        account: '用户名',
        phone: '手机'
    }

  }
};
Validator.updateDictionary(dictionary);

Vue.use(VeeValidate,config)