(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{26:function(e,t,c){},27:function(e,t,c){},28:function(e,t,c){"use strict";c.r(t);var n=c(1),a=c(0),s=c(6),r=c.n(s);function o(){return Object(n.jsx)("nav",{className:"navbar navbar-default border-bottom",children:Object(n.jsx)("div",{className:"container-fluid",children:Object(n.jsx)("div",{className:"navbar-header",children:Object(n.jsx)("span",{className:"navbar-brand",children:Object(n.jsx)("h1",{children:"Vend\xe9e"})})})})})}var i={UK:"\ud83c\uddec\ud83c\udde7",JPN:"\ud83c\uddef\ud83c\uddf5"},d=function(e){var t=e.postData,c=e.accountData;return Object(n.jsx)("div",{className:"row justify-content-center",children:Object(n.jsx)("div",{className:"my-2 col-8",children:Object(n.jsxs)("div",{className:"card border-dark",children:[Object(n.jsx)("div",{className:"card-header bg-white border-0",children:function(){if(0!=Object.keys(c).length)return Object(n.jsx)("div",{className:"d-flex",children:Object(n.jsxs)("div",{className:"mr-auto",children:[c.sailor.name," ",i[c.flag]]})})}()}),Object(n.jsx)("div",{className:"card-body",children:Object(n.jsx)("div",{className:"embed-responsive embed-responsive-16by9",children:Object(n.jsx)("iframe",{className:"embed-responsive-item border-0",src:"https://www.youtube.com/embed/".concat(t.source_id),allow:"autoplay; encrypted-media",title:"video"})})}),Object(n.jsx)("div",{className:"card-footer bg-white border-0 pt-0",children:Object(n.jsx)("small",{children:t.created})})]})})},t.id)},u=c(2),j=c(4),l=c(5);function b(e,t){return{type:e,payload:t}}var O={posts:[],loading:!0},h=function(){return function(e){fetch("https://social-media-aggregater.herokuapp.com/api/posts/").then((function(e){return e.json()})).then((function(t){e(b("posts/ADD_POSTS",t.results))}))}};var p={accounts:[]},f=function(){return function(e){fetch("https://social-media-aggregater.herokuapp.com/api/accounts/").then((function(e){return e.json()})).then((function(t){console.log(t.results),e(b("teams/ADD_ACCOUNT",t.results))}))}};var m=function(){var e=Object(u.b)();Object(a.useEffect)((function(){e(f()),e(h())}),[]);var t=Object(u.c)((function(e){return e.post.posts})),c=Object(u.c)((function(e){return e.post.loading})),s=Object(u.c)((function(e){return e.team.accounts})).reduce((function(e,t,c){return e[t.id]=t,e}),{}),r=t.map((function(e){return Object(n.jsx)(d,{postData:e,accountData:0===Object.keys(s).length?{}:s[e.account]})}));return c?Object(n.jsx)("h1",{children:"Loading..."}):Object(n.jsx)("div",{className:"container",children:r})};c(26),c(27);var v=function(){return Object(u.b)(),Object(n.jsxs)("div",{children:[Object(n.jsx)(o,{}),Object(n.jsx)(m,{})]})},x=c(3),g=Object(x.c)({post:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"posts/ADD_POSTS":return Object(l.a)(Object(l.a)({},e),{},{loading:!1,posts:[].concat(Object(j.a)(e.posts),Object(j.a)(t.payload))});default:return e}},team:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"teams/ADD_ACCOUNT":return Object(l.a)(Object(l.a)({},e),{},{accounts:[].concat(Object(j.a)(e.accounts),Object(j.a)(t.payload))});default:return e}}}),N=c(12),y=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||x.d,D=Object(x.e)(g,y(Object(x.a)(N.a)));r.a.render(Object(n.jsx)(u.a,{store:D,children:Object(n.jsx)(v,{})}),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.1ae6a296.chunk.js.map