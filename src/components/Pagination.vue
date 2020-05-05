<template>
    <nav aria-label="Page navigation" class="mt-4">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{'disabled': !pagination.has_pre}">
                <button class="page-link" aria-label="Previous" @click="changePage(pagination.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
            <li class="page-item" :class="{'active': page === pagination.current_page}" v-for="page in pagination.total_pages" :key="page">
                <button class="page-link" @click="changePage(page)">{{page}}</button>
            </li>
            <li class="page-item" :class="{'disabled': !pagination.has_next}">
                <button class="page-link" aria-label="Next" @click="changePage(pagination.current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  props: ['pagination'],
  data() {
    return {
      // pageData: this.pagination
    };
  },
  methods: {
    changePage(page) {
      this.$emit('page-switch', page);
    },
  },
};
</script>
