(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00ffdd5e"],{"057f":function(t,e,r){var a=r("fc6a"),n=r("241c").f,i={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return n(t)}catch(e){return o.slice()}};t.exports.f=function(t){return o&&"[object Window]"==i.call(t)?s(t):n(a(t))}},1799:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("nav",{staticClass:"mt-4",attrs:{"aria-label":"Page navigation"}},[r("ul",{staticClass:"pagination justify-content-center"},[r("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_pre}},[r("button",{staticClass:"page-link",attrs:{"aria-label":"Previous"},on:{click:function(e){return t.changePage(t.pagination.current_page-1)}}},[r("span",{attrs:{"aria-hidden":"true"}},[t._v("«")])])]),t._l(t.pagination.total_pages,(function(e){return r("li",{key:e,staticClass:"page-item",class:{active:e===t.pagination.current_page}},[r("button",{staticClass:"page-link",on:{click:function(r){return t.changePage(e)}}},[t._v(t._s(e))])])})),r("li",{staticClass:"page-item",class:{disabled:!t.pagination.has_next}},[r("button",{staticClass:"page-link",attrs:{"aria-label":"Next"},on:{click:function(e){return t.changePage(t.pagination.current_page+1)}}},[r("span",{attrs:{"aria-hidden":"true"}},[t._v("»")])])])],2)])},n=[],i={props:["pagination"],data:function(){return{}},methods:{changePage:function(t){this.$emit("page-switch",t)}}},o=i,s=r("2877"),c=Object(s["a"])(o,a,n,!1,null,null,null);e["a"]=c.exports},5530:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b");function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function n(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach((function(e){a(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}},"746f":function(t,e,r){var a=r("428f"),n=r("5135"),i=r("e538"),o=r("9bf2").f;t.exports=function(t){var e=a.Symbol||(a.Symbol={});n(e,t)||o(e,t,{value:i.f(t)})}},"86a0":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),r("table",{staticClass:"table mt-3"},[t._m(0),r("tbody",t._l(t.orders,(function(e){return r("tr",{key:e.id},[r("td",[t._v(t._s(t._f("timeFilter")(e.create_at)))]),r("td",[r("ul",{staticClass:"list-unstyled"},t._l(e.products,(function(e){return r("li",{key:e.id},[t._v(t._s(e.product.title)+" x "+t._s(e.qty))])})),0)]),r("td",[t._v(t._s(t._f("moneyFilter")(e.total)))]),r("td",[e.is_paid?r("span",{staticClass:"text-primary"},[t._v("已付款")]):r("span",{staticClass:"text-danger"},[t._v("尚未付款")])]),r("td",{staticClass:"text-center"},[r("button",{staticClass:"btn btn-primary",on:{click:function(r){return t.openModal(e)}}},[t._v("查看")])])])})),0)]),r("pagination",{attrs:{pagination:t.pagination},on:{"page-switch":t.getOrders}}),r("div",{staticClass:"modal fade",attrs:{id:"orderModal",tabindex:"-1",role:"dialog"}},[r("div",{staticClass:"modal-dialog modal-lg modal-dialog-centered"},[r("div",{staticClass:"modal-content"},[t._m(1),t.tempOrder.total?r("form",{attrs:{action:""},on:{submit:function(e){return e.preventDefault(),t.updateProduct(e)}}},[r("div",{staticClass:"modal-body"},[r("div",{staticClass:"form-row"},[r("div",{staticClass:"col-md-4 form-group"},[r("label",{attrs:{for:""}},[t._v("建立時間")]),r("p",[t._v(t._s(t._f("timeFilter")(t.tempOrder.create_at)))])]),r("div",{staticClass:"col-md-4 form-group"},[r("label",{attrs:{for:""}},[t._v("付款狀態")]),r("p",[t.tempOrder.is_paid?r("span",{staticClass:"text-primary"},[t._v("已付款")]):r("span",{staticClass:"text-danger"},[t._v("尚未付款")])])])]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:""}},[t._v("訂單明細")]),r("table",{staticClass:"table"},[t._m(2),r("tbody",t._l(t.tempOrder.products,(function(e){return r("tr",{key:e.id},[r("td",[t._v(t._s(e.product.title))]),r("td",[t._v(t._s(e.qty))]),r("td",{staticClass:"text-right"},[t._v(t._s(t._f("moneyFilter")(e.final_total)))])])})),0),r("tfoot",[r("tr",[r("td",{staticClass:"text-right",attrs:{colspan:"3"}},[t._v("總計："+t._s(t._f("moneyFilter")(t.tempOrder.total)))])])])])]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:""}},[t._v("姓名")]),r("p",[t._v(t._s(t.tempOrder.user.name))])]),r("div",{staticClass:"form-row"},[r("div",{staticClass:"col-md-6 form-group"},[r("label",{attrs:{for:""}},[t._v("Email")]),r("p",[t._v(t._s(t.tempOrder.user.email))])]),r("div",{staticClass:"col-md-6 form-group"},[r("label",{attrs:{for:""}},[t._v("連絡電話")]),r("p",[t._v(t._s(t.tempOrder.user.tel))])])]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:""}},[t._v("地址")]),r("p",[t._v(t._s(t.tempOrder.user.address))])]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:""}},[t._v("備註")]),r("p",[t._v(t._s(t.tempOrder.message))])])])]):t._e()])])])],1)},n=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",{staticClass:"bg-light"},[r("tr",[r("th",{attrs:{width:"200"}},[t._v("建立時間")]),r("th",[t._v("訂單明細")]),r("th",{attrs:{width:"100"}},[t._v("應付金額")]),r("th",{attrs:{width:"100"}},[t._v("狀態")]),r("th")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"modal-header"},[r("h5",{staticClass:"modal-title",attrs:{id:"exampleModalLabel"}},[t._v("訂單內容")]),r("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"}},[r("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",{staticClass:"bg-light"},[r("tr",[r("th",[t._v("商品")]),r("td",[t._v("數量")]),r("th",{attrs:{width:"100"}},[t._v("小計")])])])}],i=(r("99af"),r("5530")),o=r("1157"),s=r.n(o),c=r("1799"),l={data:function(){return{pagination:{},tempOrder:{},orders:[],isLoading:!1}},components:{Pagination:c["a"]},methods:{getOrders:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.pagination.current_page,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("steam-store","/admin/orders?page=").concat(t),r=this;this.isLoading=!0,this.$http.get(e).then((function(t){r.orders=t.data.orders,r.pagination=t.data.pagination,r.isLoading=!1}))},openModal:function(t){this.tempOrder=Object(i["a"])({},t),s()("#orderModal").modal("show")}},created:function(){this.getOrders(1)}},u=l,f=r("2877"),d=Object(f["a"])(u,a,n,!1,null,null,null);e["default"]=d.exports},"99af":function(t,e,r){"use strict";var a=r("23e7"),n=r("d039"),i=r("e8b5"),o=r("861d"),s=r("7b0b"),c=r("50c4"),l=r("8418"),u=r("65f0"),f=r("1dde"),d=r("b622"),p=r("2d00"),b=d("isConcatSpreadable"),g=9007199254740991,v="Maximum allowed index exceeded",m=p>=51||!n((function(){var t=[];return t[b]=!1,t.concat()[0]!==t})),h=f("concat"),_=function(t){if(!o(t))return!1;var e=t[b];return void 0!==e?!!e:i(t)},y=!m||!h;a({target:"Array",proto:!0,forced:y},{concat:function(t){var e,r,a,n,i,o=s(this),f=u(o,0),d=0;for(e=-1,a=arguments.length;e<a;e++)if(i=-1===e?o:arguments[e],_(i)){if(n=c(i.length),d+n>g)throw TypeError(v);for(r=0;r<n;r++,d++)r in i&&l(f,d,i[r])}else{if(d>=g)throw TypeError(v);l(f,d++,i)}return f.length=d,f}})},a4d3:function(t,e,r){"use strict";var a=r("23e7"),n=r("da84"),i=r("d066"),o=r("c430"),s=r("83ab"),c=r("4930"),l=r("fdbf"),u=r("d039"),f=r("5135"),d=r("e8b5"),p=r("861d"),b=r("825a"),g=r("7b0b"),v=r("fc6a"),m=r("c04e"),h=r("5c6c"),_=r("7c73"),y=r("df75"),O=r("241c"),w=r("057f"),C=r("7418"),j=r("06cf"),P=r("9bf2"),x=r("d1e7"),S=r("9112"),k=r("6eeb"),E=r("5692"),D=r("f772"),F=r("d012"),$=r("90e3"),L=r("b622"),M=r("e538"),N=r("746f"),J=r("d44e"),T=r("69f3"),q=r("b727").forEach,A=D("hidden"),I="Symbol",Q="prototype",W=L("toPrimitive"),z=T.set,B=T.getterFor(I),G=Object[Q],H=n.Symbol,K=i("JSON","stringify"),R=j.f,U=P.f,V=w.f,X=x.f,Y=E("symbols"),Z=E("op-symbols"),tt=E("string-to-symbol-registry"),et=E("symbol-to-string-registry"),rt=E("wks"),at=n.QObject,nt=!at||!at[Q]||!at[Q].findChild,it=s&&u((function(){return 7!=_(U({},"a",{get:function(){return U(this,"a",{value:7}).a}})).a}))?function(t,e,r){var a=R(G,e);a&&delete G[e],U(t,e,r),a&&t!==G&&U(G,e,a)}:U,ot=function(t,e){var r=Y[t]=_(H[Q]);return z(r,{type:I,tag:t,description:e}),s||(r.description=e),r},st=l?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof H},ct=function(t,e,r){t===G&&ct(Z,e,r),b(t);var a=m(e,!0);return b(r),f(Y,a)?(r.enumerable?(f(t,A)&&t[A][a]&&(t[A][a]=!1),r=_(r,{enumerable:h(0,!1)})):(f(t,A)||U(t,A,h(1,{})),t[A][a]=!0),it(t,a,r)):U(t,a,r)},lt=function(t,e){b(t);var r=v(e),a=y(r).concat(bt(r));return q(a,(function(e){s&&!ft.call(r,e)||ct(t,e,r[e])})),t},ut=function(t,e){return void 0===e?_(t):lt(_(t),e)},ft=function(t){var e=m(t,!0),r=X.call(this,e);return!(this===G&&f(Y,e)&&!f(Z,e))&&(!(r||!f(this,e)||!f(Y,e)||f(this,A)&&this[A][e])||r)},dt=function(t,e){var r=v(t),a=m(e,!0);if(r!==G||!f(Y,a)||f(Z,a)){var n=R(r,a);return!n||!f(Y,a)||f(r,A)&&r[A][a]||(n.enumerable=!0),n}},pt=function(t){var e=V(v(t)),r=[];return q(e,(function(t){f(Y,t)||f(F,t)||r.push(t)})),r},bt=function(t){var e=t===G,r=V(e?Z:v(t)),a=[];return q(r,(function(t){!f(Y,t)||e&&!f(G,t)||a.push(Y[t])})),a};if(c||(H=function(){if(this instanceof H)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=$(t),r=function(t){this===G&&r.call(Z,t),f(this,A)&&f(this[A],e)&&(this[A][e]=!1),it(this,e,h(1,t))};return s&&nt&&it(G,e,{configurable:!0,set:r}),ot(e,t)},k(H[Q],"toString",(function(){return B(this).tag})),k(H,"withoutSetter",(function(t){return ot($(t),t)})),x.f=ft,P.f=ct,j.f=dt,O.f=w.f=pt,C.f=bt,M.f=function(t){return ot(L(t),t)},s&&(U(H[Q],"description",{configurable:!0,get:function(){return B(this).description}}),o||k(G,"propertyIsEnumerable",ft,{unsafe:!0}))),a({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:H}),q(y(rt),(function(t){N(t)})),a({target:I,stat:!0,forced:!c},{for:function(t){var e=String(t);if(f(tt,e))return tt[e];var r=H(e);return tt[e]=r,et[r]=e,r},keyFor:function(t){if(!st(t))throw TypeError(t+" is not a symbol");if(f(et,t))return et[t]},useSetter:function(){nt=!0},useSimple:function(){nt=!1}}),a({target:"Object",stat:!0,forced:!c,sham:!s},{create:ut,defineProperty:ct,defineProperties:lt,getOwnPropertyDescriptor:dt}),a({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:pt,getOwnPropertySymbols:bt}),a({target:"Object",stat:!0,forced:u((function(){C.f(1)}))},{getOwnPropertySymbols:function(t){return C.f(g(t))}}),K){var gt=!c||u((function(){var t=H();return"[null]"!=K([t])||"{}"!=K({a:t})||"{}"!=K(Object(t))}));a({target:"JSON",stat:!0,forced:gt},{stringify:function(t,e,r){var a,n=[t],i=1;while(arguments.length>i)n.push(arguments[i++]);if(a=e,(p(e)||void 0!==t)&&!st(t))return d(e)||(e=function(t,e){if("function"==typeof a&&(e=a.call(this,t,e)),!st(e))return e}),n[1]=e,K.apply(null,n)}})}H[Q][W]||S(H[Q],W,H[Q].valueOf),J(H,I),F[A]=!0},b64b:function(t,e,r){var a=r("23e7"),n=r("7b0b"),i=r("df75"),o=r("d039"),s=o((function(){i(1)}));a({target:"Object",stat:!0,forced:s},{keys:function(t){return i(n(t))}})},dbb4:function(t,e,r){var a=r("23e7"),n=r("83ab"),i=r("56ef"),o=r("fc6a"),s=r("06cf"),c=r("8418");a({target:"Object",stat:!0,sham:!n},{getOwnPropertyDescriptors:function(t){var e,r,a=o(t),n=s.f,l=i(a),u={},f=0;while(l.length>f)r=n(a,e=l[f++]),void 0!==r&&c(u,e,r);return u}})},e439:function(t,e,r){var a=r("23e7"),n=r("d039"),i=r("fc6a"),o=r("06cf").f,s=r("83ab"),c=n((function(){o(1)})),l=!s||c;a({target:"Object",stat:!0,forced:l,sham:!s},{getOwnPropertyDescriptor:function(t,e){return o(i(t),e)}})},e538:function(t,e,r){var a=r("b622");e.f=a}}]);
//# sourceMappingURL=chunk-00ffdd5e.1af01013.js.map