const config = {
    socket: 'localhost:3000',
    currencies: [
        {code: 'price_aud', name: 'AUD', symbol: '$'},
        {code: 'price_cny', name: 'CNY', symbol: '¥'}, 
        {code: 'price_eur', name: 'EUR', symbol: '€'},
        {code: 'price_gbp', name: 'GBP', symbol: '£'},
        {code: 'price_nzd', name: 'NZD', symbol: '$'},
        {code: 'price_usd', name: 'USD', symbol: '$'}               
    ],
    initialCurrency: 'USD'
  }
  
  export default config