<template>
    <div>
    <!-- settle box -->
    <div class="">

        <div class="form_settle">
            <h4>개인정보 보유 갯 수 : <span class="sub_number">{{searchCountData.receiptCount}} 건</span></h4>
        </div>
        <h4></h4>
        <h4>현금영수증 가맹점 현황</h4>
        <!-- store list -->
        <ul class="store_list">
            <li><span class="sub">신규</span> <span class="cont">{{searchCountData.newStoreCount}} 건</span></li>
            <li><span class="sub">해지</span> <span class="cont">{{searchCountData.cancelStoreCount}} 건</span></li>
            <li><span class="sub">누적</span> <span class="cont">{{searchCountData.stackStoreCount}} 건</span></li>
            <li><span class="sub">첨부파일</span> <span class="cont" style="color: #008aff">신규 / 해지 가맹점 정보</span></li>
        </ul>



    </div>

    </div>
    <!-- //content -->
</template>

<script lang="ts">

    import {format} from 'date-fns';
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';

    @Component({

        components: {
            GajumPoint
        }
    })
    export default class GajumPoint extends Vue {
        @Prop() searchStartDate !:string
        @Prop() searchEndDate !:string

        nowDateStartp : string = this.searchStartDate;
        nowDateEndp : string = this.searchEndDate;
        searchCountData : any = [];

        created(){
            // this.searchCount()
        }


        searchCount(date1,date2) {
            CommonBoardService.getListDatas('statistics/summary', 'kt', {
                searchStartDate: date1,
                searchEndDate: date2
            }).then(result => {
                if(result.status==200){
                     this.searchCountData = result.data
                }
            })
        }
    }
</script>

<style scoped>

</style>