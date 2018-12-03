<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <!-- cont_mobile -->
            <div class="cont_mobile page_system0604">
                <!-- title area -->
                <div class="title_area">
                    <div class="fleft">
                        <h3>시스템 모니터링</h3>
                    </div>
                    <div class="fright">
                        <!-- system_state box -->
                        <div class="system_state_box">
                            <span class="text"><i class="state st_color04"></i>정상</span>
                            <span class="text"><i class="state st_color02"></i>주의</span>
                            <span class="text"><i class="state st_color05"></i>오류</span>
                        </div>
                    </div>
                </div>

                <!-- tab box -->
                <div class="tab_box">
                    <ul class="tab01 col04">
                        <li><a href="#">승인 현황</a></li>
                        <li><a href="#">배치 파일 처리 현황</a></li>
                        <li><a href="#">시스템 자원</a></li>
                        <li class="on"><a href="#">서비스 상태</a></li>
                    </ul>
                </div>

                <h4 class="blind">서비스 상태</h4>

                <!-- system box -->
                <div class="system_box">
                    <ul class="system_list">
                        <li>
                            <!-- system row -->
                            <div class="system_row st_color04">
                                <div class="system_col01">
                                    <h5 class="system">웹서비스</h5>
                                    <span class="text_type04">응답속도</span>
                                    <span class="text_type04 fc_pt01">세션 수</span>
                                </div>
                                <div class="system_col02">
                                    <span class="total">정상</span>
                                    <span class="num">4ns</span>
                                    <span class="num fc_pt01">100명</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row st_color02">
                                <div class="system_col01">
                                    <h5 class="system">DB 서버</h5>
                                    <span class="text_type04">응답속도</span>
                                </div>
                                <div class="system_col02">
                                    <span class="total">주의</span>
                                    <span class="num">4ns</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row st_color05">
                                <div class="system_col01">
                                    <h5 class="system">실시간 승인 1</h5>
                                    <span class="text_type04">응답속도</span>
                                </div>
                                <div class="system_col02">
                                    <span class="total">오류</span>
                                    <span class="num">4ns</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row st_color04">
                                <div class="system_col01">
                                    <h5 class="system">실시간 승인 2</h5>
                                    <span class="text_type04">응답속도</span>
                                </div>
                                <div class="system_col02">
                                    <span class="total">정상</span>
                                    <span class="num">4ns</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row st_color04">
                                <div class="system_col01">
                                    <h5 class="system">FEP 서버 1</h5>
                                    <span class="text_type04">응답속도</span>
                                    <span class="text_type04 fc_pt01">Server Connect  Err</span>
                                </div>
                                <div class="system_col02">
                                    <span class="total">정상</span>
                                    <span class="num">4ns</span>
                                    <span class="num fc_pt01">00</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row st_color04">
                                <div class="system_col01">
                                    <h5 class="system">FEP 서버 2</h5>
                                    <span class="text_type04">응답속도</span>
                                    <span class="text_type04 fc_pt01">Server Connect  Err</span>
                                </div>
                                <div class="system_col02">
                                    <span class="total">정상</span>
                                    <span class="num">4ns</span>
                                    <span class="num fc_pt01">00</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row st_color04">
                                <div class="system_col01">
                                    <h5 class="system">TMAX  서버 1</h5>
                                    <span class="text_type04">응답속도</span>
                                    <span class="text_type04 fc_pt01">RDY / NRDY</span>
                                </div>
                                <div class="system_col02">
                                    <span class="total">정상</span>
                                    <span class="num">4ns</span>
                                    <span class="num fc_pt01">00</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row st_color04">
                                <div class="system_col01">
                                    <h5 class="system">TMAX  서버 2</h5>
                                    <span class="text_type04">응답속도</span>
                                    <span class="text_type04 fc_pt01">RDY / NRDY</span>
                                </div>
                                <div class="system_col02">
                                    <span class="total">정상</span>
                                    <span class="num">4ns</span>
                                    <span class="num fc_pt01">00</span>
                                </div>
                            </div>
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
            ServiceStatus

        }
    })
    export default class ServiceStatus extends Vue {

    }
</script>

<style scoped>

</style>