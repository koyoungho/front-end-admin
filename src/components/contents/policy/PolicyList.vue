<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>{{titleNm}} 관리</h3>

            <!-- btn top -->
            <!--<div class="btn_top">-->
            <!--<button type="button" class="btn_m01 bg02"  v-on:click="regPolicy">{{titleNm}} 등록</button>-->
            <!--</div>-->

            <!-- tbl list box -->
            <div class="tbl_list_box">
                <!-- tbl list01 -->
                <table class="tbl_list01">
                    <caption>이용약관 관리</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="*">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">순 번</th>
                        <th scope="col">제 목</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-if="policyList.length>0">
                        <tr v-for="(policyList, index) in policyList">
                            <td><input type="text" class="input form_order"  ></td>
                            <td class="left" v-on:click=" toDetail(policyList.hisSeq)">
                                <span class="sub">{{policyList.hisTitle}}</span>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="2" class="no_data">조회된 내용이 없습니다.</td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" v-on:click="toList" class="btn_b01 bg02">취소</button>
                <button type="button" v-on:click="toRegPolicy" class="btn_b01 bg03">{{titleNm}} 추가</button>
                <button type="button" id="" class="btn_b01 bg03">임시 저장</button>
                <button type="button" id="" class="btn_b01 bg01">전체 저장</button>
            </div>
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
        hisSeq:string = "";
        termsType:string = "";

        mounted(){
            this.pageDiv();
        }

        // 라우터 경로 변경시 이벤트 발생
        @Watch('$route') onChange(){
            this.pageDiv();
        }

        /**
         * 페이지 분기 - 셀렉트 박스 리스트호출
         */
        pageDiv(){

            let routeNm = this.$route.name;
            if(routeNm == 'policyList' ) {
                this.titleNm = '이용약관';
                this.termsType="site";

            }else if(routeNm == 'personalList' ){
                this.titleNm ='개인보호처리방침';
                this.termsType="user";
            }

            // api 데이터 호출 -  약관/개인 지침 리스트
            CommonBoardService.getListDatas('terms/'+this.termsType+'/history', null, null).then((response) => {
                    let resultList: any = response.data;
                    this.hisSeq ="";

                    if (resultList.length > 0) {
                        this.policyList = resultList;
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                } ).catch();
        }

        /**
         * 데이트 포맷 변경
         * @param date
         */
        formatDates(date) {
            let formattedDates = '';
            formattedDates = format(date, "YYYY.MM.DD")
            return formattedDates
        }

        toDetail(hisSeq){

            if(this.termsType == 'site'){
                this.$router.push({name:'policyDetail',params:{hisSeq:hisSeq}});
            }else{
                this.$router.push({name:'personalDetail',params:{hisSeq:hisSeq}});
            }

        }

        /**
         * 등록버튼 클릭
         */
        toRegPolicy(){
            if(this.termsType == 'site'){
                this.$router.push({name:'policyReg'});
            }else{
                this.$router.push({name:'personalReg'});
            }
        }

        /**
         * 목록으로
         */
        toList(){
            if(this.termsType="site"){
                this.$router.push({name:'policyHistoryList'});
            }else{
                this.$router.push({name:'personalHistoryList'});
            }
        }



    }
</script>

<style scoped>

</style>