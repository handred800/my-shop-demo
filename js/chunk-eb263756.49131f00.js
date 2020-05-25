(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eb263756"],{"67e8":function(t,i,e){"use strict";var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"position-relative",class:{"loading-holder":t.isLoading}},[e("loading",{attrs:{active:t.isLoading,"is-full-page":!1},on:{"update:active":function(i){t.isLoading=i}}}),t.allData.length>0?e("swiper",{ref:"productSwiper",staticClass:"product-carousel py-3",attrs:{options:t.swiperOption},on:{ready:t.bindSlideClick}},[t._l(t.allData,(function(i){return e("swiper-slide",{key:i.id},[e("div",{staticClass:"product-wrapper",style:"backgroundImage:url("+i.image+")"},[e("span",{staticClass:"product-tag"},[t._v(t._s(i.category))]),e("div",{staticClass:"product-content"},[e("div",[e("h5",{staticClass:"product-title"},[t._v(t._s(i.title))]),i.price===i.origin_price?e("span",[t._v("$"+t._s(t._f("moneyFilter")(i.price)))]):e("span",[e("span",{staticClass:"text-primary mr-1"},[t._v("$"+t._s(t._f("moneyFilter")(i.price)))]),e("small",[e("s",{staticClass:"text-muted"},[t._v("$"+t._s(t._f("moneyFilter")(i.price)))])])])])])])])})),e("div",{staticClass:"swiper-button-prev",attrs:{slot:"button-prev"},slot:"button-prev"},[e("font-awesome-icon",{attrs:{icon:"angle-left"}})],1),e("div",{staticClass:"swiper-button-next",attrs:{slot:"button-next"},slot:"button-next"},[e("font-awesome-icon",{attrs:{icon:"angle-right"}})],1)],2):t._e()],1)},a=[],r=(e("99af"),e("4de4"),e("7212")),o=(e("a7a3"),{components:{Swiper:r["Swiper"],SwiperSlide:r["SwiperSlide"]},props:["filter"],data:function(){return{allData:[],swiperOption:{loop:!0,centeredSlides:!0,breakpoints:{1366:{slidesPerView:4,spaceBetween:15},1024:{slidesPerView:3.3,spaceBetween:15},768:{slidesPerView:2.2,spaceBetween:10},320:{slidesPerView:1.2,spaceBetween:10}},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}},isLoading:!1}},methods:{getProducts:function(){var t="".concat("https://vue-course-api.hexschool.io","/api/").concat("steam-store","/products/all"),i=this;i.isLoading=!0,i.$http.get(t).then((function(t){var e=t.data.products;void 0===i.filter?i.allData=e.filter((function(t){return t.is_enabled})):i.allData=e.filter((function(t){return t.category===i.filter.category&&t.title!==i.filter.title&&t.is_enabled})),i.isLoading=!1}))},productClick:function(t){this.$router.push("/games/".concat(t)),this.$emit("productSwiperClick")},bindSlideClick:function(){var t=this,i=this.$refs.productSwiper.$swiper;i.on("tap",(function(){var e=i.clickedSlide.getAttribute("data-swiper-slide-index");t.productClick(t.allData[e].id)}))}},watch:{filter:function(){this.getProducts()}},created:function(){this.getProducts()}}),n=o,c=e("2877"),l=Object(c["a"])(n,s,a,!1,null,null,null);i["a"]=l.exports},"99af":function(t,i,e){"use strict";var s=e("23e7"),a=e("d039"),r=e("e8b5"),o=e("861d"),n=e("7b0b"),c=e("50c4"),l=e("8418"),d=e("65f0"),p=e("1dde"),u=e("b622"),f=e("2d00"),g=u("isConcatSpreadable"),v=9007199254740991,h="Maximum allowed index exceeded",m=f>=51||!a((function(){var t=[];return t[g]=!1,t.concat()[0]!==t})),w=p("concat"),b=function(t){if(!o(t))return!1;var i=t[g];return void 0!==i?!!i:r(t)},_=!m||!w;s({target:"Array",proto:!0,forced:_},{concat:function(t){var i,e,s,a,r,o=n(this),p=d(o,0),u=0;for(i=-1,s=arguments.length;i<s;i++)if(r=-1===i?o:arguments[i],b(r)){if(a=c(r.length),u+a>v)throw TypeError(h);for(e=0;e<a;e++,u++)e in r&&l(p,u,r[e])}else{if(u>=v)throw TypeError(h);l(p,u++,r)}return p.length=u,p}})},bde1:function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("section",{staticClass:"p-4 mb-3"},[e("div",{staticClass:"product-info-wrapper"},[e("loading",{attrs:{active:t.isLoading,"is-full-page":!1},on:{"update:active":function(i){t.isLoading=i}}}),e("video",{staticClass:"product-bg-video",attrs:{src:t.product.content,controls:t.isWatching,autoplay:"",loop:""},domProps:{muted:!t.isWatching}}),e("div",{staticClass:"product-info-panel",class:{"is-watching":t.isWatching}},[e("div",{staticClass:"scroller-wrapper"},[e("h1",{staticClass:"section-title"},[t._v(t._s(t.product.title))]),e("img",{staticClass:"img-fluid mb-3",attrs:{src:t.product.image,alt:t.product.title}}),e("p",{staticClass:"description-wrapper"},[t._v(t._s(t.product.description))]),t.product.price===t.product.origin_price?e("h3",[t._v("售價$"+t._s(t._f("moneyFilter")(t.product.price)))]):e("h3",[e("span",{staticClass:"text-primary mr-1"},[t._v("優惠$"+t._s(t._f("moneyFilter")(t.product.price)))]),e("small",[e("s",{staticClass:"text-muted"},[t._v("$"+t._s(t._f("moneyFilter")(t.product.origin_price)))])])]),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:""}},[t._v("購買數量")]),e("div",{staticClass:"input-group"},[e("input",{directives:[{name:"model",rawName:"v-model.number",value:t.qty,expression:"qty",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",min:"1",max:"10"},domProps:{value:t.qty},on:{input:function(i){i.target.composing||(t.qty=t._n(i.target.value))},blur:function(i){return t.$forceUpdate()}}}),e("div",{staticClass:"input-group-append"},[e("button",{staticClass:"btn btn-primary",class:{disabled:t.btnLoading},on:{click:t.addToCart}},[t.btnLoading?e("font-awesome-icon",{staticClass:"fa-spin",attrs:{icon:"circle-notch"}}):t._e(),t._v("加入購物車 ")],1)])])])]),e("div",{staticClass:"collapse-handler",attrs:{title:"收合"},on:{click:function(i){t.isWatching=!t.isWatching}}})])],1)]),e("h2",{staticClass:"section-title pl-4"},[t._v("相同類型")]),e("product-swiper",{attrs:{filter:t.product},on:{productSwiperClick:t.getProduct}})],1)},a=[],r=(e("99af"),e("67e8")),o={data:function(){return{product:{},isLoading:!1,isWatching:!1,btnLoading:!1,qty:1}},components:{ProductSwiper:r["a"]},methods:{getProduct:function(){this.isWatching=!1,this.isLoading=!0;var t=this.$route.params.gameId,i="".concat("https://vue-course-api.hexschool.io","/api/").concat("steam-store","/product/").concat(t),e=this;e.$http.get(i).then((function(t){e.product=t.data.product,window.scrollTo({top:0,behavior:"smooth"}),e.isLoading=!1}))},addToCart:function(){this.$bus.$emit("cart:addToCart",this.product,this.qty)}},created:function(){this.getProduct()}},n=o,c=e("2877"),l=Object(c["a"])(n,s,a,!1,null,null,null);i["default"]=l.exports}}]);
//# sourceMappingURL=chunk-eb263756.49131f00.js.map