(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["BusinessOpportunityDetail"],{"0105":function(e,t,c){"use strict";c.r(t);var n=c("9ab4"),r=c("7a23"),o=c("6c02"),a=c("c135"),i=c("291c");Object(r["pushScopeId"])("data-v-66d750d7");var l=Object(r["createElementVNode"])("div",{class:"title"},"基本信息",-1),s={class:"body"},u={class:"pancel"},d=Object(r["createElementVNode"])("div",{class:"left"},"客户",-1),b={class:"right"},v={class:"pancel"},O=Object(r["createElementVNode"])("div",{class:"left"},"房屋",-1),j={class:"right"},m={class:"pancel"},f=Object(r["createElementVNode"])("div",{class:"left"},"手机",-1),p={class:"right"},h={class:"pancel"},g=Object(r["createElementVNode"])("div",{class:"left"},"意向描述",-1),N={class:"right"},E=Object(r["createElementVNode"])("div",{class:"title"},"转介进度",-1),k={class:"process"},I={key:0,class:"line"},V={class:"right"},y={class:"name"},S={class:"content"},w={class:"time"};Object(r["popScopeId"])();var B=Object(r["defineComponent"])({setup:function(e){var t=this,c=Object(r["ref"])(null),B=Object(o["d"])(),C=Object(r["computed"])((function(){var e,t,n,r,o,a,i,l;return(null===(e=c.value)||void 0===e?void 0:e.houseCode)?null===(t=c.value)||void 0===t?void 0:t.houseName:(null!==(r=null===(n=c.value)||void 0===n?void 0:n.provinceName)&&void 0!==r?r:"")+(null!==(a=null===(o=c.value)||void 0===o?void 0:o.cityName)&&void 0!==a?a:"")+(null!==(l=null===(i=c.value)||void 0===i?void 0:i.projectName)&&void 0!==l?l:"")})),D=B.query.id,T=function(e){return Object(n["b"])(t,void 0,void 0,(function(){var t;return Object(n["c"])(this,(function(n){switch(n.label){case 0:return[4,Object(a["a"])(e)];case 1:return t=n.sent(),c.value=t,[2]}}))}))},R=function(){return Object(n["b"])(t,void 0,void 0,(function(){return Object(n["c"])(this,(function(e){switch(e.label){case 0:return[4,Object(i["b"])(B.query.accessToken,B.query.companyCode,B.path+"?id="+D)];case 1:return e.sent(),T(+D),[2]}}))}))};return R(),function(e,t){var n,o,a,i;return Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],null,[l,Object(r["createElementVNode"])("div",s,[Object(r["createElementVNode"])("div",u,[d,Object(r["createElementVNode"])("div",b,Object(r["toDisplayString"])(null===(n=c.value)||void 0===n?void 0:n.customerName),1)]),Object(r["createElementVNode"])("div",v,[O,Object(r["createElementVNode"])("div",j,Object(r["toDisplayString"])(Object(r["unref"])(C)),1)]),Object(r["createElementVNode"])("div",m,[f,Object(r["createElementVNode"])("div",p,Object(r["toDisplayString"])(null===(o=c.value)||void 0===o?void 0:o.customerMobile),1)]),Object(r["createElementVNode"])("div",h,[g,Object(r["createElementVNode"])("div",N,Object(r["toDisplayString"])(null===(a=c.value)||void 0===a?void 0:a.intentionDescription),1)])]),E,Object(r["createElementVNode"])("div",k,[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(null===(i=c.value)||void 0===i?void 0:i.feedbackRecords,(function(e,t){var n;return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",{class:"box",key:t},[t+1!==(null===(n=c.value)||void 0===n?void 0:n.feedbackRecords.length)?(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",I)):Object(r["createCommentVNode"])("",!0),Object(r["createElementVNode"])("div",{class:Object(r["normalizeClass"])(0===t?"circle":"darkCircle")},null,2),Object(r["createElementVNode"])("div",V,[Object(r["createElementVNode"])("div",y,Object(r["toDisplayString"])(e.title),1),Object(r["createElementVNode"])("div",S,Object(r["toDisplayString"])(e.content),1),Object(r["createElementVNode"])("div",w,Object(r["toDisplayString"])(e.createdTime),1)])])})),128))])],64)}}}),C=(c("e42b"),c("6b0d")),D=c.n(C);const T=D()(B,[["__scopeId","data-v-66d750d7"]]);t["default"]=T},"145d":function(e,t,c){},"291c":function(e,t,c){"use strict";c.d(t,"a",(function(){return l})),c.d(t,"b",(function(){return s}));var n=c("9ab4"),r=c("ea9b"),o=c("6c02"),a=function(e,t){return Object(n["b"])(void 0,void 0,void 0,(function(){var c;return Object(n["c"])(this,(function(n){switch(n.label){case 0:return[4,Object(r["b"])(e,t)];case 1:return c=n.sent(),[2,c]}}))}))},i=function(e){return Object(n["b"])(void 0,void 0,void 0,(function(){var t;return Object(n["c"])(this,(function(c){switch(c.label){case 0:return[4,Object(r["f"])(e)];case 1:return t=c.sent(),[2,t]}}))}))},l=function(e){var t=e.externalUserId,c=e.mobile,n=e.userId,r=e.accessToken,o=e.refreshToken;t&&localStorage.setItem("externalUserId",t),c&&localStorage.setItem("mobile",c),n&&localStorage.setItem("userId",n),r&&localStorage.setItem("access_token",r),o&&localStorage.setItem("refreshToken",o)},s=function(e,t,c){return Object(n["b"])(void 0,void 0,void 0,(function(){var r,s,u,d,b,v,O;return Object(n["c"])(this,(function(n){switch(n.label){case 0:return e&&t?(r=Object(o["e"])(),[4,a(e,t)]):[2,!1];case 1:if(s=n.sent(),l(s),localStorage.setItem("companyCode",t),localStorage.setItem("pulin_token",e),u=localStorage.getItem("mobile"),d=localStorage.getItem("userId"),b=localStorage.getItem("externalUserId"),v=localStorage.getItem("refreshToken"),!(s.mobile===u&&b&&v&&d))return[3,6];n.label=2;case 2:return n.trys.push([2,4,,5]),[4,i({externalUserId:b,userId:d,refreshToken:v})];case 3:return O=n.sent(),l(Object.assign(O,{mobile:u})),[3,5];case 4:return n.sent(),r.replace({path:"/mobile-login",query:{mobile:s.mobile,redirect:encodeURIComponent(c)}}),[3,5];case 5:return[3,7];case 6:console.log("useRouter(): ",r),r.replace({path:"/mobile-login",query:{mobile:s.mobile,redirect:encodeURIComponent(c)}}),n.label=7;case 7:return[2,!0]}}))}))}},c135:function(e,t,c){"use strict";c.d(t,"e",(function(){return a})),c.d(t,"b",(function(){return i})),c.d(t,"a",(function(){return l})),c.d(t,"c",(function(){return s})),c.d(t,"d",(function(){return u}));var n=c("9ab4"),r=c("4763"),o=c("b32d"),a=function(e){return Object(o["a"])({url:r["b"]+"/api/referral",method:"POST",data:e})},i=function(e,t){return void 0===t&&(t={page:1,size:10}),Object(n["b"])(void 0,void 0,void 0,(function(){var c,a;return Object(n["c"])(this,(function(i){switch(i.label){case 0:return[4,Object(o["a"])({url:r["b"]+"/api/referral/"+e,method:"get",params:Object(n["a"])({},t)})];case 1:return c=i.sent(),a=c.result.records,[2,a]}}))}))},l=function(e){return Object(n["b"])(void 0,void 0,void 0,(function(){var t,c;return Object(n["c"])(this,(function(n){switch(n.label){case 0:return[4,Object(o["a"])({url:r["b"]+"/referralFeedbackRecord/"+e,method:"get"})];case 1:return t=n.sent(),c=t.result,[2,c]}}))}))},s=function(e){return Object(n["b"])(void 0,void 0,void 0,(function(){var t,c;return Object(n["c"])(this,(function(n){switch(n.label){case 0:return[4,Object(o["a"])({url:r["b"]+"/api/visitor/getVisitorByMobile",method:"get",params:{mobile:e}})];case 1:return t=n.sent(),c=t.result,[2,c]}}))}))},u=function(e){return Object(n["b"])(void 0,void 0,void 0,(function(){var t,c;return Object(n["c"])(this,(function(n){switch(n.label){case 0:return[4,Object(o["a"])({url:r["a"]+"/frontend/employee/search",method:"POST",data:e})];case 1:return t=n.sent(),c=t.result,[2,c]}}))}))}},e42b:function(e,t,c){"use strict";c("145d")}}]);
//# sourceMappingURL=BusinessOpportunityDetail.8607d53c.js.map