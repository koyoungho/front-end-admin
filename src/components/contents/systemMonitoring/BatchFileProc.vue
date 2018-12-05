<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <!-- cont_mobile -->
            <div class="cont_mobile  page_system0602">
                <!-- title area -->
                <div class="title_area">
                    <div class="fleft">
                        <h3>시스템 모니터링</h3>
                    </div>
                    <div class="fright">
                        <!-- system_state box -->
                        <div class="system_state_box">
                            <span class="text"><i class="state st_color01"></i>대기</span>
                            <span class="text"><i class="state st_color02"></i>작업중</span>
                            <span class="text"><i class="state st_color03"></i>완료</span>
                            <span class="text"><i class="state st_color04"></i>정상</span>
                            <span class="text"><i class="state st_color05"></i>오류</span>
                        </div>
                    </div>
                </div>

                <!-- tab box -->
                <div class="tab_box">
                    <ul class="tab01 col04">
                        <li><a href="#">승인 현황</a></li>
                        <li class="on"><a href="#">배치 파일 처리 현황</a></li>
                        <li><a href="#">시스템 자원</a></li>
                        <li><a href="#">서비스 상태</a></li>
                    </ul>
                </div>

                <h4 class="blind">배치 파일 처리 현황</h4>

              <div v-show="buttonShow"> 버튼버튼!!!!!!!!!!!!!!!!!!!!!!</div>


                <!-- system box -->
                <div class="system_box">
                    <ul class="system_list">
                        <li>
                            <!-- system row -->
                            <div class="system_row st_color01">
                                <div class="system_col01">
                                    <h5 class="system">작업 대기</h5>
                                    <span class="text_type04">파일 입수 대기</span>
                                    <span class="text_type04">파일 처리 대기</span>
                                </div>
                                <div class="system_col02">
                                    <span class="total">10</span>
                                    <span class="num">5</span>
                                    <span class="num">5</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row st_color02">
                                <div class="system_col01">
                                    <h5 class="system">작업 중</h5>
                                </div>
                                <div class="system_col02">
                                    <span class="total">10</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row st_color03">
                                <div class="system_col01">
                                    <h5 class="system">작업 완료</h5>
                                </div>
                                <div class="system_col02">
                                    <span class="total">10</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row st_color04">
                                <div class="system_col01">
                                    <h5 class="system">정상 처리 건수</h5>
                                </div>
                                <div class="system_col02">
                                    <span class="total">10</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <!-- system row -->
                            <div class="system_row st_color05">
                                <div class="system_col01">
                                    <h5 class="system">오류 처리 건수</h5>
                                </div>
                                <div class="system_col02">
                                    <span class="total">10</span>
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
            BatchFileProc
        }
    })
    export default class BatchFileProc extends Vue {

        vWebType:string="";
        buttonShow:boolean=false;

        mounted(){
            let filter = "win16|win32|win64|mac";
            this.vWebType = "";

            //모바일/PC 구분
            if (navigator.platform ) {
                if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
                    this.vWebType = "MOBILE";
                    this.buttonShow = false;
                } else {
                    this.vWebType = "PC";
                    this.buttonShow = true;
                }
            }
        }

    }
</script>

<style scoped>

</style>