<template>
    <div>
      <loading :active.sync="isLoading"></loading>      
      <table class="table mt-3">
        <thead class="bg-light">
          <tr>
            <th width="200">時間</th>
            <th width="100">付款方式</th>
            <th width="80">金額</th>
            <th width="100">狀態</th>
            <th></th>                      
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{item.create_at}}</td>
            <td>{{item.payment_method}}</td>
            <td>{{item.total}}</td>
            <td>
              <span v-if="item.is_paid === 1" class="text-primary">已付款</span>
              <span v-else class="text-danger">尚未付款</span>
            </td>
            <td class="text-center">
              <button class="btn btn-primary" @click="openModal(false,item)">編輯</button>
            </td>
          </tr>
        </tbody>
      </table>

      <pagination :pagination="pagination" @page-switch="getOrders"></pagination>  
      
      <!-- 商品彈窗 -->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                <span v-if="isAdd">新增商品</span>
                <span v-else>編輯商品</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form action="" @submit.prevent="updateProduct">
            <div class="modal-body">
              <div class="form-row">
                <div class="col-md-6 form-group">
                  <label for="">原價</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">$</span>
                    </div>
                    <input type="number" min="0" class="form-control" required>
                  </div>
                </div>
                <div class="col-md-6 form-group">
                  <label for="">售價</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text">$</span>
                    </div>
                    <input type="number" min="0" class="form-control" required>
                  </div>                  
                </div>            
              </div>
              <div class="form-group">
                <label for="">商品描述</label>
                <textarea class="form-control" name="" id="" cols="30" rows="6"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">取消返回</button>
              <button type="submit" class="btn btn-primary">儲存變更</button>
            </div>              
            </form>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $ from "jquery";
import Pagination from '@/components/pagination.vue';

export default {
  data() {
    return {
      isAdd: false,
      pagination: {},
      tempOrder: {},
      orders: [],
      isLoading: false
    }
  },
  components:{Pagination},
  methods: {
    getOrders(page = this.pagination.current_page){
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/orders?page=${page}`;
      let vm = this;
      this.isLoading = true;
      this.$http.get(api)
      .then((res)=>{
        console.log(res)
        vm.products = res.data.products;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      })
    },
    updateOrder(){
      let vm = this;
      let api = '';
      let httpMethod = '';
      
      if(vm.isAdd){
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/order`;
        httpMethod = 'post';
      }else{
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/order/${vm.tempProduct.id}`
        httpMethod = 'put';
      }
      this.$http[httpMethod](api,{data: vm.tempOrder})
      .then((res)=>{
        if(res.data.success){
          $('#productModal').modal('hide');
          vm.getOrders();
          vm.$bus.$emit('message:push',res.data.message,'success');
        }else{
          vm.$bus.$emit('message:push',res.data.message,'danger');
        }
      })
    },
    openModal(isAdd,item){
      $('#productModal').modal('show');
      if(isAdd){
        this.tempProduct = {}
      }else{
        this.tempProduct = Object.assign({},item);
      }
      this.isAdd = isAdd
    },
    uploadImage(){
      console.log(this)
      let uploadFile = this.$refs.files.files[0];
      let vm = this;
      let formData = new FormData();

      formData.append('file',uploadFile);
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/upload`
      this.$http.post(api,formData,{
        header: {
          "Content-Type": "multipart/form-data" 
        }
      })
      .then((res)=>{
        if(res.data.success){
          vm.$set(vm.tempProduct,'image',res.data.imageUrl);
        }else{
          vm.$bus.$emit('message:push',res.data.message,'danger');
        }
      })
    }
  },
  created() {
    this.getOrders(1)
  },
}
</script>