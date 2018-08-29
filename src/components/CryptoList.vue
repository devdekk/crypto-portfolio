<template>
  <table class="table table-hover">
    <thead>
        <tr>
            <td style="width: 25%">Rank</td>
            <td style="width: 25%">Name</td>
            <td style="width: 25%">Price ({{ currencyVal.name }})</td>
            <td style="width: 25%">My Coins</td>
        </tr>
    </thead>
    <tbody >
        <tr v-for="(coin,key) in coins" :key="key">  
            <td>{{  coin.rank }} </td>
            <td> {{ coin.name }} </td>
            <td> {{ currencyVal.symbol }} {{ price(coin)}} </td>
            <td><input class="form-control" v-on:input="calculateFiat()" type="number" 
                autocomplete="off" v-model="myCoins[key].owned" v-on:keypress="isFloatNumber()" ></td>
        </tr>
    </tbody>
  </table>
</template>

<script>

// Imports
import io from 'socket.io-client'

export default {
   // Currency object that is been passed in
   props: {
    currency: {
      type: Object
    }
  },
  watch: {
    // Watch for updates on currency
    currency(newVal, oldVal) {
      this.currencyVal = newVal
    }
  },
  data() {
    return {
      coins: [],
      myCoins: [],
      currencyVal: {},
      totalValue: 0,
      socket : io('localhost:3000')
    }
  },
  methods: {
    // Function to return number to two decimal places - place empty number string holder when loading data
    twoDecimal: function (number) {
      if(isNaN(number)){
        return '-.--'
      }else{
        return parseFloat(number).toFixed(2)
      }
    },
    // Function to return currenct price in chosen currency to two decimal places
    price: function (coin) {
      let number = coin[this.currencyVal.code]
      return this.twoDecimal(number)
    },
    getCoinData: function() {
      // Function to get initial coin data and socket that will update coin array when currency changes
      this.socket.on('CRYPTO_DATA', (data) => {
        if (this.coins.length == 0){
              // Initial populate of coin data and initialise my coins array
              this.coins = data
              this.initialiseMyCoins()

            } else{
              this.coins = data
              this.calculateFiat()
        }
            
        });
    },
    // Function to calculate the total value in the chosen fiat currency
    calculateFiat: function(){

        // Reset total value before calculating
        this.totalValue = 0

        for(let i = 0; i < this.coins.length; i++){
          for(let j = 0; j < this.myCoins.length; j++){
            if (this.coins[i].id === this.myCoins[j].id && this.inputNotEmpty(this.myCoins[j])){
                this.totalValue += (parseFloat(this.myCoins[j].owned) * parseFloat(this.coins[i][this.currencyVal.code]))
            }
          }
        }
    
        this.emitTotal()
    },
    // Function to initialise myCoins array which stores coin ID and amount owned
    initialiseMyCoins: function(){
      for (let i = 0; i < this.coins.length; i++){
        this.myCoins.push({ key: i, id: this.coins[i].id , owned: '' })
      }
    },
    // Function to check if input field is not empty
    inputNotEmpty: function(input){
      return input.owned !== ''
    },
    // Function to only allow floating point numbers
    isFloatNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();;
      } else {
        return true;
      }
    },
    // Retrieve currency from parent
    getCurrency(currency){
      this.currencyVal = currency
    },
    // Send total value to parent
    emitTotal (event) {
      this.$emit('sendTotal', this.totalValue)
    }

  },
  created () {
    this.getCoinData();
  }

}

</script>
