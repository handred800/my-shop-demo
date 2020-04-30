<template>
    <div class="p-4">
      <div class="row">
        <div class="col-lg-2">
          <div class="sticky-top py-3 d-lg-block d-none">
              <h4 class="section-title"><font-awesome-icon icon="search"/> 條件搜尋</h4>
              <div class="form-group">
                <label for="">名稱</label>
                <input type="text" class="form-control" v-model="filter.title" placeholder="請輸入遊戲名稱">
              </div>
              <div class="form-group">
                <label for="">類型</label>
                <label class="form-check pl-0" :for="`category${index}`" v-for="(item,index) in categoryTag" :key="item">
                  <input type="checkbox" name="" :id="`category${index}`" :value="item" v-model="filter.category">{{item}}
                </label>
              </div>
              <div class="form-group">
                <label for="">價格</label>
                <label class="form-check pl-0" for="onsale">
                  <input type="checkbox" name="" id="onsale" value="onSale" v-model="filter.onSale"> 特價中
                </label>
                <label class="form-check pl-0" for="0up">
                  <input type="radio" name="filter_price" id="0up" :value="0" v-model="filter.price"> 價格不限
                </label>
                <label class="form-check pl-0" for="500low">
                  <input type="radio" name="filter_price" id="500low" :value="500" v-model="filter.price"> 500元以下
                </label>
                <label class="form-check pl-0" for="300low">
                  <input type="radio" name="filter_price" id="300low" :value="300" v-model="filter.price"> 300元以下
                </label>
                <label class="form-check pl-0" for="150low">
                  <input type="radio" name="filter_price" id="150low" :value="150" v-model="filter.price"> 150元以下
                </label>
              </div>
              <button type="button" class="btn btn-secondary btn-block" @click="filterProducts">篩選</button>
          </div>
        </div>
        <div class="col-lg-10">
            <div class="sticky-top p-3 bg-white d-block d-lg-none">
              <h4 class="section-title"><font-awesome-icon icon="search"/> 條件搜尋</h4>
              <div class="form-row">
                <div class="col-md-4 form-group">
                  <label for="">名稱</label>
                  <input type="text" class="form-control" v-model="filter.title" placeholder="請輸入遊戲名稱">
                </div>
                <div class="col-md-4 form-group">
                  <label for="">類型</label>
                  <div class="form-inline">
                    <label class="form-check mr-4 pl-0" :for="`category${index}`" v-for="(item,index) in categoryTag" :key="item">
                      <input type="checkbox" name="" :id="`category${index}`" :value="item" v-model="filter.category">{{item}}
                    </label>
                  </div>
                </div>
                <div class="col-md-4 form-group">
                  <label for="">價格</label>
                  <div class="form-inline">
                    <label class="form-check mr-4 pl-0" for="onsale">
                      <input type="checkbox" name="" id="onsale" value="onSale" v-model="filter.onSale"> 特價中
                    </label>
                    <label class="form-check mr-4 pl-0" for="0up">
                      <input type="radio" name="filter_price" id="0up" :value="0" v-model="filter.price"> 價格不限
                    </label>
                    <label class="form-check mr-4 pl-0" for="500low">
                      <input type="radio" name="filter_price" id="500low" :value="500" v-model="filter.price"> 500元以下
                    </label>
                    <label class="form-check mr-4 pl-0" for="300low">
                      <input type="radio" name="filter_price" id="300low" :value="300" v-model="filter.price"> 300元以下
                    </label>
                    <label class="form-check mr-4 pl-0" for="150low">
                      <input type="radio" name="filter_price" id="150low" :value="150" v-model="filter.price"> 150元以下
                    </label>
                  </div>
                </div>
                <button type="button" class="btn btn-secondary btn-block" @click="filterProducts">篩選</button>
              </div>
            </div>          
          <div class="product-list-wrapper" :class="{'is-loading':isLoading}">
            <loading :active.sync="isLoading"></loading>
            <transition-group name="product-filter" tag="div" class="form-row" v-if="filteredProducts.length > 0">
              <div class="col-sm-6 col-lg-4 mb-3 product-filter" v-for="item in filteredProducts" :key="item.id">
                <div class="product-wrapper" :style="`backgroundImage:url(${item.image})`" @click="clickProduct(item)">
                    <span class="product-tag">{{item.category}}</span>
                    <div class="product-content">
                        <div>
                            <h5 class="product-title">{{item.title}}</h5>
                            <span v-if="item.price === item.origin_price">${{item.price | moneyFilter}}</span>
                            <span v-else>
                                <span class="text-primary mr-1">${{item.price | moneyFilter}}</span> 
                                <small><s class="text-muted">${{item.origin_price | moneyFilter}}</s></small>
                            </span>
                        </div>
                        <div>
                            <button v-if="item.is_enabled" type="button" class="btn btn-outline-primary" @click.stop="quickAddToCart(item.id)">
                                <font-awesome-icon icon="shopping-cart"/>
                            </button>
                            <button v-else class="btn btn-outline-light">缺貨中</button>
                        </div>
                    </div>
                </div>
              </div>
            </transition-group>
            <h3 v-else>查無遊戲 (´_ゝ`)</h3>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
      categoryTag: [],
      // pagination: {},
      products: [],
      filteredProducts: [],
      isLoading: false,
      filter:{
        title: "",
        category: [],
        onSale: false,
        price: 0,
      },
    }
  },
  methods: {
    getProducts(){
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products/all`;
      let vm = this;
      this.isLoading = true;
      this.$http.get(api)
      .then((res)=>{
        vm.products = res.data.products;

        // 重組分類陣列
        let categories = res.data.products.map(item=>{
          return item.category;
        })
        // 提取不重複的標籤
        vm.categoryTag = categories.filter((item,index,array)=>{
            return array.indexOf(item) === index
        })

        this.filterProducts();
        vm.isLoading = false;
      })
    },
    filterProducts(){
      let vm = this;
      let filterData = vm.filter;
      vm.filteredProducts = vm.products;

      // 篩選名字
      if(filterData.title !== ""){
        vm.filteredProducts = vm.filteredProducts.filter((item)=>{
          return item.title.toLowerCase().includes(filterData.title.toLowerCase());
        })
      }

      // 篩選分類
      if(filterData.category.length > 0){
        vm.filteredProducts = vm.filteredProducts.filter((item)=>{
          return filterData.category.some((categoryTag)=>{
            return categoryTag === item.category;
          })
        })
      }

      //篩選特價
      if(filterData.onSale){
        vm.filteredProducts = vm.filteredProducts.filter((item)=>{
          return item.origin_price !== item.price;
        })
      }

      // 篩選價格
      if(filterData.price > 0){
        vm.filteredProducts = vm.filteredProducts.filter((item)=>{
          return filterData.price > item.price;
        })
      }

    },
    clickProduct(product){
      if(product.is_enabled){
        this.$router.push(`/games/${product.id}`);
      }else{
        this.$bus.$emit('message:push', '商品缺貨中');
      }
      
    },
    quickAddToCart(productId){
      this.$bus.$emit('cart:addToCart',productId);
    }
  },
  filters:{
    textSummary(text){
      return text.substring(0,60) + '...';
    }
  },
  created() {
    this.getProducts();
    this.filter.onSale = (this.$route.query.onSale);
  },
}
</script>
<style lang="scss" scoped>
  .card-img-wrapper{
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding-bottom: 46.5%;
  }
  .card-img-tag{
    position: absolute;
    right: .5rem;
    top: .5rem;
    font-size: 100%;
  }
  .card-text-mask{
    min-height: 96px;
  }

</style>