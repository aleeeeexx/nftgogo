(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["SampleRoomCloseCreate"],{"01c9":function(e,t,n){},"0f33":function(e,t,n){},"39a8":function(e,t,n){"use strict";n("01c9")},"511e":function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"f",(function(){return a})),n.d(t,"b",(function(){return s})),n.d(t,"e",(function(){return l})),n.d(t,"d",(function(){return d})),n.d(t,"a",(function(){return u}));var o=n("9ab4"),c=n("b32d"),i=n("4763"),r=function(e){return Object(o["b"])(void 0,void 0,void 0,(function(){var t;return Object(o["c"])(this,(function(n){switch(n.label){case 0:return[4,Object(c["a"])({url:i["b"]+"/sampleRoom/api/withdrawal/edit/details/"+e,method:"get"})];case 1:return t=n.sent(),[2,t.result]}}))}))};function a(e){return Object(c["a"])({url:i["b"]+"/sampleRoom/api/withdrawal/save",method:"POST",data:e})}function s(e){return Object(c["a"])({url:i["b"]+"/sampleRoom/api/withdrawal/solve",method:"POST",data:e})}var l=function(e){return Object(o["b"])(void 0,void 0,void 0,(function(){var t;return Object(o["c"])(this,(function(n){switch(n.label){case 0:return[4,Object(c["a"])({url:i["b"]+"/sampleRoom/api/withdrawal/space/"+e,method:"get"})];case 1:return t=n.sent(),[2,t.result]}}))}))},d=function(e){return Object(o["b"])(void 0,void 0,void 0,(function(){var t;return Object(o["c"])(this,(function(n){switch(n.label){case 0:return[4,Object(c["a"])({url:i["b"]+"/sampleRoom/api/withdrawal/details/"+e,method:"get"})];case 1:return t=n.sent(),[2,t.result]}}))}))},u=function(e){return Object(o["b"])(void 0,void 0,void 0,(function(){var t;return Object(o["c"])(this,(function(n){switch(n.label){case 0:return[4,Object(c["a"])({url:i["b"]+"/sampleRoom/api/withdrawal/agree/"+e,method:"POST"})];case 1:return t=n.sent(),[2,t.result]}}))}))}},"5de2":function(e,t,n){"use strict";n("8eca")},"63bb":function(e,t){!function(t,n){e.exports=n(t)}(window,(function(e,t){if(!e.jWeixin){var n,o={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},c=function(){var e={};for(var t in o)e[o[t]]=t;return e}(),i=e.document,r=i.title,a=navigator.userAgent.toLowerCase(),s=navigator.platform.toLowerCase(),l=!(!s.match("mac")&&!s.match("win")),d=-1!=a.indexOf("wxdebugger"),u=-1!=a.indexOf("micromessenger"),p=-1!=a.indexOf("android"),f=-1!=a.indexOf("iphone")||-1!=a.indexOf("ipad"),m=(n=a.match(/micromessenger\/(\d+\.\d+\.\d+)/)||a.match(/micromessenger\/(\d+\.\d+)/))?n[1]:"",g={initStartTime:C(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},b={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:f?1:p?2:-1,clientVersion:m,url:encodeURIComponent(location.href)},v={},h={_completes:[]},O={state:0,data:{}};L((function(){g.initEndTime=C()}));var j=!1,y=[],V={config:function(t){B("config",v=t);var n=!1!==v.check;L((function(){if(n)w(o.config,{verifyJsApiList:T(v.jsApiList),verifyOpenTagList:T(v.openTagList)},function(){h._complete=function(e){g.preVerifyEndTime=C(),O.state=1,O.data=e},h.success=function(e){b.isPreVerifyOk=0},h.fail=function(e){h._fail?h._fail(e):O.state=-1};var e=h._completes;return e.push((function(){!function(){if(!(l||d||v.debug||m<"6.0.2"||b.systemType<0)){var e=new Image;b.appId=v.appId,b.initTime=g.initEndTime-g.initStartTime,b.preVerifyTime=g.preVerifyEndTime-g.preVerifyStartTime,V.getNetworkType({isInnerInvoke:!0,success:function(t){b.networkType=t.networkType;var n="https://open.weixin.qq.com/sdk/report?v="+b.version+"&o="+b.isPreVerifyOk+"&s="+b.systemType+"&c="+b.clientVersion+"&a="+b.appId+"&n="+b.networkType+"&i="+b.initTime+"&p="+b.preVerifyTime+"&u="+b.url;e.src=n}})}}()})),h.complete=function(t){for(var n=0,o=e.length;n<o;++n)e[n]();h._completes=[]},h}()),g.preVerifyStartTime=C();else{O.state=1;for(var e=h._completes,t=0,c=e.length;t<c;++t)e[t]();h._completes=[]}})),V.invoke||(V.invoke=function(t,n,o){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,N(n),o)},V.on=function(t,n){e.WeixinJSBridge&&WeixinJSBridge.on(t,n)})},signurl:function(){return b.url},ready:function(e){0!=O.state?e():(h._completes.push(e),!u&&v.debug&&e())},error:function(e){m<"6.0.2"||(-1==O.state?e(O.data):h._fail=e)},checkJsApi:function(e){w("checkJsApi",{jsApiList:T(e.jsApiList)},(e._complete=function(e){if(p){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=function(e){var t=e.checkResult;for(var n in t){var o=c[n];o&&(t[o]=t[n],delete t[n])}return e}(e)},e))},onMenuShareTimeline:function(e){I(o.onMenuShareTimeline,{complete:function(){w("shareTimeline",{title:e.title||r,desc:e.title||r,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){I(o.onMenuShareAppMessage,{complete:function(t){"favorite"===t.scene?w("sendAppMessage",{title:e.title||r,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):w("sendAppMessage",{title:e.title||r,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){I(o.onMenuShareQQ,{complete:function(){w("shareQQ",{title:e.title||r,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){I(o.onMenuShareWeibo,{complete:function(){w("shareWeiboApp",{title:e.title||r,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){I(o.onMenuShareQZone,{complete:function(){w("shareQZone",{title:e.title||r,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){w("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){w("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){w("startRecord",{},e)},stopRecord:function(e){w("stopRecord",{},e)},onVoiceRecordEnd:function(e){I("onVoiceRecordEnd",e)},playVoice:function(e){w("playVoice",{localId:e.localId},e)},pauseVoice:function(e){w("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){w("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){I("onVoicePlayEnd",e)},uploadVoice:function(e){w("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){w("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){w("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){w("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(p){var t=e.localIds;try{t&&(e.localIds=JSON.parse(t))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){w(o.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){w("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){w("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===j?(j=!0,w("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(j=!1,y.length>0){var t=y.shift();wx.getLocalImgData(t)}},e))):y.push(e)},getNetworkType:function(e){w("getNetworkType",{},(e._complete=function(e){e=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var n=e.subtype;if(delete e.subtype,n)e.networkType=n;else{var o=t.indexOf(":"),c=t.substring(o+1);switch(c){case"wifi":case"edge":case"wwan":e.networkType=c;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){w("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)},getLocation:function(e){w(o.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))},hideOptionMenu:function(e){w("hideOptionMenu",{},e)},showOptionMenu:function(e){w("showOptionMenu",{},e)},closeWindow:function(e){w("closeWindow",{},e=e||{})},hideMenuItems:function(e){w("hideMenuItems",{menuList:e.menuList},e)},showMenuItems:function(e){w("showMenuItems",{menuList:e.menuList},e)},hideAllNonBaseMenuItem:function(e){w("hideAllNonBaseMenuItem",{},e)},showAllNonBaseMenuItem:function(e){w("showAllNonBaseMenuItem",{},e)},scanQRCode:function(e){w("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(f){var t=e.resultStr;if(t){var n=JSON.parse(t);e.resultStr=n&&n.scan_code&&n.scan_code.scan_result}}},e))},openAddress:function(e){w(o.openAddress,{},(e._complete=function(e){e=function(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}(e)},e))},openProductSpecificView:function(e){w(o.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)},addCard:function(e){for(var t=e.cardList,n=[],c=0,i=t.length;c<i;++c){var r=t[c],a={card_id:r.cardId,card_ext:r.cardExt};n.push(a)}w(o.addCard,{card_list:n},(e._complete=function(e){var t=e.card_list;if(t){for(var n=0,o=(t=JSON.parse(t)).length;n<o;++n){var c=t[n];c.cardId=c.card_id,c.cardExt=c.card_ext,c.isSuccess=!!c.is_succ,delete c.card_id,delete c.card_ext,delete c.is_succ}e.cardList=t,delete e.card_list}},e))},chooseCard:function(e){w("chooseCard",{app_id:v.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))},openCard:function(e){for(var t=e.cardList,n=[],c=0,i=t.length;c<i;++c){var r=t[c],a={card_id:r.cardId,code:r.code};n.push(a)}w(o.openCard,{card_list:n},e)},consumeAndShareCard:function(e){w(o.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)},chooseWXPay:function(e){w(o.chooseWXPay,_(e),e)},openEnterpriseRedPacket:function(e){w(o.openEnterpriseRedPacket,_(e),e)},startSearchBeacons:function(e){w(o.startSearchBeacons,{ticket:e.ticket},e)},stopSearchBeacons:function(e){w(o.stopSearchBeacons,{},e)},onSearchBeacons:function(e){I(o.onSearchBeacons,e)},openEnterpriseChat:function(e){w("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)},launchMiniProgram:function(e){w("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"===typeof e&&e.length>0){var t=e.split("?")[0],n=e.split("?")[1];return t+=".html",void 0!==n?t+"?"+n:t}}(e.path),envVersion:e.envVersion},e)},openBusinessView:function(e){w("openBusinessView",{businessType:e.businessType,queryString:e.queryString||"",envVersion:e.envVersion},(e._complete=function(e){if(p){var t=e.extraData;if(t)try{e.extraData=JSON.parse(t)}catch(t){e.extraData={}}}},e))},miniProgram:{navigateBack:function(e){e=e||{},L((function(){w("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)}))},navigateTo:function(e){L((function(){w("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)}))},redirectTo:function(e){L((function(){w("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)}))},switchTab:function(e){L((function(){w("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)}))},reLaunch:function(e){L((function(){w("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)}))},postMessage:function(e){L((function(){w("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)}))},getEnv:function(t){L((function(){t({miniprogram:"miniprogram"===e.__wxjs_environment})}))}}},S=1,k={};return i.addEventListener("error",(function(e){if(!p){var t=e.target,n=t.tagName,o=t.src;if(("IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n)&&-1!=o.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var c=t["wx-id"];if(c||(c=S++,t["wx-id"]=c),k[c])return;k[c]=!0,wx.ready((function(){wx.getLocalImgData({localId:o,success:function(e){t.src=e.localData}})}))}}}),!0),i.addEventListener("load",(function(e){if(!p){var t=e.target,n=t.tagName;if(t.src,"IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){var o=t["wx-id"];o&&(k[o]=!1)}}}),!0),t&&(e.wx=e.jWeixin=V),V}function w(t,n,o){e.WeixinJSBridge?WeixinJSBridge.invoke(t,N(n),(function(e){E(t,e,o)})):B(t,o)}function I(t,n,o){e.WeixinJSBridge?WeixinJSBridge.on(t,(function(e){o&&o.trigger&&o.trigger(e),E(t,e,n)})):B(t,o||n)}function N(e){return(e=e||{}).appId=v.appId,e.verifyAppId=v.appId,e.verifySignType="sha1",e.verifyTimestamp=v.timestamp+"",e.verifyNonceStr=v.nonceStr,e.verifySignature=v.signature,e}function _(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function E(e,t,n){"openEnterpriseChat"!=e&&"openBusinessView"!==e||(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var o=t.errMsg;o||(o=t.err_msg,delete t.err_msg,o=function(e,t){var n=e,o=c[n];o&&(n=o);var i="ok";if(t){var r=t.indexOf(":");"confirm"==(i=t.substring(r+1))&&(i="ok"),"failed"==i&&(i="fail"),-1!=i.indexOf("failed_")&&(i=i.substring(7)),-1!=i.indexOf("fail_")&&(i=i.substring(5)),"access denied"!=(i=(i=i.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=i||(i="permission denied"),"config"==n&&"function not exist"==i&&(i="ok"),""==i&&(i="fail")}return n+":"+i}(e,o),t.errMsg=o),(n=n||{})._complete&&(n._complete(t),delete n._complete),o=t.errMsg||"",v.debug&&!n.isInnerInvoke&&alert(JSON.stringify(t));var i=o.indexOf(":");switch(o.substring(i+1)){case"ok":n.success&&n.success(t);break;case"cancel":n.cancel&&n.cancel(t);break;default:n.fail&&n.fail(t)}n.complete&&n.complete(t)}function T(e){if(e){for(var t=0,n=e.length;t<n;++t){var c=e[t],i=o[c];i&&(e[t]=i)}return e}}function B(e,t){if(!(!v.debug||t&&t.isInnerInvoke)){var n=c[e];n&&(e=n),t&&t._complete&&delete t._complete,console.log('"'+e+'",',t||"")}}function C(){return(new Date).getTime()}function L(t){u&&(e.WeixinJSBridge?t():i.addEventListener&&i.addEventListener("WeixinJSBridgeReady",t,!1))}}))},"8d13":function(e,t,n){"use strict";n("0f33")},"8eca":function(e,t,n){},da56:function(e,t,n){"use strict";n.r(t);var o=n("9ab4"),c=n("7a23"),i=n("dd03"),r=n("6c02"),a=n("511e"),s=n("626a"),l=n("5502"),d=n("63bb"),u=n.n(d);Object(c["pushScopeId"])("data-v-7e60d6ba");var p={class:"pancel"},f={class:"left"},m={class:"right"},g={class:"content"};Object(c["popScopeId"])();var b=Object(c["defineComponent"])({props:{title:{type:String,default:""},content:{type:String,default:""},isLink:{type:Boolean,defalut:!0}},setup:function(e){var t=e;return function(e,n){var o=Object(c["resolveComponent"])("van-icon");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",p,[Object(c["createElementVNode"])("div",f,Object(c["toDisplayString"])(t.title),1),Object(c["createElementVNode"])("div",m,[Object(c["createElementVNode"])("span",g,Object(c["toDisplayString"])(t.content),1),Object(c["createVNode"])(o,{name:"arrow",class:"logo",color:"#B2B2B2"})])])}}}),v=(n("39a8"),n("6b0d")),h=n.n(v);const O=h()(b,[["__scopeId","data-v-7e60d6ba"]]);var j=O;Object(c["pushScopeId"])("data-v-aa67a0cc");var y={key:0,style:{"padding-top":"1px"}},V={key:0,class:"card-title"},S=Object(c["createElementVNode"])("div",{class:"card-title"},[Object(c["createElementVNode"])("span",null,"样板间撤场验收记录")],-1),k={class:"header header-text headerEdit"},w=Object(c["createElementVNode"])("span",null,"归还物品",-1),I={class:"link"},N=Object(c["createElementVNode"])("span",{class:"content"},"修改",-1),_={key:0},E={class:"result"},T={class:"title"},B={class:"name"},C={class:"card1"},L=Object(c["createElementVNode"])("div",{class:"header"},"水电读数",-1),x={class:"body"},M={class:"label"},P={class:"des"},A={class:"right"},R=["onClick"],D={key:1,style:{"padding-top":"1px"}},U={class:"content"},W={class:"question"},J=Object(c["createElementVNode"])("div",{class:"title"},"样板间验房",-1),q=Object(c["createElementVNode"])("div",{class:"name"},"选择需要验收的空间部位，并记录验收结果",-1),Q={class:"content"},F={class:"question"},z=Object(c["createElementVNode"])("div",{class:"title"},"归还物品",-1),Z=Object(c["createElementVNode"])("div",{class:"name"},"点击输入需要在撤场前归还的物品",-1),H={class:"card1"},X=Object(c["createElementVNode"])("div",{class:"header"},"水电读数",-1),G={class:"body"},$={class:"des"},K={class:"foot"},Y=Object(c["createTextVNode"])("同步业主查看");Object(c["popScopeId"])();var ee=Object(c["defineComponent"])({setup:function(e){var t=this,n=Object(r["e"])(),d=Object(r["d"])(),p=Object(l["b"])(),f=d.query.id,m=Object(c["reactive"])({costVoList:[],problemVoList:[],spaceVoList:[],thingVoList:[],viewFlag:0}),g=Object(c["computed"])((function(){return m.thingVoList.filter((function(e){return e.num>0}))})),b=function(){return Object(o["b"])(t,void 0,void 0,(function(){var e;return Object(o["c"])(this,(function(t){switch(t.label){case 0:return[4,Object(a["c"])(+f)];case 1:return e=t.sent(),m.costVoList=e.costVoList,m.spaceVoList=e.spaceVoList,m.problemVoList=e.problemVoList,m.thingVoList=e.thingVoList,m.viewFlag=e.viewFlag,p.commit("setSampleInfo",e),v(),[2]}}))}))},v=function(){console.log(m),m.costVoList.length||(m.costVoList=[{degree:"",project:"水费"},{degree:"",project:"电费"}])},h=Object(c["ref"])(null),O=Object(c["ref"])(null),ee=function(e){var t,n;0===e&&(null===(t=h.value)||void 0===t||t.focus()),1===e&&(null===(n=O.value)||void 0===n||n.focus())};b();var te=function(){n.push({path:"/SampleRoomCloseSpace",query:d.query})},ne=function(){n.push({path:"/SampleRoomCloseHandle",query:d.query})},oe=function(){n.push({path:"/SampleRoomCloseReturn",query:d.query})},ce=Object(c["computed"])((function(){return m.costVoList.every((function(e){return e.degree}))})),ie=Object(c["computed"])((function(){return m.problemVoList.filter((function(e){return e.result&&e.result.status})).length})),re=Object(c["ref"])(!1),ae=function(){return Object(o["b"])(t,void 0,void 0,(function(){var e;return Object(o["c"])(this,(function(t){switch(t.label){case 0:e=m.costVoList.map((function(e){return Object(o["a"])(Object(o["a"])({},e),{sampleRoomId:+f,type:3})})),re.value=!0,t.label=1;case 1:return t.trys.push([1,3,,4]),[4,Object(a["f"])(e)];case 2:return t.sent(),re.value=!1,s["a"].success("提交成功"),u.a.miniProgram.navigateBack(),[3,4];case 3:return t.sent(),re.value=!1,[3,4];case 4:return[2]}}))}))};return function(e,t){var n=Object(c["resolveComponent"])("van-icon"),o=Object(c["resolveComponent"])("van-field"),r=Object(c["resolveComponent"])("van-button");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[Object(c["unref"])(m).viewFlag?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",y,[Object(c["unref"])(m).problemVoList.length?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",V,[Object(c["createElementVNode"])("span",null,"问题跟进 "+Object(c["toDisplayString"])(Object(c["unref"])(ie))+"/"+Object(c["toDisplayString"])(Object(c["unref"])(m).problemVoList.length),1)])):Object(c["createCommentVNode"])("",!0),Object(c["unref"])(m).problemVoList.length?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{key:1,onClick:ne},[Object(c["createVNode"])(j,{title:"验房遗留问题跟进",content:"记录"})])):Object(c["createCommentVNode"])("",!0),S,Object(c["createElementVNode"])("div",{onClick:te},[Object(c["createVNode"])(j,{title:"样板间验房",content:"修改"})]),Object(c["createElementVNode"])("div",{class:"card",onClick:oe},[Object(c["createElementVNode"])("div",k,[w,Object(c["createElementVNode"])("div",I,[N,Object(c["createVNode"])(n,{name:"arrow",class:"logo",color:"#B2B2B2"})])]),Object(c["unref"])(g).length?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",_,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(Object(c["unref"])(g),(function(e,t){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"content",key:t},[Object(c["createElementVNode"])("div",E,[Object(c["createElementVNode"])("div",T,Object(c["toDisplayString"])(e.project),1),Object(c["createElementVNode"])("div",B,"数量x"+Object(c["toDisplayString"])(e.num)+", "+Object(c["toDisplayString"])(0===e.status?"待还":"已还"),1)])])})),128))])):Object(c["createCommentVNode"])("",!0)]),Object(c["createElementVNode"])("div",C,[L,Object(c["createElementVNode"])("div",x,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(Object(c["unref"])(m).costVoList,(function(e,t){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"input-box",key:t},[Object(c["createElementVNode"])("div",M,[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e.project),1),Object(c["createElementVNode"])("span",P,"("+Object(c["toDisplayString"])("水费"===e.project?"吨":"度")+")",1)]),Object(c["createVNode"])(o,{modelValue:e.degree,"onUpdate:modelValue":function(t){return e.degree=t},label:"",type:"number",placeholder:"请输入当前读数",ref:"input"+t},null,8,["modelValue","onUpdate:modelValue"]),Object(c["createElementVNode"])("div",A,[Object(c["createElementVNode"])("span",{class:"fix",onClick:function(e){return ee(t)}},"修改",8,R)])])})),128))])])])):Object(c["createCommentVNode"])("",!0),Object(c["unref"])(m).viewFlag?Object(c["createCommentVNode"])("",!0):(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",D,[Object(c["createElementVNode"])("div",{class:"card1",onClick:te},[Object(c["createElementVNode"])("div",U,[Object(c["createElementVNode"])("div",W,[J,q,Object(c["createVNode"])(n,{name:"arrow",class:"logo",color:"#B2B2B2"})])])]),Object(c["createElementVNode"])("div",{class:"card1",onClick:oe},[Object(c["createElementVNode"])("div",Q,[Object(c["createElementVNode"])("div",F,[z,Z,Object(c["createVNode"])(n,{name:"arrow",class:"logo",color:"#B2B2B2"})])])]),Object(c["createElementVNode"])("div",H,[X,Object(c["createElementVNode"])("div",G,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(Object(c["unref"])(m).costVoList,(function(e,t){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{class:"input-box",key:t},[Object(c["createElementVNode"])("div",{class:Object(c["normalizeClass"])(["label",0!==t?"van-hairline--top":""])},[Object(c["createTextVNode"])(Object(c["toDisplayString"])(e.project),1),Object(c["createElementVNode"])("span",$,"("+Object(c["toDisplayString"])("水费"===e.project?"吨":"度")+")",1)],2),Object(c["createVNode"])(o,{modelValue:e.degree,"onUpdate:modelValue":function(t){return e.degree=t},label:"",type:"number",placeholder:"请输入当前读数"},null,8,["modelValue","onUpdate:modelValue"])])})),128))])])])),Object(c["createVNode"])(i["a"],null,{content:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("div",K,[Object(c["createVNode"])(r,{type:"primary",block:"",color:"#7AB439",disabled:!Object(c["unref"])(ce),onClick:ae,loading:re.value},{default:Object(c["withCtx"])((function(){return[Y]})),_:1},8,["disabled","loading"])])]})),_:1})],64)}}});n("8d13");const te=h()(ee,[["__scopeId","data-v-aa67a0cc"]]);t["default"]=te},dd03:function(e,t,n){"use strict";var o=n("7a23"),c=Object(o["defineComponent"])({props:{bgColor:{type:String,default:"#f9f9f9"},height:{type:String,default:"19vw"}},setup:function(e){return function(t,n){return Object(o["openBlock"])(),Object(o["createElementBlock"])(o["Fragment"],null,[Object(o["createElementVNode"])("div",{class:"handler save-area",style:Object(o["normalizeStyle"])("background: "+e.bgColor+";height: "+e.height)},null,4),Object(o["createElementVNode"])("div",{class:"bar save-area",style:Object(o["normalizeStyle"])("height: "+e.height)},[Object(o["renderSlot"])(t.$slots,"content")],4)],64)}}}),i=(n("5de2"),n("6b0d")),r=n.n(i);const a=r()(c,[["__scopeId","data-v-f7cfe444"]]);t["a"]=a}}]);
//# sourceMappingURL=SampleRoomCloseCreate.e8d108f3.js.map