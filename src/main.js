// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// vue
import Vue from 'vue'
import router from './router'
import store from './store'

// bootstrap vue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// open-iconic
import "open-iconic/font/css/open-iconic-bootstrap.css"

// vee-validate
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
import zh from 'vee-validate/dist/locale/zh_CN';

// highlightjs
import VueHighlightJS from 'vue-highlightjs'

// vue-select
import vSelect from 'vue-select';

// vue-clipboard2
import VueClipboard from 'vue-clipboard2'


Vue.config.productionTip = false;

// vue-moment
Vue.use(require('vue-moment'));

Vue.use(BootstrapVue);

Vue.use(VueHighlightJS);

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zh',
  silentTranslationWarn: true
});
Vue.use(VeeValidate, {
  events: 'change',
  fieldsBagName: 'veeFields',
  i18nRootKey: 'validations',
  i18n,
  dictionary: {
    zh,
  }
});

Vue.component('v-select', vSelect);

Vue.use(VueClipboard);


// filter
Vue.filter('truncate', (value) => {
  if (value.length > 15) {
    return value.substring(0, 15) + "...";
  }
  return value;
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
}).$mount("#app");
