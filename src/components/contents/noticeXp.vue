<template>

  <div>
    <!--<div v-html="cssStyle"></div>-->
    <div id="popup1" class="popup_wrapper2 medium" tabindex="0" >
      <div class="popup_header">
        <!-- h2 -->
        <h2>호환 안내</h2>
      </div>
      <div class="popup_body">
        <!-- popup content -->
        <div class="popup_content">

          <div class="complete_box">
            <p class="sub">안녕하세요. KT-LDCC 현금영수증 서비스입니다. </p>
            <br>
            <p class="sub">2019년 1월 21일 새로운 현금영수증 서비스 오픈과 관련</p>
            <br>
            <p class="sub">XP , VISTA , WINDOW 8</p>
            <br>
            <p class="sub">아래 다운로드 주소를 클릭 </p>
            <br>
            <p class="sub">상위버전으로 설치 하시면 정상적인 사용이 가능합니다</p>
            <br>
            <p class="sub"><a href="https://www.google.com/chrome/" ><font color="blue"><strong>Chrome </strong><span>다운받기</span></font></a></p>
            <br>
            <p class="sub"><strong>고객센터 Tel. 02 - 2074 - 0340</strong></p>
            <br>
            <!-- notice company -->
            <div class="notice_company">
              <span class="sub">투명한 거래를 위한 KT・ 롯데정보통신</span>
              <span class="text"><em>현금영수증 운영자</em> 드림</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components : {
            noticeUp
        }
    })
    export default class noticeUp extends Vue {

        closePop(){
            this.$emit('close');
        }

        created

    }
</script>

<style scoped>

</style>