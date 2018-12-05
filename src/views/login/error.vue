<template>
  <div id="wrapper">
    <!-- header -->
    <header id="header">
      <!-- top header -->
      <div class="top_header mobile">
        <h1 class="logo"><a href="#">현금영수증</a></h1>
        <!-- util wrap -->
        <div class="util_wrap">

        </div>
        <!-- //util wrap -->
      </div>
      <!-- //top header -->
    </header>
    <!-- //header -->

    <!-- container -->
    <section id="container">
      <h2 class="blind">로그인</h2>

      <!-- error wrap -->
      <div class="error_wrap error01">
        <div class="error_msg">
          <span class="msg01">고객님, 불편을 드려 죄송합니다.</span>
        </div>
        <p class="error_text">페이지 주소가 정확하지 않거나 페이지에 오류가 있어 요청하신 내용을 찾을 수 없습니다.</p>
        <!-- btn area -->
        <div class="btn_area">
          <button type="button" id="" class="btn_b02 bg01" v-on:click="goHome">메인 페이지 이동</button>
        </div>
      </div>
      <!-- //error wrap -->


    </section>
    <!-- //container -->

    <!-- footer -->
    <footer id="footer">
      <div class="footer_wrap">
        <ul class="footer_links">
          <li><a href="#">(주) 케이티</a></li>
          <li><a href="#">롯데정보통신 (주)</a></li>
          <li><a href="#">이용약관</a></li>
          <li><a href="#">개인정보처리방침</a></li>
        </ul>
        <div class="footer_address">
          <p class="footer_text01"><span class="company">(주)케이티  대표이사 황창규</span>
            <span class="address">(우)13606 경기도 성남시 분당구 불정로 90(정자동 206번지)</span>
            <span class="tel">문의전화 : 02-2074-0340</span> / <span class="fax">팩스번호 : 02-2074-6089</span>
          </p>
          <p class="footer_text02">Copyright ⓒ 2019 KT corporation & LDCC. <span class="rights">All rights reserved.</span></p>
        </div>
      </div>
    </footer>
    <!-- //footer -->

  </div>
</template>

<script>
    export default {
        name: 'error',
        methods : {
          goHome(){
            this.$router.push('/')
          }
        },
        beforeCreate(){
            // console.log('1 data와 events(vm.$on, vm.$once, vm.$off, vm.$emit)가 세팅되지 않은 시점이므로 접근하려고 하면 에러를 뿜어낼 것이다.');
        },
        created(){
            // console.log('2 data와 events 활성화 접근가능 여전히 템플릿과 가상돔은 마운트 렌더링되지 않은 상태이다' , '컴포넌트 초기에 세팅되어야할 데이터 페치' , '부모에서 -> 자식으로 실행');
        },
        mounted() {
            // console.log('4 컴포넌트 템플릿 렌더링된 돔에 접근가능  자식부터 종료된후에 부모 마운트 실행한다.')
            this.$nextTick(function (){
                // console.log('4 모든 화면이 렌더링된후 실행한다 ')
                // if(this.test=='ok'){
            })

        }
    }
</script>

