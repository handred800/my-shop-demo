# 商店展示demo

## Project setup
```
npm install
```

### 開發備註
===
#### vue-swiper : slide直接綁定Vue事件,在loop啟用的狀態下 複製出來的slide綁不到
```html
<!-- 不能直接使用vue事件綁定  -->
<swiper :options="swiperOption">
    <swiper-slide v-for="item in allData" :key="item.id" @click="myClick(item)"></swiper-slide>
</swiper>

<!-- 解法: @ready待初始化完成再執行綁定, 用 ref 傳遞DOM -->
<swiper ref="mySwiper" :options="swiperOption" @ready="bindSlideClick">
    <swiper-slide v-for="item in allData" :key="item.id"></swiper-slide>
</swiper>

<script>
// methods 裡面
bindSlideClick(){
    // vue-swiper 初始化完成時,綁定slide點擊事件
    let vm = this;
    let swiper = this.$refs.mySwiper.$swiper; //取得 swiper 實例
    //綁定自訂方法
    swiper.on('tap',function() {
        // this = swiper 實例, 有個屬性是 clickedSlide 可取得 最後點擊的 slide DOM
        let index = this.clickedSlide.getAttribute('data-swiper-slide-index'); 
        vm.myClick(vm.allData[index]) // 再用 index 去 allData 拿資料就好囉~
    })
}
</script>
```
