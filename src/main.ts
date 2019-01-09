import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store/store'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'expose-loader?$!./assets/js/jquery-1.11.1.min.js'
import 'expose-loader?$!./assets/js/common-ui.js'
import 'expose-loader?$!./assets/js/jquery-ui-1.11.4.min.js'


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



const datepickerOptions = {
    sundayFirst: false,
    dateLabelFormat: 'dddd, MMMM D, YYYY',
    days: ['월', '화', '수', '목', '금', '토', '일'],
    daysShort: ['월', '화', '수', '목', '금', '토', '일'],
    monthNames: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
    ],
    colors: {
            selected: '#a61c0f',
            inRange: '#e2415a',
            selectedText: '#fff',
            text: '#565a5c',
            inRangeBorder: '#e2415a',
            disabled: '#e2415a'
    }
}
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
Vue.use(AirbnbStyleDatepicker,datepickerOptions)



Vue.config.productionTip = false


/**로딩바**/
import Spinner from 'vue-simple-spinner'
Vue.use(Spinner)

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




// import VueDragscroll from 'vue-dragscroll'
// Vue.use(VueDragscroll)



new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')



