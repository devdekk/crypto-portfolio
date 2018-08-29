<template>
<div class="container">
   <div class="row">
     <div class="col">
     </div>
     <div class="col">
      <tween-total-value :symbol="currencyVal.symbol" :value="totalValue"></tween-total-value>
     </div> 
     <div class="col" style="text-align: right;">
      <currency-select v-on:sendCurrency="getCurrency"></currency-select> 
     </div>
   </div>
   <crypto-list v-on:sendTotal="getTotal" :currency="currencyVal"></crypto-list>
</div>
</template>

<script>

// Imports
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import io from 'socket.io-client'
import TweenTotalValue from './TweenTotalValue.vue';
import CurrencySelect from './CurrencySelect.vue';
import CryptoList from './CryptoList.vue';

export default {
  name: 'app',
  components: {
    TweenTotalValue,
    CurrencySelect,
    CryptoList
  },
  data: () => ({
    currencyVal: {},
    totalValue: 0,
    socket : io('localhost:3000')
  }),
  methods: {
    // Retreive current chosen currency and pass to list component
    getCurrency(currency){
      this.currencyVal = currency
    },
    // Retrieve total from list and pass to total component
    getTotal(total){
      this.totalValue = total
    }
  }
}

</script>



