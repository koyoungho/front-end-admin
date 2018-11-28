<template>

    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">가맹점 관리</h2>

            <h3 class="join">지점 등록 완료</h3>

            <!-- complete wrap -->
            <div class="complete_wrap">
                <div class="result_box">
                    <ul class="result_info">
                        <li><span class="sub">사업자등록번호 : </span>123-45-67883</li>
                        <li><span class="sub">매장명 : </span>롯데리아 산본점</li>
                        <li><span class="sub">아이디 : </span>dfdss</li>
                    </ul>
                </div>
                <p class="complete_result ok">지점 등록이 완료되었습니다.</p>
                <!-- btn area -->
                <div class="btn_area">
                    <button type="button" id="" class="btn_b02 bg01" v-on:click="goConfirm">확인</button>
                </div>
            </div>
            <!-- //complete wrap -->

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import {CommonBoardService, CommonListService} from '../../../api/common.service';
    import {environment} from '../../../utill/environment';


    @Component({
        components: {
            BranchRegCmpl
        },
    })
    export default class BranchRegCmpl extends Vue {
        message: any = '';

        //돔생성전 호출자
        created() {
        }

        //돔렌더링완료시 진행
        mounted() {
        }

        //가맹점 상세이동
        franchiseDetl(){
            this.$router.push('/home/franchiseDetl')
        }

        newFranchise(){
            this.$router.push('/home/franchiseReg')
        }

        goConfirm(){
            this.$router.push('/home/branchList')
        }
    }

</script>
