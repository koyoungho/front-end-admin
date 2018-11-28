<template>

    <!-- main container -->
    <section id="main_container">
        <!-- main top -->
        <div class="main_top">
            <!-- main visual wrap -->
            <div class="main_visual_wrap">
                <p class="main_text01">
                    현금영수증 발급 <strong>선택이 아닌 의무!</strong>
                </p>
                <p class="main_text02">
                    현금영수증은 투명한 조세실현의 첫걸음입니다.<br>
                    현금영수증은 여러분의 복지혜택을 더욱 크게 키워드립니다.<br>
                </p>
            <!-- main menu box -->
            <div class="main_menu_box">
                    <ul class="main_menu">
                        <li>
                            <a v-on:click="menuChk('cashInstitution')">
                                <i class="icon_main m01"></i>
                                <span class="sub">가맹점 등록</span>
                            </a>
                        </li>
                        <li>
                            <a v-on:click="menuChk('cashReceiptIssue')">
                                <i class="icon_main m02"></i>
                                <span class="sub">매장 등록</span>
                            </a>
                        </li>
                        <li>
                            <a v-on:click="menuChk('ioc')">
                                <i class="icon_main m03"></i>
                                <span class="sub">현금영수증<br>발급</span>
                            </a>
                        </li>
                        <li>
                            <a v-on:click="menuChk('IssueViewingCancel')">
                                <i class="icon_main m04"></i>
                                <span class="sub">현금영수증 발급<br>내역 조회</span>
                            </a>
                        </li>
                        <li>
                            <a v-on:click="menuChk('cashInstitution')">
                                <i class="icon_main m05"></i>
                                <span class="sub">가맹점 해지</span>
                            </a>
                        </li>
                        <li>
                            <a v-on:click="menuChk('noticeList')">
                                <i class="icon_main m06"></i>
                                <span class="sub">공지사항</span>
                            </a>
                        </li>
                        <li>
                            <a v-on:click="menuChk('faq')">
                                <i class="icon_main m07"></i>
                                <span class="sub">자주 묻는 질문</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon_main m08"></i>
                                <span class="sub">국세청<br>현금영수증</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- //main visual wrap -->
        </div>
        <!-- //main top -->

        <!-- main mid -->
        <div class="main_middle">
            <div class="notice_box">
                <h2>공지사항</h2>
                <ul class="notice_list">
                    <li>
                        <a href="#">현금영수증 시스템 정기 점검 및 작업 안내현금영수증 시스템 정기 점검 및 작업 안내</a>
                        <span class="date">2018.04.04</span>
                    </li>
                    <li>
                        <a href="#">현금영수증 시스템 정기 점검 및 작업 안내</a>
                        <span class="date">2018.04.04</span>
                    </li>
                    <li>
                        <a href="#">현금영수증 시스템 정기 점검 및 작업 안내</a>
                        <span class="date">2018.04.04</span>
                    </li>
                    <li>
                        <a href="#">현금영수증 시스템 정기 점검 및 작업 안내</a>
                        <span class="date">2018.04.04</span>
                    </li>
                    <li>
                        <a href="#">현금영수증 시스템 정기 점검 및 작업 안내</a>
                        <span class="date">2018.04.04</span>
                    </li>
                </ul>
                <a href="#" class="btn_more">더보기</a>
            </div>

            <!-- main info box -->
            <div class="main_info_box">
                <div class="info_left">
                    <dl class="info">
                        <dt>고객센터</dt>
                        <dd>
                            <strong>02-2074-0340</strong>
                            <span class="sub">상담시간 : </span>
                            <span class="text">평일 09:30~18:00 <span class="cf_text">(점심시간 12:00~1:00)</span></span>
                        </dd>
                    </dl>
                    <dl class="info">
                        <dt>팩스번호</dt>
                        <dd>
                            <strong>02-2074-6089</strong>
                            <span class="text">(사업자등록증  제출용)</span>
                        </dd>
                    </dl>
                </div>
                <div class="info_right">
                    <a href="#">
                        <dl class="manual">
                            <dt>매뉴얼 다운로드</dt>
                            <dd><span class="text">가맹점 가입안내와 사이트 이용안내서</span></dd>
                        </dl>
                    </a>
                    <a href="https://www.nts.go.kr/" class="btn_linkgo" target="_blank" title="새창으로 열기">국세청 바로가기</a>
                </div>
            </div>
            <!-- //main info box -->

        </div>
        <!-- //main mid -->
    </section>
    <!-- //main container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component({
         components : {
             Main
         }
    })
    export default class Main extends Vue{
        created(){

        }

        menuChk(menuId: string) {

            /* 로그인 필수 메뉴
             *  cashReceiptIssue        현금영수증 발급
             *  ioc                     발급 조회 및 취소
             *  IssueViewingCancel      가맹점 정보변경/해지
             */
            console.log(menuId);
            if(menuId == 'cashReceiptIssue' || menuId == 'ioc' || menuId == 'IssueViewingCancel'){
                if(localStorage.accessToken){
                    console.log('already login')
                    this.$router.push('/home/'+menuId)
                }else{
                    console.log('login require')
                    this.$router.push('/login')
                }
            }else{
                console.log('not login')
                this.$router.push('/home/'+menuId )
            }

        }
    };
</script>

