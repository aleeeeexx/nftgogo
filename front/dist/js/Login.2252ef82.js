(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Login"],{c6f7:function(e,t,n){"use strict";n.r(t);var o=n("7a23"),r=Object(o["createTextVNode"])("timer"),c={style:{margin:"16px"}},a=Object(o["createTextVNode"])(" 提交 "),l=Object(o["defineComponent"])({setup:function(e){var t=Object(o["ref"])(0),n=Object(o["ref"])(""),l=Object(o["ref"])(""),u=function(e){console.log("submit",e)},i=function(){t.value=60};return function(e,b){var d=Object(o["resolveComponent"])("van-field"),s=Object(o["resolveComponent"])("van-button"),f=Object(o["resolveComponent"])("van-cell-group"),m=Object(o["resolveComponent"])("van-form");return Object(o["openBlock"])(),Object(o["createBlock"])(m,{onSubmit:u},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(f,{inset:""},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(d,{modelValue:n.value,"onUpdate:modelValue":b[0]||(b[0]=function(e){return n.value=e}),name:"手机号",label:"手机号",placeholder:"手机号",rules:[{required:!0,message:"请输入手机号"}]},null,8,["modelValue"]),Object(o["createVNode"])(d,{modelValue:l.value,"onUpdate:modelValue":b[1]||(b[1]=function(e){return l.value=e}),type:"password",name:"验证码",label:"验证码",placeholder:"验证码",rules:[{required:!0,message:"请输入验证码"}]},{button:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(s,{size:"small",type:"primary",disabled:Object(o["unref"])(t)>0,onClick:i},{default:Object(o["withCtx"])((function(){return[r]})),_:1},8,["disabled"])]})),_:1},8,["modelValue"])]})),_:1}),Object(o["createElementVNode"])("div",c,[Object(o["createVNode"])(s,{round:"",block:"",type:"primary","native-type":"submit"},{default:Object(o["withCtx"])((function(){return[a]})),_:1})])]})),_:1})}}});t["default"]=l}}]);
//# sourceMappingURL=Login.2252ef82.js.map