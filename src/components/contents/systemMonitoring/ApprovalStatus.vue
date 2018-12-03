<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <!-- cont_mobile -->
            <div class="cont_mobile page_system0601">
                <!-- title area -->
                <div class="title_area">
                    <div class="fleft">
                        <h3>시스템 모니터링</h3>
                    </div>
                </div>

                <!-- tab box -->
                <div class="tab_box">
                    <ul class="tab01 col04">
                        <li class="on"><a href="#">승인 현황</a></li>
                        <li><a href="#">배치 파일 처리 현황</a></li>
                        <li><a href="#">시스템 자원</a></li>
                        <li><a href="#">서비스 상태</a></li>
                    </ul>
                </div>

                <h4 class="blind">승인 현황</h4>

                <!-- system box -->
                <div class="system_box">
                    <ul class="system_list">
                        <li>
                            <!-- system row -->
                            <div class="system_row">
                                <div class="system_col01">
                                    <a href="#">
                                        <h5 class="system">실시간 승인</h5>
                                        <span class="text_type04">FEP 승인요청, 응답, 지연, 실패 (로그 챠트 표시)</span>
                                        <span class="text_type04">TMAX 승인요청, 응답, 지연, 실패 (로그 챠트 표시)</span>
                                    </a>
                                </div>
                                <div class="system_col02">
                                    <span class="total">10</span>
                                </div>
                            </div>

                            <!-- system row chart -->
                            <div class="system_row chart">
                                <div class="system_col">
                                    <a href="#">
                                        <h5 class="system">실시간 승인</h5>
                                        <span class="text_type04">FEP</span>
                                        <div class="system_chart">
                                            <img src="images/img_system01.png" alt="">
                                        </div>
                                        <span class="text_type04">TMAX</span>
                                        <div class="system_chart">
                                            <img src="images/img_system01.png" alt="">
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <!-- //system row chart -->
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row">
                                <div class="system_col01">
                                    <a href="#">
                                        <h5 class="system">국세청  승인 거절 건수</h5>
                                        <span class="text_type04">KT</span>
                                        <span class="text_type04">LDCC</span>
                                    </a>
                                </div>
                                <div class="system_col02">
                                    <span class="total">10</span>
                                    <span class="num">5</span>
                                    <span class="num">5</span>
                                </div>
                            </div>

                            <!-- system row chart -->
                            <div class="system_row chart">
                                <div class="system_col">
                                    <a href="#">
                                        <h5 class="system">국세청  승인 거절 건수</h5>
                                        <div class="system_chart">
                                            <img src="images/img_system01.png" alt="">
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <!-- //system row chart -->
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row">
                                <div class="system_col01">
                                    <a href="#">
                                        <h5 class="system">내부 승인 거절 건수</h5>
                                        <span class="text_type04">KT</span>
                                        <span class="text_type04">LDCC</span>
                                    </a>
                                </div>
                                <div class="system_col02">
                                    <span class="total">10</span>
                                    <span class="num">5</span>
                                    <span class="num">5</span>
                                </div>
                            </div>

                            <!-- system row chart -->
                            <div class="system_row chart">
                                <div class="system_col">
                                    <a href="#">
                                        <h5 class="system">내부 승인 거절 건수</h5>
                                        <div class="system_chart">
                                            <img src="images/img_system01.png" alt="">
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <!-- //system row chart -->
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row">
                                <div class="system_col01">
                                    <a href="#">
                                        <h5 class="system">국세청 전송 현황</h5>
                                    </a>
                                </div>
                                <div class="system_col02">
                                    <span class="total">10</span>
                                </div>
                            </div>

                            <!-- system row chart -->
                            <div class="system_row chart">
                                <div class="system_col">
                                    <a href="#">
                                        <h5 class="system">국세청 전송 현황</h5>
                                        <div class="system_chart">
                                            <img src="images/img_system01.png" alt="">
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <!-- //system row chart -->
                        </li>
                    </ul>
                </div>

            </div>
            <!-- //cont_mobile -->

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>


<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            ApprovalStatus
        }
    })
    export default class ApprovalStatus extends Vue {

    }
</script>

<style scoped>

</style>