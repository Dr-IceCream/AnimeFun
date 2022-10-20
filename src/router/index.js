import Vue from 'vue'
import Router from 'vue-router'
import SearchPanel from '@/components/SearchPanel'
import InfPage from '@/components/InfPage'
import TracePage from '@/components/TracePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchPanel',
      component: SearchPanel,
    },
    {
      path: '/InfPage',
      name: 'InfPage',
      component: InfPage,
    },
    {
      path: '/TracePage',
      name: 'TracePage',
      component: TracePage,
    }
  ],
  
})
