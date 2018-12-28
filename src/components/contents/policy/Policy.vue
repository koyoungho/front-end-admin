<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">

            <h3>{{titleNm}}</h3>

            <!-- terms info -->
            <!--<div class="terms_info">-->
                <!--<select class="select form_history" title="계정이력 선택" v-model ="policyHistory" v-on:change="historyChange">-->
                    <!--<option value="">개정이력 보기</option>-->
                    <!--<option v-for="policyList in policyList" v-bind:value="policyList.hisSeq">{{policyList.hisTitle}}</option>-->
                <!--</select>-->
            <!--</div>-->

            <!-- cont_mobile -->
            <div class="cont_mobile">
                <!-- terms box -->
                <div class="terms_box">
                    <dl class="terms_list" v-for="(policyDetail, index) in policyDetail">
                        <dt v-on:click=" display(index)" v-bind:class="{ 'on': (rownum == index) } "  >{{policyDetail.detTitle}}</dt>
                        <dd v-show="rownum == index" v-html="policyDetail.detContent"></dd>
                    </dl>
                </div>
                <!-- //terms box -->
            </div>
            <!-- //cont_mobile -->

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService} from "../../../api/common.service";
    import format from 'date-fns/format'

    @Component({
        components : {
            Policy
        }
    })
    export default class Policy extends Vue {
        titleNm: string ="";
        policyList:any[]=[];
        // policyHistory:string="";
        // currentDate:string="";
        hisSeq:string = "";
        policyDetail:any[]=[];
        isActive:boolean=false;
        arrow:string="";
        rownum:number=999;
        termsType :any="";

        mounted(){
            this.pageDiv();
        }

        // 라우터 경로 변경시 이벤트 발생
        @Watch('$route') onChange(){
            this.pageDiv();
        }

        /**
         * 페이지 분기 - 셀렉트 박스 이력리스트호출
         */
        pageDiv(){

            this.termsType = this.$route.query.titleNm;

            if(this.termsType == 'site' ){
                this.titleNm ='이용약관'
            }else if(this.termsType == 'user' ){
                this.titleNm ='개인보호처리방침'
            }

            this.bindContent();//본문호출

        }

        /**
         * api 데이터 호출 -  본문
         */
        bindContent(){
            CommonBoardService.getListDatas('terms/current', this.termsType, null).then((response) => {

                    let resultDetail: any = response.data;

                    if (resultDetail.length > 0) {
                        this.policyDetail = resultDetail;
                    } else {
                        console.log("개정이력이 없습니다.");
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                } ).catch();
        }

        /**
         * 날짜 포맷 변경
         * @param date
         */
        formatDates(date) {
            let formattedDates = '';
            formattedDates = format(date, "YYYY.MM.DD")
            return formattedDates
        }


        /**
         * 정규식 변환유틸 - html->특수문자
         * @param str
         * @constructor
         */
        ConvertSystemSourcetoHtml(str){
            str = str.replace(/</g,"&lt;");
            str = str.replace(/>/g,"&gt;");
            str = str.replace(/\"/g,"&quot;");
            str = str.replace(/\'/g,"&#39;");
            str = str.replace(/\n/g,"<br />");
            return str;
        }
        /**
         * 아코디언메뉴 제어
         * @param index
         */
        display(index){
            // alert(index);
            this.isActive =false;
            this.rownum =999;

            this.isActive = !this.isActive;

            if(this.isActive == true){
                this.rownum = index;
            }else{
                this.arrow="";

            }

        }


    }
</script>

<style scoped>

</style>