<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">사업자 소개</h2>

            <h3 class="blind">케이티</h3>

            <span class="user_logo01">케이티</span>
            <p class="user_text">1981년 창립 이후, <em class="fc_pt01">대한민국 정보통신을 이끌어온 KT</em><br>사람을 위한 혁신기술로 새로운 미래를 만들어 가겠습니다.</p>

            <h4 class="con">글로벌 1등 ICT 기업에 도전</h4>
            <p class="sub_text type03">세계최초 5G와 혁신적 지능형 네트워크로 4차 산업혁명을 이끕니다.</p>
            <h4 class="con">유무선 기가 시대 선도</h4>
            <p class="sub_text type03">유무선 모두 기가급 속도를 실현합니다.</p>
            <h4 class="con">혁신기술 1등 KT</h4>
            <p class="sub_text type03">미디어, 스마트에너지, 금융거래, 재난/안전/보안, 기업/공공가치 향상 등 5대플랫폼을 육성, 글로벌 ICT기업으로 성장합니다.</p>
            <h4 class="con">고객이 신뢰하는 국민기업 KT</h4>
            <p class="sub_text type03">KT의 주인은 국민입니다. 언제나 국민과 함께 하는 KT가 되겠습니다.</p>
        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
        components: {
            Kt
        }
    })

    export default class Kt extends Vue {
        @Prop() private msg!: string;

        mounted() {

        }


    }

</script>