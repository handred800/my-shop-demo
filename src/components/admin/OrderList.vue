<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-3">
      <thead class="bg-light">
        <tr>
          <th width="200">建立時間</th>
          <th>訂單明細</th>
          <th width="100">應付金額</th>
          <th width="100">狀態</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{order.create_at | timeFilter}}</td>
          <td>
            <ul class="list-unstyled">
              <li
                v-for="product in order.products"
                :key="product.id"
              >{{product.product.title}} x {{product.qty}}</li>
            </ul>
          </td>
          <td>{{order.total | moneyFilter}}</td>
          <td>
            <span v-if="order.is_paid" class="text-primary">已付款</span>
            <span v-else class="text-danger">尚未付款</span>
          </td>
          <td class="text-center">
            <button class="btn btn-primary" @click="openModal(order)">查看</button>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination :pagination="pagination" @page-switch="getOrders"></pagination>

    <!-- 商品彈窗 -->
    <div class="modal fade" id="orderModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">訂單內容</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form v-if="tempOrder.total" action @submit.prevent="updateProduct">
            <div class="modal-body">
              <div class="form-row">
                <div class="col-md-4 form-group">
                  <label for>建立時間</label>
                  <p>{{tempOrder.create_at | timeFilter}}</p>
                </div>
                <div class="col-md-4 form-group">
                  <label for>付款狀態</label>
                  <p>
                    <span v-if="tempOrder.is_paid" class="text-primary">已付款</span>
                    <span v-else class="text-danger">尚未付款</span>
                  </p>
                </div>
              </div>
              <div class="form-group">
                <label for>訂單明細</label>
                <table class="table">
                  <thead class="bg-light">
                    <tr>
                      <th>商品</th>
                      <td>數量</td>
                      <th width="100">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in tempOrder.products" :key="item.id">
                      <td>{{item.product.title}}</td>
                      <td>{{item.qty}}</td>
                      <td class="text-right">{{item.final_total | moneyFilter}}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="text-right">總計：{{tempOrder.total | moneyFilter}}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div class="form-group">
                <label for>姓名</label>
                <p>{{tempOrder.user.name}}</p>
              </div>
              <div class="form-row">
                <div class="col-md-6 form-group">
                  <label for>Email</label>
                  <p>{{tempOrder.user.email}}</p>
                </div>
                <div class="col-md-6 form-group">
                  <label for>連絡電話</label>
                  <p>{{tempOrder.user.tel}}</p>
                </div>
              </div>
              <div class="form-group">
                <label for>地址</label>
                <p>{{tempOrder.user.address}}</p>
              </div>
              <div class="form-group">
                <label for>備註</label>
                <p>{{tempOrder.message}}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';

export default {
  data() {
    return {
      pagination: {},
      tempOrder: {},
      orders: [],
      isLoading: false,
    };
  },
  components: { Pagination },
  methods: {
    getOrders(page = this.pagination.current_page) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/orders?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(api).then((res) => {
        vm.orders = res.data.orders;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      });
    },
    openModal(item) {
      this.tempOrder = { ...item };
      $('#orderModal').modal('show');
    },
  },
  created() {
    this.getOrders(1);
  },
};
</script>
