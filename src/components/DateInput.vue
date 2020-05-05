<template>
      <input
        class="form-control"
        type="date"
        ref="input"
        :value="dateToYYYYMMDD(value)"
        @input="updateValue($event.target)"
        @focus="selectAll"
      >
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    }, // timestamp
  },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    dateToYYYYMMDD(timestamp) {
      // props.value 從 timestamp 轉 日期string(用於顯示)
      const date = new Date(timestamp * 1000);
      return date && date.toISOString().split('T')[0];
    },
    updateValue(target) {
      // input監聽 向外部(v-model)送timestamp
      const timestamp = target.valueAsDate.getTime() / 1000;
      this.$emit('input', timestamp);
    },
    selectAll(event) {
      // for Safari bug
      setTimeout(() => {
        event.target.select();
      }, 0);
    },
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 40%;
  top: 70px;
  right: 20px;
  z-index: 1100;
}
</style>
