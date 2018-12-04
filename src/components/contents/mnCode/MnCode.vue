<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>코드 관리</h3>

            <!-- code mgt -->
            <div class="code_mgt">
                <!-- sch form -->
                <div class="sch_form">
                    <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa11" checked="checked"><label for="aa11">회사코드 관리</label></span>
                    <span class="rdo_box"><input type="radio" name="chk" value="2" id="aa12"><label for="aa12">공통코드 관리</label></span>
                </div>
                <!-- grid box -->
                <div class="grid_box col02">
                    <!-- code col -->
                    <div class="code_col">
                        <!-- sub -->
                        <div class="sub">회사 메인코드 그룹</div>
                        <!-- btn mgt area -->
                        <div class="btn_mgt_area">
                            <button type="button" id="" class="btn_s01 bg03 add">추가</button>
                            <button type="button" id="" class="btn_s01 bg03 del">삭제</button>
                        </div>

                        <!-- code list box -->
                        <div class="code_list_box">
                            <!-- code head -->
                            <div class="code_head">
                                <div class="title">코드그룹</div>
                                <div class="title">코드명</div>
                            </div>
                            <!-- code body -->
                            <div class="code_body tbl_scroll">
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- //code col -->
                    <!-- code col -->
                    <div class="code_col">
                        <!-- sub -->
                        <div class="sub">회사 서브 코드</div>
                        <!-- btn mgt area -->
                        <div class="btn_mgt_area">
                            <button type="button" id="" class="btn_s01 bg03 add">추가</button>
                            <button type="button" id="" class="btn_s01 bg03 del">삭제</button>
                        </div>

                        <!-- code list box -->
                        <div class="code_list_box">
                            <!-- code head -->
                            <div class="code_head">
                                <div class="title">상세코드</div>
                                <div class="title">코드명</div>
                            </div>
                            <!-- code body -->
                            <div class="code_body tbl_scroll">
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                                <a href="#">
                                    <div class="cont">0001</div>
                                    <div class="cont">회사코드</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- //code col -->
                </div>

            </div>


            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" id="" class="btn_b01 bg02">초기화</button>
                <button type="button" id="" class="btn_b01 bg01">저장</button>
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
            MnCode
        }
    })
    export default class MnCode extends Vue {


    }
</script>

<style scoped>

</style>