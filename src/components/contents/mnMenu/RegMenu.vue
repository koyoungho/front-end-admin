<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>메뉴 권한 등록</h3>

            <p class="req_info type01">(<em class="form_req">*</em>)는 필수항목입니다.</p>

            <!-- tbl view box -->
            <div class="tbl_view_box">
                <!-- tbl view01 -->
                <table class="tbl_view01">
                    <caption>메뉴 권한 {{div}}</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="33%">
                        <col width="17%">
                        <col width="33%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">상위메뉴<em class="form_req">*</em></th>
                        <td colspan="3">
                            <select id="" name="" class="select form_w50" title="상위메뉴">
                                <option>선택</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">메뉴명<em class="form_req">*</em></th>
                        <td><input type="text" class="input form_w100" title="메뉴명"></td>
                        <th scope="row">메뉴 코드</th>
                        <td>
                            <input type="text" class="input form_w100" title="메뉴 코드" disabled="disabled">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">사용 여부</th>
                        <td colspan="3">
                            <select id="" name="" class="select form_w50" title="사용 여부">
                                <option>선택</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">메뉴 경로<em class="form_req">*</em></th>
                        <td colspan="3"><input type="text" class="input form_w100" title="메뉴 경로"></td>
                    </tr>
                    <tr>
                        <th scope="row">메뉴 설명</th>
                        <td colspan="3"><input type="text" class="input form_w100" title="메뉴 설명"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- tbl list box -->
            <div class="tbl_list_box tbl_blank01">
                <!-- tbl list01 -->
                <table class="tbl_list01">
                    <caption>메뉴사용권한 목록</caption>
                    <colgroup>
                        <col width="17%">
                        <col width="21%">
                        <col width="21%">
                        <col width="21%">
                        <col width="20%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="col">권한</th>
                        <th scope="col">조회</th>
                        <th scope="col">등록</th>
                        <th scope="col">수정</th>
                        <th scope="col">삭제</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">시스템 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">사업자 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">콜센터</th>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">가맹점 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    <tr>
                        <th scope="row">지점 관리자</th>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                        <td><span class="chk_box"><input type="checkbox" id=""><label for=""><span class="blind">선택</span></label></span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl list box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02">취소</button>
                <button type="button"v-on:click="regMenu" class="btn_b01 bg01">등록</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {
            RegMenu
        }
    })
    export default class RegMenu extends Vue {
        div:string="";
        seq:string="";

        mounted(){
            this.seq=this.$route.params.seq; // 글번호 시퀀스
            if(this.seq != null && this.seq != 'undefinded') {
                this.div="조회";
                this.getMenuDetail();
            }else {
                this.div="등록";
            }

        }


        getMenuDetail(){//메뉴 상세정보

        }

        regMenu(){
            this.$router.push({name:'policy'})
        }

    }
</script>

<style scoped>

</style>