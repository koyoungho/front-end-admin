<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>{{titleNm}} 미리보기</h3>

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
                        <td>제 1장 총칙</td>
                    </tr>
                    <tr>
                        <th scope="row">내용</th>
                        <td class="con_write">
                            <div class="con_write_box">
                                제 1조 (목적)<br>
                                이 약관은 주식회사 케이티(이하 "회사")가 운영하는 현금영수증서비스 (이하 "서비스")를 이용함에 있어 서비스와 이용자간의 권리,
                                의무 및 책임사항 등 서비스를 이용하는데 따른 이용조건 및 절차 등 기본적인 사항을 규정함을 목적으로 합니다.<br>

                                제 2조 (약관의 효력 및 변경)<br>
                                ① 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.<br>

                                1. 사이트: 회사가 현금영수증서비스를 제공하기 위하여 운영하는 웹사이트를 말하며, 가맹점 계정(ID 및 비밀번호)을 이용하여
                                서비스를 제공받을 수 있는 아래의 사이트를 의미합니다.. 아울러 사이트를 운영하는 사업자의 의미로도 사용합니다.<br>
                                - KT현금영수증 사이트: www.hellocash.co.kr<br>
                                2. 가맹점: 사이트에 접속하여 이 약관에 동의하고, ID와 Password(비밀번호)를 발급 받은 고객으로 가맹점의 자격 및 이용권한을
                                관리합니다.<br>
                                3. 운용자 : 서비스의 전반적인 관리와 원활한 운영을 위하여 회사가 선정한 사람을 의미합니다.<br>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->


            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" v-on:click="toPolicyList" class="btn_b01 bg02">취소</button>
                <button type="button" v-on:click="toRegPolicy" class="btn_b01 bg03">수정</button>
                <button type="button" v-on:click="save" class="btn_b01 bg01">저장</button>
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
        policyDetail:any[]=[];
        termsType:string = "";
        policyList:any=[];

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
            if(routeNm == 'policyDetail' ) {
                this.titleNm = '이용약관';
                this.termsType="site";

            }else if(routeNm == 'personalDetail' ){
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
         * 목록으로
         */
        toPolicyList(){
            this.$router.push({name:'policyList'});
        }

        /**
         * 수정창으로
         */
        toRegPolicy(){

            this.$router.push({name:'policyReg'});
        }

        save(){

        }


    }

</script>
<style scoped>

</style>