<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>{{titleNm}} 내용 입력</h3>

            <!-- tbl view box -->
            <div class="bbs_write_box">
                <!-- tbl view01 -->
                <table class="bbs_write">
                    <caption> 내용 입력</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="75%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td><input type="text" class="input form_w100" title="제목"></td>
                    </tr>
                    <tr>
                        <th scope="row">내용</th>
                        <td class="con_write">
                            <tinymce id="d1" v-model="content"></tinymce>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" v-on:click="toPolicyList" class="btn_b01 bg02">취소</button>
                <button type="button" v-on:click="toPolicyDetail" class="btn_b01 bg03">미리보기</button>
                <button type="button" v-on:click="regPolicy" class="btn_b01 bg01">전체 저장</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>


<script lang="ts">

    import {Component, Vue, Watch} from "vue-property-decorator";

    @Component({
        components: {
            PolicyReg
        }
    })
    export default class PolicyReg extends Vue {
        titleNm:string="";
        termsType:string = "";

        mounted(){
            this.pageDiv();
        }

        pageDiv(){
            let routeNm = this.$route.name;
            if(routeNm == 'policyReg' ) {
                this.titleNm = '이용약관';
                this.termsType="site";
            }else if(routeNm == 'personalReg' ){
                this.titleNm ='개인보호처리방침';
                this.termsType="user";
            }
        }

        /**
         * 저장
         * */
        regPolicy(){
            //등록로직
            this.$router.push({name:'policy'})
        }


        // 라우터 경로 변경시 이벤트 발생
        @Watch('$route') onChange(){
            this.pageDiv();
        }

        /**
         * 목록으로
         */
        toPolicyList(){
            this.$router.push({name:'policyList'});
        }

        /**
        미리보기
         */
        toPolicyDetail(){
            if(this.termsType="site"){
                this.$router.push({name:'policyDetail'});
            }else{
                this.$router.push({name:'personalDetail'});
            }

        }


    }
</script>

<style scoped>

</style>