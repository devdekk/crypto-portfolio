<template>
    <select class="selectpicker" v-model="currencyVal" @change="getCoinDataCurrency()">
        <option v-for="(currency, key) in currencies" :value="currency" :key="key"> {{currency.name}}</option>
    </select>
</template>


<script>
import io from 'socket.io-client'
import config from '../config'

export default {
  data() {
    return {
      currencies: [],
      initialCurrency: '',
      currencyVal: {},
      socket : io('localhost:3000')
    }
  },
  created () {
    // Import currencies from config file
    this.initialCurrency = config.initialCurrency
    this.currencies = config.currencies

    // Set initial currency
    this.currencyVal = this.currencies.find(obj => {
      return obj.name == this.initialCurrency
    })
    // Emit to parent
    this.emitCurrency()

  },
  methods: {
      
    getCoinDataCurrency: async function(){
      await this.socket.emit('GET_COINS_WITH_CURRENCY', {
                currency: this.currencyVal.name
       });

       this.emitCurrency()
    },
    emitCurrency (event) {
      this.$emit('sendCurrency', this.currencyVal)
    }
  }

}

</script>