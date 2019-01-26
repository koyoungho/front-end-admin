import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store/store'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'expose-loader?$!./assets/js/jquery-1.11.1.min.js'
import 'expose-loader?$!./assets/js/common-ui.js'
import 'expose-loader?$!./assets/js/jquery-ui-1.11.4.min.js'


import 'expose-loader?jquery'

import VModal from 'vue-js-modal'

Vue.use(VModal, { dynamic: true, injectModalsContainer: true, dialog:true })

import VueResize from 'vue-resize'

Vue.use(VueResize)


Vue.config.productionTip = false


/** 알럿, 컴펌 **/
import VueSweetalert2 from 'vue-sweetalert2';
const alertOptions = {
    confirmButtonColor: '#da291c',
}
Vue.use(VueSweetalert2 , alertOptions);

/**로딩바**/
import Spinner from 'vue-simple-spinner'
Vue.use(Spinner)

import {ModelListSelect} from 'vue-search-select'
Vue.component('ModelListSelect',ModelListSelect)


/** editor**/
import tinymce from 'vue-tinymce-editor'
Vue.component('tinymce', tinymce)

import DatePicker from 'vue2-datepicker'
Vue.use(DatePicker);


/**
 * 차트
 */
import VCharts from 'v-charts'
Vue.use(VCharts);

import money from 'v-money'
Vue.use(money, {precision: 4});

// import VueDragscroll from 'vue-dragscroll'
// Vue.use(VueDragscroll)



new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')



