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
  name: 'dateInput',
  props:{
    value: 0
  },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    dateToYYYYMMDD(timestamp) {
      // props timestamp 轉 日期string(顯示)
      let date = new Date(timestamp*1000);
      return date && date.toISOString().split('T')[0]
    },
    updateValue: function (target) {
      // input監聽 向外部(v-model)送timestamp
      let timestamp = target.valueAsDate.getTime() / 1000
      this.$emit('input', timestamp);
    },
    selectAll: function (event) {
      //for Safari bug
      setTimeout(function () {
      	event.target.select()
      }, 0)
    }
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