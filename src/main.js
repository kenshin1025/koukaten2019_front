import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store'

Vue.config.productionTip = false

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !(store.state.user.logined)) {
        next({ path: '/login', query: { redirect: to.fullPath }});
    } else {
        next();
    }
});