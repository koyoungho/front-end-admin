<template>
    <!-- popup body -->
    <div class="popup_body">
        <!-- popup content -->
        <div class="popup_content layer">
            <div class="info_loading">
                로딩중입니다.
            </div>
        </div>
        <!-- //popup content -->
    </div>
    <!-- //popup body -->
</template>


<script lang="ts">
    import axios from 'axios';
    import {Component, Vue} from 'vue-property-decorator';
    import {CommonBoardService} from '../../../api/common.service';
    import {environment} from '../../../utill/environment';

    @Component({
        components: {
            kmcResult
        },
    })
    export default class kmcResult extends Vue {
        defaultParams : any = "";
        res_cert: any = '';
        resNumber: any = '';


        //돔생성전 호출자
        created() {
            this.getBlaindLoding()

        }

        //돔렌더링완료시 진행
        mounted() {

        }
        getBlaindLoding() {
            //this.defaultParams = this.$route.query;

            let decertData : any = {};
            decertData['certNum'] = this.$route.query.certNum;
            decertData['rec_cert'] = this.$route.query.rec_cert;
            decertData['name'] = sessionStorage.kmc_name; //입력받은 이름
            decertData['id'] = sessionStorage.kmc_id; //입력받은 ID
            decertData['saupId'] =  sessionStorage.kmc_saupId; //입력받은 사업자번호

            if(this.$route.query){
                // api 요청코드 암호화 요청
                CommonBoardService.postListDatas('kmc/decert', null ,decertData)
                    .then((response) => {
                            let resultData = response.data;

                            let authInfo : any = JSON.parse(JSON.stringify(resultData));
                            if(authInfo != null && authInfo.code == '001'){ //본인 인증 정보가 다릅니다.
                                alert(authInfo.message);
                                sessionStorage.kmc_name = '';
                                sessionStorage.kmc_id = '';
                                sessionStorage.kmc_saupId = '';
                                sessionStorage.setItem("failKey",'Fail')
                                return;
                            }

                            if(response.status==200){
                                sessionStorage.kmc_name = '';
                                sessionStorage.kmc_id = '';
                                sessionStorage.kmc_saupId = '';
                                sessionStorage.setItem("resultKey",JSON.stringify(resultData))
                            }
                            else{
                                sessionStorage.kmc_name = '';
                                sessionStorage.kmc_id = '';
                                sessionStorage.kmc_saupId = '';
                                sessionStorage.setItem("failKey",'Fail')
                            }
                        }
                        , error => {
                            sessionStorage.kmc_name = '';
                            sessionStorage.kmc_id = '';
                            sessionStorage.kmc_saupId = '';
                            sessionStorage.setItem("failKey",'Fail')
                        }
                    ).catch();
            }
            // 전송
        }


        updated() {
            this.$nextTick(function () {
            });
            // data 값 변조하면됨 Y / N   1,2? 이런값들 변경시 필요함
        }
    }

</script>
