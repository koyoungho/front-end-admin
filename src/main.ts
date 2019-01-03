import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store/store'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'expose-loader?$!./assets/js/jquery-1.11.1.min.js'
import 'expose-loader?$!./assets/js/common-ui.js'
import 'expose-loader?$!./assets/js/jquery-ui-1.11.4.min.js'

import AirbnbStyleDatepicker from './assets/js/vue-airbnb-style-datepicker.es.js'
import VueProgressBar from 'vue-progressbar';
import 'expose-loader?jquery'

import VModal from 'vue-js-modal'

Vue.use(VModal, { dynamic: true, injectModalsContainer: true })

import VueResize from 'vue-resize'

Vue.use(VueResize)


const options = {
    color: '#fa0a12',
    failedColor: '#874b4b',
    thickness: '6px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    location: 'left',
    inverse: false
}

Vue.use(VueProgressBar, options)
const datepickerOptions = {}
Vue.use(AirbnbStyleDatepicker, datepickerOptions)


Vue.config.productionTip = false

/** editor**/
import tinymce from 'vue-tinymce-editor'
Vue.component('tinymce', tinymce)

/**
 * 차트
 */
import VCharts from 'v-charts'
Vue.use(VCharts);

import VueDragscroll from 'vue-dragscroll'
Vue.use(VueDragscroll)



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')



