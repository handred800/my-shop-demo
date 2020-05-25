<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <button class="btn btn-primary" @click="openModal(true)">新增折價券</button>
    <table class="table mt-3">
      <thead class="bg-light">
        <tr>
          <th width="25%">名稱(折扣碼)</th>
          <th width="100">折數(%)</th>
          <th width="200">到期日</th>
          <th width="100">狀態</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>
            {{item.title}}
            <br />
            <small class="text-muted">{{item.code}}</small>
          </td>
          <td>-{{item.percent}}%</td>
          <td>{{item.due_date | timeFilter}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-primary">啟用</span>
            <span v-else class="text-danger">未啟用</span>
          </td>
          <td class="text-center">
            <div class="btn-group">
              <button class="btn btn-primary" @click="openModal(false,item)">編輯</button>
              <button class="btn btn-danger" @click="delCoupon(item.id)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination :pagination="pagination" @page-switch="getCoupons"></pagination>

    <!-- 商品彈窗 -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div v-if="tempCoupon.due_date" class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <span v-if="isAdd">新增優惠券</span>
              <span v-else>編輯優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form action @submit.prevent="updateCoupon">
            <div class="modal-body">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for>優惠券名稱</label>
                  <input type="text" class="form-control" v-model="tempCoupon.title" />
                </div>
                <div class="form-group col-md-6">
                  <label for>優惠券代碼</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="tempCoupon.code"
                    placeholder="限英數組合20字元"
                    maxlength="20"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for>折數(%)</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  class="form-control"
                  v-model="tempCoupon.percent"
                />
              </div>
              <div class="form-group">
                <label for>到期日</label>
                <date-input v-model="tempCoupon.due_date"></date-input>
                <!-- <input type="date" class="form-control" v-model="tempCoupon.due_date"> -->
              </div>
              <label for="is_enabled">
                <input
                  type="checkbox"
                  id="is_enabled"
                  v-model="tempCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                /> 是否啟用
              </label>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-light" data-dismiss="modal">取消返回</button>
              <button type="submit" class="btn btn-primary">儲存變更</button>
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
import DateInput from '@/components/DateInput.vue';

export default {
  data() {
    return {
      isAdd: false,
      pagination: {},
      tempCoupon: {},
      coupons: [],
      isLoading: false,
    };
  },
  components: { Pagination, DateInput },
  methods: {
    getCoupons(page = this.pagination.current_page) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupons?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(api).then((res) => {
        vm.coupons = res.data.coupons;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      });
    },
    updateCoupon() {
      const vm = this;
      let api = '';
      let httpMethod = '';

      if (vm.isAdd) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupon`;
        httpMethod = 'post';
      } else {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((res) => {
        if (res.data.success) {
          $('#productModal').modal('hide');
          vm.getCoupons();
          vm.$bus.$emit('message:push', res.data.message, 'success');
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger');
        }
      });
    },
    delCoupon(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/coupon/${id}`;
      vm.$http.delete(api).then(() => {
        vm.getCoupons();
      });
    },
    openModal(isAdd, item) {
      $('#productModal').modal('show');
      if (isAdd) {
        this.tempCoupon = {};
      } else {
        this.tempCoupon = { ...item };
      }
      this.isAdd = isAdd;
    },
  },
  created() {
    this.getCoupons(1);
  },
};
</script>
