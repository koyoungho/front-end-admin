<template>
    <div>
        <div v-html="cssStyle"></div>
        <div id="popup1" class="popup_wrapper Pstyle" tabindex="0" >
        <!--<div id="popup1" class="popup_wrapper3 small" tabindex="0" style="display:block;width:420px;">-->
            <!-- popup header -->
            <div class="popup_header">
                <!-- h2 -->
                <h2>알림</h2>
                <a  class="btn_close b-close" v-on:click="closePop()">Close</a>
            </div>
            <!-- popup body -->
            <div class="popup_body" style="height: 300px;">
                <!-- popup content -->
                <div class="popup_content">
                    <div class="complete_box">
                        <p class="info_text">Internet Explorer 에서 본인인증 창이 보이지 않을때</p>
                        <p class="info_text">Internet Explorer 의 <strong>도구 메뉴</strong>를 클릭합니다.</p>
                        <p class="info_text"><strong> 도구 &gt; 인터넷 옵션 &gt; 개인정보 TAB &gt; 고급 버튼 클릭 &gt; 쿠키 설정 체크 </strong></p>
                        <p class="info_text">본인인증 재 실행으로 본인인증을 진행 하 실 수 있습니다. </p>
                        <p class="info_text">감사합니다.</p>

                        <!-- notice company -->
                    </div>
                </div>
                <!-- //popup content -->

                <!-- bottom area -->
                <div class="bottom_area">
                    <!-- btn -->
                    <div class="btn_bot">
                        <button type="button" class="btn_b01 bg01" v-on:click="closePop">닫기</button>
                    </div>
                </div>

            </div>

            <!-- //popup body -->

        </div>
    </div>

</template>

<script lang="ts">
    import {Component,  Vue} from 'vue-property-decorator';
    import {environment} from '../../../utill/environment';

    @Component({
        components: {
            ieShowFrm
        }
    })
    export default class ieShowFrm extends Vue {
        cssStyle: string = `<div class="popup_modal"></div>`;
        originId: any = 'header2';
        hostUrl: string = environment.selfCertificationUrl;


        closePop(){
            this.$emit('close');
        }

    //돔생성전 호출자
        created() {

        }




    }
</script>

<style scoped>

</style>