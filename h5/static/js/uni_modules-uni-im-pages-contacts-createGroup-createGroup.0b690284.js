(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["uni_modules-uni-im-pages-contacts-createGroup-createGroup"],{"067a":function(e,t,n){var r=n("a764");r.__esModule&&(r=r.default),"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var i=n("4f06").default;i("cbb8ca10",r,!0,{sourceMap:!1,shadowMode:!1})},"1f2f":function(e,t,n){"use strict";var r=n("067a"),i=n.n(r);i.a},"507b":function(e,t,n){"use strict";n.r(t);var r=n("789e"),i=n.n(r);for(var a in r)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=i.a},"526d":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var r={uniSearchBar:n("1a5f").default,uniList:n("7bf9").default,uniListChat:n("71ba").default,uniLoadMore:n("2b6d").default},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"container"},[e.friendList.length?[n("v-uni-view",{staticClass:"header-box"},[n("uni-search-bar",{attrs:{placeholder:"搜索",bgColor:"#fff",radius:100},on:{confirm:function(t){arguments[0]=t=e.$handleEvent(t),e.getFriendsData.apply(void 0,arguments)},cancel:function(t){arguments[0]=t=e.$handleEvent(t),e.doClear.apply(void 0,arguments)},clear:function(t){arguments[0]=t=e.$handleEvent(t),e.doClear.apply(void 0,arguments)}},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1),n("v-uni-view",{staticClass:"content-box"},[n("v-uni-checkbox-group",{on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.checkboxChange.apply(void 0,arguments)}}},e._l(e.friendList,(function(e,t){return n("v-uni-view",{key:t},[n("v-uni-label",{staticClass:"label-box"},[n("v-uni-checkbox",{attrs:{value:e._id}}),n("v-uni-view",[n("uni-list",{staticStyle:{flex:"1"},attrs:{border:!1}},[n("uni-list-chat",{attrs:{"avatar-circle":!0,title:e.nickname,avatar:e.avatar_file&&e.avatar_file.url?e.avatar_file.url:"/uni_modules/uni-im/static/avatarUrl.png"}})],1)],1)],1)],1)})),1)],1),n("v-uni-view",{staticClass:"foot-box"},[n("v-uni-button",{staticClass:"btn",attrs:{disabled:!e.checkFriendIds.length,type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.createGroup.apply(void 0,arguments)}}},[e._v(e._s(e.btnText)+e._s(e.checkFriendNum))])],1)]:n("uni-load-more",{attrs:{status:e.loading?"loading":e.hasMore?"hasMore":"noMore"}})],2)},a=[]},"789e":function(e,t,n){"use strict";(function(e,r){n("7a82");var i=n("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("c7eb")),o=i(n("1da1"));n("4de4"),n("d3b7"),n("caad"),n("2532"),n("d81d"),n("13d5"),n("14d9"),n("99af"),n("159b");var u=e.database(),c={data:function(){return{loading:!0,hasMore:!1,keyword:"",checkFriendIds:[],friendData:[],groupMemberUid:[],group_id:!1}},computed:{friendList:function(){var e=this;return this.friendData.filter((function(t){return!e.groupMemberUid.includes(t._id)}))},checkFriendNum:function(){return this.checkFriendIds.length>0?"（"+this.checkFriendIds.length+"）":""},btnText:function(){return this.group_id?"立即邀请":"立即创建"},checkFriendsWidth:function(){return this.checkFriendIds.length>6?"360":65*this.checkFriendIds.length},translateXWidth:function(){return this.checkFriendIds.length>6?65*this.checkFriendIds.length:"60"},checkFriendImg:function(){var e=this;return this.friendList.reduce((function(t,n){return e.checkFriendIds.includes(n._id)&&t.push(n),t}),[]).map((function(e){return e.avatar_file}))}},onLoad:function(e){var t=this;return(0,o.default)((0,a.default)().mark((function n(){return(0,a.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.setParam(e);case 1:case"end":return n.stop()}}),n)})))()},methods:{setParam:function(e){var t=this;return(0,o.default)((0,a.default)().mark((function n(){var i;return(0,a.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(r.log("group_id",e),!e.group_id){n.next=10;break}return t.group_id=e.group_id,uni.setNavigationBarTitle({title:"邀请新成员"}),n.next=6,u.collection("uni-im-group-member").where({group_id:e.group_id}).get();case 6:i=n.sent,r.log("res:查本群，成员 ",i),t.groupMemberUid=i.result.data.map((function(e){return e.user_id})),r.log("this.groupMemberUid",t.groupMemberUid);case 10:t.getFriendsData();case 11:case"end":return n.stop()}}),n)})))()},getFriendsData:function(){var e=this;return(0,o.default)((0,a.default)().mark((function t(){var n,i,o;return(0,a.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n={},e.keyword&&(n='\n\t\t\t\t\t"_id"\t\t== \t"'.concat(e.keyword,'" ||\n\t\t\t\t\t"username"\t== \t"').concat(e.keyword,'" || \n\t\t\t\t\t"nickname"\t== \t"').concat(e.keyword,'" || \n\t\t\t\t\t"email"\t\t== \t"').concat(e.keyword,'" || \n\t\t\t\t\t"mobile"\t== \t"').concat(e.keyword,'" \n\t\t\t\t')),t.next=4,u.collection(u.collection("uni-im-friend").where('"user_id" == $cloudEnv_uid').field("friend_uid,mark,class_name").getTemp(),u.collection("uni-id-users").where(n).field("_id,nickname,avatar_file").getTemp()).get();case 4:i=t.sent,r.log(i),o=i.result.data,o.forEach((function(e,t){e.friend_uid[0]?o[t]=e.friend_uid[0]:delete o[t]})),e.friendData=o,e.loading=!1,e.hasMore=!0;case 11:case"end":return t.stop()}}),t)})))()},doClear:function(){this.keyword="",this.getFriendsData()},checkboxChange:function(e){r.log("checkboxChange-value",e.detail.value),this.checkFriendIds=e.detail.value},createGroup:function(){var t=this;return(0,o.default)((0,a.default)().mark((function n(){var i,o,u;return(0,a.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r.log("创建",t.checkFriendIds.length),i=e.importObject("uni-im-co"),n.next=4,i.chooseUserIntoGroup({user_ids:t.checkFriendIds,group_id:t.group_id});case 4:if(o=n.sent,r.log("createGroup",o),!t.group_id){n.next=10;break}uni.navigateBack({delta:1}),n.next=12;break;case 10:return u=uni.createMediaQueryObserver(t),n.abrupt("return",u.observe({minWidth:960},(function(e){e?uni.switchTab({url:"/uni_modules/uni-im/pages/index/index?conversation_id=group_"+o.data.group_id,animationDuration:300,complete:function(e){r.log(e)}}):uni.redirectTo({url:"/uni_modules/uni-im/pages/chat/chat?conversation_id=group_"+o.data.group_id,animationDuration:300,complete:function(e){r.log(e)}})})));case 12:case"end":return n.stop()}}),n)})))()}}};t.default=c}).call(this,n("a9ff")["default"],n("5a52")["default"])},a764:function(e,t,n){var r=n("24fb");t=r(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.container[data-v-739a5f14]{width:%?750?%;height:100vh;width:100vw;flex:1;flex-direction:column;position:relative;background-color:#f5f5f5}.header-box[data-v-739a5f14]{width:%?750?%;position:fixed;top:44px;z-index:99;display:flex;width:100vw;flex-direction:column;background-color:#f5f5f5}.image-box[data-v-739a5f14]{flex-direction:row;align-items:center;transition:.3s;display:flex;white-space:nowrap;overflow-x:scroll}.avatar[data-v-739a5f14]{width:%?60?%;height:%?60?%;border-radius:50px;flex-shrink:0}.content-box[data-v-739a5f14]{margin-top:58px;background-color:#fff;z-index:10}.label-box[data-v-739a5f14]{flex-direction:row;align-items:center;margin:0 %?20?%}.foot-box[data-v-739a5f14]{width:%?750?%;height:80px;justify-content:center;align-items:center;position:fixed;bottom:0;z-index:99;background-color:#f5f5f5}.btn[data-v-739a5f14]{width:300px}',""]),e.exports=t},eeac:function(e,t,n){"use strict";n.r(t);var r=n("526d"),i=n("507b");for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("1f2f");var o=n("f0c5"),u=Object(o["a"])(i["default"],r["b"],r["c"],!1,null,"739a5f14",null,!1,r["a"],void 0);t["default"]=u.exports}}]);