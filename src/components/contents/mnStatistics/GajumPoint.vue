<template>
    <div>
        <div v-show="loading11" >
            <vue-simple-spinner size="medium" line-fg-color="#D0021B" message="처리중입니다 잠시만기다려주세요!" />
        </div>
    <div>
        <!--<h4>개인정보 보유 갯 수 : <span class="sub_number">{{searchCountData.receiptCount}} 건</span></h4>-->
    <div class="tbl_scroll_x_box">
        <!-- content  -->
    <!-- settle box -->

        <!--<div class="form_settle">-->
            <!--<h4>개인정보 보유 갯 수 : <span class="sub_number">{{searchCountData.receiptCount}} 건</span></h4>-->
        <!--</div>-->
        <h4></h4>
        <h4>현금영수증 계정 현황</h4>
        <!-- store list -->
        <ul class="store_list">
            <li><span class="sub">신규</span> <span class="cont" >{{searchCountData.newAccount}}건</span></li>
            <li><span class="sub">해지</span> <span class="cont">{{searchCountData.cancelAccount}} 건</span></li>
            <li><span class="sub">누적</span> <span class="cont">{{searchCountData.stackAccount}} 건</span></li>
        </ul>
        <h4>현금영수증 가맹점 현황</h4>
        <!-- store list -->
        <ul class="store_list">
            <li><span class="sub">신규</span> <span class="cont">{{searchCountData.newStoreCount}} 건</span></li>
            <li><span class="sub">해지</span> <span class="cont">{{searchCountData.cancelStoreCount}} 건</span></li>
            <li><span class="sub">누적</span> <span class="cont">{{searchCountData.stackStoreCount}} 건</span></li>
        </ul>
      </div>
    </div>
    </div>
    <!-- //content -->
</template>

<script lang="ts">

    import {format} from 'date-fns';
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';
    import VueSimpleSpinner from 'vue-simple-spinner/src/components/Spinner.vue';

    @Component({

        components: {
            GajumPoint,VueSimpleSpinner
        }
    })
    export default class GajumPoint extends Vue {
        @Prop() searchStartDate !:string

        searchCountData : any = [];
        loading11 : boolean = false;

        money : any = {
            decimal: '.',
            thousands: ',',
            //prefix: 'R$ ',
            //suffix: ' #',
            precision: 0,
            masked: false
        }

        created(){
            // this.searchCount()
        }


        searchCount(date1,date2) {
            this.loading11=true;
            CommonBoardService.getListDatas('statistics/summary', '', {
                searchStartDate: date1,
                searchEndDate: date2
            }).then(result => {
                if(result.status==200){
                     this.searchCountData = result.data
                }
                this.loading11=false;
            })

        }
    }
</script>

<style scoped>

</style>