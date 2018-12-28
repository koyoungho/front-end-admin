<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>{{titleNm}} 상세보기</h3>

            <!-- tbl write box -->
            <div class="bbs_write_box">
                <!-- tbl view01 -->
                <table class="bbs_write">
                    <caption>이용약관 내용 입력</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="90%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td>{{detTitle}}</td>
                    </tr>
                    <tr>
                        <th scope="row">내용</th>
                        <td class="con_write">
                            <div class="con_write_box" v-html="detContent"></div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn bot -->

            <div class="btn_bot">
                <button type="button" v-on:click="toPolicyList" class="btn_b01 bg02">목록으로</button>
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
            PolicyDetail
        }
    })
    export default class PolicyDetail extends Vue {
        titleNm: string ="";
        hisSeq:string = "";
        termsType:string = "";
        objectKey : any = [];
        detSeq: string ="";
        detTitle: string ="";
        detContent: string ="";
        div : string = "";
        termsOrder : string = "";
        routeNm : any="";

        mounted(){
            this.div=this.$route.params.div;

                this.objectKey = this.$route.params.objectKey;
                this.hisSeq =  this.$route.params.hisSeq;
                this.detSeq =  this.objectKey.detSeq;

                // this.seq = this.objectKey.seq;// 글번호 시퀀스
                this.pageDiv();
                this.getData();

        }

        // 라우터 경로 변경시 이벤트 발생
        @Watch('$route') onChange(){
            this.pageDiv();
        }

        /**
         * 페이지 분기 - 셀렉트 박스 리스트호출
         */
        pageDiv(){

            this.routeNm = this.$route.name;
            if( this.routeNm == 'policyDetail' ) {
                this.titleNm = '이용약관';
                this.termsType="site";

            }else if( this.routeNm == 'personalDetail' ){
                this.titleNm ='개인보호처리방침';
                this.termsType="user";
            }

        }
/**
 *  데이터 호출
 */
        getData(){
            // api 데이터 호출 -  약관/개인 지침 리스트
            CommonBoardService.getListDatas('terms/history/'+this.hisSeq, this.detSeq, null ).then((response) => {

                    let result: any = response.data;
                    if (response.status.toString() == '200') {
                        this.detTitle = result.detTitle;
                        this.detContent = result.detContent;
                    }
                }
                , (error) => {
                    //this.$Progress.finish();
                } ).catch();
        }

        /**
         * 목록으로 (완료된 정책일 경우)
         */
        toPolicyList(){

            if(this.routeNm == 'policyDetail'){
                this.$router.push({name:'policyList', params:{hisSeq:this.hisSeq}});
            }else{
                this.$router.push({name:'personalList', params:{hisSeq:this.hisSeq}});

            }

        }

        /**
         * 수정창으로
         */
        toRegPolicy(){

            if(this.routeNm == 'policyDetail') {
                this.objectKey['termsOrder'] = this.termsOrder;

                console.log( "디테일",this.objectKey);

                this.$router.push({
                    name: 'policyReg',
                    params: {objectKey: this.objectKey}
                    // params: {hisSeq: this.hisSeq, detSeq: this.detSeq, termsOrder: this.termsOrder}
                });
            }else {
                this.$router.push({
                    name: 'personalReg',
                    params: {hisSeq: this.hisSeq, detSeq: this.detSeq, termsOrder: this.termsOrder}

                });
            }
        }

        save(){

        }


    }

</script>
<style scoped>

</style>