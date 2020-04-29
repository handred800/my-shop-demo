<template>
  <div>
    <div class="p-4">
      <div class="grid-home-top">
          <div class="grid-banner">
            <swiper class="index-banner">
                <swiper-slide v-for="banner in banners" :key="banner.title">
                  <a :href="banner.url" target="_blank" class="index-banner-item" :style="`backgroundImage:url(${banner.image})`">
                    <div class="banner-text">
                      <h3 class="banner-title">{{banner.title}}</h3>
                      <p class="banner-description">{{banner.description}}</p>
                    </div>
                  </a>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div class="color-block color-block-secondary">
            <h2 class="block-title text-right">本周<br>折扣</h2>
            <div class="block-backdrop">weekly discount</div>
          </div>
          <div class="color-block color-block-primary">
            <h2 class="block-title text-left">超級<br>招待券</h2>
            <div class="block-backdrop">awesome coupon</div>
          </div>          
      </div>
    </div>
    <section class="bg-light">
      <div class="d-flex justify-content-between">
        <h2 class="section-title ml-4"><font-awesome-icon icon="compact-disc"/> 新品上市</h2>
        <router-link to="/games" class="mr-4">買起來 ></router-link>
      </div>
      <product-swiper></product-swiper>
    </section>
    <section class="special-column-section mt-4">
      <h2 class="section-title ml-4"><font-awesome-icon icon="pen"/> 本周專欄</h2>
      <div class="special-column--content">
        <div class="special-column--text mt-3">
          <h3>從叛逆走向變革：《斑鳩》的不破不立。</h3>
          <p>人類最偉大的精神，莫過於執著堅持理想永不放棄。<br>"不留遺憾地繼續走下去直至盡頭。我，沒有出生，就不會死去。理想事物，沒有滿足，就絕不屈服。這樣，即使是死去，也不會後悔" ...</p>
          <router-link to="/column" class="btn btn-outline-light">閱讀全文</router-link>
        </div>
      </div>
    </section>
    <section class="news-section">
      <div class="px-4">
        <h2 class="section-title text-center mb-3">遊戲資訊</h2>
        <div class="form-row">
          <div class="col-lg-3 col-sm-6" v-for="item in news" :key="item.item">
            <div class="card mb-3">
              <img :src="item.img" class="card-img-top" :alt="item.title">
              <div class="card-body">
                <small class="text-muted mr-3"><font-awesome-icon icon="calendar-alt"/> {{item.date}}</small>
                <small class="text-muted"><font-awesome-icon icon="eye"/> {{item.views}}</small>
                <p class="card-text text-primary">{{item.title}}</p>
              </div>
            </div>
          </div>                    
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductSwiper from '@/components/front/productSwiper.vue'
import Pagination from '@/components/pagination.vue'

export default {
  name: 'Home',
  data() {
    return {
      banners:[
        {
          image: 'https://steamcdn-a.akamaihd.net/steam/bundles/7135/w80899u8dtlbb1x1/header_586x192.jpg',
          url: 'https://store.steampowered.com/bundle/7135/Not_a_Metroidvania/',
          title: 'Not a Metroidvania',
          description: "In these lovingly crafted 2D platformers, you'll explore and battle through unique non-linear worlds..."
        },
        {
          image: 'https://steamcdn-a.akamaihd.net/steam/bundles/983/rxdm4ez2bmiuzjii/header_586x192.jpg?t=1575947553',
          url: 'https://store.steampowered.com/bundle/983/Supergiant_Collection/',
          title: 'Supergiant Collection',
          description: 'Everyone who purchases Hades on Steam through January 2 will receive a complimentary...'
        }
      ],
      news:[
        {
          img: 'https://i.imgur.com/nOGOHI4.jpg',
          title: '日本獨立遊戲遊戲展BitSummit Gaiden 今年宣布轉為線上活動',
          date: '2020-05-10',
          views: 552,
        },
        {
          img: 'https://i.imgur.com/A0TzNEu.jpg',
          title: '《戰爭機器：戰術小隊》媒體評分匯總：獨具魅力的回合策略遊戲',
          date: '2020-04-29',
          views: 736,
        },
        {
          img: 'https://i.imgur.com/4MaxORb.jpg',
          title: '7月2日發售！ NS版《凱瑟琳Full Body》公佈新要素',
          date: '2020-04-18',
          views: 420,
        },
        {
          img: 'https://i.imgur.com/i7a3Oa6.jpg',
          title: '貝塞斯達舉行《輻射76》IGN "廢土客" 評分出爐',
          date: '2020-04-08',
          views: 817,
        }                        
      ],
      products: [],
      pagination: {}
    }
  },
  components: {
    Pagination,ProductSwiper
  }
  
}
</script>

