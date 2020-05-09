# 商店展示demo

### 開發備註
***
* #### vue-swiper : slide直接綁定Vue事件,在loop啟用的狀態下 複製出來的slide綁不到
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
* #### 用sessionStorage實作暫存購物車 : 分為TempCart(本地暫存),serverCart(server端)以下為設計流程
確認購物車,或是其他頁面 =(確認結帳之後將tempCart送至server)=> 填寫訂單資訊 =(完成結帳要清空tempCart || 中離結帳耀清空serverCart)=> 訂單完成頁(完成結帳)，或是其他頁面(中離) 
只有*填寫訂單資訊*是用serverCart的資料, 其他頁面都是用tempCart(sessionStorage)
*備註:axios.all用法*
```javascript
    //要將tempCart資料一次推向server 並等待回應才執行下一步驟 
    
    let api = 'api位址';
    const allPromise = productsId.map((id) => {
        // 遍歷組成promise陣列
        return axios.post(api,{data: id});
    });
    
    // axios.all 可以一次發送所有promise並等待全部
    axios.all(allPromise)
    .then((...res) => {
        console.log(res);//回應的資料
    });
```