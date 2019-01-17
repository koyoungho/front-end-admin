<template>
  <div class="captcha_box">
    <img :src="environment.apiUrl+'/captcha'" alt="캡차 이미지" title="클릭시 새로고침" @click="imgRefresh()"/><br>
    <input type="text" id="captcha" name="captcha" autocomplete="off" title="보안문자를 입력해 주세요"  required/>
  </div>
</template>

<script>
  import {environment} from '/src/utill/environment'

  export default {
    name: 'captcha',
      methods: {
          //이미지 새로고침
          imgRefresh(){
              this.$el.children[0].src = +environment.apiUrl+/captcha?ran="+ Math.random();
          }
      }
  };
</script>
