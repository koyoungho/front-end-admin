<template>
    <!-- container -->
    <section id="container">
        <!-- content  -->
        <div class="content">
            <h2 class="blind">시스템 관리</h2>

            <h3>{{titleNm}} {{way}}</h3>

            <!-- tbl view box -->
            <div class="bbs_write_box">
                <!-- tbl view01 -->
                <table class="bbs_write">
                    <caption> 내용 입력</caption>
                    <colgroup>
                        <col width="10%">
                        <col width="75%">
                        <col width="5%">
                        <col width="10%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th scope="row">제목</th>
                        <td><input type="text" class="input form_w100" title="제목" v-model="title"></td>
                        <th scope="row">순번</th>
                        <td><input type="text" class="input form_w100" title="순번" v-model="termsOrder_new"></td>
                    </tr>
                    <tr>
                        <th scope="row">내용</th>
                        <td class="con_write"colspan="3">
                            <tinymce id="d1"  v-model="content"></tinymce>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!-- //tbl view box -->

            <!-- btn bot -->
            <div class="btn_bot">
                <button type="button" v-on:click="toPolicyTempList" class="btn_b01 bg02">취소</button>
                <button type="button" v-on:click="delPolicy" class="btn_b01 bg03">삭제</button>
                <button type="button" v-on:click="regPolicy" class="btn_b01 bg01">{{way}}</button>
            </div>

        </div>
        <!-- //content -->
    </section>
    <!-- //container -->
</template>


<script lang="ts">

    import {Component, Vue, Watch} from "vue-property-decorator";
    import {CommonBoardService} from "../../../api/common.service";

    @Component({
        components: {
            PolicyReg
        }
    })
    export default class PolicyReg extends Vue {
        titleNm: string = "";
        title: string = "";
        content: string = "";
        termsType: string = "";
        objectKey: any = "";
        termsOrder_old: string = "";
        termsOrder_new: string = "";
        way: string = "";

        mounted() {
            this.objectKey = this.$route.params.objectKey;
            this.way = "등록";

            console.log('11this.objectKey', this.objectKey);

            this.pageDiv();

            if (this.objectKey != undefined) {
                this.termsOrder_old = this.objectKey.termsOrder;
                this.way = "수정";
                this.getData();
            }

        }

        /**
         * 분기
         */
        pageDiv() {
            let routeNm = this.$route.name;
            if (routeNm == 'policyReg') {
                this.titleNm = '이용약관';
                this.termsType = "SITE";
            } else if (routeNm == 'personalReg') {
                this.titleNm = '개인보호처리방침';
                this.termsType = "USER";
            }
        }

        /**
         * 데이터 호출
         */
        getData() {
            // api 데이터 호출 -  약관/개인 지침 리스트
            CommonBoardService.getListDatas('terms/temp/' + this.termsType, this.termsOrder_old, null).then((response) => {

                let result: any = response.data;
                if (response.status.toString() == '200') {
                    this.title = result.title;
                    this.content = result.content;
                    this.termsOrder_new = result.termsOrder;
                }
            }
            , (error) => {
                //this.$Progress.finish();
            }).catch();
        }

        /**
         * 저장
         */
        regPolicy() {
            //등록로직
            this.validationChk();
            let reqData = {};

            reqData['title'] = this.title;
            reqData['newTermsOrder'] = this.termsOrder_new;
            reqData['content'] = this.content;

            if (this.way == "등록" ) {//등록

                CommonBoardService.postListDatas('terms/temp', this.termsType, reqData).then((response) => {
                        if (response.status.toString() == '201') { //성공
                            alert("등록되었습니다.");
                            this.toPolicyTempList();//목록으로
                        } else { // 실패
                            console.log(response);
                            alert("등록에 실패 하였습니다.");
                            this.toPolicyTempList();//목록으로
                        }
                    }
                    , (error) => {
                        //this.$Progress.finish();
                        console.log(error);
                    }
                ).catch();
            }else{//수정
                console.log('old', this.termsOrder_old );
                console.log('new', this.termsOrder_new );

                CommonBoardService.updateListData('terms/temp/'+ this.termsType, this.termsOrder_old, reqData).then((response) => {
                        if (response.status.toString() == '200') { //성공
                            alert("수정되었습니다.");
                            this.toPolicyTempList();//목록으로
                        } else { // 실패
                            console.log(response);
                            alert("수정에 실패 하였습니다.");
                            this.toPolicyTempList();//목록으로
                        }
                    }
                    , (error) => {
                        //this.$Progress.finish();
                        console.log(error);
                    }
                ).catch();
            }
        }


        // 라우터 경로 변경시 이벤트 발생
        @Watch('$route') onChange() {
            this.pageDiv();
        }

        /**
         * 목록으로
         */
        toPolicyTempList() {
            if (this.termsType = "site") {
                this.$router.push({name: 'policyTempList'});
            } else {
                this.$router.push({name: 'personalTempList'});
            }

        }
        /**
         * 삭제
         */
        delPolicy(){

            CommonBoardService.deleteListDatas('terms/temp/'+ this.termsType, this.termsOrder_old, null).then((response) => {
                console.log(response);
                if (response.status.toString() == '200') { //성공
                    alert("삭제되었습니다.");
                    this.toPolicyTempList();//목록으로
                } else { // 실패
                    console.log(response);
                    alert("삭제에 실패 하였습니다.");
                    this.toPolicyTempList();//목록으로
                }
            }
            , (error) => {
                //this.$Progress.finish();
                console.log(error);
            }).catch();




        }

        // /**
        //  미리보기
        //  */
        // toPolicyDetail() {
        //     if (this.termsType = "site") {
        //         this.$router.push({
        //             name: 'policyDetail',
        //             params: {
        //                 div: 'preview',
        //                 detTitle: this.title,
        //                 detContent: this.content,
        //                 termsOrder: this.termsOrder
        //             }
        //         });
        //     } else {
        //         this.$router.push({
        //             name: 'personalDetail',
        //             params: {
        //                 div: 'preview',
        //                 detTitle: this.title,
        //                 detContent: this.content,
        //                 termsOrder: this.termsOrder
        //             }
        //         });
        //     }
        //
        // }

        /**
         * 유효성체크
         */
        validationChk() {
            if (this.title == null || this.title == "") {
                alert("제목을 입력하세요");
                return false;
            } else if (this.content == null || this.content == "") {
                alert("내용을 입력하세요");
                return false;
            } else if (this.termsOrder_new == null || this.termsOrder_new == "") {
                alert("순번을 입력하세요");
                return false;
            }
        }



    }
</script>

<style scoped>

</style>