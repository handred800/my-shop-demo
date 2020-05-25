<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <button class="btn btn-primary" @click="openModal(true)">新增商品</button>
    <table class="table mt-3">
      <thead class="bg-light">
        <tr>
          <th width="100">分類</th>
          <th width="200">商品圖</th>
          <th width="25%">商品名稱</th>
          <th width="65">原價</th>
          <th width="65">售價</th>
          <th width="100">狀態</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>
            <img :src="item.image" class="img-fluid" alt />
          </td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price | moneyFilter}}</td>
          <td class="text-right">{{item.price | moneyFilter}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-primary">上架中</span>
            <span v-else class="text-danger">下架中</span>
          </td>
          <td class="text-center">
            <div class="btn-group">
              <button class="btn btn-primary" @click="openModal(false,item)">編輯</button>
              <button class="btn btn-danger" @click="delProduct(item.id)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <pagination :pagination="pagination" @page-switch="getProducts"></pagination>

    <!-- 商品彈窗 -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
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
          <form action @submit.prevent="updateProduct">
            <div class="modal-body">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for>商品圖</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片網址"
                      v-model="tempProduct.image"
                    />
                  </div>
                  <div class="form-group">
                    <label for>
                      或上傳圖片
                      <small class="text-muted">(1MB以下jpg)</small>
                    </label>
                    <input type="file" class="form-control" ref="files" @change="uploadImage" />
                  </div>
                  <img :src="tempProduct.image" class="img-fluid" alt />
                </div>
                <div class="col-md-8">
                  <div class="form-row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for>商品名稱</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="tempProduct.title"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for>商品分類</label>
                        <select class="form-control" v-model="tempProduct.category" required>
                          <option value="動作">動作</option>
                          <option value="射擊">射擊</option>
                          <option value="解謎">解謎</option>
                          <option value="RPG">RPG</option>
                          <option value="策略">策略</option>
                          <option value="文字冒險">文字冒險</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-6 form-group">
                      <label for>原價</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">$</span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          class="form-control"
                          v-model.number="tempProduct.origin_price"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-md-6 form-group">
                      <label for>售價</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">$</span>
                        </div>
                        <input
                          type="number"
                          class="form-control"
                          v-model.number="tempProduct.price"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for>影片網址</label>
                    <input type="text" class="form-control" v-model="tempProduct.content" />
                  </div>
                  <div class="form-group">
                    <label for>商品描述</label>
                    <textarea
                      class="form-control"
                      cols="30"
                      rows="6"
                      v-model="tempProduct.description"
                    ></textarea>
                  </div>
                  <label for="is_enabled">
                    <input
                      id="is_enabled"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    />上架此商品
                  </label>
                </div>
              </div>
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

export default {
  data() {
    return {
      isAdd: false,
      pagination: {},
      tempProduct: {},
      products: [],
      isLoading: false,
    };
  },
  components: { Pagination },
  methods: {
    getProducts(page = this.pagination.current_page) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/products?page=${page}`;
      const vm = this;
      this.isLoading = true;
      this.$http.get(api).then((res) => {
        vm.products = res.data.products;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      });
    },
    updateProduct() {
      const vm = this;
      let api = '';
      let httpMethod = '';

      if (vm.isAdd) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/product`;
        httpMethod = 'post';
      } else {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((res) => {
        if (res.data.success) {
          $('#productModal').modal('hide');
          vm.getProducts();
          vm.$bus.$emit('message:push', res.data.message, 'success');
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger');
        }
      });
    },
    delProduct(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/product/${id}`;
      const vm = this;
      this.$http.delete(api).then(() => {
        vm.getProducts();
      });
    },
    openModal(isAdd, item) {
      $('#productModal').modal('show');
      if (isAdd) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isAdd = isAdd;
    },
    uploadImage() {
      const vm = this;
      const uploadFile = this.$refs.files.files[0];
      const formData = new FormData();

      formData.append('file', uploadFile);
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/admin/upload`;
      vm.$http
        .post(api, formData, {
          header: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          if (res.data.success) {
            vm.$set(vm.tempProduct, 'image', res.data.imageUrl);
          } else {
            vm.$bus.$emit('message:push', res.data.message, 'danger');
          }
        });
    },
  },
  created() {
    this.getProducts(1);
  },
};
</script>
