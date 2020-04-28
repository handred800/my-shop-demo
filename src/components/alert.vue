<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="`alert-${item.status}`"
      v-for="(item, index) in messages" :key="index">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(inddex)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, index) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(index, 1);
          }
        });
      }, 3000);
    },
  },
  created() {
    const vm = this;

    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
};
</script>

<style lang="scss" scope>
.message-alert {
  position: fixed;
  max-width: 40%;
  top: 70px;
  right: 20px;
  z-index: 1100;
}
</style>