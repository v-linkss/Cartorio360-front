<template>
    <div class="input-wrapper">
      <input
        id="valor"
        style="
          border: 1px solid black;
          background-color:#E4E0E1;
          border-radius: 4px;
          padding: 7px 0px 7px 7px;
        "
        v-model.lazy="amount"
        v-money3="config"
      />
    </div>
  </template>
  
  <script>
  import { Money3Directive } from "v-money3";
  
  export default {
    name: "MoneyInput",
    props: {
      modelValue: {
        type: String,
        default: '0.00',
      },
    },
    data() {
      return {
        amount: this.modelValue,
        config: {
          thousands: "",
          decimal: ".",
          precision: 2,
        },
      };
    },
    directives: { money3: Money3Directive },
    watch: {
      amount(val) {
        this.$emit('update:modelValue', val);
      },
      modelValue(val) {
        this.amount = val;
      },
    },
  };
  </script>
  
  <style>
  .input-wrapper {
    display: flex;
    flex-direction: column;
  }
  </style>
  