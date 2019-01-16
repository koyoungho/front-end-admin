<template>
    <!-- footer -->
    <footer id="footer">
        <!-- quick banner -->
        <div class="quick_banner">
            <div class="quick">
                <span class="sub">고객센터</span>
                <p class="cont">
                    <span class="tel">(02)<strong>2074-0340</strong></span>
                    <span class="text">평일 09:30~18:00</span>
                </p>
            </div>
            <span class="page_top" v-on:click="top()"><a>TOP</a></span>
        </div>
        <div class="footer_wrap">
            <ul class="footer_links">
                <li><a href="https://www.kt.com/" target="_blank" title="새창으로 열기">(주) 케이티</a></li> <!-- 20181120 수정 -->
                <li><a href="https://www.ldcc.co.kr/" target="_blank" title="새창으로 열기">롯데정보통신 (주)</a></li> <!-- 20181120 수정 -->
                <li v-on:click="policyDiv('site')"><a>이용약관</a></li>
                <li v-on:click="policyDiv('user')"><a>개인처리방침</a></li>
            </ul>
            <div class="footer_address">
                <p class="footer_text01">
                    <span class="company">(주)케이티  대표이사 황창규</span>
                    <span class="address">(우)13606 경기도 성남시 분당구 불정로 90(정자동 206번지)</span>
                    <span class="tel"> 문의전화 : 02-2074-0340</span> / <span class="fax">팩스번호 : 02-2074-6089</span>
                </p>
                <p class="footer_text02">Copyright ⓒ 2019 KT corporation & LDCC. <span class="rights">All rights reserved.</span></p>
            </div>
        </div>
    </footer>
    <!-- //footer -->
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    @Component({
        components: {
            Bottom
        }
    })
    export default class Bottom extends Vue {
        @Prop() private msg!: string;

        top(){
            window.scrollTo(0,0)
        }

        policyDiv(titleNm){
            this.$router.push({path:'/home/policy', name:'policy', query:{ titleNm:titleNm }})
        }

    }



</script>
<style>
</style>
