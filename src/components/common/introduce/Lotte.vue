<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">사업자 소개</h2>

            <h3 class="blind">롯데정보통신</h3>

            <span class="user_logo02">롯데정보통신</span>
            <p class="user_text">롯데정보통신은 유통, 서비스, 제조, 금용 분야 최고의 경쟁력을 가진 대한민국 대표기업<br><em class="fc_pt01">롯데그룹의 지식 정보화를 선도하는 IT 서비스 전문 기업</em>입니다.</p>

            <h4 class="con">고객의 가치창조 파트너</h4>
            <p class="sub_text type03">
                <em class="fc_pt01">LOTTE Data Communication Company</em><br>
                롯데정보통신은 유통, 제조/건설, 화학, 금융, 서비스 등에서 최고의 성과를 창출하고 있는 롯데그룹의 성장엔진으로서 21세기 지식 정보화를 선도하는 IT서비스 전문 기업입니다.<br>1996년 창립 이래 시스템관리(System Management),시스템통합(System Integration), IT 컨설팅 e-Biz 등의 체계적인 IT서비스를 제공, 고객의 정보화 수준을 향상시키며 비즈니스 가치를 극대화하고 있습니다.</p>
            <p class="sub_text type03">2007년, 롯데정보통신은 데이터센터 건립을 계기로 새로운 세상을 향해 비상하고 있습니다. RFID(무선 주파수 인식), Home Network, IBS(Intelligent Building System), VTL(virtual Tape Library) 유통 등 신규 서비스 제공을 통해 고객의 핵심 경쟁력 강화를 위해 최선을 다하겠습니다.</p>
        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
        components: {
            Lotte
        }
    })

    export default class Lotte extends Vue {
        @Prop() private msg!: string;

        mounted() {

        }
    }

</script>