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
                        <li><span class="sub">사업자등록번호 : </span>{{saupId}}</li>
                        <li><span class="sub">매장명 : </span>{{shopNm}}</li>
                        <!--<li><span class="sub">아이디 : </span>{{manageId}}</li>-->
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

        reqObjectKey: any = '';

        saupId: any = '';
        shopNm: any = '';
        manageId: any = '';

        //돔생성전 호출자
        created() {

            this.reqObjectKey = this.$route.params.objectKey;

            this.saupId = this.reqObjectKey.saupjangDto.saupId; //사업자등록번호
            this.shopNm = this.reqObjectKey.saupjangDto.shopNm; //매장명

            console.log(this.reqObjectKey.accounts.length)
            if(this.reqObjectKey.accounts != null && this.reqObjectKey.accounts.length == 1){
                this.manageId = this.reqObjectKey.accounts[0].id;
            }else if(this.reqObjectKey.accounts != null && this.reqObjectKey.accounts.length > 1){
                let putId : any = ''
                for(let i=0; i<this.reqObjectKey.accounts.length; i++){
                    if(i == 0){
                        putId = this.reqObjectKey.accounts[i].id;
                    }else{
                        putId = putId + ', ' +this.reqObjectKey.accounts[i].id;
                    }
                }
                this.manageId = putId; //관라자 ID
            }

        }

        //돔렌더링완료시 진행
        mounted() {
        }

        goConfirm(){
            this.$router.push('/home/branchList')
        }
    }

</script>
