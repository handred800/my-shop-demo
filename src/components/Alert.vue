<template>
  <transition-group name="message-toast" class="message-toast-wrapper" tag="div">
    <div
      class="message-toast"
      :class="messageStatus(item.status)"
      v-for="item in messages"
      :key="item.timestamp"
    >
      <font-awesome-icon icon="check-circle" v-if="item.status === 'success'" />
      <font-awesome-icon icon="times-circle" v-else-if="item.status === 'danger'" />
      <font-awesome-icon icon="info-circle" v-else />
      {{item.message}}
    </div>
  </transition-group>
</template>

<script>
export default {
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
    messageStatus(status) {
      switch (status) {
        case 'success':
          return 'text-primary';
        case 'danger':
          return 'text-danger';
        default:
          return 'text-dark';
      }
    },
  },
  created() {
    const vm = this;

    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
};
</script>
