webpackJsonp([10],{123:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={name:"app",data:function(){return{navShow:!1,username:"",email:"",message:""}},mounted:function(){var t=document.getElementById("DrawText"),a=t.getContext("2d");a.font="30px Arial";var e=a.createLinearGradient(0,0,t.width,0);e.addColorStop("0","grey"),e.addColorStop("0.5","#fff"),e.addColorStop("1.0","grey"),a.strokeStyle=e,a.strokeText("The Best Tea For You",0,90)},components:{},methods:{showWechat:function(){},showQQ:function(){},sendMsg:function(){var t=this;return t.username=t.username.replace(/(^\s+)|(\s+$)/g,""),t.email=t.email.replace(/(^\s+)|(\s+$)/g,""),t.message=t.message.replace(/(^\s+)|(\s+$)/g,""),""==t.message?void alert("请客官给点指点，小生感恩万分"):""==t.username?void alert("请客官留下大名，让小生我铭记在心"):void t.$ajax.post("/msg/submit",{username:t.username,email:t.email,message:t.message}).then(function(t){200==t.data.code?alert("提交成功"):alert("客官，不好意思。服务器吃饭去了")}).catch(function(t){alert("客官，不好意思。服务器吃饭去了")})}}}},127:function(t,a,e){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}var i=e(0),n=s(i),o=e(77),c=s(o),r=e(6),l=s(r),v=e(7);s(v);e(9),e(8),n.default.prototype.$ajax=l.default,new n.default({el:"#app",template:"<App/>",components:{App:c.default}})},194:function(t,a){},195:function(t,a){},218:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"app"}},[t._m(0),t._v(" "),e("section",{staticClass:"minhead"},[e("div",{staticClass:"head_main"},[e("i",{staticClass:"icon iconfont icon-cha"}),t._v("小邹茶社\n      "),e("i",{staticClass:"icon iconfont icon-sanheng right",on:{click:function(a){t.navShow=!t.navShow}}})]),t._v(" "),e("transition",{attrs:{name:"slide-fade"}},[t.navShow?e("ul",{staticClass:"subNav"},[e("li",[e("a",{attrs:{href:"/"}},[e("i",{staticClass:"icon iconfont icon-cha"}),t._v("  小邹茶社")])]),t._v(" "),e("li",[e("a",{attrs:{href:"/weblog"}},[t._v("网络日志")])]),t._v(" "),e("li",[e("a",{attrs:{href:"https://blog.csdn.net/itkingone"}},[t._v("博客")])]),t._v(" "),e("li",[e("a",{attrs:{href:"http://47.89.249.180:8088/#/"}},[t._v("vue组件库")])]),t._v(" "),e("li",[e("a",{attrs:{href:"javascript:;"}},[t._v("留言板(待开发)")])]),t._v(" "),e("li",[e("a",{attrs:{href:"javascript:;"}},[t._v("青史留名(找大牛中)")])])]):t._e()])],1),t._v(" "),e("section",{staticClass:"content"},[e("section",{staticClass:"teaForYou"},[t._m(1),t._v(" "),e("div",{staticClass:"minTeaForYou"},[t._v("\n        The Best Tea For You\n      ")]),t._v(" "),e("div",{staticClass:"contactLogo"},[t._m(2),t._v(" "),t._m(3),t._v(" "),e("a",{staticClass:"weixin",attrs:{href:"javascript:;"}},[e("i",{staticClass:"icon iconfont icon-weixin",on:{click:t.showWechat}})]),t._v(" "),e("a",{staticClass:"qq",attrs:{href:"javascript:;"}},[e("i",{staticClass:"icon iconfont icon-qq",on:{click:t.showQQ}})])])]),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),e("section",{staticClass:"contactMe"},[e("h3",[t._v("Contact me")]),t._v(" "),e("h4",[t._v("If you have any question, please feel free contact me.")]),t._v(" "),e("div",{staticClass:"des"},[e("form",[e("div",{staticClass:"index-content-box"},[e("div",{staticClass:"index-content-boxblock"},[e("div",{staticClass:"index-content-boxhalf"},[e("label",[e("p",[t._v("昵称/姓名：")]),t._v(" "),e("p",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],attrs:{id:"username"},domProps:{value:t.username},on:{input:function(a){a.target.composing||(t.username=a.target.value)}}})])])]),t._v(" "),e("div",{staticClass:"index-content-boxhalf"},[e("label",[e("p",[t._v("联系方式：")]),t._v(" "),e("p",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{id:"email"},domProps:{value:t.email},on:{input:function(a){a.target.composing||(t.email=a.target.value)}}})])])])]),t._v(" "),e("div",{staticClass:"index-content-message"},[e("label",[e("p",[t._v("内容：")]),t._v(" "),e("p",[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.message,expression:"message"}],attrs:{id:"message"},domProps:{value:t.message},on:{input:function(a){a.target.composing||(t.message=a.target.value)}}})])])]),t._v(" "),e("div",{staticClass:"index-content-btn"},[e("a",{staticClass:"btn",attrs:{id:"send"},on:{click:t.sendMsg}},[t._v("Send")])]),t._v(" "),e("span",{staticClass:"index-content-tips",attrs:{id:"tips"}},[t._v("Message Sended")])])])])])])])},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"head"},[e("div",{staticClass:"head_main"},[e("ul",{staticClass:"nav left"},[e("li",{staticClass:"index"},[e("a",{attrs:{href:"/door"}},[e("i",{staticClass:"icon iconfont icon-cha"}),t._v("小邹茶社")])]),t._v(" "),e("li",{staticClass:"vueUI"},[e("a",{attrs:{href:"http://nvui.itzoujie.com"}},[t._v("vue组件库")])]),t._v(" "),e("li",{staticClass:"blog"},[e("a",{attrs:{href:"https://blog.csdn.net/itkingone"}},[t._v("博客")])]),t._v(" "),e("li",{staticClass:"miniProgram"},[e("a",{attrs:{href:"/weblog#/miniprogram"}},[t._v("小程序")])]),t._v(" "),e("li",{staticClass:"weblog"},[e("a",{attrs:{href:"/weblog"}},[t._v("网络日志")])]),t._v(" "),e("li",{staticClass:"msg_board"},[e("a",{attrs:{href:"javascript:;"}},[t._v("留言板(待开发)")])])]),t._v(" "),e("ul",{staticClass:"heroRank right"},[e("a",{attrs:{href:"javascript:;"}},[t._v("青史留名(找大牛中)")])])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"canvasText"},[e("canvas",{attrs:{id:"DrawText"}})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("a",{staticClass:"github",attrs:{href:"https://github.com/zj0715zh/"}},[e("i",{staticClass:"icon iconfont icon-github"})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("a",{staticClass:"blog",attrs:{href:"http://blog.csdn.net/itKingOne"}},[e("i",{staticClass:"icon iconfont icon-blog"})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"AboutMe"},[e("div",{staticClass:"textTitle"},[t._v("About Me")]),t._v(" "),e("div",{staticClass:"inforDetail"},[e("section",{staticClass:"information"},[e("div",{staticClass:"img"}),t._v(" "),e("p",[t._v("itJoy，常用名邹杰。")]),t._v(" "),e("p",[t._v("高级动物，人科，属马，公元1990年诞生于银河系-地球（中国-浙江-温州）。")]),e("p",[t._v("性情爽朗，喜欢运动。特别爱好羽毛球、篮球、台球，擅长羽毛球，业余也会用农药打发下时间。")])]),t._v(" "),e("section",{staticClass:"job"},[e("div",{staticClass:"img"}),t._v(" "),e("p",[t._v("itJoy，常用名邹杰。")]),t._v(" "),e("p",[t._v("高级动物，人科，属马，公元1990年诞生于银河系-地球（中国-浙江-温州）。")]),e("p",[t._v("性情爽朗，喜欢运动。特别爱好羽毛球、篮球、台球，擅长羽毛球，业余也会用农药打发下时间。")])]),t._v(" "),e("section",{staticClass:"dream"},[e("div",{staticClass:"img"}),t._v(" "),e("p",[t._v("itJoy，常用名邹杰。")]),t._v(" "),e("p",[t._v("高级动物，人科，属马，公元1990年诞生于银河系-地球（中国-浙江-温州）。")]),e("p",[t._v("性情爽朗，喜欢运动。特别爱好羽毛球、篮球、台球，擅长羽毛球，业余也会用农药打发下时间。")])])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"myGoal"},[e("p",[t._v("Build a Badminton Stadium")]),t._v(" "),e("p",[t._v("That's one of my life goal")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"travelGoal"},[e("h3",[t._v("A Dream Of Traveling")]),t._v(" "),e("h4",[t._v("My footprint must be spread all over the world")]),t._v(" "),e("div",{staticClass:"des"},[e("p",[t._v("要么读书、要么旅行，灵魂和身体，必须有一个在路上。")]),t._v(" "),e("p",[t._v("人生至少要有两次冲动，一为奋不顾身的爱情，一为说走就走的旅行。")]),t._v(" "),e("p",[t._v("我躺下来，以一张报纸当枕头。高高在我上方的，是会眨眼的星星，而当火车弯曲而行，这些星群便上上下下的画着弧线，望着它们，我睡着了。今天已经过去——我生命中所有天中的一天，明天又会是新的一天，而我依然年轻。")]),t._v(" "),e("p",[t._v("如果你不出去走走，你就会以为这就是世界。")]),t._v(" "),e("p",[t._v("对我个人而言，它让我找到了信仰。一个有信仰的人生，不管成不成功，至少不会迷茫。")])])])}]}},44:function(t,a){},77:function(t,a,e){function s(t){e(194),e(195)}var i=e(1)(e(123),e(218),s,null,null);t.exports=i.exports},8:function(t,a){},9:function(t,a){}},[127]);