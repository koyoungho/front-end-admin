<template>
  <div>

      <h4 class="blind">배치 파일 처리 현황</h4>

    <!-- btn tab -->
    <div class="btn_tab" v-show="buttonShow" >
        <button type="button" class="btn_m01 bg02" v-on:click="toList">배치파일 처리 결과조회</button>
        <!--v-on:click="toList"-->
    </div>


    <!-- system box -->
    <div class="system_box">
        <ul class="system_list">
            <li>
                <!-- system row -->
                <div class="system_row st_color01">
                    <div class="system_col01">
                        <h5 class="system">작업 대기</h5>
                        <span class="text_type04">파일 건수</span>
                        <span class="text_type04">처리 건수</span>
                    </div>
                    <div class="system_col02">
                        <span class="total">{{readySum}}</span>
                        <span class="num">{{readyFileCount}}</span>
                        <span class="num">{{readyProcNum}}</span>
                    </div>
                </div>
            </li>
            <li>
                <!-- system row -->
                <div class="system_row st_color02">
                    <div class="system_col01">
                        <h5 class="system">작업 중</h5>
                        <span class="text_type04">파일 건수</span>
                        <span class="text_type04">처리 건수</span>
                    </div>
                    <div class="system_col02">
                        <span class="total">{{doneSum}}</span>
                        <span class="num">{{doneFileCount}}</span>
                        <span class="num">{{doneProcNum}}</span>
                    </div>
                </div>
            </li>
            <li>
                <!-- system row -->
                <div class="system_row st_color03">
                    <div class="system_col01">
                        <h5 class="system">작업 완료</h5>
                        <span class="text_type04">파일 건수</span>
                        <span class="text_type04">처리 건수</span>
                    </div>
                    <div class="system_col02">
                        <span class="total">{{succSum}}</span>
                        <span class="num">{{succFileCount}}</span>
                        <span class="num">{{succProcNum}}</span>
                    </div>
                </div>
            </li>
            <!--<li>
                <div class="system_row st_color04">
                    <div class="system_col01">
                        <h5 class="system">정상 처리 건수</h5>
                    </div>
                    <div class="system_col02">
                        <span class="total">10</span>
                    </div>
                </div>
            </li>-->
            <li>
                <!-- system row -->
                <div class="system_row st_color05">
                    <div class="system_col01">
                        <h5 class="system">오류 처리 건수</h5>
                        <span class="text_type04">파일 건수</span>
                        <span class="text_type04">처리 건수</span>
                    </div>
                    <div class="system_col02">
                        <span class="total">{{failSum}}</span>
                        <span class="num">{{failFileCount}}</span>
                        <span class="num">{{failprocnum}}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>

</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import {CommonBoardService} from "../../../api/common.service";
    import  moment from 'moment'

    @Component({
        components: {
            BatchFileProc
        }
    })
    export default class BatchFileProc extends Vue {

        vWebType:string="";
        buttonShow:boolean=false;

        doneSum:any='0';
        doneFileCount:any='0';
        doneProcNum:any='0';
        readySum:any='0';
        readyFileCount:any='0';
        readyProcNum:any='0';
        succSum:any='0';
        succFileCount:any='0';
        succProcNum:any='0';
        failSum:any='0';
        failFileCount:any='0';
        failprocnum:any='0';

        interval:any='';

        created(){

            this.interval = setInterval(this.batchFileSummaryApi, 3000);
        }

        mounted(){
            let filter = "win16|win32|win64|mac";
            this.vWebType = "";

            //모바일/PC 구분
            if (navigator.platform ) {
                if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                    this.vWebType = "MOBILE";
                    this.buttonShow = false;
                } else {
                    this.vWebType = "PC";
                    this.buttonShow = true;
                }
            }

            this.batchFileSummaryApi();

        }

        /**
         * 리스트로 이동
         */
        toList(){
            this.$emit('toList' , 'BatchFileList');
        }

        amtComma(num){
            if(num == null || num == ''){
                return '0';
            }else if(num == 0 || num == '0'){
                return '0';
            }else{
                return Number(num).toLocaleString();
            }
        }

        batchFileSummaryApi(){

            let  nowUTC =  moment().utc() ; //UTC시간
            let  nowKo= nowUTC.add(9, 'hours'); //한국시간
            let searchDate = moment(nowKo).format('YYYYMMDD');
            //searchDate = '20180225'

            CommonBoardService.getListDatas('approval/file/'+searchDate, 'summary', null).then(result=>{
                if(result.status==200){

                    this.doneFileCount = this.amtComma(result.data.doneFileCount);
                    this.doneProcNum = this.amtComma(result.data.doneProcNum);
                    this.doneSum = this.amtComma(Number(this.doneFileCount.replace(/,/gi,"")) + Number(this.doneProcNum.replace(/,/gi,"")));
                    this.readyFileCount = this.amtComma(result.data.readyFileCount);
                    this.readyProcNum = this.amtComma(result.data.readyProcNum);
                    this.readySum = this.amtComma(Number(this.readyFileCount.replace(/,/gi,"")) + Number(this.readyProcNum.replace(/,/gi,"")));
                    this.succFileCount = this.amtComma(result.data.succFileCount);
                    this.succProcNum = this.amtComma(result.data.succProcNum);
                    this.succSum = this.amtComma(Number(this.succFileCount.replace(/,/gi,"")) + Number(this.succProcNum.replace(/,/gi,"")));
                    this.failFileCount = this.amtComma(result.data.failFileCount);
                    this.failprocnum = this.amtComma(result.data.failprocnum);
                    this.failSum = this.amtComma(Number(this.failFileCount.replace(/,/gi,"")) + Number(this.failprocnum.replace(/,/gi,"")));

                }
            })

        }

        destroyed(){
            clearInterval(this.interval);
        }

    }
</script>

<style scoped>

</style>