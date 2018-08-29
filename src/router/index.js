import Vue from 'vue'
import Router from 'vue-router'
import CryptoPortfolio from '@/components/CryptoPortfolio'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CryptoPortfolio',
      component: CryptoPortfolio
    }
  ]
})
