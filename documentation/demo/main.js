// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './DemoApp.vue';

Vue.config.devtools = true;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    // eslint-disable-next-line arrow-body-style
    render: h => h(App)
});
