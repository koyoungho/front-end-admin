<template>
  <div class="captcha_box">
    <img src="http://211.39.150.112/api/captcha" alt="캡차 이미지" title="클릭시 새로고침" @click="imgRefresh()"/><br>
    <input type="text" id="captcha" name="captcha" autocomplete="off" title="보안문자를 입력해 주세요"  required/>
  </div>
</template>

<script>
  export default {
    name: 'captcha',
      methods: {
          //이미지 새로고침
          imgRefresh(){
              this.$el.children[0].src = "http://211.39.150.96:8888/api/captcha?ran="+ Math.random();
          }
      }
  };
</script>
